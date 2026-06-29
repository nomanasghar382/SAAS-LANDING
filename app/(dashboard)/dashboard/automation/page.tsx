import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { WorkflowBuilder } from "@/features/automation/components/workflow-builder";

export const metadata = {
  title: "Automation",
};

export default function AutomationPage() {
  return (
    <DashboardLayout
      title="Automation"
      description="Build workflows to automate your sales process"
    >
      <WorkflowBuilder />
    </DashboardLayout>
  );
}
