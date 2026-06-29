import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CampaignsModule } from "@/features/campaigns/components/campaigns-module";

export const metadata = {
  title: "Campaigns",
};

export default function CampaignsPage() {
  return (
    <DashboardLayout
      title="Campaigns"
      description="Create and manage your sales campaigns"
    >
      <CampaignsModule />
    </DashboardLayout>
  );
}
