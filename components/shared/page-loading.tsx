import { cn } from "@/lib/utils";

interface PageLoadingProps {
  className?: string;
  label?: string;
}

export function PageLoading({ className, label = "Loading" }: PageLoadingProps) {
  return (
    <div
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center gap-4",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-muted" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
      <p className="text-sm text-muted-foreground">{label}...</p>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6 animate-pulse" aria-hidden="true">
      <div className="h-8 w-48 rounded-md bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-muted" />
        ))}
      </div>
      <div className="h-64 rounded-lg bg-muted" />
    </div>
  );
}
