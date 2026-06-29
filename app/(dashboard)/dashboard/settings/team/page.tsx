import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TeamActions } from "@/features/settings/components/team-actions";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dashboardMetadata } from "@/lib/metadata";

export const metadata = dashboardMetadata(
  "Team Settings",
  "Manage team members and roles"
);

const teamMembers = [
  { name: "John Doe", email: "john@company.com", role: "Owner" },
  { name: "Sarah Chen", email: "sarah@company.com", role: "Admin" },
  { name: "Mike Torres", email: "mike@company.com", role: "Member" },
];

export default function TeamSettingsPage() {
  return (
    <DashboardLayout title="Team" description="Manage team members and roles">
      <div className="space-y-4">
        <div className="flex justify-end">
          <TeamActions />
        </div>
        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.email}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{member.role}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
