from typing import List
from uuid import UUID
from app.models.user import User
from app.models.todo import Todo
from app.schemas.todo import TodoCreate, TodoUpdate


class TodoService:
    @staticmethod
    async def list_user_todos(user: User) -> List[Todo]:
        todos = await Todo.find(Todo.owner.id == user.id).to_list()
        return todos

    @staticmethod
    async def create_todo(data: TodoCreate, user: User) -> Todo:
        todo = Todo(**data.dict(), owner=user)
        return await todo.insert()

    @staticmethod
    async def get_todo_by_id(todo_id: UUID, user: User) -> Todo:
        todo = await Todo.find_one(Todo.owner.id == user.id, Todo.todo_id == todo_id)
        return todo

    @staticmethod
    async def update_todo(todo_id: UUID, user: User, data: TodoUpdate) -> Todo:
        todo = await TodoService.get_todo_by_id(todo_id, user)
        await todo.update({'$set': data.dict(exclude_unset=True)})
        await todo.save()
        return todo

    @staticmethod
    async def delete_todo(todo_id: UUID, user: User):
        todo = await TodoService.get_todo_by_id(todo_id, user)
        if todo:
            await todo.delete()

        return None
