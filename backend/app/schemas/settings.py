from pydantic import BaseModel


class SettingsResponse(BaseModel):
    active_model: str
    temperature: float
    top_p: float
    max_tokens: int
    dark_mode: bool

    class Config:
        from_attributes = True


class UpdateModelRequest(BaseModel):
    model: str