"use client";

import { useMemo, useState } from "react";
import { Download, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LeadDetailDrawer } from "./lead-detail-drawer";
import { LeadFilters } from "./lead-filters";
import { LeadTable } from "./lead-table";
import { mockLeads } from "@/constants/mock-data";
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
  const [filters, setFilters] = useState<LeadFiltersType>({
    search: "",
    status: "all",
    source: "all",
  });
  const [sort, setSort] = useState<LeadSort>({
    field: "score",
    direction: "desc",
  });
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredLeads = useMemo(() => {
    const filtered = mockLeads.filter((lead) => {
      const q = filters.search.toLowerCase();
      const matchesSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q);
      const matchesStatus =
        filters.status === "all" || lead.status === filters.status;
      const matchesSource =
        filters.source === "all" || lead.source === filters.source;
      return matchesSearch && matchesStatus && matchesSource;
    });
    return sortLeads(filtered, sort);
  }, [filters, sort]);

  const stats = useMemo(() => ({
    total: mockLeads.length,
    hot: mockLeads.filter((l) => l.score >= 80).length,
    pipeline: mockLeads.reduce((sum, l) => sum + l.value, 0),
  }), []);

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

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Leads", value: stats.total.toString(), icon: Users },
          { label: "Hot Leads (80+)", value: stats.hot.toString(), icon: Users },
          {
            label: "Pipeline Value",
            value: `$${(stats.pipeline / 1000).toFixed(0)}K`,
            icon: Users,
          },
        ].map((stat) => (
          <Card key={stat.label} variant="elevated">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold tabular-nums">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <LeadFilters filters={filters} onFiltersChange={setFilters} />
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""}
      </p>

      <LeadTable
        leads={filteredLeads}
        sort={sort}
        onSortChange={handleSortChange}
        onLeadSelect={handleLeadSelect}
      />

      <LeadDetailDrawer
        lead={selectedLead}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
