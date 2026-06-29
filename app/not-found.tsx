import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Button variant="outline" asChild>
          <Link href={ROUTES.home}>
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </Button>
        <Button asChild>
          <Link href={ROUTES.dashboard}>Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
