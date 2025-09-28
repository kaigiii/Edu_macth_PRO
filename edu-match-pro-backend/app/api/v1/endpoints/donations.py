import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_session
from app.models.user import User
from app.schemas.donation_schemas import DonationCreate, DonationPublic
from app.schemas.profile_schemas import ProfilePublic
from app.crud.donation_crud import create_donation, get_donations_by_company
from app.api.v1.dependencies import get_current_user

router = APIRouter(prefix="/donations", tags=["Donations"])


@router.post("/", response_model=DonationPublic, status_code=status.HTTP_201_CREATED)
async def create_new_donation(
    donation_in: DonationCreate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """發起捐贈 (認捐)"""
    # 檢查使用者角色是否為企業
    if current_user.role != "company":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only companies can create donations"
        )
    
    try:
        # 建立捐贈專案
        new_donation = await create_donation(session, donation_in, current_user.id)
        
        if not new_donation:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="需求不存在或已被認捐"
            )
        
        # 重新載入關聯資料
        await session.refresh(new_donation, ["need"])
        
        # 轉換為公開格式
        return DonationPublic(
            id=new_donation.id,
            need_id=new_donation.need_id,
            company_id=new_donation.company_id,
            donation_type=new_donation.donation_type,
            description=new_donation.description,
            progress=new_donation.progress,
            status=new_donation.status,
            donation_date=new_donation.created_at,
            completion_date=new_donation.completion_date,
            need=new_donation.need,
            company=None  # 暫時設為 None，稍後可以單獨查詢
        )
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"建立捐贈專案時發生錯誤: {str(e)}"
        )


@router.get("/my", response_model=List[DonationPublic])
async def get_my_donations(
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """取得我的捐贈歷史"""
    # 檢查使用者角色是否為企業
    if current_user.role != "company":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only companies can view their donations"
        )
    
    # 獲取企業的所有捐贈專案
    donations = await get_donations_by_company(session, current_user.id)
    
    # 轉換為公開格式
    return [
        DonationPublic(
            id=donation.id,
            need_id=donation.need_id,
            company_id=donation.company_id,
            donation_type=donation.donation_type,
            description=donation.description,
            progress=donation.progress,
            status=donation.status,
            donation_date=donation.created_at,
            completion_date=donation.completion_date,
            need=donation.need,
            company=None  # 暫時設為 None
        )
        for donation in donations
    ]
