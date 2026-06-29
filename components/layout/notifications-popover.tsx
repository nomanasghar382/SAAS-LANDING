"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatRelativeTime } from "@/utils/format";
import { cn } from "@/lib/utils";
import type { ActivityItem } from "@/types";

interface Notification extends ActivityItem {
  read: boolean;
}

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const fetchNotifications = useCallback(async () => {
    const res = await fetch("/api/v1/notifications", { credentials: "include" });
    if (!res.ok) return;
    const data = await res.json();
    setNotifications(data.data);
    setUnreadCount(data.unreadCount);
  }, []);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) void fetchNotifications();
  };

  const markAllRead = async () => {
    await fetch("/api/v1/notifications", {
      method: "PATCH",
      credentials: "include",
    });
    fetchNotifications();
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={
            unreadCount > 0
              ? `Notifications, ${unreadCount} unread`
              : "Notifications"
          }
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          {unreadCount > 0 && (
            <span className="absolute right-2 top-2 flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-sm font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={markAllRead}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              No notifications yet
            </p>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "border-b px-4 py-3 last:border-0 ds-transition hover:bg-muted/40",
                  !item.read && "bg-primary/5"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/70">
                      {formatRelativeTime(item.timestamp)}
                    </p>
                  </div>
                  {!item.read && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t p-2">
          <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              View activity feed
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
