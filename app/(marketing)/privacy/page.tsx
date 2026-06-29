import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata(
  "Privacy Policy",
  "How SellPilot AI collects, uses, and protects your data."
);

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-muted-foreground">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>
      <div className="mt-10 space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            Information we collect
          </h2>
          <p className="mt-2 leading-relaxed">
            We collect account information (name, email), usage data, and
            integration data necessary to provide sales automation services.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            How we use your data
          </h2>
          <p className="mt-2 leading-relaxed">
            Data is used to deliver AI-assisted sales features, improve product
            performance, and provide customer support. We do not sell your
            personal information.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p className="mt-2 leading-relaxed">
            For privacy inquiries, contact us at privacy@sellpilot.ai.
          </p>
        </section>
      </div>
    </div>
  );
}
