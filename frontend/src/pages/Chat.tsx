import { useState } from "react";
import {
    Button,
    Card,
    Group,
    ScrollArea,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";

import { useChat } from "@/hooks/useChat";

export default function Chat() {
    const [message, setMessage] = useState("");

    const chatMutation = useChat();

    const handleSend = () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage || chatMutation.isPending) {
            return;
        }

        chatMutation.mutate(trimmedMessage);
        setMessage("");
    };

    return (
        <Stack h="100%" gap="md">
            <Group justify="space-between">
                <Title order={2}>Chat</Title>

                {chatMutation.data && (
                    <Text c="dimmed" size="sm">
                        Model: {chatMutation.data.model}
                    </Text>
                )}
            </Group>

            <Card
                withBorder
                radius="md"
                style={{
                    flex: 1,
                    minHeight: 400,
                }}
            >
                <ScrollArea h="100%">
                    <Stack gap="md">
                        {chatMutation.data ? (
                            <>
                                <Card withBorder>
                                    <Text fw={600} mb="xs">
                                        You
                                    </Text>

                                    <Text>{chatMutation.variables}</Text>
                                </Card>

                                <Card withBorder>
                                    <Text fw={600} mb="xs">
                                        AgentForge
                                    </Text>

                                    <Text>
                                        {chatMutation.data.response}
                                    </Text>
                                </Card>
                            </>
                        ) : (
                            <Text c="dimmed" ta="center">
                                Start a conversation with your selected model.
                            </Text>
                        )}

                        {chatMutation.isPending && (
                            <Text c="dimmed">
                                Thinking...
                            </Text>
                        )}

                        {chatMutation.isError && (
                            <Text c="red">
                                Failed to get a response. Make sure Ollama and the
                                backend are running.
                            </Text>
                        )}
                    </Stack>
                </ScrollArea>
            </Card>

            <Group align="flex-end">
                <TextInput
                    style={{ flex: 1 }}
                    placeholder="Type your message..."
                    value={message}
                    onChange={(event) =>
                        setMessage(event.currentTarget.value)
                    }
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSend();
                        }
                    }}
                />

                <Button
                    onClick={handleSend}
                    loading={chatMutation.isPending}
                    disabled={!message.trim()}
                >
                    Send
                </Button>
            </Group>
        </Stack>
    );
}