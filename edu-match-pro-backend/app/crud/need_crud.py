import uuid
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.need import Need
from app.models.activity_log import ActivityType
from app.schemas.need_schemas import NeedCreate, NeedUpdate
from app.crud.activity_log_crud import create_activity_log


async def create_need(session: AsyncSession, need_in: NeedCreate, school_id: uuid.UUID) -> Need:
    """建立新的需求"""
    # 將 Pydantic 模型轉換為 SQLModel 資料庫模型
    db_need = Need(
        school_id=school_id,
        title=need_in.title,
        description=need_in.description,
        category=need_in.category,
        location=need_in.location,
        student_count=need_in.student_count,
        image_url=need_in.image_url,
        urgency=need_in.urgency,
        sdgs=need_in.sdgs
    )
    
    # 將需求加入 session 並提交
    session.add(db_need)
    await session.commit()
    await session.refresh(db_need)
    
    # 記錄活動日誌
    await create_activity_log(
        session=session,
        user_id=school_id,
        activity_type=ActivityType.need_created,
        description=f"建立了新需求：{db_need.title}",
        extra_data=f'{{"need_id": "{db_need.id}"}}'
    )
    
    return db_need


async def get_need_by_id(session: AsyncSession, need_id: uuid.UUID) -> Optional[Need]:
    """根據 ID 獲取需求"""
    result = await session.execute(select(Need).where(Need.id == need_id))
    return result.scalar_one_or_none()


async def get_needs_by_school(session: AsyncSession, school_id: uuid.UUID, skip: int = 0, limit: int = 100) -> List[Need]:
    """獲取特定學校的所有需求"""
    result = await session.execute(
        select(Need)
        .where(Need.school_id == school_id)
        .offset(skip)
        .limit(limit)
        .order_by(Need.created_at.desc())
    )
    return result.scalars().all()


async def get_all_needs(session: AsyncSession, skip: int = 0, limit: int = 100) -> List[Need]:
    """獲取所有需求"""
    result = await session.execute(
        select(Need)
        .offset(skip)
        .limit(limit)
        .order_by(Need.created_at.desc())
    )
    return result.scalars().all()


async def update_need(session: AsyncSession, db_need: Need, need_in: NeedUpdate) -> Need:
    """更新需求"""
    # 遍歷 need_in 中的欄位，如果值不是 None，則更新 db_need 物件
    update_data = need_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_need, field, value)
    
    # 提交變更到資料庫
    await session.commit()
    await session.refresh(db_need)
    return db_need


async def delete_need(session: AsyncSession, db_need: Need) -> None:
    """刪除需求"""
    await session.delete(db_need)
    await session.commit()
