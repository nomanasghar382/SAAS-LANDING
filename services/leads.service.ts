import { apiClient } from "@/lib/api/client";
import type { Lead, PaginatedResponse } from "@/types";

const BASE = "/api/v1/leads";

export const leadsService = {
  getAll: (params?: { status?: string; source?: string; search?: string }) =>
    apiClient<PaginatedResponse<Lead>>(BASE, { params }),

  getById: (id: string) => apiClient<Lead>(`${BASE}/${id}`),

  create: (data: {
    name: string;
    email: string;
    company: string;
    status?: string;
    source?: string;
    value?: number;
    score?: number;
    phone?: string;
    notes?: string;
  }) =>
    apiClient<Lead>(BASE, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
