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
  title: { en: "Northern Portugal", pt: "O Norte de Portugal", es: "El Norte de Portugal" },
  intro: {
    en: "We are specialists in the North and Northeast of Portugal, the territories we know by heart and helped to shape. Alongside the multi-day programs, we guide one-day walks in the Douro and Trás-os-Montes.",
    pt: "Somos especialistas no Norte e Nordeste de Portugal, os territórios que conhecemos de cor e ajudámos a estruturar. Além dos programas de vários dias, guiamos caminhadas de um dia no Douro e em Trás-os-Montes.",
    es: "Somos especialistas en el Norte y Nordeste de Portugal, los territorios que conocemos de memoria y ayudamos a estructurar. Además de los programas de varios días, guiamos caminatas de un día en el Duero y en Trás-os-Montes.",
  },
  programsWord: { en: "programmes", pt: "programas", es: "programas" },
  programWord: { en: "programme", pt: "programa", es: "programa" },
  daysWord: { en: "days", pt: "dias", es: "días" },
  explore: { en: "Explore the destination", pt: "Explorar destino", es: "Explorar destino" },
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
  // Three across only when it fills every row; otherwise two across, larger.
  const threeUp = regions.length % 3 === 0;

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

      {/* Region grid: adapts to the number of destinations, so it never leaves a gap */}
      <section style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "96px", paddingBottom: "96px" }}>
        <div className="container-ntn">
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${threeUp ? "lg:grid-cols-3" : ""}`} style={{ gap: "20px" }}>
            {regions.map((region, i) => {
              const count = routesForRegion(region.id).length;
              const wide = !threeUp && regions.length % 2 === 1 && i === regions.length - 1;
              return (
                <m.a
                  key={region.id}
                  href={`/${locale}/destinos/${region.id}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: EASE }}
                  // Portrait on phones, landscape from tablet up. No min-height: with aspect-ratio it would force a min width.
                  className={`group relative block overflow-hidden ${threeUp ? "aspect-[3/4]" : wide ? "aspect-[4/5] sm:col-span-2 sm:aspect-[21/8]" : "aspect-[4/5] sm:aspect-[4/3]"}`}
                  style={{ borderRadius: "14px" }}
                >
                  <Image
                    src={region.image}
                    alt={region.name}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    sizes={threeUp ? "(max-width: 640px) 100vw, 33vw" : wide ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(29,29,26,0.25) 0%, transparent 30%, rgba(29,29,26,0.35) 55%, rgba(29,29,26,0.9) 100%)" }}
                  />
                  <span className="absolute top-5 left-6 font-title" style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", letterSpacing: "0.1em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {count > 0 && (
                    <span
                      className="absolute top-5 right-5"
                      style={{ backgroundColor: "var(--color-ntn-lime)", color: "var(--color-ntn-black-900)", borderRadius: "9999px", padding: "6px 12px", fontFamily: "var(--font-ui)", fontSize: "12px", fontWeight: 700 }}
                    >
                      {count} {count === 1 ? L.programWord[locale] : L.programsWord[locale]}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0" style={{ padding: "clamp(22px, 3vw, 34px)" }}>
                    <p className="text-label" style={{ color: "var(--color-ntn-lime)", marginBottom: "10px" }}>{region.tagline[locale]}</p>
                    <h2 className="font-title" style={{ color: "#fff", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.02, textTransform: "none", marginBottom: "10px" }}>
                      {region.name}
                    </h2>
                    <p className="text-body-md hidden sm:block" style={{ color: "rgba(255,255,255,0.85)", maxWidth: "36rem", marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {region.description[locale]}
                    </p>
                    <div className="flex flex-wrap items-center" style={{ gap: "10px 22px" }}>
                      <span className="text-label" style={{ color: "rgba(255,255,255,0.75)" }}>
                        {region.durations} {L.daysWord[locale]}
                      </span>
                      <span
                        className="inline-flex items-center gap-2 transition-all duration-200 group-hover:gap-3"
                        style={{ color: "#fff", fontFamily: "var(--font-ui)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: "1.5px solid var(--color-ntn-lime)", paddingBottom: "3px" }}
                      >
                        {L.explore[locale]}
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
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
