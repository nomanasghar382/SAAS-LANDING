import { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageLoading } from "@/components/shared/page-loading";
import { LeadsModule } from "@/features/leads/components/leads-module";
import { dashboardMetadata } from "@/lib/metadata";

export const metadata: Metadata = dashboardMetadata(
  "Leads",
  "Manage and track your sales leads with SellPilot AI."
);

export default function LeadsPage() {
  return (
    <DashboardLayout
      title="Leads"
      description="Manage and track your sales leads"
    >
      <Suspense fallback={<PageLoading label="Loading leads" />}>
        <LeadsModule />
      </Suspense>
    </DashboardLayout>
  );
}
