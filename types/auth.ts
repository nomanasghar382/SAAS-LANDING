export type UserRole = "owner" | "admin" | "member" | "viewer";

export type PlanTier = "free" | "starter" | "professional" | "enterprise";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
}

export interface Tenant {
  id: string;
  name: string;
  plan: PlanTier;
}

export interface AuthSession {
  user: User;
  tenant: Tenant;
}
