from sqlalchemy.orm import Session

from app.services.ollama.client import ollama_client
from app.services.settings.service import settings_service


class ChatService:

    @staticmethod
    def chat(db: Session, messages: list[dict]):

        # Get the currently selected model
        settings = settings_service.get_settings(db)

        model = settings.active_model

        # Send the complete conversation to Ollama
        response = ollama_client.chat(
            model=model,
            messages=messages,
        )

        return {
            "response": response["message"]["content"],
            "model": model,
        }


chat_service = ChatService()