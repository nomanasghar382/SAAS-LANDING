import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Workflow } from "lucide-react";

export const metadata = {
  title: "Automation",
};

const workflows = [
  {
    id: "1",
    name: "New Lead Welcome Sequence",
    trigger: "Lead created",
    actions: 3,
    status: "active" as const,
  },
  {
    id: "2",
    name: "Follow-up Reminder",
    trigger: "No activity for 3 days",
    actions: 2,
    status: "active" as const,
  },
  {
    id: "3",
    name: "Deal Won Celebration",
    trigger: "Lead status → Won",
    actions: 4,
    status: "paused" as const,
  },
];

export default function AutomationPage() {
  return (
    <DashboardLayout
      title="Automation"
      description="Build workflows to automate your sales process"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Workflow className="h-5 w-5" />
                </div>
                <Badge variant={workflow.status === "active" ? "success" : "warning"}>
                  {workflow.status}
                </Badge>
              </div>
              <CardTitle className="text-base">{workflow.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Trigger: {workflow.trigger}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {workflow.actions} actions
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
