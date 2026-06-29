"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LeadsModule } from "@/features/leads/components/leads-module";

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
