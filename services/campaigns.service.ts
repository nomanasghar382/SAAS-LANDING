import { apiClient } from "@/lib/api/client";
import type { Campaign, PaginatedResponse } from "@/types";

const BASE = "/api/v1/campaigns";

export const campaignsService = {
  getAll: () => apiClient<PaginatedResponse<Campaign>>(BASE),

  getById: (id: string) => apiClient<Campaign>(`${BASE}/${id}`),
};
