import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.0.101", "192.168.0.101:3000"],
  // Ghidul echipei e citit din fișiere Markdown la cerere: le includem în funcțiile de server.
  outputFileTracingIncludes: {
    "/echipa/**": ["./content/echipa/**/*"],
  },
  async headers() {
    return [
      {
        // Platforma internă a echipei: nu se indexează.
        source: "/echipa/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
