import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_session
from app.models.user import User
from app.schemas.need_schemas import NeedCreate, NeedUpdate, NeedPublic
from app.crud.need_crud import (
    create_need, get_need_by_id, get_needs_by_school, 
    get_all_needs, update_need, delete_need
)
from app.api.v1.dependencies import get_current_user

router = APIRouter(prefix="/needs", tags=["Needs"])


@router.post("/", response_model=NeedPublic, status_code=status.HTTP_201_CREATED)
async def create_new_need(
    need_in: NeedCreate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """建立新需求"""
    # 檢查使用者角色是否為學校
    if current_user.role != "school":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only schools can create needs"
        )
    
    # 建立新需求
    new_need = await create_need(session, need_in, current_user.id)
    
    # 回傳公開的需求資訊
    return NeedPublic(
        id=new_need.id,
        school_id=new_need.school_id,
        title=new_need.title,
        description=new_need.description,
        category=new_need.category,
        location=new_need.location,
        student_count=new_need.student_count,
        image_url=new_need.image_url,
        urgency=new_need.urgency,
        sdgs=new_need.sdgs,
        status=new_need.status,
        created_at=new_need.created_at,
        updated_at=new_need.updated_at
    )


@router.get("/my", response_model=List[NeedPublic])
async def get_my_needs(
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """取得我的所有需求"""
    # 檢查使用者角色是否為學校
    if current_user.role != "school":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only schools can view their needs"
        )
    
    # 獲取學校的所有需求
    needs = await get_needs_by_school(session, current_user.id)
    
    # 轉換為公開格式
    return [
        NeedPublic(
            id=need.id,
            school_id=need.school_id,
            title=need.title,
            description=need.description,
            category=need.category,
            location=need.location,
            student_count=need.student_count,
            image_url=need.image_url,
            urgency=need.urgency,
            sdgs=need.sdgs,
            status=need.status,
            created_at=need.created_at,
            updated_at=need.updated_at
        )
        for need in needs
    ]


@router.get("/", response_model=List[NeedPublic])
async def get_all_public_needs(
    session: AsyncSession = Depends(get_session)
):
    """取得所有公開需求 (不需要登入)"""
    # 獲取所有需求
    needs = await get_all_needs(session)
    
    # 轉換為公開格式
    return [
        NeedPublic(
            id=need.id,
            school_id=need.school_id,
            title=need.title,
            description=need.description,
            category=need.category,
            location=need.location,
            student_count=need.student_count,
            image_url=need.image_url,
            urgency=need.urgency,
            sdgs=need.sdgs,
            status=need.status,
            created_at=need.created_at,
            updated_at=need.updated_at
        )
        for need in needs
    ]


@router.get("/{need_id}", response_model=NeedPublic)
async def get_need_by_id_endpoint(
    need_id: uuid.UUID,
    session: AsyncSession = Depends(get_session)
):
    """取得單一需求 (不需要登入)"""
    # 查詢需求
    need = await get_need_by_id(session, need_id)
    if not need:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Need not found"
        )
    
    # 回傳需求資訊
    return NeedPublic(
        id=need.id,
        school_id=need.school_id,
        title=need.title,
        description=need.description,
        category=need.category,
        location=need.location,
        student_count=need.student_count,
        image_url=need.image_url,
        urgency=need.urgency,
        sdgs=need.sdgs,
        status=need.status,
        created_at=need.created_at,
        updated_at=need.updated_at
    )


@router.put("/{need_id}", response_model=NeedPublic)
async def update_need_endpoint(
    need_id: uuid.UUID,
    need_in: NeedUpdate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """更新需求"""
    # 查詢需求
    db_need = await get_need_by_id(session, need_id)
    if not db_need:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Need not found"
        )
    
    # 權限檢查：確認使用者是需求的擁有者
    if current_user.id != db_need.school_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to update this need"
        )
    
    # 更新需求
    updated_need = await update_need(session, db_need, need_in)
    
    # 回傳更新後的需求
    return NeedPublic(
        id=updated_need.id,
        school_id=updated_need.school_id,
        title=updated_need.title,
        description=updated_need.description,
        category=updated_need.category,
        location=updated_need.location,
        student_count=updated_need.student_count,
        image_url=updated_need.image_url,
        urgency=updated_need.urgency,
        sdgs=updated_need.sdgs,
        status=updated_need.status,
        created_at=updated_need.created_at,
        updated_at=updated_need.updated_at
    )


@router.delete("/{need_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_need_endpoint(
    need_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """刪除需求"""
    # 查詢需求
    db_need = await get_need_by_id(session, need_id)
    if not db_need:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Need not found"
        )
    
    # 權限檢查：確認使用者是需求的擁有者
    if current_user.id != db_need.school_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to delete this need"
        )
    
    # 刪除需求
    await delete_need(session, db_need)
    
    # 回傳 204 No Content
    return None
