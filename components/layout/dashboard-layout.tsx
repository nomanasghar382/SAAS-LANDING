"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/shared/theme-toggle";

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
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative hidden max-w-md flex-1 lg:block">
            <Label htmlFor="dashboard-search" className="sr-only">
              Search leads and campaigns
            </Label>
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="dashboard-search"
              placeholder="Search leads, campaigns..."
              className="pl-9"
            />
          </div>
          {title && (
            <h1 className="text-base font-semibold tracking-tight lg:hidden">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications, 1 unread"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          </Button>
          <Avatar className="h-8 w-8 cursor-pointer sm:h-9 sm:w-9">
            <AvatarImage src="/avatars/user.jpg" alt="John Doe profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
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
