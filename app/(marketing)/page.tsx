import { CtaSection } from "@/features/marketing/components/cta-section";
import { FeaturesSection } from "@/features/marketing/components/features-section";
import { HeroSection } from "@/features/marketing/components/hero-section";
import { SocialProofSection } from "@/features/marketing/components/social-proof-section";

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
