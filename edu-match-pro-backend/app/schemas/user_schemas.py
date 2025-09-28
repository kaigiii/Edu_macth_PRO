from sqlmodel import SQLModel
from pydantic import EmailStr
from datetime import datetime
from typing import Optional
import uuid


class UserCreate(SQLModel):
    """使用者註冊 Schema"""
    email: EmailStr
    password: str
    role: str


class UserPublic(SQLModel):
    """公開使用者資訊 Schema (不包含密碼)"""
    id: uuid.UUID
    email: EmailStr
    role: str
    created_at: datetime
    
    class Config:
        from_attributes = True
