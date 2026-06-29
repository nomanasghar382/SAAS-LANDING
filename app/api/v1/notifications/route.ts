import { NextResponse } from "next/server";
import {
  getNotifications,
  markAllNotificationsRead,
} from "@/lib/data/notifications.repository";

export async function GET() {
  return NextResponse.json({
    data: getNotifications(),
    unreadCount: getNotifications().filter((n) => !n.read).length,
  });
}

export async function PATCH() {
  markAllNotificationsRead();
  return NextResponse.json({ message: "All notifications marked as read" });
}
