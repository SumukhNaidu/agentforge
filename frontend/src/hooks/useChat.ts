import { useMutation } from "@tanstack/react-query";

import {
  chatService,
  type ChatMessage,
} from "@/services/chat.service";

interface StreamChatInput {
  conversationId: number;
  messages: ChatMessage[];
  onChunk: (chunk: string) => void;
}

export function useChat() {
  return useMutation({
    mutationFn: async ({
      conversationId,
      messages,
      onChunk,
    }: StreamChatInput) => {
      await chatService.streamMessage(
        conversationId,
        messages,
        onChunk
      );
    },
  });
}