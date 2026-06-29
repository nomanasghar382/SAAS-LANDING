export type LeadStatus = "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";

export type LeadSource = "website" | "referral" | "linkedin" | "cold_outreach" | "event";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  status: LeadStatus;
  source: LeadSource;
  value: number;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFilters {
  search: string;
  status: LeadStatus | "all";
  source: LeadSource | "all";
}
