import {
  BarChart3,
  Bot,
  LayoutDashboard,
  Megaphone,
  Plug,
  Settings,
  Users,
  UserCircle,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ROUTES } from "./routes";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const marketingNavItems = [
  { title: "Pricing", href: ROUTES.pricing },
  { title: "About", href: ROUTES.about },
  { title: "Contact", href: ROUTES.contact },
] as const;

export const dashboardNavItems: NavItem[] = [
  { title: "Dashboard", href: ROUTES.dashboard, icon: LayoutDashboard },
  { title: "Analytics", href: ROUTES.analytics, icon: BarChart3 },
  { title: "Assistant", href: ROUTES.assistant, icon: Bot },
  { title: "Leads", href: ROUTES.leads, icon: Users },
  { title: "Customers", href: ROUTES.customers, icon: UserCircle },
  { title: "Campaigns", href: ROUTES.campaigns, icon: Megaphone },
  { title: "Automation", href: ROUTES.automation, icon: Workflow },
  { title: "Integrations", href: ROUTES.integrations, icon: Plug },
  { title: "Settings", href: ROUTES.settings, icon: Settings },
];
