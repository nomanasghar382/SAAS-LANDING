import { DashboardShell } from "@/components/layout/dashboard-shell";
import { DashboardProviders } from "@/components/providers/dashboard-providers";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell>
      <DashboardProviders />
      {children}
    </DashboardShell>
  );
}
