# Architecture

## High-Level Architecture

```
                        +----------------------+
                        |     React Client     |
                        |----------------------|
                        | Dashboard            |
                        | Chat Playground      |
                        | RAG Studio           |
                        | Model Manager        |
                        | Agent Builder        |
                        | Evaluation           |
                        +----------+-----------+
                                   |
                          REST API / WebSocket
                                   |
                    +--------------v--------------+
                    |         FastAPI API         |
                    +--------------+--------------+
                                   |
             +---------------------+----------------------+
             |                     |                      |
             |                     |                      |
      LLM Service            RAG Service          Agent Service
             |                     |                      |
             |                     |                      |
       Ollama Runtime         Embedding Model       LangGraph
             |                     |                      |
      Qwen / Gemma           Qdrant Vector DB      Tool Calling
             |
             |
      Local Open Source Models

```

---

## Frontend

Technology

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router
- Zustand
- TanStack Query

Responsibilities

- Dashboard
- Chat
- RAG Interface
- Agent Builder
- Prompt Playground
- Evaluation Dashboard

---

## Backend

Technology

- FastAPI
- LangGraph
- SQLAlchemy
- Alembic

Responsibilities

- API Layer
- Authentication
- Session Management
- AI Orchestration
- Database Operations

---

## AI Layer

Runtime

- Ollama

Models

- Qwen3
- Gemma
- Phi
- Llama

Responsibilities

- Inference
- Streaming
- Tool Calling
- Prompt Execution

---

## Retrieval Layer

Embedding Model

- BAAI/bge-small-en-v1.5

Vector Database

- Qdrant

Responsibilities

- Chunking
- Embeddings
- Similarity Search

---

## Storage Layer

SQLite

Stores

- Chats
- Sessions
- Settings
- Prompt History

Qdrant

Stores

- Document Embeddings
- Memory Embeddings

Uploads

Stores

- PDFs
- DOCX
- TXT

---

## Design Principles

- Local First
- Modular
- Plugin Based
- Production Ready
- Extensible