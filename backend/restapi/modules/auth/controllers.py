from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Body, Cookie, Depends
from fastapi.responses import JSONResponse

from core.modules.auth.entities.user import User
from core.modules.auth.interfaces.password_hasher import PasswordHasher
from restapi.modules.auth.dependencies import get_auth_service
from restapi.modules.common.dependencies import get_jwt_tokenizer, get_user_from_request
from restapi.modules.auth.shemas import AuthUser, RegisterUser
from core.modules.auth.services.auth import AuthService
from restapi.token.tokenizer import JWTTokenizer

auth_router = APIRouter(prefix='/auth', tags=['auth'])

@auth_router.post('/login')
async def login(
    login_user: AuthUser = Body(),
    service: AuthService = Depends(get_auth_service),
    tokenizer: JWTTokenizer = Depends(get_jwt_tokenizer),
):
    try:
        is_password_verified = service.verify_password(login_user.phone_number, login_user.password)
    except:
        raise ValueError('uncorrect phone')
    if not is_password_verified:
        raise ValueError('uncorrect password')
    
    current_user = service.get_user(login_user.phone_number)
    expires_delta = timedelta(days=30) if login_user.remember else timedelta(minutes=15)
    now = datetime.now(timezone.utc)
    expires_at = now + expires_delta
    
    jwt_payload = {
        "sub": current_user.id,
        'exp': expires_at,
        "iat": now
    }

    response = JSONResponse(current_user.to_dict())

    response.set_cookie(
        key='access_token',
        value=tokenizer.encode(jwt_payload),
        path="/",
        httponly=True,
        max_age=int(expires_delta.total_seconds())
    )
    
    return response


@auth_router.get('/me')
async def users_me(
    current_user: User = Depends(get_user_from_request)
):
    return JSONResponse(current_user.to_dict())


@auth_router.post('/register')
async def register(
    register_user: RegisterUser = Body(),
    service: AuthService = Depends(get_auth_service)
):
    return service.register(
        register_user.phone_number,
        register_user.username,
        register_user.password,
        register_user.email_address
    ).to_dict()


@auth_router.delete('/logout')
async def logout():
    response = JSONResponse({
        "detail": "Successfull logout"
    })

    response.delete_cookie(
        'access_token',
        path='/',
        httponly=True
    )
    return response
