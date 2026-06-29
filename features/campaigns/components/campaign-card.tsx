import Link from "next/link";
import { Calendar, Mail, Target, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDate } from "@/utils/format";
import type { Campaign, CampaignStatus } from "@/types";

const statusVariants: Record<
  CampaignStatus,
  "default" | "secondary" | "success" | "warning"
> = {
  draft: "secondary",
  active: "success",
  paused: "warning",
  completed: "default",
};

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const conversionRate =
    campaign.leads > 0
      ? ((campaign.conversions / campaign.leads) * 100).toFixed(1)
      : "0";

  return (
    <Link href={`${ROUTES.campaigns}/${campaign.id}`}>
      <Card variant="interactive" className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-tight">
              {campaign.name}
            </CardTitle>
            <Badge variant={statusVariants[campaign.status]}>
              {campaign.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {campaign.description}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Leads</p>
                <p className="font-semibold tabular-nums">{campaign.leads}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Conversions</p>
                <p className="font-semibold tabular-nums">{campaign.conversions}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Open Rate</p>
                <p className="font-semibold tabular-nums">{campaign.openRate}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Conv. Rate</p>
                <p className="font-semibold tabular-nums">{conversionRate}%</p>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Open rate</span>
              <span className="font-medium">{campaign.openRate}%</span>
            </div>
            <Progress value={campaign.openRate} indicatorClassName="bg-primary" />
          </div>

          <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2.5">
            <div>
              <p className="text-xs text-muted-foreground">Revenue</p>
              <p className="text-lg font-bold text-primary tabular-nums">
                {formatCurrency(campaign.revenue)}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(campaign.startDate)}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
