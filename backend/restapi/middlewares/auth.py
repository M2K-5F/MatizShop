from typing import Any, Awaitable, Callable
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response

from containers.di import DIContainer
from core.modules.auth.entities.user import User
from infrastructure.common.redis.redis_database import RedisDatabase
from restapi.config.path import PUBLIC_PATHS

class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next: Callable[[Request], Awaitable[Response]]) -> Response:
        if any(request.url.path.startswith(path) for path in PUBLIC_PATHS):
            return await call_next(request)
        
        container: DIContainer = request.app.state.container
        
        cookie_key = 'access_token'
        token = request.cookies.get(cookie_key)

        credentials_exception = JSONResponse(
            status_code=status.HTTP_403_FORBIDDEN,
            content={'detail': "Could not validate credentials"}
        )

        unauthorized_exception = JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={'detail': 'Not authenticated'}
        )

        if not token:
            return unauthorized_exception
        
        try:
            tokenizer = container.get_jwt_tokenizer()
            payload = tokenizer.decode(token=token)
        except:
            return credentials_exception

        user_id: int = payload.get("sub")
        if user_id is None:
            return credentials_exception
        
        redis: RedisDatabase = request.app.state.redis
        redis_user = await redis.get_entity(user_id, User)
        if redis_user:
            current_user = redis_user
            print("from redis")
        else:
            async with container._database.atomic() as session:
                try:
                    auth_service = container.get_auth_service(session, request.app.state.redis)
                    current_user = await auth_service.get_user_by_id(user_id)

                    if current_user is None:
                        await session.rollback()
                        return credentials_exception
                    
                except Exception as e:
                    await session.rollback()
                    return credentials_exception

        request.state.user = current_user
        request.state.payload = payload

        response = await call_next(request)
        
        return response

def add_middleware(app: FastAPI):
    app.add_middleware(AuthMiddleware)