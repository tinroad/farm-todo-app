from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.user import UserAuth, UserResponse, UserUpdate
from app.services.user import UserService
from pymongo.errors import DuplicateKeyError
from app.api.deps.user import get_current_user
from app.models.user import User

user_router = APIRouter()


@user_router.post('/user', response_model=UserResponse, summary='Create new user')
async def create_user(data: UserAuth):
    try:
        return await UserService.create_user(data)
    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='User with this username or email already exist'
        )


@user_router.get('/user', response_model=UserResponse, summary='Get current user')
async def get_user(user: User = Depends(get_current_user)):
    return user


@user_router.put('/user', response_model=UserResponse, summary='Update a user')
async def update_user(data: UserUpdate, user: User = Depends(get_current_user)):
    return await UserService.update_user(user, data)
