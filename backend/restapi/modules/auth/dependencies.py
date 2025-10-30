from fastapi import Depends, HTTPException, Request, status

from core.modules.auth.entities.user import User


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