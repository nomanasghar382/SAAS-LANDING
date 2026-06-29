"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeadScoreBadge } from "./lead-score-badge";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/utils/format";
import type { Lead, LeadSort, LeadSortField, LeadStatus } from "@/types";

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

interface LeadTableProps {
  leads: Lead[];
  sort: LeadSort;
  onSortChange: (field: LeadSortField) => void;
  onLeadSelect: (lead: Lead) => void;
}

const sortableColumns: { field: LeadSortField; label: string }[] = [
  { field: "name", label: "Name" },
  { field: "company", label: "Company" },
  { field: "status", label: "Status" },
  { field: "value", label: "Value" },
  { field: "score", label: "Score" },
  { field: "updatedAt", label: "Updated" },
];

function SortIcon({
  field,
  sort,
}: {
  field: LeadSortField;
  sort: LeadSort;
}) {
  if (sort.field !== field) {
    return <ArrowUpDown className="ml-1 inline h-3.5 w-3.5 opacity-40" />;
  }
  return sort.direction === "asc" ? (
    <ArrowUp className="ml-1 inline h-3.5 w-3.5" />
  ) : (
    <ArrowDown className="ml-1 inline h-3.5 w-3.5" />
  );
}

export function LeadTable({
  leads,
  sort,
  onSortChange,
  onLeadSelect,
}: LeadTableProps) {
  return (
    <div className="rounded-lg border bg-card shadow-xs">
      <Table responsive={false}>
        <TableHeader>
          <TableRow>
            {sortableColumns.map((col) => (
              <TableHead
                key={col.field}
                className={cn(
                  "cursor-pointer select-none ds-transition hover:text-foreground",
                  (col.field === "value" || col.field === "score") && "text-right"
                )}
                onClick={() => onSortChange(col.field)}
              >
                {col.label}
                <SortIcon field={col.field} sort={sort} />
              </TableHead>
            ))}
            <TableHead className="hidden lg:table-cell">Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                No leads found matching your filters.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow
                key={lead.id}
                className="cursor-pointer"
                onClick={() => onLeadSelect(lead)}
              >
                <TableCell>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                </TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>
                  <Badge variant={statusVariants[lead.status]}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  {formatCurrency(lead.value)}
                </TableCell>
                <TableCell className="text-right">
                  <LeadScoreBadge score={lead.score} showBar />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(lead.updatedAt)}
                </TableCell>
                <TableCell className="hidden capitalize text-muted-foreground lg:table-cell">
                  {lead.source.replace("_", " ")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
