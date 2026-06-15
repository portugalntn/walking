import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: "/:locale/portal",
        destination: "/:locale",
        permanent: false,
      },
      {
        source: "/:locale/portal/:path*",
        destination: "/:locale",
        permanent: false,
      },
      {
        source: "/:locale/destinations",
        destination: "/:locale/programas",
        permanent: true,
      },
      {
        source: "/:locale/destinations/:id",
        destination: "/:locale/programas/:id",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
