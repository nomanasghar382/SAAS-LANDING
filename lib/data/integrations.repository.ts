import { mockIntegrations } from "@/constants/mock-data";
import type { Integration } from "@/types";

export function getIntegrations(): Integration[] {
  return mockIntegrations;
}
