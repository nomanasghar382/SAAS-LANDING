import { ImageResponse } from "next/og";
import { env } from "@/lib/env";

export const runtime = "edge";
export const alt = env.NEXT_PUBLIC_APP_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f0f12 0%, #1a1033 50%, #0f172a 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            SP
          </div>
          <span style={{ fontSize: 28, fontWeight: 600, opacity: 0.9 }}>
            {env.NEXT_PUBLIC_APP_NAME}
          </span>
        </div>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          Close more deals with intelligent automation
        </h1>
        <p
          style={{
            fontSize: 28,
            marginTop: 24,
            opacity: 0.75,
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          AI-powered sales automation for modern revenue teams
        </p>
      </div>
    ),
    { ...size }
  );
}
