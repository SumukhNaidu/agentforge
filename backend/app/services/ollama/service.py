from app.core.config import settings
from app.services.ollama.client import ollama_client
from app.utils.formatter import format_size


class ModelService:

    @staticmethod
    def get_models():
        response = ollama_client.list_models()

        models = []

        for model in response.models:
            models.append(
                {
                    "name": model.model,
                    "size": format_size(model.size),
                    "family": model.details.family,
                    "parameters": model.details.parameter_size,
                    "quantization": model.details.quantization_level,
                    "modified_at": model.modified_at.isoformat(),
                }
            )

        return models

    @staticmethod
    def get_model(model_name: str):
        return ollama_client.show_model(model_name)

    @staticmethod
    def get_status():
        try:
            response = ollama_client.list_models()

            return {
                "running": True,
                "host": settings.OLLAMA_HOST,
                "model_count": len(response.models),
            }

        except Exception:
            return {
                "running": False,
                "host": settings.OLLAMA_HOST,
                "model_count": 0,
            }


model_service = ModelService()