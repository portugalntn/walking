"use client";

import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import type { Region, RouteProduct } from "@/lib/destinations";

const EASE = [0.19, 1, 0.22, 1] as const;
type Loc = "en" | "pt" | "es";

const L = {
  overline: { en: "Destination", pt: "Destino", es: "Destino" },
  programsHere: {
    en: "Programmes in this destination",
    pt: "Programas neste destino",
    es: "Programas en este destino",
  },
  programsLabel: { en: "Walk here", pt: "Caminhe aqui", es: "Camina aquí" },
  multiDays: { en: "Multi-day", pt: "Multidias", es: "Multidías" },
  oneDay: { en: "Day trips", pt: "1 dia", es: "1 día" },
  discover: { en: "Discover", pt: "Descobrir", es: "Descubrir" },
  soonLabel: { en: "Coming soon", pt: "Em breve", es: "Próximamente" },
  soon: {
    en: "The full story of this destination is on its way: culture, food, landscape and the sense of belonging that makes it ours.",
    pt: "A história completa deste destino está a caminho: cultura, gastronomia, paisagem e o sentido de pertença que o torna nosso.",
    es: "La historia completa de este destino está en camino: cultura, gastronomía, paisaje y el sentido de pertenencia que lo hace nuestro.",
  },
  back: { en: "All destinations", pt: "Todos os destinos", es: "Todos los destinos" },
  empty: {
    en: "Programmes for this destination are being prepared.",
    pt: "Os programas deste destino estão a ser preparados.",
    es: "Los programas de este destino se están preparando.",
  },
};

export function RegionPageContent({
  region,
  routes,
  locale,
}: {
  region: Region;
  routes: RouteProduct[];
  locale: Loc;
}) {
  const multi = routes.filter((r) => r.format === "programa");
  const day = routes.filter((r) => r.format === "roteiro");

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: "82vh", minHeight: "560px" }}>
        <div className="absolute inset-0 z-0">
          <Image src={region.image} alt={region.name} fill priority className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(20,20,18,0.85) 0%, rgba(20,20,18,0.45) 50%, rgba(20,20,18,0.1) 100%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(20,20,18,0.8) 0%, transparent 45%)" }}
          />
        </div>

        <div className="relative z-10 h-full container-ntn flex flex-col justify-center" style={{ paddingTop: "120px", paddingBottom: "90px" }}>
          <div style={{ maxWidth: "42rem" }}>
            <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">{L.overline[locale]}</Overline>
            </m.div>
            <m.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
              className="font-title"
              style={{ color: "#fff", fontSize: "clamp(2.75rem, 6vw, 5.5rem)", lineHeight: 0.98, textTransform: "uppercase", fontWeight: 900, marginBottom: "20px" }}
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
              style={{ color: "rgba(255,255,255,0.82)", maxWidth: "36rem" }}
            >
              {region.description[locale]}
            </m.p>
          </div>
        </div>
      </section>

      {/* Programs in this destination */}
      <section style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{L.programsLabel[locale]}</Overline>
            </div>
            <h2
              className="font-title"
              style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "48px" }}
            >
              {L.programsHere[locale]}
            </h2>
          </FadeUp>

          {routes.length === 0 && (
            <FadeUp>
              <p className="text-body-lg" style={{ color: "var(--color-ntn-sage-200)" }}>{L.empty[locale]}</p>
            </FadeUp>
          )}

          {[
            { label: L.multiDays[locale], items: multi },
            { label: L.oneDay[locale], items: day },
          ]
            .filter((g) => g.items.length > 0)
            .map((group) => (
              <div key={group.label} style={{ marginBottom: "56px" }}>
                <FadeUp>
                  <p
                    className="text-label"
                    style={{ color: "var(--color-ntn-sage-200)", marginBottom: "24px", borderBottom: "1px solid rgba(89,105,77,0.14)", paddingBottom: "12px" }}
                  >
                    {group.label}
                  </p>
                </FadeUp>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "40px 32px" }}>
                  {group.items.map((route, i) => (
                    <ProgramCard key={route.id} route={route} locale={locale} i={i} discover={L.discover[locale]} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Editorial stub + back */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "80px", paddingBottom: "90px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ maxWidth: "40rem" }}>
              <Overline color="var(--color-ntn-forest-400)">{L.soonLabel[locale]}</Overline>
              <p className="text-body-lg leading-relaxed" style={{ color: "var(--color-ntn-black-800)", margin: "18px 0 36px" }}>
                {L.soon[locale]}
              </p>
              <Link href={`/${locale}/destinos`} className="btn btn-ghost-dark" style={{ display: "inline-flex" }}>
                ← {L.back[locale]}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

function ProgramCard({
  route,
  locale,
  i,
  discover,
}: {
  route: RouteProduct;
  locale: Loc;
  i: number;
  discover: string;
}) {
  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: EASE }}
      >
        <Link href={`/${locale}/programas/${route.id}`} className="group block">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/11", borderRadius: "8px", marginBottom: "22px" }}>
            <Image
              src={route.image}
              alt={route.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(29,29,26,0.55) 100%)" }} />
            <span
              className="absolute top-4 right-4"
              style={{
                backgroundColor: "var(--color-ntn-lime)",
                color: "var(--color-ntn-black-900)",
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "7px 14px",
                borderRadius: "5px",
              }}
            >
              {route.duration}
            </span>
            <p
              className="absolute bottom-4 text-label"
              style={{ left: "16px", color: "rgba(255,255,255,0.9)", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
            >
              {route.type[locale]}
            </p>
          </div>
          <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
            <h3 className="font-ui mb-1.5 leading-snug" style={{ color: "var(--color-ntn-black-900)", fontSize: "var(--text-display-sm)", fontWeight: 600 }}>
              {route.title}
            </h3>
            <p className="text-body-md mb-3" style={{ color: "var(--color-ntn-sage-200)" }}>
              {route.tagline[locale]}
            </p>
            <span
              className="inline-flex items-center gap-1.5 transition-all duration-200 group-hover:gap-2.5"
              style={{ color: "var(--color-ntn-forest-400)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em" }}
            >
              {discover}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </Link>
      </m.div>
    </AnimatePresence>
  );
}
