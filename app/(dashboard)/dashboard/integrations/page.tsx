import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { IntegrationsModule } from "@/features/integrations/components/integrations-module";

export const metadata = {
  title: "Integrations",
};

export default function IntegrationsPage() {
  return (
    <DashboardLayout
      title="Integrations"
      description="Connect your favorite tools and services"
    >
      <IntegrationsModule />
    </DashboardLayout>
  );
}
