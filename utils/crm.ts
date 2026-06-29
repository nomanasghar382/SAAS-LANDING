export function getConversionRate(leads: number, conversions: number): string {
  if (leads <= 0) return "0";
  return ((conversions / leads) * 100).toFixed(1);
}

export function getLeadScoreLabel(score: number): string {
  if (score >= 80) return "Hot lead";
  if (score >= 60) return "Warm lead";
  return "Cold lead";
}

export function getLeadScoreColor(score: number) {
  if (score >= 80) {
    return {
      badge: "text-emerald-700 dark:text-emerald-400",
      bar: "bg-emerald-500",
    };
  }
  if (score >= 60) {
    return {
      badge: "text-amber-700 dark:text-amber-400",
      bar: "bg-amber-500",
    };
  }
  return {
    badge: "text-muted-foreground",
    bar: "bg-muted-foreground/50",
  };
}
