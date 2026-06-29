import { apiClient } from "@/lib/api/client";
import type { Lead, PaginatedResponse } from "@/types";

const BASE = "/api/v1/leads";

export const leadsService = {
  getAll: (params?: { status?: string; source?: string; search?: string }) =>
    apiClient<PaginatedResponse<Lead>>(BASE, { params }),

  getById: (id: string) => apiClient<Lead>(`${BASE}/${id}`),
};
