from typing import Any, Awaitable, Callable
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response

from core.modules.auth.services.auth import AuthService
from restapi.config.path import PUBLIC_PATHS
from restapi.token.tokenizer import JWTTokenizer

class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(
        self, 
        app,
        auth_service: AuthService,
        tokenizer: JWTTokenizer
    ):
        super().__init__(app)
        self.auth_service = auth_service
        self.tokenizer = tokenizer


    async def dispatch(self, request: Request, call_next: Callable[[Request], Awaitable[Response]]) -> Response:
        if any(request.url.path.startswith(path) for path in PUBLIC_PATHS):
            return await call_next(request)


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
            payload = self.tokenizer.decode(token=token)
        except:
            return credentials_exception

        user_id: int = payload.get("sub")
        if user_id is None:
            return credentials_exception
        
        current_user = self.auth_service.get_user_by_id(user_id)
        if current_user is None:
            return credentials_exception

        request.state.user = current_user
        request.state.payload = payload

        return await call_next(request)

def add_middleware(app: FastAPI, auth_service: AuthService, tokenizer: JWTTokenizer):
    app.add_middleware(AuthMiddleware, auth_service=auth_service, tokenizer=tokenizer)
