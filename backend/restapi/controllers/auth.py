from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Body, Cookie, Depends
from fastapi.responses import JSONResponse

from core.modules.auth.interfaces.password_hasher import PasswordHasher
from restapi.models.auth import AuthUser
from core.modules.auth.services.auth import AuthService
from containers.di import di_container
from restapi.token.tokenizer import JWTTokenizer

auth_router = APIRouter(prefix='/auth', tags=['auth'])

@auth_router.post('/users/login')
async def login(
    login_user: AuthUser = Body(),
    service: AuthService = Depends(di_container.get_auth_service),
    tokenizer: JWTTokenizer = Depends(di_container.get_jwt_tokenizer),
):
    if service.verify_password(login_user.phone_number, login_user.password):
        current_user = service.get_user(login_user.phone_number)
        expires_delta = timedelta(days=30) if login_user.is_remember else timedelta(minutes=15)
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
    

@auth_router.get('/users/me')
async def users_me(
    access_token = Cookie(),
    service: AuthService = Depends(di_container.get_auth_service),
    tokenizer: JWTTokenizer = Depends(di_container.get_jwt_tokenizer),
    hasher: PasswordHasher = Depends(di_container.get_hasher)
):
    payload = tokenizer.decode(access_token)
    user_id = payload.get('sub')
    current_user = service.get_user_by_id(user_id)
    return JSONResponse(current_user.to_dict())


@auth_router.post('/users/register')
async def register(
    
)
 

