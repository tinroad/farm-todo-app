from typing import List
from pydantic import AnyHttpUrl, BaseSettings
from decouple import config


class Settings(BaseSettings):
    PROJECT_NAME: str = 'FASTAPI TODO'
    BACKEND_CORS_ORIGIN: List[AnyHttpUrl] = [
        'http://localhost:3000'
    ]
    API_V1_STR: str = '/api/v1'
    JWT_SECRET_KEY: str = config('JWT_SECRET_KEY', cast=str)
    JWT_REFRESH_SECRET_KEY: str = config('JWT_REFRESH_SECRET_KEY', cast=str)
    JWT_ALGORITHM = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 360
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

    # Database
    MONGO_CONNECTION_STRING: str = config('MONGO_CONNECTION_STRING', cast=str)

    class Config:
        case_sensitive = True


settings = Settings()
