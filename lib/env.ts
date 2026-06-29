import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("SellPilot AI"),
  AUTH_SECRET: z
    .string()
    .min(32)
    .default("sellpilot-dev-secret-change-in-production-32chars"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  AUTH_SECRET: process.env.AUTH_SECRET,
});
