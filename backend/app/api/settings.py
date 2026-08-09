from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.settings import (
    SettingsResponse,
    UpdateModelRequest,
)

from app.services.settings.service import settings_service

router = APIRouter(
    prefix="/api/v1/settings",
    tags=["Settings"],
)


@router.get("/", response_model=SettingsResponse)
def get_settings(
    db: Session = Depends(get_db),
):
    return settings_service.get_settings(db)


@router.post("/model", response_model=SettingsResponse)
def update_model(
    request: UpdateModelRequest,
    db: Session = Depends(get_db),
):
    return settings_service.set_active_model(
        db,
        request.model,
    )