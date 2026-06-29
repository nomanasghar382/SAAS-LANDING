import type { Metadata } from "next";
import { ContactForm } from "@/features/marketing/components/contact-form";
import { SITE_OWNER } from "@/constants/site";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE_OWNER.name}, founder of SellPilot AI.`,
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get in touch
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? Reach out directly to our team.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:mt-16 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <User className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {SITE_OWNER.role}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">{SITE_OWNER.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      SellPilot AI
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {[
              {
                icon: Mail,
                title: "Email",
                detail: SITE_OWNER.email,
                href: `mailto:${SITE_OWNER.email}`,
              },
              {
                icon: Phone,
                title: "Phone",
                detail: SITE_OWNER.phoneDisplay,
                href: `tel:${SITE_OWNER.phoneTel}`,
              },
              {
                icon: MapPin,
                title: "Location",
                detail: SITE_OWNER.location,
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground ds-transition hover:text-primary"
                    >
                      {item.detail}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
