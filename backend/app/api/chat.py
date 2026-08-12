from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat.service import chat_service


router = APIRouter(
    prefix="/api/v1/chat",
    tags=["Chat"],
)


@router.post("/", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
):
    return chat_service.chat(
        db,
        [
            {
                "role": message.role,
                "content": message.content,
            }
            for message in request.messages
        ],
    )