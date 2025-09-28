from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_session
from app.schemas.user_schemas import UserCreate, UserPublic
from app.schemas.token_schemas import Token
from app.crud.user_crud import get_user_by_email, create_user
from app.core.security import verify_password, create_access_token
from app.api.v1.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
async def register_user(
    user_in: UserCreate,
    session: AsyncSession = Depends(get_session)
):
    """使用者註冊端點"""
    # 檢查 email 是否已被註冊
    existing_user = await get_user_by_email(session, user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # 建立新使用者
    new_user = await create_user(session, user_in)
    
    # 回傳公開的使用者資訊 (不包含密碼)
    return UserPublic(
        id=new_user.id,
        email=new_user.email,
        role=new_user.role,
        created_at=new_user.created_at
    )


@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session)
):
    """使用者登入端點"""
    # 驗證使用者是否存在
    user = await get_user_by_email(session, form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 驗證密碼
    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 建立 JWT token
    access_token = create_access_token(data={"sub": user.email})
    
    return Token(access_token=access_token, token_type="bearer")


@router.get("/users/me", response_model=UserPublic)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """獲取當前登入使用者的資訊"""
    return UserPublic(
        id=current_user.id,
        email=current_user.email,
        role=current_user.role,
        created_at=current_user.created_at
    )
