import type { CampaignStatus, LeadStatus } from "@/types";

export const leadStatusVariants: Record<
  LeadStatus,
  "default" | "secondary" | "success" | "warning" | "destructive" | "outline"
> = {
  new: "secondary",
  contacted: "outline",
  qualified: "default",
  proposal: "warning",
  won: "success",
  lost: "destructive",
};

export const campaignStatusVariants: Record<
  CampaignStatus,
  "default" | "secondary" | "success" | "warning"
> = {
  draft: "secondary",
  active: "success",
  paused: "warning",
  completed: "default",
};

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};
