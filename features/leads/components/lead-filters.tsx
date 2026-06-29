"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative min-w-0 flex-1">
        <Label htmlFor="lead-search" className="sr-only">
          Search leads
        </Label>
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="lead-search"
          placeholder="Search leads..."
          className="pl-9"
          value={filters.search}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
        />
      </div>

      <div className="flex gap-2">
        <div>
          <Label htmlFor="lead-status-filter" className="sr-only">
            Filter by status
          </Label>
          <select
            id="lead-status-filter"
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs sm:w-auto"
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
        </div>

        <div>
          <Label htmlFor="lead-source-filter" className="sr-only">
            Filter by source
          </Label>
          <select
            id="lead-source-filter"
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs sm:w-auto"
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
      </div>
    </div>
  );
}
