import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_session
from app.api.v1.dependencies import get_current_user
from app.models.user import User
from app.schemas.story_schemas import ImpactStoryPublic
from app.models.impact_story import ImpactStory
from sqlalchemy import select
from sqlalchemy.orm import selectinload

router = APIRouter(prefix="/stories", tags=["Stories"])


@router.get("/", response_model=List[ImpactStoryPublic])
async def get_all_stories(
    session: AsyncSession = Depends(get_session),
    skip: int = 0,
    limit: int = 20
):
    """取得所有影響力故事（公開）"""
    result = await session.execute(
        select(ImpactStory)
        .options(selectinload(ImpactStory.donation))
        .offset(skip)
        .limit(limit)
        .order_by(ImpactStory.created_at.desc())
    )
    stories = result.scalars().all()
    
    return [
        ImpactStoryPublic(
            id=story.id,
            donation_id=story.donation_id,
            title=story.title,
            content=story.content,
            image_url=story.image_url,
            video_url=story.video_url,
            impact_metrics=story.impact_metrics,
            created_at=story.created_at,
            updated_at=story.updated_at,
            donation=story.donation
        )
        for story in stories
    ]


@router.get("/{story_id}", response_model=ImpactStoryPublic)
async def get_story_by_id(
    story_id: uuid.UUID,
    session: AsyncSession = Depends(get_session)
):
    """取得單一影響力故事"""
    result = await session.execute(
        select(ImpactStory)
        .where(ImpactStory.id == story_id)
        .options(selectinload(ImpactStory.donation))
    )
    story = result.scalar_one_or_none()
    
    if not story:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Story not found"
        )
    
    return ImpactStoryPublic(
        id=story.id,
        donation_id=story.donation_id,
        title=story.title,
        content=story.content,
        image_url=story.image_url,
        video_url=story.video_url,
        impact_metrics=story.impact_metrics,
        created_at=story.created_at,
        updated_at=story.updated_at,
        donation=story.donation
    )
