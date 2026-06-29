"use client";

import { useEffect, useState } from "react";
import { Plug, Search } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { PageLoading } from "@/components/shared/page-loading";
import { IntegrationCard } from "./integration-card";
import { integrationsService } from "@/services/integrations.service";
import { toast } from "@/lib/toast";
import type { Integration, IntegrationStatus } from "@/types";

export function IntegrationsModule() {
  const [search, setSearch] = useState("");
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectingId, setConnectingId] = useState<string | null>(null);

  useEffect(() => {
    integrationsService
      .getAll()
      .then(setIntegrations)
      .catch(() => toast.error("Failed to load integrations"))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = integrations.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  const connectedCount = integrations.filter((i) => i.status === "connected").length;

  const handleConnect = async (id: string) => {
    setConnectingId(id);
    await new Promise((r) => setTimeout(r, 600));

    setIntegrations((prev) => {
      const current = prev.find((i) => i.id === id);
      const willConnect = current?.status !== "connected";

      toast.success(
        willConnect ? "Connected" : "Disconnected",
        `${current?.name ?? "Integration"} updated successfully.`
      );

      return prev.map((i) => {
        if (i.id !== id) return i;
        const newStatus: IntegrationStatus =
          i.status === "connected" ? "disconnected" : "connected";
        return {
          ...i,
          status: newStatus,
          lastSync:
            newStatus === "connected" ? new Date().toISOString() : undefined,
        };
      });
    });

    setConnectingId(null);
  };

  if (isLoading) {
    return <PageLoading label="Loading integrations" className="min-h-[40vh]" />;
  }

  return (
    <div className="space-y-6">
      <Card variant="elevated">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Plug className="h-5 w-5" aria-hidden="true" />
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
        <label htmlFor="integration-search" className="sr-only">
          Search integrations
        </label>
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="integration-search"
          placeholder="Search integrations..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No integrations found"
          description="Try a different search term or browse all available integrations."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onConnect={handleConnect}
              isConnecting={connectingId === integration.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
