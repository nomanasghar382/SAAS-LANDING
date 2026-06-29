import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTES } from "@/constants/routes";
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

interface LeadTableProps {
  leads: Lead[];
}

export function LeadTable({ leads }: LeadTableProps) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="cursor-pointer">
              <TableCell>
                <Link
                  href={`${ROUTES.leads}/${lead.id}`}
                  className="block"
                >
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}</p>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`${ROUTES.leads}/${lead.id}`}>{lead.company}</Link>
              </TableCell>
              <TableCell>
                <Badge variant={statusVariants[lead.status]}>
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell className="capitalize">
                {lead.source.replace("_", " ")}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(lead.value)}
              </TableCell>
              <TableCell className="text-right">
                <span className="font-medium">{lead.score}</span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(lead.updatedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
