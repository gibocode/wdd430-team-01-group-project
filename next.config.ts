import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/",
      },
      {
        protocol: "https",
        hostname: "*.mypinata.cloud",
        port: "",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
