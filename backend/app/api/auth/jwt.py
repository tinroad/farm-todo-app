from datetime import datetime
from pydoc import describe
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import ValidationError
from app.services.user import UserService
from app.core.security import create_access_token, create_refresh_token
from app.core.config import settings
from app.schemas.auth import TokenPayload, TokenSchema
from app.schemas.user import UserResponse
from app.models.user import User
from app.api.deps.user import get_current_user
from jose import jwt, JWTError

auth_router = APIRouter()


@auth_router.post('/login', summary='Create access and refresh token for user', response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    user = await UserService.authenticate(email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Incorrect email or password'
        )

    # create access and refresh token
    return {
        'access_token': create_access_token(user.user_id),
        'refresh_token': create_refresh_token(user.user_id),
    }


@auth_router.post('/test-token', summary='Check if access token is valid', response_model=UserResponse)
async def check_access_token(user: User = Depends(get_current_user)):
    return user


@auth_router.post('/refresh', summary='Refresh token', response_model=TokenSchema)
async def refresh_token(refresh_token: str = Body(...)):
    try:
        payload = jwt.decode(
            refresh_token,
            settings.JWT_REFRESH_SECRET_KEY,
            algorithms=settings.JWT_ALGORITHM
        )
        token_data = TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Could not validate credentials',
            headers={'WWW-Authenticate': 'Bearer'}
        )

    user = await UserService.get_user_by_id(token_data.sub)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Could not find user',
        )

    return {
        'access_token': create_access_token(user.user_id),
        'refresh_token': create_refresh_token(user.user_id),
    }
