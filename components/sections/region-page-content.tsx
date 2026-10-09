"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { FadeUp, FadeRight } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import type { Region, RouteProduct } from "@/lib/destinations";
import type { CardFacts } from "@/lib/program-facts";
import { ProgramCard } from "@/components/ui/program-card";
import { regionContent } from "@/lib/region-content";

const EASE = [0.19, 1, 0.22, 1] as const;
type Loc = "en" | "pt" | "es";

const L = {
  overline: { en: "Destination", pt: "Destino", es: "Destino" },
  essenceLabel: { en: "The territory", pt: "O território", es: "El territorio" },
  heritageLabel: { en: "Culture and table", pt: "Cultura e mesa", es: "Cultura y mesa" },
  programsHere: { en: "Programmes in this destination", pt: "Programas neste destino", es: "Programas en este destino" },
  programsLabel: { en: "Walk here", pt: "Caminhe aqui", es: "Camina aquí" },
  multiDays: { en: "Multi-day", pt: "Multidias", es: "Multidías" },
  oneDay: { en: "Day trips", pt: "1 dia", es: "1 día" },
  empty: {
    en: "Programmes for this destination are being prepared.",
    pt: "Os programas deste destino estão a ser preparados.",
    es: "Los programas de este destino se están preparando.",
  },
  ctaTitle: { en: "Ready to walk this destination?", pt: "Pronto para caminhar neste destino?", es: "¿Listo para caminar este destino?" },
  ctaBody: {
    en: "Pick a programme above, or tell us what you are looking for and we will tailor it to you.",
    pt: "Escolha um programa acima, ou diga-nos o que procura e desenhamos à medida.",
    es: "Elija un programa arriba, o díganos qué busca y lo diseñamos a medida.",
  },
  ctaPrograms: { en: "All programmes", pt: "Todos os programas", es: "Todos los programas" },
  back: { en: "All destinations", pt: "Todos os destinos", es: "Todos los destinos" },
};

export function RegionPageContent({
  region,
  routes,
  locale,
  facts,
}: {
  region: Region;
  routes: RouteProduct[];
  locale: Loc;
  facts: Record<string, CardFacts>;
}) {
  const content = regionContent[region.id];
  const multi = routes.filter((r) => r.format === "programa");
  const day = routes.filter((r) => r.format === "roteiro");
  const groups = [
    { label: L.multiDays[locale], items: multi },
    { label: L.oneDay[locale], items: day },
  ].filter((g) => g.items.length > 0);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex items-end" style={{ minHeight: "82vh" }}>
        <div className="absolute inset-0 z-0">
          <Image src={region.image} alt={region.name} fill priority className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(20,20,18,0.55) 0%, rgba(20,20,18,0.2) 38%, rgba(20,20,18,0.9) 100%)" }}
          />
        </div>
        <div className="relative z-10 container-ntn" style={{ paddingTop: "160px", paddingBottom: "80px" }}>
          <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: "18px" }}>
            <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">{L.overline[locale]}</Overline>
          </m.div>
          <m.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="font-title"
            style={{ color: "#fff", fontSize: "clamp(2.75rem, 6vw, 5.5rem)", lineHeight: 0.98, textTransform: "uppercase", fontWeight: 900, marginBottom: "18px" }}
          >
            {region.name}
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="text-label"
            style={{ color: "var(--color-ntn-lime)", marginBottom: "14px" }}
          >
            {region.tagline[locale]}
          </m.p>
          <m.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="text-body-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.82)", maxWidth: "38rem" }}
          >
            {region.description[locale]}
          </m.p>
        </div>
      </section>

      {/* Essence — text + highlights left, image with badge right */}
      {content && (
        <section style={{ backgroundColor: "var(--color-ntn-cream-100)", paddingTop: "100px", paddingBottom: "100px" }}>
          <div className="container-ntn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
              <div>
                <FadeUp>
                  <div style={{ marginBottom: "20px" }}>
                    <Overline color="var(--color-ntn-forest-400)">{L.essenceLabel[locale]}</Overline>
                  </div>
                  <h2
                    className="font-title"
                    style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "24px" }}
                  >
                    {content.essence.title[locale]}
                  </h2>
                  <p className="text-body-lg leading-relaxed" style={{ color: "var(--color-ntn-black-800)" }}>
                    {content.essence.body[locale]}
                  </p>
                </FadeUp>
                <div style={{ marginTop: "36px", paddingTop: "32px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                    {content.highlights.map((h, i) => (
                      <m.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                        style={{ display: "flex", alignItems: "center", gap: "12px" }}
                      >
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-ntn-lime)", display: "inline-block", flexShrink: 0 }} />
                        <span className="text-body-md" style={{ color: "var(--color-ntn-black-800)" }}>{h[locale]}</span>
                      </m.li>
                    ))}
                  </ul>
                </div>
              </div>

              <FadeRight delay={0.15}>
                <div className="relative" style={{ marginRight: "24px", marginBottom: "24px" }}>
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5", borderRadius: "8px" }}>
                    <Image src={content.essence.image} alt={region.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(29,29,26,0.35) 100%)" }} />
                  </div>
                  <div
                    className="shadow-xl"
                    style={{ position: "absolute", bottom: "-24px", right: "-24px", zIndex: 10, backgroundColor: "var(--color-ntn-forest-600)", padding: "20px 24px", borderRadius: "8px", maxWidth: "230px" }}
                  >
                    <p className="font-title leading-none" style={{ color: "var(--color-ntn-lime)", fontSize: "44px", fontWeight: 700, marginBottom: "8px" }}>
                      {content.essence.badgeValue}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.4 }}>
                      {content.essence.badgeLabel[locale]}
                    </p>
                  </div>
                </div>
              </FadeRight>
            </div>
          </div>
        </section>
      )}

      {/* Heritage — image collage left, text right */}
      {content?.heritage && (
        <section style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "100px", paddingBottom: "100px" }}>
          <div className="container-ntn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <FadeUp>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gridTemplateRows: "1fr 1fr",
                    gap: "6px",
                    aspectRatio: "1 / 1",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div className="relative" style={{ gridColumn: "1", gridRow: "1 / span 2" }}>
                    <Image src={content.heritage.gallery[0]} alt={region.name} fill className="object-cover" sizes="(max-width: 1024px) 66vw, 33vw" />
                  </div>
                  <div className="relative" style={{ gridColumn: "2", gridRow: "1" }}>
                    <Image src={content.heritage.gallery[1]} alt={region.name} fill className="object-cover" sizes="(max-width: 1024px) 33vw, 17vw" />
                  </div>
                  <div className="relative" style={{ gridColumn: "2", gridRow: "2" }}>
                    <Image src={content.heritage.gallery[2]} alt={region.name} fill className="object-cover" sizes="(max-width: 1024px) 33vw, 17vw" />
                  </div>
                </div>
              </FadeUp>
              <FadeRight delay={0.1}>
                <div style={{ marginBottom: "20px" }}>
                  <Overline color="var(--color-ntn-forest-400)">{L.heritageLabel[locale]}</Overline>
                </div>
                <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "24px" }}>
                  {content.heritage.title[locale]}
                </h2>
                <p className="text-body-lg leading-relaxed" style={{ color: "var(--color-ntn-black-800)" }}>
                  {content.heritage.body[locale]}
                </p>
              </FadeRight>
            </div>
          </div>
        </section>
      )}

      {/* Programmes — format groups side by side */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{L.programsLabel[locale]}</Overline>
            </div>
            <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "48px" }}>
              {L.programsHere[locale]}
            </h2>
          </FadeUp>

          {groups.length === 0 && (
            <FadeUp>
              <p className="text-body-lg" style={{ color: "var(--color-ntn-black-800)" }}>{L.empty[locale]}</p>
            </FadeUp>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
            {groups.map((group) => (
              <div key={group.label}>
                <FadeUp>
                  <p className="text-label" style={{ color: "var(--color-ntn-forest-600)", marginBottom: "24px", borderBottom: "1px solid rgba(89,105,77,0.2)", paddingBottom: "12px" }}>
                    {group.label} · {group.items.length}
                  </p>
                </FadeUp>
                <div
                  className={group.items.length === 1 ? "grid grid-cols-1 lg:grid-cols-[2fr_1fr]" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}
                  style={{ gap: "28px" }}
                >
                  {group.items.map((route, i) => (
                    <m.div
                      key={route.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: EASE }}
                    >
                      <ProgramCard route={route} facts={facts[route.id]} locale={locale} feature={group.items.length === 1} />
                    </m.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ backgroundColor: "var(--color-ntn-forest-600)", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "40px" }}>
              <div>
                <h2 className="font-title" style={{ color: "#fff", fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", textTransform: "none", lineHeight: 1.1, marginBottom: "16px", maxWidth: "20ch" }}>
                  {L.ctaTitle[locale]}
                </h2>
                <p className="text-body-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "46ch" }}>
                  {L.ctaBody[locale]}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link href={`/${locale}/programas`} className="btn btn-primary">
                  {L.ctaPrograms[locale]}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href={`/${locale}/destinos`} className="btn btn-outline-light">
                  ← {L.back[locale]}
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
