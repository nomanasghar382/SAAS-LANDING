import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata(
  "Terms of Service",
  "Terms and conditions for using SellPilot AI."
);

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-muted-foreground">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>
      <div className="mt-10 space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Service description
          </h2>
          <p className="mt-2 leading-relaxed">
            SellPilot provides AI-powered sales automation tools including lead
            management, campaign optimization, and workflow automation.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Acceptable use
          </h2>
          <p className="mt-2 leading-relaxed">
            You agree to use the platform lawfully and not to misuse AI features
            for spam, harassment, or unauthorized data collection.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p className="mt-2 leading-relaxed">
            For questions about these terms, contact legal@sellpilot.ai.
          </p>
        </section>
      </div>
    </div>
  );
}
