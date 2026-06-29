import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { CreditCard, User, Users } from "lucide-react";

export const metadata = {
  title: "Settings",
};

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
          <Link key={section.title} href={section.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <section.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
