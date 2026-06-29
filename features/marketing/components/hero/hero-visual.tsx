"use client";

import dynamic from "next/dynamic";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { HeroFallback } from "./hero-fallback";

const HeroScene = dynamic(
  () => import("./hero-scene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] w-full sm:h-[520px]">
        <HeroFallback />
      </div>
    ),
  }
);

export function HeroVisual() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (isMobile || prefersReducedMotion) {
    return <HeroFallback />;
  }

  return (
    <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[560px]">
      <HeroScene />
    </div>
  );
}
