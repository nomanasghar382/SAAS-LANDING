import Link from "next/link";
import { Building2, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { leadStatusVariants } from "@/constants/status-variants";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format";
import type { Lead } from "@/types";

interface LeadCardProps {
  lead: Lead;
  href?: string;
  onClick?: () => void;
}

export function LeadCard({ lead, href, onClick }: LeadCardProps) {
  const content = (
    <>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{lead.name}</CardTitle>
          <Badge variant="secondary">{lead.score}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4" aria-hidden="true" />
          {lead.company}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" aria-hidden="true" />
          {lead.email}
        </div>
        <div className="flex items-center justify-between pt-2">
          <Badge variant={leadStatusVariants[lead.status]}>{lead.status}</Badge>
          <span className="text-sm font-semibold">
            {formatCurrency(lead.value)}
          </span>
        </div>
      </CardContent>
    </>
  );

  const className = cn(
    "block h-full ds-transition",
    (href || onClick) && "hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        <Card variant="interactive" className="h-full">
          {content}
        </Card>
      </Link>
    );
  }

  return (
    <Card
      className={cn(className, onClick && "cursor-pointer")}
      onClick={onClick}
    >
      {content}
    </Card>
  );
}
