"use client";

import { Bot, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageBubble } from "./message-bubble";
import { PromptSuggestions } from "./prompt-suggestions";
import { useAssistantStore } from "@/store/assistant-store";
import type { SuggestedPrompt } from "@/types";

interface ChatWindowProps {
  suggestions: SuggestedPrompt[];
}

export function ChatWindow({ suggestions }: ChatWindowProps) {
  const { messages, isStreaming, addMessage, setIsStreaming } =
    useAssistantStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user" as const,
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    addMessage(userMessage);
    setIsStreaming(true);

    if (inputRef.current) inputRef.current.value = "";

    setTimeout(() => {
      addMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "I've analyzed your request. Based on your current pipeline data, I recommend prioritizing the 3 qualified leads from this week and scheduling follow-up calls. Would you like me to draft outreach emails for them?",
        timestamp: new Date().toISOString(),
      });
      setIsStreaming(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    handleSend(message);
  };

  return (
    <div className="flex h-[600px] flex-col rounded-xl border bg-card">
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold">SellPilot Assistant</h3>
          <p className="text-xs text-muted-foreground">
            AI-powered sales copilot
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isStreaming && (
          <MessageBubble
            message={{
              id: "streaming",
              role: "assistant",
              content: "Thinking...",
              timestamp: new Date().toISOString(),
            }}
            isTyping
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="border-t px-4 py-3">
          <PromptSuggestions
            suggestions={suggestions}
            onSelect={(prompt) => handleSend(prompt)}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            name="message"
            placeholder="Ask anything about your sales pipeline..."
            disabled={isStreaming}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isStreaming}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
