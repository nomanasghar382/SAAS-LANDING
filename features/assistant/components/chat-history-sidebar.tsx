"use client";

import { formatRelativeTime } from "@/utils/format";
import { MessageSquarePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAssistantStore } from "@/store/assistant-store";

interface ChatHistorySidebarProps {
  onNavigate?: () => void;
}

export function ChatHistorySidebar({ onNavigate }: ChatHistorySidebarProps) {
  const {
    conversations,
    activeConversationId,
    setActiveConversation,
    createConversation,
    deleteConversation,
  } = useAssistantStore();

  return (
    <div className="flex h-full w-full flex-col border-r bg-muted/30 md:w-64 lg:w-72">
      <div className="border-b p-3">
        <Button
          onClick={() => createConversation()}
          className="w-full justify-start gap-2"
          size="sm"
        >
          <MessageSquarePlus className="h-4 w-4" />
          New chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          History
        </p>
        <div className="space-y-0.5">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={cn(
                "group flex items-center gap-1 rounded-lg ds-transition",
                activeConversationId === conv.id
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/60"
              )}
            >
              <button
                type="button"
                onClick={() => {
                  setActiveConversation(conv.id);
                  onNavigate?.();
                }}
                className="flex-1 px-3 py-2.5 text-left"
              >
                <p className="truncate text-sm font-medium">{conv.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {formatRelativeTime(conv.updatedAt)}
                </p>
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="mr-1 h-7 w-7 shrink-0 opacity-0 ds-transition group-hover:opacity-100 focus-visible:opacity-100"
                aria-label={`Delete conversation: ${conv.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
              >
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
