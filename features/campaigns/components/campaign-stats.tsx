import { DollarSign, Mail, Target, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";
import type { Campaign } from "@/types";

interface CampaignStatsProps {
  campaigns: Campaign[];
}

export function CampaignStats({ campaigns }: CampaignStatsProps) {
  const totals = campaigns.reduce(
    (acc, c) => ({
      revenue: acc.revenue + c.revenue,
      leads: acc.leads + c.leads,
      conversions: acc.conversions + c.conversions,
      emailsSent: acc.emailsSent + c.emailsSent,
    }),
    { revenue: 0, leads: 0, conversions: 0, emailsSent: 0 }
  );

  const avgOpenRate =
    campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length;

  const stats = [
    {
      label: "Total Revenue",
      value: formatCurrency(totals.revenue),
      icon: DollarSign,
      change: "+18.2%",
    },
    {
      label: "Avg. Open Rate",
      value: `${avgOpenRate.toFixed(1)}%`,
      icon: Mail,
      change: "+3.4%",
    },
    {
      label: "Conversions",
      value: totals.conversions.toString(),
      icon: Target,
      change: "+12.1%",
    },
    {
      label: "Emails Sent",
      value: totals.emailsSent.toLocaleString(),
      icon: TrendingUp,
      change: "+8.7%",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} variant="elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {stat.change}
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-xl font-bold tabular-nums">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
