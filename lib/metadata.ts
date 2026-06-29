import type { Metadata } from "next";

export function dashboardMetadata(title: string, description?: string): Metadata {
  return {
    title,
    description,
    robots: { index: false, follow: false },
  };
}

export function marketingMetadata(
  title: string,
  description: string
): Metadata {
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}
