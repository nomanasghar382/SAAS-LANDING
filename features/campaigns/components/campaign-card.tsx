import { Calendar, Target, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  onClick?: () => void;
}

export function CampaignCard({ campaign, onClick }: CampaignCardProps) {
  const conversionRate =
    campaign.leads > 0
      ? ((campaign.conversions / campaign.leads) * 100).toFixed(1)
      : "0";

  return (
    <Card
      className={onClick ? "cursor-pointer transition-shadow hover:shadow-md" : undefined}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight">
            {campaign.name}
          </CardTitle>
          <Badge variant={statusVariants[campaign.status]}>
            {campaign.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{campaign.description}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Leads</p>
              <p className="font-semibold">{campaign.leads}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Conversions</p>
              <p className="font-semibold">{campaign.conversions}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Conv. Rate</p>
              <p className="font-semibold">{conversionRate}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Started</p>
              <p className="font-semibold">{formatDate(campaign.startDate)}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-muted/50 px-3 py-2">
          <p className="text-xs text-muted-foreground">Revenue</p>
          <p className="text-lg font-bold text-primary">
            {formatCurrency(campaign.revenue)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
