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
import { LeadScoreBadge } from "./lead-score-badge";
import { formatCurrency, formatDate } from "@/utils/format";
import type { Lead, LeadStatus } from "@/types";

const statusVariants: Record<
  LeadStatus,
  "default" | "secondary" | "success" | "warning" | "destructive" | "outline"
> = {
  new: "secondary",
  contacted: "outline",
  qualified: "default",
  proposal: "warning",
  won: "success",
  lost: "destructive",
};

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
            <Badge variant={statusVariants[lead.status]}>{lead.status}</Badge>
          </div>
        </SheetHeader>

        <SheetBody className="space-y-6">
          {/* Score */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Lead Score
            </p>
            <div className="mt-2 flex items-center gap-3">
              <LeadScoreBadge score={lead.score} showBar />
              <span className="text-xs text-muted-foreground">
                {lead.score >= 80
                  ? "Hot lead"
                  : lead.score >= 60
                    ? "Warm lead"
                    : "Cold lead"}
              </span>
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Contact</h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{lead.email}</span>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{lead.company}</span>
              </div>
            </div>
          </div>

          {/* Deal info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Deal Value</p>
              <p className="mt-1 text-lg font-bold">{formatCurrency(lead.value)}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Source</p>
              <p className="mt-1 text-sm font-medium capitalize">
                {lead.source.replace("_", " ")}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Timeline</h4>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Created {formatDate(lead.createdAt)}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Updated {formatDate(lead.updatedAt)}</span>
            </div>
          </div>

          {/* Notes */}
          {lead.notes && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold">
                <StickyNote className="h-4 w-4" />
                Notes
              </h4>
              <p className="rounded-lg bg-muted/30 p-3 text-sm text-muted-foreground leading-relaxed">
                {lead.notes}
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button className="flex-1">Send email</Button>
            <Button variant="outline" className="flex-1">
              Schedule call
            </Button>
          </div>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
