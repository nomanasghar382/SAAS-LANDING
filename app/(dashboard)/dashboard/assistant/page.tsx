"use client";

import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ChatWindow } from "@/features/assistant/components/chat-window";
import { initialMessages, suggestedPrompts } from "@/constants/mock-data";
import { useAssistantStore } from "@/store/assistant-store";

export default function AssistantPage() {
  const { messages, addMessage } = useAssistantStore();

  useEffect(() => {
    if (messages.length === 0) {
      initialMessages.forEach((msg) => addMessage(msg));
    }
  }, [messages.length, addMessage]);

  return (
    <DashboardLayout
      title="AI Assistant"
      description="Your intelligent sales copilot"
    >
      <div className="mx-auto max-w-4xl">
        <ChatWindow suggestions={suggestedPrompts} />
      </div>
    </DashboardLayout>
  );
}
