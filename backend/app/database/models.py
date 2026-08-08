from sqlalchemy import Boolean, Float, Integer, String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.database.base import Base


class Settings(Base):
    __tablename__ = "settings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    active_model: Mapped[str] = mapped_column(
        String,
        default="qwen3:4b",
    )

    temperature: Mapped[float] = mapped_column(
        Float,
        default=0.7,
    )

    top_p: Mapped[float] = mapped_column(
        Float,
        default=0.9,
    )

    max_tokens: Mapped[int] = mapped_column(
        Integer,
        default=2048,
    )

    dark_mode: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )