import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { dashboardMetadata } from "@/lib/metadata";
import { CreditCard, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = dashboardMetadata(
  "Settings",
  "Manage your account and preferences"
);

const settingsSections = [
  {
    title: "Profile",
    description: "Manage your personal information and preferences",
    href: ROUTES.settingsProfile,
    icon: User,
  },
  {
    title: "Team",
    description: "Invite team members and manage roles",
    href: ROUTES.settingsTeam,
    icon: Users,
  },
  {
    title: "Billing",
    description: "Manage subscription, invoices, and payment methods",
    href: ROUTES.settingsBilling,
    icon: CreditCard,
  },
];

export default function SettingsPage() {
  return (
    <DashboardLayout
      title="Settings"
      description="Manage your account and preferences"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {settingsSections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className={cn(
              "group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
          >
            <Card className="h-full ds-transition group-hover:shadow-md group-hover:border-primary/20">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <section.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 ds-transition group-hover:opacity-100">
                  Manage
                  <ArrowRight className="h-3 w-3" />
                </span>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
