import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ProfileSettingsForm } from "@/features/settings/components/profile-settings-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardMetadata } from "@/lib/metadata";

export const metadata = dashboardMetadata(
  "Profile Settings",
  "Manage your personal information"
);

export default function ProfileSettingsPage() {
  return (
    <DashboardLayout title="Profile" description="Manage your personal information">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileSettingsForm />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
