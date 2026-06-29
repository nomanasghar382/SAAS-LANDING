import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LeadCard } from "@/features/leads/components/lead-card";
import { mockLeads } from "@/constants/mock-data";

export const metadata = {
  title: "Customers",
};

export default function CustomersPage() {
  return (
    <DashboardLayout
      title="Customers"
      description="View and manage your customer relationships"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockLeads
          .filter((lead) => lead.status === "won")
          .map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
      </div>
    </DashboardLayout>
  );
}
