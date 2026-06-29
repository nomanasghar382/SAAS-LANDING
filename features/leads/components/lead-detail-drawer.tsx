"use client";

import {
  Building2,
  Calendar,
  Mail,
  Phone,
  StickyNote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/lib/toast";
import { LeadScoreBadge } from "./lead-score-badge";
import { leadStatusVariants } from "@/constants/status-variants";
import { formatCurrency, formatDate } from "@/utils/format";
import { getLeadScoreLabel } from "@/utils/crm";
import type { Lead } from "@/types";

interface LeadDetailDrawerProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadDetailDrawer({
  lead,
  open,
  onOpenChange,
}: LeadDetailDrawerProps) {
  if (!lead) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-start justify-between pr-8">
            <div>
              <SheetTitle>{lead.name}</SheetTitle>
              <SheetDescription>{lead.company}</SheetDescription>
            </div>
            <Badge variant={leadStatusVariants[lead.status]}>{lead.status}</Badge>
          </div>
        </SheetHeader>

        <SheetBody className="space-y-6">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Lead Score
            </p>
            <div className="mt-2 flex items-center gap-3">
              <LeadScoreBadge score={lead.score} showBar />
              <span className="text-xs text-muted-foreground">
                {getLeadScoreLabel(lead.score)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Contact</h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <a href={`mailto:${lead.email}`} className="hover:underline">
                  {lead.email}
                </a>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <a href={`tel:${lead.phone}`} className="hover:underline">
                    {lead.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span>{lead.company}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Deal Value</p>
              <p className="mt-1 text-lg font-bold tabular-nums">
                {formatCurrency(lead.value)}
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Source</p>
              <p className="mt-1 text-sm font-medium capitalize">
                {lead.source.replace("_", " ")}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Timeline</h4>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>Created {formatDate(lead.createdAt)}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>Updated {formatDate(lead.updatedAt)}</span>
            </div>
          </div>

          {lead.notes && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold">
                <StickyNote className="h-4 w-4" aria-hidden="true" />
                Notes
              </h4>
              <p className="rounded-lg bg-muted/30 p-3 text-sm text-muted-foreground leading-relaxed">
                {lead.notes}
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button className="flex-1" asChild>
              <a href={`mailto:${lead.email}?subject=Following up — ${lead.company}`}>
                Send email
              </a>
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() =>
                toast.success("Call scheduled", `Calendar invite sent to ${lead.name}.`)
              }
            >
              Schedule call
            </Button>
          </div>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
