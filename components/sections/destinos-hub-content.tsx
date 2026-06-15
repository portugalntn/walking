"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { useLocale } from "next-intl";
import { FadeUp } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { regions, routesForRegion } from "@/lib/destinations";

const EASE = [0.19, 1, 0.22, 1] as const;
type Loc = "en" | "pt" | "es";

const L = {
  overline: { en: "Our destinations", pt: "Os nossos destinos", es: "Nuestros destinos" },
  title: { en: "Portugal, north to south", pt: "Portugal, de norte a sul", es: "Portugal, de norte a sur" },
  intro: {
    en: "We are specialists in the North and Northeast of Portugal, the territories we know by heart and helped to shape. We also guide one-day walks in the Algarve and around Lisbon and Sintra.",
    pt: "Somos especialistas no Norte e Nordeste de Portugal, os territórios que conhecemos de cor e ajudámos a estruturar. Também guiamos caminhadas de um dia no Algarve e em Lisboa e Sintra.",
    es: "Somos especialistas en el Norte y Nordeste de Portugal, los territorios que conocemos de memoria y ayudamos a estructurar. También guiamos caminatas de un día en el Algarve y en Lisboa y Sintra.",
  },
  programsWord: { en: "programmes", pt: "programas", es: "programas" },
  calloutTitle: {
    en: "Ready to choose how you walk?",
    pt: "Pronto para escolher como caminhar?",
    es: "¿Listo para elegir cómo caminar?",
  },
  calloutBody: {
    en: "Browse every programme, filter by one-day or multi-day, and find the walk that fits.",
    pt: "Veja todos os programas, filtre por um dia ou multidias, e encontre a caminhada certa.",
    es: "Vea todos los programas, filtre por un día o multidías, y encuentre la caminata adecuada.",
  },
  calloutCta: { en: "See all programmes", pt: "Ver todos os programas", es: "Ver todos los programas" },
};

export function DestinosHubContent() {
  const locale = useLocale() as Loc;

  return (
    <main>
      {/* Hero banner */}
      <section className="relative flex items-end" style={{ minHeight: "78vh" }}>
        <div className="absolute inset-0 z-0">
          <Image src="/images/routes/hero-miranda.jpg" alt="Portugal NTN Walking" fill priority className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(29,29,26,0.6) 0%, rgba(29,29,26,0.25) 38%, rgba(29,29,26,0.9) 100%)" }}
          />
        </div>
        <div className="container-ntn relative z-10" style={{ paddingTop: "160px", paddingBottom: "80px" }}>
          <FadeUp>
            <div style={{ marginBottom: "20px" }}>
              <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">{L.overline[locale]}</Overline>
            </div>
            <h1
              className="font-title"
              style={{ color: "#fff", lineHeight: 1.02, textTransform: "none", fontSize: "clamp(2.5rem, 6vw, 5rem)", marginBottom: "24px", maxWidth: "20ch" }}
            >
              {L.title[locale]}
            </h1>
            <p className="text-body-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.85)", maxWidth: "44rem" }}>
              {L.intro[locale]}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Region grid */}
      <section style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
            {regions.map((region, i) => {
              const count = routesForRegion(region.id).length;
              return (
                <m.a
                  key={region.id}
                  href={`/${locale}/destinos/${region.id}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: EASE }}
                  className="group relative block overflow-hidden"
                  style={{ aspectRatio: "3/4", borderRadius: "8px" }}
                >
                  <Image
                    src={region.image}
                    alt={region.name}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(29,29,26,0.05) 0%, transparent 38%, rgba(29,29,26,0.2) 62%, rgba(29,29,26,0.82) 100%)" }}
                  />
                  <span
                    className="absolute top-5 left-5 font-title"
                    style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", letterSpacing: "0.1em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0" style={{ padding: "24px 24px 24px 28px" }}>
                    <p className="text-label" style={{ color: "var(--color-ntn-lime)", marginBottom: "8px" }}>
                      {region.tagline[locale]}
                    </p>
                    <h2 className="font-ui" style={{ color: "var(--color-ntn-white)", fontSize: "24px", fontWeight: 700, lineHeight: 1.1, marginBottom: "6px" }}>
                      {region.name}
                    </h2>
                    {count > 0 && (
                      <p className="text-label" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {count} {L.programsWord[locale]}
                      </p>
                    )}
                  </div>
                </m.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Callout to catalogue */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "90px", paddingBottom: "90px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ maxWidth: "40rem" }}>
              <h2
                className="font-title"
                style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", marginBottom: "16px" }}
              >
                {L.calloutTitle[locale]}
              </h2>
              <p className="text-body-lg leading-relaxed" style={{ color: "var(--color-ntn-black-800)", marginBottom: "32px" }}>
                {L.calloutBody[locale]}
              </p>
              <Link href={`/${locale}/programas`} className="btn btn-primary" style={{ display: "inline-flex" }}>
                {L.calloutCta[locale]}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
