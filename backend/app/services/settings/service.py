from sqlalchemy.orm import Session

from app.database.models import Settings


class SettingsService:

    @staticmethod
    def get_settings(db: Session):
        settings = db.query(Settings).first()

        if settings is None:
            settings = Settings()

            db.add(settings)
            db.commit()
            db.refresh(settings)

        return settings

    @staticmethod
    def set_active_model(
        db: Session,
        model_name: str,
    ):
        settings = SettingsService.get_settings(db)

        settings.active_model = model_name

        db.commit()
        db.refresh(settings)

        return settings


settings_service = SettingsService()