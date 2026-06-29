import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { EmptyState } from "@/components/shared/empty-state";
import { LeadCard } from "@/features/leads/components/lead-card";
import { ROUTES } from "@/constants/routes";
import { mockLeads } from "@/constants/mock-data";
import { UserCircle } from "lucide-react";

export const metadata = {
  title: "Customers",
};

export default function CustomersPage() {
  const customers = mockLeads.filter((lead) => lead.status === "won");

  return (
    <DashboardLayout
      title="Customers"
      description="View and manage your customer relationships"
    >
      {customers.length === 0 ? (
        <EmptyState
          icon={UserCircle}
          title="No customers yet"
          description="Won leads will appear here once you close deals in your pipeline."
          action={{ label: "View leads", href: ROUTES.leads }}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {customers.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
