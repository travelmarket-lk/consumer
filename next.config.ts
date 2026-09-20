import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  allowedDevOrigins: [
    "192.168.145.1",
    "192.168.19.1",
    "10.124.143.36",
    "192.168.*.*",
    "10.*.*.*",
  ],
};

export default nextConfig;
