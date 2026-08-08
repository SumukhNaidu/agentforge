from fastapi import FastAPI

from app.api.health import router as health_router
from app.core.config import settings
from app.database.base import Base
from app.database.session import engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.include_router(health_router)


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME}"
    }