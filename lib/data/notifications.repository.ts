import { activityFeed } from "@/constants/mock-data";
import type { ActivityItem } from "@/types";

const readIds = new Set<string>();

export function getNotifications(): (ActivityItem & { read: boolean })[] {
  return activityFeed.map((item) => ({
    ...item,
    read: readIds.has(item.id),
  }));
}

export function markAllNotificationsRead() {
  activityFeed.forEach((item) => readIds.add(item.id));
}

export function markNotificationRead(id: string) {
  readIds.add(id);
}

export function getUnreadCount(): number {
  return activityFeed.filter((item) => !readIds.has(item.id)).length;
}
