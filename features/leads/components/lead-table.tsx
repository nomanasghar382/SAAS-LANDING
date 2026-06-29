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
import { leadStatusVariants } from "@/constants/status-variants";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/utils/format";
import type { Lead, LeadSort, LeadSortField } from "@/types";

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
    return <ArrowUpDown className="ml-1 inline h-3.5 w-3.5 opacity-40" aria-hidden="true" />;
  }
  return sort.direction === "asc" ? (
    <ArrowUp className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
  ) : (
    <ArrowDown className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
  );
}

export function LeadTable({
  leads,
  sort,
  onSortChange,
  onLeadSelect,
}: LeadTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card shadow-xs">
      <Table responsive={false}>
        <TableHeader>
          <TableRow>
            {sortableColumns.map((col) => (
              <TableHead
                key={col.field}
                scope="col"
                aria-sort={
                  sort.field === col.field
                    ? sort.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                className={cn(
                  "cursor-pointer select-none ds-transition hover:text-foreground",
                  (col.field === "value" || col.field === "score") && "text-right"
                )}
                aria-label={`Sort by ${col.label}`}
                onClick={() => onSortChange(col.field)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSortChange(col.field);
                  }
                }}
                tabIndex={0}
                role="columnheader"
              >
                {col.label}
                <SortIcon field={col.field} sort={sort} />
              </TableHead>
            ))}
            <TableHead scope="col" className="hidden lg:table-cell">
              Source
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-32 text-center text-muted-foreground"
              >
                No leads found matching your filters.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow
                key={lead.id}
                className="cursor-pointer"
                onClick={() => onLeadSelect(lead)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onLeadSelect(lead);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${lead.name}`}
              >
                <TableCell>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                </TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>
                  <Badge variant={leadStatusVariants[lead.status]}>
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
