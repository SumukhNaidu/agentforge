# Database Design

## Database

PostgreSQL

---

# Tables

## conversations

Stores chat sessions.

Fields

- id
- title
- created_at
- updated_at

---

## messages

Stores conversation messages.

Fields

- id
- conversation_id
- role
- content
- model
- tokens
- latency
- created_at

Relationship

Conversation

↓

Messages

---

## models

Stores installed models.

Fields

- id
- name
- provider
- parameters
- quantization
- context_window
- active
- installed_at

---

## documents

Stores uploaded files.

Fields

- id
- filename
- filetype
- filepath
- uploaded_at

---

## chunks

Stores document chunks.

Fields

- id
- document_id
- chunk_index
- content
- embedding_id

---

## experiments

Stores prompt experiments.

Fields

- id
- title
- prompt
- created_at

---

## evaluations

Stores benchmark results.

Fields

- id
- experiment_id
- model
- latency
- cpu_usage
- ram_usage
- tokens_per_second
- score

---

## workflows

Stores agent workflows.

Fields

- id
- name
- graph
- created_at

---

## settings

Stores application settings.

Fields

- id
- active_model
- temperature
- top_p
- max_tokens