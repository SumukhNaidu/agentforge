from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.model import (
    ModelResponse,
    ChangeModelRequest,
)

from app.services.ollama.service import model_service
from app.services.settings.service import settings_service

router = APIRouter(
    prefix="/api/v1/models",
    tags=["Models"],
)


@router.get("/", response_model=List[ModelResponse])
def get_models():
    return model_service.get_models()


@router.get("/current")
def get_current_model(
    db: Session = Depends(get_db),
):
    settings = settings_service.get_settings(db)

    return {
        "active_model": settings.active_model
    }


@router.put("/current")
def change_current_model(
    request: ChangeModelRequest,
    db: Session = Depends(get_db),
):
    settings = settings_service.set_active_model(
        db,
        request.active_model,
    )

    return {
        "active_model": settings.active_model
    }