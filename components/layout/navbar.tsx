import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { marketingNavItems } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { env } from "@/lib/env";

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href={ROUTES.home} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              SP
            </div>
            <span className="text-lg font-semibold tracking-tight">
              {env.NEXT_PUBLIC_APP_NAME}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {marketingNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="md:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link href={ROUTES.login}>Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={ROUTES.signup}>Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
