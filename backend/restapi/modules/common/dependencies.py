import asyncio
from contextlib import asynccontextmanager, contextmanager
from colorama import reinit
from fastapi import Depends, HTTPException, Request, status
from containers.di import DIContainer
from core.modules.auth.entities.user import User
from sqlalchemy.ext.asyncio import AsyncSession


async def get_di_container(request: Request):
    container: DIContainer = request.app.state.container
    return container


async def  get_db_session(request: Request):
    container: DIContainer = request.app.state.container
    database = container._database
    
    async with database.atomic() as session:
        yield session


async def get_redis_client(request: Request):
    redis = request.app.state.redis
    return redis


async def get_user_from_request(request: Request) -> User:
    return request.state.user


async def is_customer(user: User = Depends(get_user_from_request)):
    if "CUSTOMER" not in user.roles:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return


async def is_admin(user: User = Depends(get_user_from_request)):
    if "ADMIN" not in user.roles:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return


async def get_jwt_tokenizer(container: DIContainer = Depends(get_di_container)):
    return container.get_jwt_tokenizer()


async def get_pwd_hasher(container: DIContainer = Depends(get_di_container)):
    return container.get_hasher()