import { FaqSection } from "@/features/marketing/components/faq-section";
import { PricingPlans } from "@/features/marketing/components/pricing-plans";
import { marketingMetadata } from "@/lib/metadata";

export const metadata = marketingMetadata(
  "Pricing",
  "Simple, transparent pricing for sales teams of every size."
);

export default function PricingPage() {
  return (
    <div className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your team. All plans include a 14-day free
            trial.
          </p>
        </div>

        <PricingPlans />
      </div>
      <FaqSection />
    </div>
  );
}
