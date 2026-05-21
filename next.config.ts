import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  allowedDevOrigins: ["100.87.19.41", "100.125.161.21"],
  // Cloudflare Pages 静态导出
  output: "export",
};

export default nextConfig;
