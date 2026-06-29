import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { env } from "@/lib/env";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appName = env.NEXT_PUBLIC_APP_NAME;
const appDescription =
  "AI-powered sales automation platform for modern sales teams. Close more deals with intelligent lead scoring, campaigns, and automation.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://sellpilot.ai"
  ),
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: appDescription,
  keywords: [
    "sales automation",
    "AI sales",
    "CRM",
    "lead scoring",
    "sales assistant",
    "SaaS",
  ],
  authors: [{ name: appName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: appName,
    title: appName,
    description: appDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: appName,
    description: appDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
