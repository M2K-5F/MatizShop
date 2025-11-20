import asyncio
from contextlib import asynccontextmanager, contextmanager
import selectors
from containers.di import di_container
from fastapi import Depends, HTTPException, Request, status
from core.modules.auth.entities.user import User


@asynccontextmanager
async def atomic_transaction():
    async with di_container.get_atomic_transaction():
        yield


async def with_transaction():
    async with atomic_transaction():
        yield


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


async def get_jwt_tokenizer():
    return di_container.get_jwt_tokenizer()


async def get_pwd_hasher():
    return di_container.get_hasher()