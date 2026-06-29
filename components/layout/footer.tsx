import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { SITE_OWNER } from "@/constants/site";
import { env } from "@/lib/env";

const footerLinks = {
  product: [
    { title: "Pricing", href: ROUTES.pricing },
    { title: "About", href: ROUTES.about },
    { title: "Contact", href: ROUTES.contact },
  ],
  legal: [
    { title: "Privacy", href: ROUTES.privacy },
    { title: "Terms", href: ROUTES.terms },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2">
            <Link href={ROUTES.home} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                SP
              </div>
              <span className="text-lg font-semibold">{env.NEXT_PUBLIC_APP_NAME}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              AI-powered sales automation platform that helps teams close more
              deals with intelligent lead management and campaign optimization.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="font-medium text-foreground">{SITE_OWNER.name}</li>
              <li>
                <a
                  href={`mailto:${SITE_OWNER.email}`}
                  className="hover:text-foreground ds-transition"
                >
                  {SITE_OWNER.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_OWNER.phoneTel}`}
                  className="hover:text-foreground ds-transition"
                >
                  {SITE_OWNER.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {env.NEXT_PUBLIC_APP_NAME}. Founded by{" "}
          {SITE_OWNER.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
