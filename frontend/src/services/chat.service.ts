import { api } from "./api";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Conversation {
  id: number;
  title: string;
  created_at: string;
}

export interface ConversationDetail extends Conversation {
  messages: ChatMessage[];
}

class ChatService {

  // --------------------------------------------------
  // CONVERSATIONS
  // --------------------------------------------------

  async createConversation(): Promise<Conversation> {
    const response = await api.post<Conversation>(
      "/conversations/"
    );

    return response.data;
  }

  async getConversations(): Promise<Conversation[]> {
    const response = await api.get<Conversation[]>(
      "/conversations/"
    );

    return response.data;
  }

  async getConversation(
    conversationId: number
  ): Promise<ConversationDetail> {
    const response = await api.get<ConversationDetail>(
      `/conversations/${conversationId}`
    );

    return response.data;
  }

  async deleteConversation(
    conversationId: number
  ): Promise<void> {
    await api.delete(
      `/conversations/${conversationId}`
    );
  }

  // --------------------------------------------------
  // STREAM CHAT
  // --------------------------------------------------

  async streamMessage(
    conversationId: number,
    messages: ChatMessage[],
    onChunk: (chunk: string) => void,
    signal?: AbortSignal
  ): Promise<void> {

    await this.streamRequest(
      "/chat/stream",
      conversationId,
      messages,
      onChunk,
      signal
    );
  }

  // --------------------------------------------------
  // REGENERATE
  // --------------------------------------------------

  async regenerateMessage(
    conversationId: number,
    messages: ChatMessage[],
    onChunk: (chunk: string) => void,
    signal?: AbortSignal
  ): Promise<void> {

    await this.streamRequest(
      "/chat/regenerate",
      conversationId,
      messages,
      onChunk,
      signal
    );
  }

  // --------------------------------------------------
  // COMMON STREAM HANDLER
  // --------------------------------------------------

  private async streamRequest(
    endpoint: string,
    conversationId: number,
    messages: ChatMessage[],
    onChunk: (chunk: string) => void,
    signal?: AbortSignal
  ): Promise<void> {

    const response = await fetch(
      `http://127.0.0.1:8001/api/v1${endpoint}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          conversation_id: conversationId,
          messages,
        }),

        signal,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Chat request failed: ${response.status}`
      );
    }

    if (!response.body) {
      throw new Error(
        "Streaming is not supported."
      );
    }

    const reader =
      response.body.getReader();

    const decoder =
      new TextDecoder();

    try {

      while (true) {

        const {
          done,
          value,
        } = await reader.read();

        if (done) {
          break;
        }

        const chunk =
          decoder.decode(
            value,
            {
              stream: true,
            }
          );

        if (chunk) {
          onChunk(chunk);
        }
      }

    } finally {

      reader.releaseLock();

    }
  }
}

export const chatService =
  new ChatService();