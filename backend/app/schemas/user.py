from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field


class UserAuth(BaseModel):
    email: EmailStr = Field(..., description='User Email')
    username: str = Field(min_length=5, max_length=50,
                          description='User Username')
    password: str = Field(min_length=8, max_length=50,
                          description='User password')


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class UserResponse(BaseModel):
    user_id: UUID
    username: str
    email: EmailStr
    first_name: Optional[str]
    last_name: Optional[str]
    disabled: Optional[bool] = False
