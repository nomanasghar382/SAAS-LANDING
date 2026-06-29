"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageBubble } from "./message-bubble";
import { PromptSuggestions } from "./prompt-suggestions";
import { suggestedPrompts } from "@/constants/mock-data";
import { streamAssistantResponse } from "@/services/assistant.service";
import { useAssistantStore } from "@/store/assistant-store";
import { toast } from "@/lib/toast";

export function ChatInterface() {
  const {
    getActiveMessages,
    isStreaming,
    streamingMessageId,
    addMessage,
    updateMessage,
    setIsStreaming,
    setStreamingMessageId,
  } = useAssistantStore();

  const messages = getActiveMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming, streamingMessageId]);

  const handleStop = () => {
    abortRef.current = true;
    setIsStreaming(false);
    setStreamingMessageId(null);
  };

  const handleSend = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString(),
    });

    setInput("");
    setIsStreaming(true);
    abortRef.current = false;

    const assistantId = crypto.randomUUID();
    addMessage({
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
    });
    setStreamingMessageId(assistantId);

    try {
      await streamAssistantResponse(content.trim(), (chunk) => {
        if (abortRef.current) return;
        updateMessage(assistantId, chunk);
      });
    } catch {
      updateMessage(
        assistantId,
        "I'm having trouble connecting right now. Please try again in a moment."
      );
      toast.error("Assistant unavailable");
    } finally {
      if (!abortRef.current) {
        setIsStreaming(false);
        setStreamingMessageId(null);
      }
    }
  };

  const showSuggestions = messages.length <= 1;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 text-primary-foreground shadow-sm">
          <Bot className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">SellPilot Assistant</h3>
          <p className="text-xs text-muted-foreground">
            {isStreaming ? "Analyzing your pipeline..." : "AI-powered sales copilot"}
          </p>
        </div>
        {isStreaming && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleStop}
            className="gap-1.5"
          >
            <Square className="h-3 w-3 fill-current" />
            Stop
          </Button>
        )}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        {showSuggestions && (
          <div className="mx-auto max-w-2xl">
            <PromptSuggestions
              suggestions={suggestedPrompts}
              onSelect={handleSend}
            />
          </div>
        )}

        <div
          className="mx-auto max-w-2xl space-y-4"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isStreaming={
                isStreaming && message.id === streamingMessageId
              }
            />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-background p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="mx-auto flex max-w-2xl items-end gap-2"
        >
          <div className="relative flex-1">
            <label htmlFor="assistant-message" className="sr-only">
              Message SellPilot AI
            </label>
            <textarea
              id="assistant-message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(input);
                }
              }}
              placeholder="Ask about leads, campaigns, or outreach..."
              disabled={isStreaming}
              rows={1}
              className="flex min-h-[44px] w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-xs ds-transition placeholder:text-muted-foreground/60 hover:border-border/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:opacity-50"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={isStreaming || !input.trim()}
            className="h-11 w-11 shrink-0 rounded-xl"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-muted-foreground">
          SellPilot AI analyzes your live pipeline data. Verify important decisions.
        </p>
      </div>
    </div>
  );
}
