import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ActionIcon,
  Button,
  Card,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";

import ReactMarkdown from "react-markdown";

import {
  chatService,
  type ChatMessage,
  type Conversation,
} from "@/services/chat.service";


export default function Chat() {

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [conversationId, setConversationId] =
    useState<number | null>(null);

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const abortController =
    useRef<AbortController | null>(null);

  const bottomRef =
    useRef<HTMLDivElement | null>(null);


  // -----------------------------
  // AUTO SCROLL
  // -----------------------------

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  // -----------------------------
  // LOAD CONVERSATIONS
  // -----------------------------

  useEffect(() => {
    loadConversations();
  }, []);


  const loadConversations =
    async () => {

      try {

        const data =
          await chatService.getConversations();

        setConversations(data);

        if (data.length > 0) {

          await loadConversation(
            data[0].id
          );

        } else {

          await createConversation();

        }

      } catch (error) {

        console.error(
          "Failed to load conversations:",
          error
        );

      }
    };


  // -----------------------------
  // CREATE CONVERSATION
  // -----------------------------

  const createConversation =
    async () => {

      try {

        const conversation =
          await chatService.createConversation();

        setConversations(
          current => [
            conversation,
            ...current,
          ]
        );

        setConversationId(
          conversation.id
        );

        setMessages([]);

      } catch (error) {

        console.error(
          "Failed to create conversation:",
          error
        );

      }
    };


  // -----------------------------
  // LOAD CONVERSATION
  // -----------------------------

  const loadConversation =
    async (id: number) => {

      try {

        const conversation =
          await chatService.getConversation(
            id
          );

        setConversationId(
          conversation.id
        );

        setMessages(
          conversation.messages.map(
            message => ({
              role: message.role,
              content: message.content,
            })
          )
        );

      } catch (error) {

        console.error(
          "Failed to load conversation:",
          error
        );

      }
    };


  // -----------------------------
  // DELETE CONVERSATION
  // -----------------------------

  const deleteConversation =
    async (id: number) => {

      const conversation =
        conversations.find(
          item => item.id === id
        );

      if (!conversation) {
        return;
      }

      const confirmed =
        window.confirm(
          `Delete "${conversation.title}"?`
        );

      if (!confirmed) {
        return;
      }

      try {

        // Stop generation if deleting
        // the currently active conversation
        if (id === conversationId) {

          abortController.current?.abort();

          abortController.current =
            null;

          setLoading(false);
        }


        await chatService.deleteConversation(
          id
        );


        const remaining =
          conversations.filter(
            item => item.id !== id
          );

        setConversations(
          remaining
        );


        // If current conversation
        // was deleted
        if (id === conversationId) {

          if (remaining.length > 0) {

            await loadConversation(
              remaining[0].id
            );

          } else {

            await createConversation();

          }

        }

      } catch (error) {

        console.error(
          "Failed to delete conversation:",
          error
        );

      }
    };


  // -----------------------------
  // SEND MESSAGE
  // -----------------------------

  const sendMessage =
    async () => {

      const text =
        input.trim();

      if (
        !text ||
        loading ||
        conversationId === null
      ) {
        return;
      }


      const userMessage: ChatMessage = {
        role: "user",
        content: text,
      };


      const updatedMessages = [
        ...messages,
        userMessage,
      ];


      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "",
        },
      ]);


      setInput("");

      setLoading(true);


      const controller =
        new AbortController();

      abortController.current =
        controller;


      try {

        await chatService.streamMessage(
          conversationId,
          updatedMessages,
          chunk => {

            setMessages(current => {

              const updated =
                [...current];

              const lastIndex =
                updated.length - 1;


              updated[lastIndex] = {
                role: "assistant",
                content:
                  updated[lastIndex]
                    .content + chunk,
              };


              return updated;

            });

          },
          controller.signal
        );


        // Refresh conversations
        // so generated title appears
        const updatedConversations =
          await chatService.getConversations();

        setConversations(
          updatedConversations
        );


      } catch (error: any) {

        if (
          error?.name ===
          "AbortError"
        ) {

          console.log(
            "Generation stopped."
          );

        } else {

          console.error(
            "Chat error:",
            error
          );


          setMessages(current => {

            const updated =
              [...current];

            const lastIndex =
              updated.length - 1;


            updated[lastIndex] = {
              role: "assistant",
              content:
                "Failed to get a response.",
            };


            return updated;

          });

        }

      } finally {

        setLoading(false);

        abortController.current =
          null;

      }
    };


  // -----------------------------
  // STOP GENERATION
  // -----------------------------

  const stopGeneration =
    () => {

      abortController.current?.abort();

      abortController.current =
        null;

      setLoading(false);

    };


  // -----------------------------
  // REGENERATE
  // -----------------------------

  const regenerate =
    async () => {

      if (
        loading ||
        conversationId === null
      ) {
        return;
      }


      const lastUserIndex =
        [...messages]
          .reverse()
          .findIndex(
            message =>
              message.role === "user"
          );


      if (lastUserIndex === -1) {
        return;
      }


      const actualIndex =
        messages.length -
        1 -
        lastUserIndex;


      const history =
        messages.slice(
          0,
          actualIndex + 1
        );


      setMessages([
        ...history,
        {
          role: "assistant",
          content: "",
        },
      ]);


      setLoading(true);


      const controller =
        new AbortController();

      abortController.current =
        controller;


      try {

        await chatService.regenerateMessage(
          conversationId,
          history,
          chunk => {

            setMessages(current => {

              const updated =
                [...current];

              const lastIndex =
                updated.length - 1;


              updated[lastIndex] = {
                role: "assistant",
                content:
                  updated[lastIndex]
                    .content + chunk,
              };


              return updated;

            });

          },
          controller.signal
        );


      } catch (error: any) {

        if (
          error?.name !==
          "AbortError"
        ) {

          console.error(
            "Regeneration failed:",
            error
          );

        }

      } finally {

        setLoading(false);

        abortController.current =
          null;

      }
    };


  // -----------------------------
  // UI
  // -----------------------------

  return (

    <Group
      align="stretch"
      h="100%"
      gap="md"
    >


      {/* SIDEBAR */}

      <Card
        withBorder
        w={260}
        radius="md"
      >

        <Stack h="100%">

          <Button
            fullWidth
            onClick={
              createConversation
            }
          >
            + New Chat
          </Button>


          <ScrollArea
            style={{ flex: 1 }}
          >

            <Stack gap="xs">

              {conversations.map(
                conversation => (

                  <Group
                    key={
                      conversation.id
                    }
                    gap="xs"
                    wrap="nowrap"
                  >

                    {/* CONVERSATION */}

                    <Button
                      style={{
                        flex: 1,
                      }}
                      variant={
                        conversation.id ===
                        conversationId
                          ? "light"
                          : "subtle"
                      }
                      justify="flex-start"
                      onClick={() =>
                        loadConversation(
                          conversation.id
                        )
                      }
                    >

                      {conversation.title}

                    </Button>


                    {/* DELETE */}

                    <Tooltip
                      label="Delete conversation"
                    >

                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() =>
                          deleteConversation(
                            conversation.id
                          )
                        }
                        aria-label={
                          `Delete ${conversation.title}`
                        }
                      >
                        🗑️
                      </ActionIcon>

                    </Tooltip>

                  </Group>

                )
              )}

            </Stack>

          </ScrollArea>

        </Stack>

      </Card>


      {/* MAIN CHAT */}

      <Stack
        style={{
          flex: 1,
        }}
        h="100%"
      >


        <Group
          justify="space-between"
        >

          <Title order={2}>
            Chat
          </Title>


          {conversationId && (

            <Text
              size="sm"
              c="dimmed"
            >

              Conversation #
              {conversationId}

            </Text>

          )}

        </Group>


        {/* MESSAGES */}

        <Card
          withBorder
          radius="md"
          style={{
            flex: 1,
            minHeight: 500,
          }}
        >

          <ScrollArea h="100%">

            <Stack gap="md">

              {messages.map(
                (message, index) => (

                  <Card
                    key={index}
                    withBorder
                  >

                    <Text
                      fw={600}
                      mb="xs"
                    >

                      {message.role ===
                      "user"
                        ? "You"
                        : "AgentForge"}

                    </Text>


                    {/* MESSAGE CONTENT */}

                    {message.role ===
                    "assistant" ? (

                      <ReactMarkdown>
                        {message.content}
                      </ReactMarkdown>

                    ) : (

                      <Text>
                        {message.content}
                      </Text>

                    )}


                    {/* REGENERATE */}

                    {message.role ===
                      "assistant" &&
                      index ===
                        messages.length - 1 &&
                      !loading &&
                      message.content && (

                        <Button
                          mt="md"
                          size="xs"
                          variant="subtle"
                          onClick={
                            regenerate
                          }
                        >
                          Regenerate
                        </Button>

                      )}

                  </Card>

                )
              )}


              <div
                ref={bottomRef}
              />

            </Stack>

          </ScrollArea>

        </Card>


        {/* INPUT */}

        <Group
          align="flex-end"
        >

          <TextInput
            style={{
              flex: 1,
            }}
            placeholder={
              loading
                ? "Generating..."
                : "Type your message..."
            }
            value={input}
            disabled={loading}
            onChange={event =>
              setInput(
                event.currentTarget.value
              )
            }
            onKeyDown={event => {

              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {

                event.preventDefault();

                sendMessage();

              }

            }}
          />


          {/* STOP / SEND */}

          {loading ? (

            <Button
              color="red"
              onClick={
                stopGeneration
              }
            >
              Stop
            </Button>

          ) : (

            <Button
              onClick={
                sendMessage
              }
              disabled={
                !input.trim() ||
                conversationId === null
              }
            >
              Send
            </Button>

          )}

        </Group>

      </Stack>

    </Group>

  );
}