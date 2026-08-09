from pydantic import BaseModel


class ModelResponse(BaseModel):
    name: str
    size: str
    family: str
    parameters: str
    quantization: str
    modified_at: str


class ChangeModelRequest(BaseModel):
    active_model: str