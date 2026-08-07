# API Design

## Base URL

/api/v1

---

# Health

GET /health

Response

{
  "status": "healthy"
}

---

# Models

GET /models

Returns installed models.

POST /models/select

Select active model.

Body

{
  "model": "qwen3:4b"
}

---

# Chat

POST /chat

Body

{
  "conversation_id": 1,
  "message": "Explain Transformers"
}

---

GET /chat/{conversation_id}

Returns conversation history.

---

# Conversations

GET /conversations

POST /conversations

DELETE /conversations/{id}

---

# Documents

POST /documents/upload

GET /documents

DELETE /documents/{id}

---

# RAG

POST /rag/query

Body

{
  "question":"What is LangGraph?",
  "document_id":2
}

---

# Prompt Playground

POST /playground/run

Body

{
  "prompt":"Explain RAG",
  "models":[
      "qwen3:4b",
      "gemma3:4b"
  ]
}

---

# Evaluation

GET /evaluations

POST /evaluations

---

# Settings

GET /settings

PUT /settings