import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LeadsModule } from "@/features/leads/components/leads-module";

export const metadata: Metadata = {
  title: "Leads",
  description: "Manage and track your sales leads with SellPilot AI.",
};

export default function LeadsPage() {
  return (
    <DashboardLayout
      title="Leads"
      description="Manage and track your sales leads"
    >
      <LeadsModule />
    </DashboardLayout>
  );
}
