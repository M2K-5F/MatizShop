from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from restapi.controllers.auth import auth_router

app = FastAPI()
app.include_router(auth_router)
app.add_middleware(
        CORSMiddleware,
        allow_origins=['127.0.0.1:8000'],
        allow_credentials=True, 
        allow_methods=["*"],
        allow_headers=["*"],
    )
if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', reload=True)