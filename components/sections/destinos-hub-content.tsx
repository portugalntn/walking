"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { useLocale } from "next-intl";
import { FadeUp } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { regions, routesForRegion } from "@/lib/destinations";
import { regionContent } from "@/lib/region-content";
import { durationLabel } from "@/components/ui/program-card";
import { ArrowRight, Clock, CalendarDays, Footprints } from "lucide-react";

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
  programsHere: { en: "Programmes in this destination", pt: "Programas neste destino", es: "Programas en este destino" },
  durationLabel: { en: "Duration", pt: "Duração", es: "Duración" },
  formatsLabel: { en: "Formats", pt: "Formatos", es: "Formatos" },
  styleLabel: { en: "Style", pt: "Estilo", es: "Estilo" },
  oneDay: { en: "1 day", pt: "1 dia", es: "1 día" },
  multiDay: { en: "Multi-day", pt: "Vários dias", es: "Varios días" },
  to: { en: "to", pt: "a", es: "a" },
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

      {/* Destinations as editorial rows: photo on one side (only number and badges on it),
          presentation, highlights, characteristics and programmes on the other. Sides alternate. */}
      {regions.map((region, i) => {
        const items = routesForRegion(region.id);
        const content = regionContent[region.id];
        const imageLeft = i % 2 === 0;
        const days = items.map((r) => r.days);
        const minD = days.length ? Math.min(...days) : 0;
        const maxD = days.length ? Math.max(...days) : 0;
        const durationText = !days.length ? "" : minD === maxD ? durationLabel(minD, locale) : `${minD} ${L.to[locale]} ${maxD} ${L.daysWord[locale]}`;
        const formats = [
          items.some((r) => r.format === "roteiro") && L.oneDay[locale],
          items.some((r) => r.format === "programa") && L.multiDay[locale],
        ].filter(Boolean).join(" · ");
        const styles = Array.from(new Set(items.map((r) => r.type[locale]))).join(" · ");
        const tiles = [
          durationText && { Icon: Clock, label: L.durationLabel[locale], value: durationText },
          formats && { Icon: CalendarDays, label: L.formatsLabel[locale], value: formats },
          styles && { Icon: Footprints, label: L.styleLabel[locale], value: styles },
        ].filter(Boolean) as { Icon: typeof Clock; label: string; value: string }[];

        return (
          <section
            key={region.id}
            style={{ backgroundColor: i % 2 === 0 ? "var(--color-ntn-white)" : "var(--color-ntn-cream-50)", paddingTop: "clamp(64px, 8vw, 110px)", paddingBottom: "clamp(64px, 8vw, 110px)" }}
          >
            <div className="container-ntn">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "clamp(40px, 6vw, 96px)" }}>
                {/* Photo: number and programme count only */}
                <m.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={imageLeft ? "lg:order-1" : "lg:order-2"}
                  style={{ position: "relative", marginBottom: content ? "28px" : 0 }}
                >
                  <Link href={`/${locale}/destinos/${region.id}`} className="group relative block overflow-hidden aspect-[4/3] lg:aspect-[5/6]" style={{ borderRadius: "16px" }}>
                    <Image
                      src={region.image}
                      alt={region.name}
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <span className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(29,29,26,0.35) 0%, transparent 28%)" }} />
                    <span className="absolute top-5 left-6 font-title" style={{ color: "#fff", fontSize: "15px", letterSpacing: "0.12em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {items.length > 0 && (
                      <span
                        className="absolute top-5 right-5"
                        style={{ backgroundColor: "var(--color-ntn-lime)", color: "var(--color-ntn-black-900)", borderRadius: "9999px", padding: "6px 12px", fontFamily: "var(--font-ui)", fontSize: "12px", fontWeight: 700 }}
                      >
                        {items.length} {items.length === 1 ? L.programWord[locale] : L.programsWord[locale]}
                      </span>
                    )}
                  </Link>
                  {/* Signature figure of the region, as on the About page */}
                  {content && (
                    <div
                      className="shadow-xl"
                      style={{
                        position: "absolute", bottom: "-28px", [imageLeft ? "right" : "left"]: "clamp(12px, 3vw, 28px)", zIndex: 2,
                        backgroundColor: "var(--color-ntn-forest-600)", padding: "18px 22px", borderRadius: "12px", maxWidth: "260px",
                      }}
                    >
                      <p className="font-title" style={{ color: "var(--color-ntn-lime)", fontSize: "clamp(1.9rem, 3vw, 2.6rem)", lineHeight: 1, marginBottom: "6px" }}>
                        {content.essence.badgeValue}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1.5 }}>
                        {content.essence.badgeLabel[locale]}
                      </p>
                    </div>
                  )}
                </m.div>

                {/* Presentation */}
                <div className={imageLeft ? "lg:order-2" : "lg:order-1"}>
                  <FadeUp>
                    <div style={{ marginBottom: "16px" }}>
                      <Overline color="var(--color-ntn-forest-400)">{region.tagline[locale]}</Overline>
                    </div>
                    <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", fontSize: "clamp(2.2rem, 4vw, 3.3rem)", lineHeight: 1.04, textTransform: "none", marginBottom: "18px" }}>
                      {region.name}
                    </h2>
                    <p className="text-body-lg leading-relaxed" style={{ color: "var(--color-ntn-black-800)", marginBottom: "24px" }}>
                      {region.description[locale]}
                    </p>

                    {content && content.highlights.length > 0 && (
                      <div className="flex flex-wrap" style={{ gap: "8px", marginBottom: "28px" }}>
                        {content.highlights.slice(0, 3).map((h) => (
                          <span
                            key={h.en}
                            style={{ padding: "8px 14px", border: "1px solid rgba(89,105,77,0.35)", borderRadius: "3px", color: "var(--color-ntn-forest-600)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, fontFamily: "var(--font-ui)" }}
                          >
                            {h[locale]}
                          </span>
                        ))}
                      </div>
                    )}

                    {tiles.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "10px", marginBottom: "28px" }}>
                        {tiles.map(({ Icon, label, value }) => (
                          <div key={label} style={{ padding: "14px 16px", borderRadius: "12px", border: "1px solid rgba(89,105,77,0.16)", backgroundColor: i % 2 === 0 ? "var(--color-ntn-cream-50)" : "var(--color-ntn-white)" }}>
                            <Icon size={18} strokeWidth={1.6} style={{ color: "var(--color-ntn-forest-400)", marginBottom: "8px" }} />
                            <p className="text-label" style={{ color: "var(--color-ntn-forest-600)", marginBottom: "2px" }}>{label}</p>
                            <p className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontWeight: 700, fontSize: "14px", lineHeight: 1.35 }}>{value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {items.length > 0 && (
                      <div style={{ marginBottom: "32px" }}>
                        <p className="text-label" style={{ color: "var(--color-ntn-forest-600)", marginBottom: "6px" }}>{L.programsHere[locale]}</p>
                        <ul>
                          {items.map((r) => (
                            <li key={r.id}>
                              <Link
                                href={`/${locale}/programas/${r.id}`}
                                className="group flex items-center justify-between"
                                style={{ gap: "16px", padding: "12px 0", borderBottom: "1px solid rgba(89,105,77,0.16)" }}
                              >
                                <span className="font-ui transition-colors group-hover:text-[var(--color-ntn-forest-400)]" style={{ color: "var(--color-ntn-black-900)", fontWeight: 600, fontSize: "15px" }}>
                                  {r.title}
                                </span>
                                <span className="flex items-center shrink-0" style={{ gap: "12px" }}>
                                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "12px", fontWeight: 700, color: "var(--color-ntn-forest-600)", backgroundColor: "rgba(188,207,2,0.22)", borderRadius: "9999px", padding: "4px 10px" }}>
                                    {durationLabel(r.days, locale)}
                                  </span>
                                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" style={{ color: "var(--color-ntn-forest-400)" }} />
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link href={`/${locale}/destinos/${region.id}`} className="btn btn-primary" style={{ display: "inline-flex" }}>
                      {L.explore[locale]}
                      <ArrowRight size={16} />
                    </Link>
                  </FadeUp>
                </div>
              </div>
            </div>
          </section>
        );
      })}

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
