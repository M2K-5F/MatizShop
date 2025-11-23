import asyncio
from contextlib import asynccontextmanager
import selectors
from fastapi import APIRouter, FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from infrastructure.common.database.postgres_database import Database
from restapi.config.path import ALLOWED_ORIGINS, API_PREFIX
from restapi.middlewares.auth import add_middleware
from restapi.middlewares.refresh_cookie import add_refresh_middleware
from restapi.modules.auth.controllers import auth_router
from restapi.modules.flight.controllers import flight_router
from restapi.modules.admin.controllers import admin_router
from containers import di


@asynccontextmanager
async def lifespan(app: FastAPI):
    database = Database(
        name='postgres',
        host='env',
        port='env',
        user='env',
        password='env'
    )
    await database.database_init()
    container = di.DIContainer(database)
    app.state.container = container
    print("WORKER STARTED!")
    
    yield
    app.state.container = None
    await database.engine.dispose(True)


app = FastAPI(lifespan=lifespan)

app_router = APIRouter(prefix=API_PREFIX)
app_router.include_router(auth_router)
app_router.include_router(flight_router)
app_router.include_router(admin_router)
app.include_router(app_router)

add_refresh_middleware(app)
add_middleware(app)
app.add_middleware(
        CORSMiddleware,
        allow_origins=ALLOWED_ORIGINS,
        allow_credentials=True, 
        allow_methods=["*"],
        allow_headers=["*"],
    )

# app.add_middleware(GZipMiddleware, minimum_size = 1000)


@app.exception_handler(RequestValidationError)
async def request_validation_exception_handler(request: Request, exc: ValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "type": "validation_error",
            "detail": (', ').join(exc.errors()[0]["msg"].split(', ')[1:])
        }
    )


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
