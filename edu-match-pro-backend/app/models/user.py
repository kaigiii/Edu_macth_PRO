from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from enum import Enum
from app.models.base import BaseModel


class UserRole(str, Enum):
    SCHOOL = "school"
    COMPANY = "company"


class User(BaseModel, table=True):
    __tablename__ = "user"
    
    email: str = Field(unique=True, index=True)
    password: str  # 儲存雜湊後的密碼
    role: str
    
    # 一對一關聯到 Profile
    profile: Optional["Profile"] = Relationship(back_populates="user")
    
    # 一對多關聯到 Need (如果是學校)
    needs: List["Need"] = Relationship(back_populates="school")
    
    # 一對多關聯到 Donation (如果是企業)
    donations: List["Donation"] = Relationship(back_populates="company")
