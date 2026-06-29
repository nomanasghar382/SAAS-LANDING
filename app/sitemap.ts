import type { MetadataRoute } from "next";
import { ROUTES } from "@/constants/routes";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://sellpilot.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const marketingRoutes = [
    ROUTES.home,
    ROUTES.pricing,
    ROUTES.about,
    ROUTES.contact,
    ROUTES.privacy,
    ROUTES.terms,
  ];

  return marketingRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === ROUTES.home ? "weekly" : "monthly",
    priority: route === ROUTES.home ? 1 : 0.7,
  }));
}
