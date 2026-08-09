from fastapi import FastAPI


import app.database.models

from fastapi.middleware.cors import CORSMiddleware
from app.api.health import router as health_router
from app.core.config import settings
from app.database.base import Base
from app.database.session import engine
from app.api.models import router as models_router
from app.api.settings import router as settings_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(models_router)
app.include_router(settings_router)


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME}"
    }