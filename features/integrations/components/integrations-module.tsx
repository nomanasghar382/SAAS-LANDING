"use client";

import { useState } from "react";
import { Plug, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { IntegrationCard } from "./integration-card";
import { mockIntegrations } from "@/constants/mock-data";
import type { IntegrationStatus } from "@/types";

export function IntegrationsModule() {
  const [search, setSearch] = useState("");
  const [integrations, setIntegrations] = useState(mockIntegrations);

  const filtered = integrations.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  const connectedCount = integrations.filter((i) => i.status === "connected").length;

  const handleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const newStatus: IntegrationStatus =
          i.status === "connected" ? "disconnected" : "connected";
        return {
          ...i,
          status: newStatus,
          lastSync:
            newStatus === "connected" ? new Date().toISOString() : undefined,
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      <Card variant="elevated">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Plug className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {connectedCount} of {integrations.length} integrations connected
            </p>
            <p className="text-xs text-muted-foreground">
              Connect your tools to sync data and automate workflows
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search integrations..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onConnect={handleConnect}
          />
        ))}
      </div>
    </div>
  );
}
