import {
  Bot,
  Megaphone,
  UserCircle,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRelativeTime } from "@/utils/format";
import { cn } from "@/lib/utils";
import type { ActivityItem } from "@/types";

const activityIcons = {
  lead: Users,
  campaign: Megaphone,
  customer: UserCircle,
  automation: Bot,
};

const activityColors = {
  lead: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  campaign: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  customer: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  automation: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
};

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
}

export function ActivityFeed({
  activities,
  title = "Recent Activity",
}: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type];
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    activityColors[activity.type]
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
