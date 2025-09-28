import uuid
from typing import Optional
from sqlmodel import SQLModel


class ProfilePublic(SQLModel):
    """用於回傳企業公開資料的 Schema"""
    id: uuid.UUID
    organization_name: str
    contact_person: str
    position: str
    phone: str
    address: str
    tax_id: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
