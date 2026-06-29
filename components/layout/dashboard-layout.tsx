"use client";

import { Search } from "lucide-react";
import { NotificationsPopover } from "@/components/layout/notifications-popover";
import { UserMenu } from "@/components/layout/user-menu";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function DashboardLayout({
  children,
  title,
  description,
}: DashboardLayoutProps) {
  const { setCommandOpen } = useAppStore();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
        <div className="flex flex-1 items-center gap-4">
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="relative hidden max-w-md flex-1 items-center lg:flex"
            aria-label="Open command palette"
          >
            <Search
              className="absolute left-3 h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="flex h-9 w-full items-center rounded-md border border-input bg-muted/30 pl-9 pr-16 text-sm text-muted-foreground ds-transition hover:bg-muted/50">
              Search or jump to...
            </span>
            <kbd className="pointer-events-none absolute right-2 hidden h-6 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          {title && (
            <h1 className="text-base font-semibold tracking-tight lg:hidden">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setCommandOpen(true)}
            aria-label="Open command palette"
          >
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <NotificationsPopover />
          <UserMenu />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-muted/30 p-4 sm:p-6">
        {(title || description) && (
          <div className="mb-6 hidden lg:block">
            {title && (
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        {description && (
          <p className="mb-4 text-sm text-muted-foreground lg:hidden">
            {description}
          </p>
        )}
        {children}
      </main>
    </div>
  );
}
