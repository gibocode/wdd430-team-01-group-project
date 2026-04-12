import type { NextConfig } from "next";

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
  },
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
