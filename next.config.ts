import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async redirects() {
    // The :locale segment is constrained to the real locales. Without it a
    // source like "/:locale/portal/:path*" also matches "/images/portal/...",
    // which sent every file under public/images/portal to a redirect.
    return [
      {
        source: "/:locale(en|pt|es)/portal",
        destination: "/:locale",
        permanent: false,
      },
      {
        source: "/:locale(en|pt|es)/portal/:path*",
        destination: "/:locale",
        permanent: false,
      },
      {
        source: "/:locale(en|pt|es)/destinations",
        destination: "/:locale/programas",
        permanent: true,
      },
      {
        source: "/:locale(en|pt|es)/destinations/:id",
        destination: "/:locale/programas/:id",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
