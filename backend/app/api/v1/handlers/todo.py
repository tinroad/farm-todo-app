from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, FastAPI

from app.schemas.todo import TodoCreate, TodoResponse, TodoUpdate
from app.models.user import User
from app.models.todo import Todo
from app.api.deps.user import get_current_user
from app.services.todo import TodoService

todo_router = APIRouter()


@todo_router.get('/', summary='Get all todos of the user', response_model=List[TodoResponse])
async def list_todos(current_user: User = Depends(get_current_user)):
    return await TodoService.list_user_todos(current_user)


@todo_router.post('/', summary='Create a todo for current user', response_model=TodoResponse)
async def create_todo(data: TodoCreate, current_user: User = Depends(get_current_user)):
    return await TodoService.create_todo(data, current_user)


@todo_router.get('/{todo_id}', summary='Get a todo by ID', response_model=TodoResponse)
async def get_todo(todo_id: UUID, current_user: User = Depends(get_current_user)):
    return await TodoService.get_todo_by_id(todo_id, current_user)


@todo_router.put('/{todo_id}', summary='Update a todo by ID', response_model=TodoResponse)
async def update_todo(data: TodoUpdate, todo_id: UUID, current_user: User = Depends(get_current_user)):
    return await TodoService.update_todo(todo_id, current_user, data)


@todo_router.delete('/{todo_id}', summary='Delete a todo by ID')
async def delete_todo(todo_id: UUID, current_user: User = Depends(get_current_user)):
    return await TodoService.delete_todo(todo_id, current_user)
