# System Design

## Overview

AgentForge follows a modular service-oriented architecture.

Every user request flows through the API layer before being routed to the appropriate AI service.

---

# Request Flow

User

↓

Frontend (React)

↓

FastAPI

↓

Business Service

↓

LLM / RAG / Agent

↓

Response

↓

Database

↓

Frontend

---

# Chat Flow

User

↓

Chat Page

↓

FastAPI

↓

Chat Service

↓

Prompt Builder

↓

Ollama

↓

Response

↓

Conversation Saved

↓

Frontend

---

# RAG Flow

Upload Document

↓

Parser

↓

Chunking

↓

Embedding Model

↓

Qdrant

--------------------------------

User Question

↓

Embedding Model

↓

Similarity Search

↓

Top Chunks

↓

Prompt Builder

↓

Ollama

↓

Answer

---

# Prompt Playground

Prompt

↓

Selected Models

↓

Parallel Execution

↓

Collect Responses

↓

Latency

↓

Display Comparison

---

# Tool Calling

Prompt

↓

LLM

↓

Need Tool?

↓

YES

↓

Tool Dispatcher

↓

Python

Calculator

Filesystem

↓

Result

↓

LLM

↓

Final Response

---

# Agent Flow

Goal

↓

Planner

↓

Task List

↓

Executor

↓

Tool Calls

↓

Reflection

↓

Completed?

↓

No → Planner

↓

Yes

↓

Final Answer

---

# Evaluation Flow

Prompt

↓

Run Model

↓

Collect Metrics

↓

Latency

Tokens

Memory

CPU

↓

Store Results

↓

Dashboard

---

# Services

Frontend

↓

API Gateway

↓

Chat Service

RAG Service

Tool Service

Model Service

Evaluation Service

Agent Service

↓

Ollama

Qdrant

SQLite