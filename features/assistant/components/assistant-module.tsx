"use client";

import { useState } from "react";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChatHistorySidebar } from "./chat-history-sidebar";
import { ChatInterface } from "./chat-interface";

export function AssistantModule() {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-10rem)] min-h-[480px] overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="hidden md:flex">
        <ChatHistorySidebar />
      </div>

      <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
        <SheetContent side="left" className="w-72 p-0 md:hidden">
          <SheetHeader className="border-b p-4">
            <SheetTitle>Chat history</SheetTitle>
          </SheetHeader>
          <SheetBody className="p-0">
            <ChatHistorySidebar onNavigate={() => setHistoryOpen(false)} />
          </SheetBody>
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center border-b px-4 py-2 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => setHistoryOpen(true)}
            aria-label="Open chat history"
          >
            <History className="h-4 w-4" />
            History
          </Button>
        </div>
        <div className="flex-1 min-h-0">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
