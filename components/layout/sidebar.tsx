"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "./sidebar-nav";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useUiStore } from "@/store/ui-store";

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUiStore();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground ds-transition",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!sidebarCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent text-sm font-bold text-white">
              SP
            </div>
            <span className="font-semibold">SellPilot</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="text-sidebar-foreground hover:bg-sidebar-border hover:text-sidebar-foreground"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>

      <SidebarNav collapsed={sidebarCollapsed} />

      {!sidebarCollapsed && (
        <div className="border-t border-sidebar-border p-4">
          <Link
            href={ROUTES.settingsBilling}
            className="block rounded-lg bg-sidebar-border/50 p-3 ds-transition hover:bg-sidebar-border/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          >
            <p className="text-xs font-medium text-sidebar-foreground/80">
              Pro Plan
            </p>
            <p className="mt-1 text-xs text-sidebar-foreground/50">
              Upgrade for unlimited AI credits
            </p>
          </Link>
        </div>
      )}
    </aside>
  );
}
