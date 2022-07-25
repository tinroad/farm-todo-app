from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field


class TodoCreate(BaseModel):
    title: str = Field(..., title='Title', max_length=55, min_length=1)
    description: str = Field(..., title='Description',
                             max_length=1024, min_length=1)
    status: Optional[bool] = False


class TodoUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[bool]


class TodoResponse(BaseModel):
    todo_id: UUID
    status: bool
    title: str
    description: str
    created_at: datetime
    updated_at: datetime
