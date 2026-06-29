import { apiClient } from "@/lib/api/client";
import type { Campaign, PaginatedResponse } from "@/types";

const BASE = "/api/v1/campaigns";

export const campaignsService = {
  getAll: () => apiClient<PaginatedResponse<Campaign>>(BASE),

  getById: (id: string) => apiClient<Campaign>(`${BASE}/${id}`),

  create: (data: { name: string; description: string; status?: string }) =>
    apiClient<Campaign>(BASE, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
