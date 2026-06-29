import { cn } from "@/lib/utils";

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-[300px] w-full animate-pulse rounded-lg bg-muted/60", className)}
      aria-hidden="true"
    />
  );
}
