import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface LeadScoreBadgeProps {
  score: number;
  showBar?: boolean;
}

function getScoreColor(score: number) {
  if (score >= 80) return { badge: "text-emerald-700 dark:text-emerald-400", bar: "bg-emerald-500" };
  if (score >= 60) return { badge: "text-amber-700 dark:text-amber-400", bar: "bg-amber-500" };
  return { badge: "text-muted-foreground", bar: "bg-muted-foreground/50" };
}

export function LeadScoreBadge({ score, showBar = false }: LeadScoreBadgeProps) {
  const colors = getScoreColor(score);

  if (showBar) {
    return (
      <div className="flex items-center gap-2">
        <Progress
          value={score}
          className="h-1.5 w-16"
          indicatorClassName={colors.bar}
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
    >
      {score}
    </span>
  );
}
