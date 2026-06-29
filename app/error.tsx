"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-destructive">Something went wrong</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">
        We hit an unexpected error
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Our team has been notified. Try refreshing the page or return to the dashboard.
      </p>
      <div className="mt-8 flex gap-3">
        <Button variant="outline" onClick={() => window.location.href = "/"}>
          Go home
        </Button>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
