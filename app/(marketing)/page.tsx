import type { Metadata } from "next";
import { CtaSection } from "@/features/marketing/components/cta-section";
import { FeaturesSection } from "@/features/marketing/components/features-section";
import { HeroSection } from "@/features/marketing/components/hero-section";
import { SocialProofSection } from "@/features/marketing/components/social-proof-section";

export const metadata: Metadata = {
  title: "AI Sales Automation Platform",
  description:
    "SellPilot AI helps sales teams qualify leads, automate outreach, and close more deals with intelligent automation.",
  openGraph: {
    title: "SellPilot AI — AI Sales Automation",
    description:
      "Close more deals with intelligent sales automation powered by AI.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SocialProofSection />
      <CtaSection />
    </>
  );
}
