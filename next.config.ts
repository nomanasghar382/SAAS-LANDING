import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "@react-three/drei",
      "framer-motion",
    ],
  },
};

export default nextConfig;
