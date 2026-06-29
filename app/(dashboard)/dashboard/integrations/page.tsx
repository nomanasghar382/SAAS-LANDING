import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Integrations",
};

const integrations = [
  {
    name: "Salesforce",
    description: "Sync leads and opportunities with Salesforce CRM",
    connected: true,
  },
  {
    name: "HubSpot",
    description: "Import contacts and track engagement",
    connected: false,
  },
  {
    name: "Gmail",
    description: "Send and track emails directly from SellPilot",
    connected: true,
  },
  {
    name: "Slack",
    description: "Get notifications and updates in Slack channels",
    connected: false,
  },
  {
    name: "Google Calendar",
    description: "Schedule meetings and sync availability",
    connected: false,
  },
  {
    name: "Zapier",
    description: "Connect with 5,000+ apps via Zapier",
    connected: false,
  },
];

export default function IntegrationsPage() {
  return (
    <DashboardLayout
      title="Integrations"
      description="Connect your favorite tools and services"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.name}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{integration.name}</CardTitle>
                {integration.connected && (
                  <Badge variant="success">Connected</Badge>
                )}
              </div>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant={integration.connected ? "outline" : "default"}
                size="sm"
              >
                {integration.connected ? "Manage" : "Connect"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
