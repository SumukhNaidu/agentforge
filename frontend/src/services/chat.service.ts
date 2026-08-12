import { api } from "./api";

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
  model: string;
}

class ChatService {
  async sendMessage(message: string): Promise<ChatResponse> {
    const response = await api.post<ChatResponse>(
      "/chat/",
      {
        message,
      }
    );

    return response.data;
  }
}

export const chatService = new ChatService();