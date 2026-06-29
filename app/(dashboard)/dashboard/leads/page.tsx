"use client";

import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LeadFilters } from "@/features/leads/components/lead-filters";
import { LeadTable } from "@/features/leads/components/lead-table";
import { mockLeads } from "@/constants/mock-data";
import type { LeadFilters as LeadFiltersType } from "@/types";

export default function LeadsPage() {
  const [filters, setFilters] = useState<LeadFiltersType>({
    search: "",
    status: "all",
    source: "all",
  });

  const filteredLeads = useMemo(() => {
    return mockLeads.filter((lead) => {
      const matchesSearch =
        filters.search === "" ||
        lead.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.email.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "all" || lead.status === filters.status;

      const matchesSource =
        filters.source === "all" || lead.source === filters.source;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [filters]);

  return (
    <DashboardLayout
      title="Leads"
      description="Manage and track your sales leads"
    >
      <div className="space-y-6">
        <LeadFilters filters={filters} onFiltersChange={setFilters} />
        <LeadTable leads={filteredLeads} />
      </div>
    </DashboardLayout>
  );
}
