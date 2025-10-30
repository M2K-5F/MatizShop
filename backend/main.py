from re import A
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from containers import di
from restapi.middlewares.auth import add_middleware
from restapi.middlewares.refresh_cookie import add_refresh_middleware
from restapi.modules.auth.controllers import auth_router
from restapi.modules.flight.controllers import flight_router
from containers.di import di_container

app = FastAPI()
app.include_router(auth_router)
app.include_router(flight_router)

app.add_middleware(
        CORSMiddleware,
        allow_origins=['127.0.0.1:8000'],
        allow_credentials=True, 
        allow_methods=["*"],
        allow_headers=["*"],
    )
add_middleware(app, di_container.get_auth_service(), di_container.get_jwt_tokenizer())
add_refresh_middleware(app, di_container.get_jwt_tokenizer())


@app.exception_handler(ValueError)
async def value_error_exception_handler(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "detail": str(exc),
            "type": "value_error"
        }
    )

@app.exception_handler(AttributeError)
async def attrubute_exception_handler(request: Request, exc: AttributeError):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": str(exc),
            "type": "attribute_error"
        }
    )

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', reload=True)