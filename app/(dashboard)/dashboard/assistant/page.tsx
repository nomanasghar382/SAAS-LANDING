import type { Metadata } from "next";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AssistantModule } from "@/features/assistant/components/assistant-module";

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "Your intelligent sales copilot powered by SellPilot AI.",
};

export default function AssistantPage() {
  return (
    <DashboardLayout
      title="AI Assistant"
      description="Your intelligent sales copilot"
    >
      <AssistantModule />
    </DashboardLayout>
  );
}
