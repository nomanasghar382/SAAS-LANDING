import { mockLeads } from "@/constants/mock-data";
import type { Lead, PaginatedResponse } from "@/types";

export interface LeadQueryParams {
  status?: string | null;
  source?: string | null;
  search?: string | null;
}

export function getLeads(params: LeadQueryParams = {}): PaginatedResponse<Lead> {
  const { status, source, search } = params;

  let filtered = [...mockLeads];

  if (status && status !== "all") {
    filtered = filtered.filter((lead) => lead.status === status);
  }
  if (source && source !== "all") {
    filtered = filtered.filter((lead) => lead.source === source);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (lead) =>
        lead.name.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q)
    );
  }

  return {
    data: filtered,
    total: filtered.length,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  };
}

export function getLeadById(id: string): Lead | undefined {
  return mockLeads.find((lead) => lead.id === id);
}

export function getLeadStats() {
  return {
    total: mockLeads.length,
    hot: mockLeads.filter((l) => l.score >= 80).length,
    pipeline: mockLeads.reduce((sum, l) => sum + l.value, 0),
  };
}
