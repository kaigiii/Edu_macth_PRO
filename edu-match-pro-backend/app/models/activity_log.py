import uuid
from sqlmodel import SQLModel, Field
from typing import Optional
from enum import Enum
from app.models.base import BaseModel


class ActivityType(str, Enum):
    USER_REGISTER = "user_register"
    USER_LOGIN = "user_login"
    NEED_CREATED = "need_created"
    NEED_UPDATED = "need_updated"
    DONATION_CREATED = "donation_created"
    DONATION_APPROVED = "donation_approved"
    DONATION_COMPLETED = "donation_completed"
    IMPACT_STORY_CREATED = "impact_story_created"


class ActivityLog(BaseModel, table=True):
    __tablename__ = "activity_log"
    
    user_id: uuid.UUID
    activity_type: ActivityType
    description: str
    extra_data: Optional[str] = Field(default=None)  # JSON 字串儲存額外資訊
