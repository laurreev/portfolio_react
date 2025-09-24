import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    qualities: [16, 32, 48, 60, 64, 75, 96, 100, 128, 256, 384]
  }
};

export default nextConfig;
