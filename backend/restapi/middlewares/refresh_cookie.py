from starlette.middleware.base import BaseHTTPMiddleware, DispatchFunction, RequestResponseEndpoint
from fastapi import FastAPI, Request, Response
from datetime import datetime, timedelta, timezone

from containers.di import DIContainer
from restapi.token.tokenizer import JWTTokenizer


class CookieRefreshMiddleware(BaseHTTPMiddleware):
    """Middelawe which verify token payload & returns new token with refresed expires time"""

    def __init__(self, app) -> None:
        super().__init__(app)

    async def dispatch(self, request: Request, call_next) -> Response:
        if not hasattr(request.state, 'payload'):
            return await call_next(request)
        
        container: DIContainer = request.app.state.container
        tokenizer = container.get_jwt_tokenizer()
        config = tokenizer._jwt_config

            
        now = datetime.now(timezone.utc)
        payload = request.state.payload
        exp = datetime.fromtimestamp(payload.get('exp'), tz=timezone.utc)
        iat = datetime.fromtimestamp(payload.get('iat'), tz=timezone.utc)
        is_remember = True if exp - iat == config.remembered_token_exire else False

        response = await call_next(request)

        if now + config.token_refresh_delta > exp:
            exp = now + (config.remembered_token_exire if is_remember else config.not_remembered_token_expire)
            jwt_payload = {
                "sub": payload.get('sub'),
                'exp': exp,
                "iat": now
            }
            token = tokenizer.encode(jwt_payload)
            response.set_cookie(
                key='access_token',
                value=str(token),
                path="/",
                httponly=True,
                expires=exp
            )

        return response


def add_refresh_middleware(app: FastAPI):
    app.add_middleware(CookieRefreshMiddleware)