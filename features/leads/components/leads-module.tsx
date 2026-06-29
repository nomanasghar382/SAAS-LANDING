"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DollarSign, Download, Flame, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { LeadsTableSkeleton } from "./leads-table-skeleton";
import { LeadDetailDrawer } from "./lead-detail-drawer";
import { LeadFilters } from "./lead-filters";
import { LeadTable } from "./lead-table";
import { leadsService } from "@/services/leads.service";
import { useAppStore } from "@/store/app-store";
import { toast } from "@/lib/toast";
import type { Lead, LeadFilters as LeadFiltersType, LeadSort } from "@/types";

function sortLeads(leads: Lead[], sort: LeadSort): Lead[] {
  return [...leads].sort((a, b) => {
    const dir = sort.direction === "asc" ? 1 : -1;
    const field = sort.field;

    if (field === "value" || field === "score") {
      return (a[field] - b[field]) * dir;
    }
    if (field === "updatedAt") {
      return (
        (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * dir
      );
    }
    return String(a[field]).localeCompare(String(b[field])) * dir;
  });
}

export function LeadsModule() {
  const searchParams = useSearchParams();
  const { setAddLeadOpen } = useAppStore();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<LeadFiltersType>({
    search: searchParams.get("search") ?? "",
    status: "all",
    source: "all",
  });
  const [sort, setSort] = useState<LeadSort>({
    field: "score",
    direction: "desc",
  });
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await leadsService.getAll({
        status: filters.status !== "all" ? filters.status : undefined,
        source: filters.source !== "all" ? filters.source : undefined,
        search: filters.search || undefined,
      });
      setLeads(response.data);
    } catch {
      toast.error("Failed to load leads", "Please refresh and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timeout = setTimeout(fetchLeads, filters.search ? 300 : 0);
    return () => clearTimeout(timeout);
  }, [fetchLeads, filters.search]);

  useEffect(() => {
    const handler = () => fetchLeads();
    window.addEventListener("leads:refresh", handler);
    return () => window.removeEventListener("leads:refresh", handler);
  }, [fetchLeads]);

  const filteredLeads = useMemo(
    () => sortLeads(leads, sort),
    [leads, sort]
  );

  const stats = useMemo(
    () => ({
      total: leads.length,
      hot: leads.filter((l) => l.score >= 80).length,
      pipeline: leads.reduce((sum, l) => sum + l.value, 0),
    }),
    [leads]
  );

  const handleSortChange = (field: LeadSort["field"]) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerOpen(true);
  };

  const handleExport = () => {
    const headers = ["Name", "Email", "Company", "Status", "Value", "Score"];
    const rows = filteredLeads.map((l) =>
      [l.name, l.email, l.company, l.status, l.value, l.score].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Export complete", "Your CSV has been downloaded.");
  };

  const handleAddLead = () => {
    setAddLeadOpen(true);
  };

  if (isLoading && leads.length === 0) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-muted/60" />
          ))}
        </div>
        <LeadsTableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Leads", value: stats.total.toString(), icon: Users },
          { label: "Hot Leads (80+)", value: stats.hot.toString(), icon: Flame },
          {
            label: "Pipeline Value",
            value: `$${(stats.pipeline / 1000).toFixed(0)}K`,
            icon: DollarSign,
          },
        ].map((stat) => (
          <Card key={stat.label} variant="elevated">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold tabular-nums">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <LeadFilters filters={filters} onFiltersChange={setFilters} />
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" onClick={handleAddLead}>
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""}
      </p>

      {filteredLeads.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No leads found"
          description="Try adjusting your filters or add a new lead to your pipeline."
          action={{ label: "Add lead", onClick: handleAddLead }}
        />
      ) : (
        <LeadTable
          leads={filteredLeads}
          sort={sort}
          onSortChange={handleSortChange}
          onLeadSelect={handleLeadSelect}
        />
      )}

      <LeadDetailDrawer
        lead={selectedLead}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
