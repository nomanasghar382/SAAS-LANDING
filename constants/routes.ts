export const ROUTES = {
  home: "/",
  pricing: "/pricing",
  about: "/about",
  contact: "/contact",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  dashboard: "/dashboard",
  analytics: "/dashboard/analytics",
  assistant: "/dashboard/assistant",
  leads: "/dashboard/leads",
  customers: "/dashboard/customers",
  campaigns: "/dashboard/campaigns",
  automation: "/dashboard/automation",
  integrations: "/dashboard/integrations",
  settings: "/dashboard/settings",
} as const;

export type RouteKey = keyof typeof ROUTES;
