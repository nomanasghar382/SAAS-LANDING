import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getLeadScoreColor } from "@/utils/crm";

interface LeadScoreBadgeProps {
  score: number;
  showBar?: boolean;
}

export function LeadScoreBadge({ score, showBar = false }: LeadScoreBadgeProps) {
  const colors = getLeadScoreColor(score);

  if (showBar) {
    return (
      <div className="flex items-center justify-end gap-2">
        <Progress
          value={score}
          className="h-1.5 w-16"
          indicatorClassName={colors.bar}
          aria-label={`Lead score ${score} out of 100`}
        />
        <span className={cn("text-sm font-semibold tabular-nums", colors.badge)}>
          {score}
        </span>
      </div>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-[2rem] items-center justify-center rounded-md bg-muted/60 px-1.5 text-xs font-semibold tabular-nums",
        colors.badge
      )}
      aria-label={`Lead score ${score}`}
    >
      {score}
    </span>
  );
}
