import { getLeadsStore } from "@/lib/data/store";
import type { Lead, PaginatedResponse } from "@/types";
import type { LeadSource, LeadStatus } from "@/types";

export interface LeadQueryParams {
  status?: string | null;
  source?: string | null;
  search?: string | null;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  company: string;
  status?: LeadStatus;
  source?: LeadSource;
  value?: number;
  score?: number;
  phone?: string;
  notes?: string;
}

function filterLeads(leads: Lead[], params: LeadQueryParams): Lead[] {
  const { status, source, search } = params;
  let filtered = [...leads];

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

  return filtered;
}

export function getLeads(params: LeadQueryParams = {}): PaginatedResponse<Lead> {
  const filtered = filterLeads(getLeadsStore(), params);

  return {
    data: filtered,
    total: filtered.length,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  };
}

export function getLeadById(id: string): Lead | undefined {
  return getLeadsStore().find((lead) => lead.id === id);
}

export function createLead(input: CreateLeadInput): Lead {
  const now = new Date().toISOString();
  const lead: Lead = {
    id: `lead-${crypto.randomUUID().slice(0, 8)}`,
    name: input.name,
    email: input.email,
    company: input.company,
    status: input.status ?? "new",
    source: input.source ?? "website",
    value: input.value ?? 0,
    score: input.score ?? 50,
    phone: input.phone,
    notes: input.notes,
    createdAt: now,
    updatedAt: now,
  };

  getLeadsStore().unshift(lead);
  return lead;
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const store = getLeadsStore();
  const index = store.findIndex((l) => l.id === id);
  if (index === -1) return null;

  store[index] = {
    ...store[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return store[index];
}

export function getLeadStats() {
  const leads = getLeadsStore();
  return {
    total: leads.length,
    hot: leads.filter((l) => l.score >= 80).length,
    pipeline: leads.reduce((sum, l) => sum + l.value, 0),
  };
}
