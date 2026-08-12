from ollama import Client

from app.core.config import settings


class OllamaClient:

    def __init__(self):
        self.client = Client(
            host=settings.OLLAMA_HOST
        )

    def list_models(self):
        return self.client.list()

    def show_model(self, model_name: str):
        return self.client.show(model_name)

    def chat(self, model: str, message: str):
        return self.client.chat(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": message,
                }
            ],
        )


ollama_client = OllamaClient()