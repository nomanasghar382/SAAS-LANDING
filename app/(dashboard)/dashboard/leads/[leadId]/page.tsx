import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Mail } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLeads } from "@/constants/mock-data";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDate } from "@/utils/format";

interface LeadDetailPageProps {
  params: Promise<{ leadId: string }>;
}

export async function generateMetadata({ params }: LeadDetailPageProps) {
  const { leadId } = await params;
  const lead = mockLeads.find((l) => l.id === leadId);
  return { title: lead ? `${lead.name} — Lead` : "Lead Not Found" };
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { leadId } = await params;
  const lead = mockLeads.find((l) => l.id === leadId);

  if (!lead) notFound();

  return (
    <DashboardLayout title={lead.name} description={`Lead at ${lead.company}`}>
      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
        <Link href={ROUTES.leads}>
          <ArrowLeft className="h-4 w-4" />
          Back to leads
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lead Details</CardTitle>
              <Badge>{lead.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{lead.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{lead.email}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Deal Value</p>
                <p className="text-xl font-bold">{formatCurrency(lead.value)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lead Score</p>
                <p className="text-xl font-bold">{lead.score}/100</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Source</p>
                <p className="text-xl font-bold capitalize">
                  {lead.source.replace("_", " ")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="text-muted-foreground">Created</p>
              <p className="font-medium">{formatDate(lead.createdAt)}</p>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Last updated</p>
              <p className="font-medium">{formatDate(lead.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
