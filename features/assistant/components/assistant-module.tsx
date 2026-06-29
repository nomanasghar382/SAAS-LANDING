"use client";

import { ChatHistorySidebar } from "./chat-history-sidebar";
import { ChatInterface } from "./chat-interface";

export function AssistantModule() {
  return (
    <div className="flex h-[calc(100vh-10rem)] overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="hidden md:flex">
        <ChatHistorySidebar />
      </div>
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
}
