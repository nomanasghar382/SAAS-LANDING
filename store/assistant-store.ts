import { create } from "zustand";
import { defaultAssistantMessage, mockConversations } from "@/constants/mock-data";
import type { ChatConversation, ChatMessage } from "@/types";

interface AssistantState {
  conversations: ChatConversation[];
  activeConversationId: string | null;
  isStreaming: boolean;
  streamingMessageId: string | null;

  getActiveConversation: () => ChatConversation | undefined;
  getActiveMessages: () => ChatMessage[];

  setActiveConversation: (id: string) => void;
  createConversation: () => string;
  deleteConversation: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, content: string) => void;
  setIsStreaming: (streaming: boolean) => void;
  setStreamingMessageId: (id: string | null) => void;
}

export const useAssistantStore = create<AssistantState>()((set, get) => ({
  conversations: mockConversations,
  activeConversationId: mockConversations[0]?.id ?? null,
  isStreaming: false,
  streamingMessageId: null,

  getActiveConversation: () => {
    const { conversations, activeConversationId } = get();
    return conversations.find((c) => c.id === activeConversationId);
  },

  getActiveMessages: () => {
    return get().getActiveConversation()?.messages ?? [];
  },

  setActiveConversation: (id) => set({ activeConversationId: id }),

  createConversation: () => {
    const id = `conv-${crypto.randomUUID()}`;
    const newConversation: ChatConversation = {
      id,
      title: "New conversation",
      messages: [{ ...defaultAssistantMessage, id: `welcome-${id}` }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      activeConversationId: id,
    }));
    return id;
  },

  deleteConversation: (id) =>
    set((state) => {
      const filtered = state.conversations.filter((c) => c.id !== id);
      return {
        conversations: filtered,
        activeConversationId:
          state.activeConversationId === id
            ? filtered[0]?.id ?? null
            : state.activeConversationId,
      };
    }),

  addMessage: (message) =>
    set((state) => {
      const { activeConversationId, conversations } = state;
      if (!activeConversationId) return state;

      return {
        conversations: conversations.map((conv) => {
          if (conv.id !== activeConversationId) return conv;
          const title =
            conv.messages.length <= 1 && message.role === "user"
              ? message.content.slice(0, 40) + (message.content.length > 40 ? "..." : "")
              : conv.title;
          return {
            ...conv,
            title,
            messages: [...conv.messages, message],
            updatedAt: new Date().toISOString(),
          };
        }),
      };
    }),

  updateMessage: (id, content) =>
    set((state) => ({
      conversations: state.conversations.map((conv) => ({
        ...conv,
        messages: conv.messages.map((msg) =>
          msg.id === id ? { ...msg, content } : msg
        ),
      })),
    })),

  setIsStreaming: (streaming) => set({ isStreaming: streaming }),
  setStreamingMessageId: (id) => set({ streamingMessageId: id }),
}));
