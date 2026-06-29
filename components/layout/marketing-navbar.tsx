"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { marketingNavItems } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { env } from "@/lib/env";

export function MarketingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
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

            <nav
              className="hidden items-center gap-6 md:flex"
              aria-label="Main navigation"
            >
              {marketingNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground ds-transition hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
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

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-full max-w-xs p-0">
          <SheetHeader className="border-b p-4">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <SheetBody className="p-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {marketingNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium ds-transition hover:bg-accent"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-2 border-t pt-6">
              <Button variant="outline" asChild>
                <Link href={ROUTES.login} onClick={() => setMobileOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button asChild>
                <Link href={ROUTES.signup} onClick={() => setMobileOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </SheetBody>
        </SheetContent>
      </Sheet>
    </>
  );
}
