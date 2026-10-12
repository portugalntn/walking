"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { regions } from "@/lib/destinations";

// Visible regions in CMS order (hidden ones stay out, see lib/destinations.ts).
const destinations = regions.map((r, i) => ({
  id: r.id,
  num: String(i + 1).padStart(2, "0"),
  name: r.shortName ?? r.name,
  routes: r.routes,
  image: r.image,
}));

export function RoutesSection() {
  const t = useTranslations("home.routes");
  const locale = useLocale();

  return (
    <section
      id="routes"
      style={{
        backgroundColor: "var(--color-ntn-white)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <div className="container-ntn">

        {/* Header */}
        <FadeUp>
          <div style={{ marginBottom: "60px" }}>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{t("label")}</Overline>
            </div>
            <h2
              className="font-title text-display-lg"
              style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none" }}
            >
              {t("title")}
            </h2>
          </div>
        </FadeUp>

        {/* Destination grid — 4 cols portrait */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: "20px" }}
        >
          {destinations.map((dest, i) => (
            <m.a
              key={dest.id}
              href={`/${locale}/destinos/${dest.id}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="group relative block overflow-hidden"
              style={{ aspectRatio: "3/4", borderRadius: "8px" }}
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(29,29,26,0.05) 0%, transparent 40%, rgba(29,29,26,0.15) 60%, rgba(29,29,26,0.8) 100%)",
                }}
              />
              {/* Number — top left */}
              <span
                className="absolute top-5 left-5 font-title"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "14px",
                  letterSpacing: "0.1em",
                }}
              >
                {dest.num}
              </span>
              {/* Bottom info */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{ padding: "24px 24px 24px 28px" }}
              >
                <h3
                  className="font-ui"
                  style={{
                    color: "var(--color-ntn-white)",
                    fontSize: "22px",
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  {dest.name}
                </h3>
              </div>
            </m.a>
          ))}
        </div>
      </div>
    </section>
  );
}
