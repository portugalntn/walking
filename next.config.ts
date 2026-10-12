import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { writeContentIndex, watchContentIndex } from "./scripts/content-index.mjs";

// content/*.json (edited in FLOW, pulled by scripts/pull-content.mjs) -> lib/content.generated.ts.
writeContentIndex();
if (process.env.NODE_ENV === "development") watchContentIndex();

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    // Photos uploaded in FLOW live in its Supabase Storage (bucket "walking").
    remotePatterns: [new URL("https://zglwfzqbrcuwrzzqqnec.supabase.co/storage/v1/object/public/walking/**")],
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
