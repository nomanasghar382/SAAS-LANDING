"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { LeadFilters, LeadSource, LeadStatus } from "@/types";

interface LeadFiltersProps {
  filters: LeadFilters;
  onFiltersChange: (filters: LeadFilters) => void;
}

const statusOptions: Array<{ value: LeadStatus | "all"; label: string }> = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal", label: "Proposal" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

const sourceOptions: Array<{ value: LeadSource | "all"; label: string }> = [
  { value: "all", label: "All Sources" },
  { value: "website", label: "Website" },
  { value: "referral", label: "Referral" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "cold_outreach", label: "Cold Outreach" },
  { value: "event", label: "Event" },
];

export function LeadFilters({ filters, onFiltersChange }: LeadFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search leads..."
          className="pl-9"
          value={filters.search}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
        />
      </div>

      <select
        className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
        value={filters.status}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            status: e.target.value as LeadFilters["status"],
          })
        }
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
        value={filters.source}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            source: e.target.value as LeadFilters["source"],
          })
        }
      >
        {sourceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
