import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // Match all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Allow all origins
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          }, // Allowed methods
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          }, // Allowed headers
        ],
      },
    ];
  },
};

export default nextConfig;
