import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = {
  title: "Team Settings",
};

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
          <Button>Invite member</Button>
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
