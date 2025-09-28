from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_session
from app.api.v1.dependencies import get_current_user
from app.models.user import User
from app.schemas.activity_log_schemas import ActivityLogPublic
from app.crud.activity_log_crud import get_activity_logs_by_user, get_recent_activity_logs

router = APIRouter(prefix="/activity", tags=["Activity"])


@router.get("/my", response_model=List[ActivityLogPublic])
async def get_my_activity_logs(
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
    limit: int = 20
):
    """取得我的活動記錄"""
    logs = await get_activity_logs_by_user(session, current_user.id, limit)
    
    return [
        ActivityLogPublic(
            id=log.id,
            user_id=log.user_id,
            activity_type=log.activity_type,
            description=log.description,
            extra_data=log.extra_data,
            created_at=log.created_at
        )
        for log in logs
    ]


@router.get("/recent", response_model=List[ActivityLogPublic])
async def get_recent_activities(
    session: AsyncSession = Depends(get_session),
    limit: int = 50
):
    """取得最近的活動記錄（公開）"""
    logs = await get_recent_activity_logs(session, limit)
    
    return [
        ActivityLogPublic(
            id=log.id,
            user_id=log.user_id,
            activity_type=log.activity_type,
            description=log.description,
            extra_data=log.extra_data,
            created_at=log.created_at
        )
        for log in logs
    ]
