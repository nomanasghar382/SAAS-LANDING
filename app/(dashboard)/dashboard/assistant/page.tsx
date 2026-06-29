"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { AssistantModule } from "@/features/assistant/components/assistant-module";

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
