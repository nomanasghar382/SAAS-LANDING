import { apiClient } from "@/lib/api/client";
import type { Integration } from "@/types";

export const integrationsService = {
  getAll: () =>
    apiClient<{ data: Integration[] }>("/api/v1/integrations").then(
      (res) => res.data
    ),
};
