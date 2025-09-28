from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_session
from app.api.v1.dependencies import get_current_user
from app.models.user import User
from app.schemas.dashboard_schemas import SchoolDashboardStats, CompanyDashboardStats
from app.crud.dashboard_crud import get_school_dashboard_stats, get_company_dashboard_stats

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/school", response_model=SchoolDashboardStats)
async def get_school_dashboard(
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """取得學校儀表板數據"""
    if current_user.role != "school":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only school users can access school dashboard"
        )
    
    stats = await get_school_dashboard_stats(session, current_user.id)
    return SchoolDashboardStats(**stats)


@router.get("/company", response_model=CompanyDashboardStats)
async def get_company_dashboard(
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """取得企業儀表板數據"""
    if current_user.role != "company":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only company users can access company dashboard"
        )
    
    stats = await get_company_dashboard_stats(session, current_user.id)
    return CompanyDashboardStats(**stats)
