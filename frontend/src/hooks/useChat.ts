import { useMutation } from "@tanstack/react-query";

import { chatService } from "@/services/chat.service";

export function useChat() {
  return useMutation({
    mutationFn: (message: string) =>
      chatService.sendMessage(message),
  });
}