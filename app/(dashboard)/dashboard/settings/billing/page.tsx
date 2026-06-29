import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Billing Settings",
};

export default function BillingSettingsPage() {
  return (
    <DashboardLayout title="Billing" description="Manage your subscription and payments">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">Professional</p>
                <p className="text-sm text-muted-foreground">$79/month</p>
              </div>
              <Badge>Active</Badge>
            </div>
            <Button variant="outline">Upgrade plan</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Visa ending in 4242</p>
            <p className="text-sm text-muted-foreground">Expires 12/2027</p>
            <Button variant="outline">Update payment method</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
