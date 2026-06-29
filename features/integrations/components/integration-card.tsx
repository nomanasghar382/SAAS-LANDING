"use client";

import { formatRelativeTime } from "@/utils/format";
import {
  BarChart3,
  CreditCard,
  MessageSquare,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Integration } from "@/types";

const iconMap: Record<string, typeof ShoppingBag> = {
  shopify: ShoppingBag,
  stripe: CreditCard,
  slack: MessageSquare,
  "google-analytics": BarChart3,
  hubspot: Users,
};

interface IntegrationCardProps {
  integration: Integration;
  onConnect?: (id: string) => void;
  isConnecting?: boolean;
}

export function IntegrationCard({
  integration,
  onConnect,
  isConnecting,
}: IntegrationCardProps) {
  const Icon = iconMap[integration.icon] ?? Users;
  const isConnected = integration.status === "connected";

  return (
    <Card variant="interactive" className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm"
            style={{ backgroundColor: integration.brandColor }}
          >
            <Icon className="h-5 w-5" />
          </div>
          {isConnected ? (
            <Badge variant="success">Connected</Badge>
          ) : (
            <Badge variant="secondary">Not connected</Badge>
          )}
        </div>
        <CardTitle className="text-base pt-2">{integration.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {integration.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{integration.category}</p>
            {integration.lastSync && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                Synced {formatRelativeTime(integration.lastSync)}
              </p>
            )}
          </div>
          <Button
            variant={isConnected ? "outline" : "default"}
            size="sm"
            onClick={() => onConnect?.(integration.id)}
            isLoading={isConnecting}
            disabled={isConnecting}
            className={cn(!isConnected && "shadow-sm")}
          >
            {isConnected ? "Manage" : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
