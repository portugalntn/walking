"use client";

/**
 * Sustainability page. Two bands carry the message: nature (the trails) and
 * the local economy (who earns from each walk), so sustainability reads as
 * more than landscape. pt-PT, no em dashes (house rule).
 */

import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp, FadeLeft, FadeRight, StaggerChildren } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { fadeUp } from "@/lib/motion";
import { TreePine, TrendingUp, Users, Landmark, Check, BedDouble, UtensilsCrossed, Wheat, Compass, Camera } from "lucide-react";

type Loc = "en" | "pt" | "es";
const tri = (en: string, pt: string, es: string) => ({ en, pt, es });

/** Photo for the local economy band (a local producer). Set the path when the photo arrives. */
const ECONOMY_IMAGE: string | undefined = undefined;

const areas = [
  { n: 1, Icon: TreePine },
  { n: 2, Icon: TrendingUp },
  { n: 3, Icon: Users },
  { n: 4, Icon: Landmark },
];

/** Strings of the redesign. Move to messages/*.json when approved. */
const TX = {
  natureLabel: tri("Environmental sustainability", "Sustentabilidade ambiental", "Sostenibilidad ambiental"),
  natureTitle: tri("Trails that protect what they show", "Trilhos que protegem o que mostram", "Senderos que protegen lo que muestran"),
  natureBody: tri(
    "We walk in small groups, on marked and certified paths, at the pace of the land. The landscape is the reason people come, so keeping it intact is part of the job.",
    "Caminhamos em pequenos grupos, por caminhos sinalizados e certificados, ao ritmo do território. A paisagem é a razão da viagem, por isso mantê-la intacta faz parte do trabalho.",
    "Caminamos en grupos pequeños, por caminos señalizados y certificados, al ritmo del territorio. El paisaje es la razón del viaje, por eso mantenerlo intacto forma parte del trabajo."
  ),
  nature1: tri("Small groups", "Pequenos grupos", "Grupos pequeños"),
  nature2: tri("Marked, certified trails", "Trilhos sinalizados e certificados", "Senderos señalizados y certificados"),
  nature3: tri("Routes designed for low impact", "Percursos desenhados para baixo impacto", "Recorridos diseñados para bajo impacto"),
  economyLabel: tri("Economic sustainability", "Sustentabilidade económica", "Sostenibilidad económica"),
  economyTitle: tri("Every walk pays the people who live here", "Cada caminhada paga a quem vive no território", "Cada caminata paga a quien vive en el territorio"),
  economyBody: tri(
    "Sustainability goes beyond nature. A territory only stays alive if people can make a living from it. That is why each programme is built with local businesses, and the value of the trip stays where the trip happens.",
    "Sustentabilidade vai além da natureza. Um território só se mantém vivo se as pessoas conseguirem viver dele. Por isso cada programa é construído com negócios locais, e o valor da viagem fica onde a viagem acontece.",
    "La sostenibilidad va más allá de la naturaleza. Un territorio solo sigue vivo si la gente puede vivir de él. Por eso cada programa se construye con negocios locales, y el valor del viaje se queda donde ocurre el viaje."
  ),
  whereLabel: tri("Where the value of a walk goes", "Para onde vai o valor de uma caminhada", "A dónde va el valor de una caminata"),
  where1: tri("Local guesthouses and hotels", "Alojamentos locais", "Alojamientos locales"),
  where2: tri("Village restaurants", "Restaurantes das aldeias", "Restaurantes de los pueblos"),
  where3: tri("Producers, estates and wineries", "Produtores, quintas e adegas", "Productores, quintas y bodegas"),
  where4: tri("Guides from the region", "Guias da região", "Guías de la región"),
  photoSoon: tri("Photo: local producer (coming soon)", "Imagem: produtor local (em breve)", "Imagen: productor local (próximamente)"),
};

export function SustainablePageContent() {
  const t = useTranslations("sustainablePage");
  const locale = useLocale() as Loc;

  return (
    // clip: the side fade-ins start offset and must not widen the page on phones
    <main style={{ overflowX: "clip" }}>
      {/* ── Hero: full-bleed nature, the purpose in one line ── */}
      <section className="relative flex items-end" style={{ minHeight: "92vh" }}>
        <div className="absolute inset-0 z-0">
          <Image src="/images/routes/geres-2.jpg" alt={TX.natureLabel[locale]} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(20,20,18,0.78) 0%, rgba(20,20,18,0.35) 55%, rgba(20,20,18,0.1) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,20,18,0.45) 0%, transparent 35%, rgba(20,20,18,0.85) 100%)" }} />
        </div>
        <div className="container-ntn relative z-10" style={{ paddingTop: "170px", paddingBottom: "88px" }}>
          <FadeUp>
            <div style={{ marginBottom: "20px" }}>
              <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">{t("heroLabel")}</Overline>
            </div>
            <h1
              className="font-title"
              style={{ color: "#fff", whiteSpace: "pre-line", lineHeight: 1.02, textTransform: "none", fontSize: "clamp(2.6rem, 6.5vw, 5.75rem)", maxWidth: "16ch", marginBottom: "24px" }}
            >
              {t("heroTitle")}
            </h1>
            <p className="text-body-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.86)", maxWidth: "40rem" }}>
              {t("heroBody")}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Purpose ── */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <FadeUp>
              <div style={{ marginBottom: "16px" }}>
                <Overline color="var(--color-ntn-forest-400)">{t("p1Label")}</Overline>
              </div>
              <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.05, textTransform: "none", fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}>
                {t("p1Title")}
              </h2>
            </FadeUp>
            <FadeRight delay={0.1}>
              <p className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)", lineHeight: 1.55, fontWeight: 500 }}>
                {t("p1Body")}
              </p>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── Band 1: nature, full-bleed photo ── */}
      <section className="relative flex items-center" style={{ minHeight: "88vh" }}>
        <div className="absolute inset-0 z-0">
          <Image src="/images/routes/geres-1.jpg" alt={TX.natureTitle[locale]} fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(20,20,18,0.8) 0%, rgba(20,20,18,0.45) 50%, rgba(20,20,18,0.05) 100%)" }} />
        </div>
        <div className="container-ntn relative z-10" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
          <FadeLeft>
            <div style={{ maxWidth: "36rem" }}>
              <div style={{ marginBottom: "18px" }}>
                <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">{TX.natureLabel[locale]}</Overline>
              </div>
              <h2 className="font-title" style={{ color: "#fff", fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", lineHeight: 1.02, textTransform: "none", marginBottom: "22px" }}>
                {TX.natureTitle[locale]}
              </h2>
              <p className="text-body-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.86)", marginBottom: "28px" }}>
                {TX.natureBody[locale]}
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[TX.nature1, TX.nature2, TX.nature3].map((it) => (
                  <li key={it.en} style={{ display: "flex", alignItems: "center", gap: "12px", color: "#fff", fontFamily: "var(--font-ui)", fontWeight: 600 }}>
                    <span style={{ width: "26px", height: "26px", borderRadius: "9999px", backgroundColor: "var(--color-ntn-lime)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={15} style={{ color: "var(--color-ntn-black-900)" }} />
                    </span>
                    {it[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </FadeLeft>
        </div>
      </section>

      {/* ── Band 2: the local economy, photo left, text right ── */}
      <section style={{ backgroundColor: "var(--color-ntn-forest-600)", paddingTop: "110px", paddingBottom: "110px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "clamp(40px, 6vw, 88px)" }}>
            <FadeLeft>
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", borderRadius: "16px" }}>
                {ECONOMY_IMAGE ? (
                  <Image src={ECONOMY_IMAGE} alt={TX.where3[locale]} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ gap: "10px", border: "1.5px dashed rgba(255,255,255,0.35)", borderRadius: "16px", backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.75)", textAlign: "center", padding: "24px" }}
                  >
                    <Camera size={28} strokeWidth={1.5} />
                    <span className="text-label">{TX.photoSoon[locale]}</span>
                  </div>
                )}
              </div>
            </FadeLeft>
            <FadeRight delay={0.1}>
              <div style={{ marginBottom: "18px" }}>
                <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">{TX.economyLabel[locale]}</Overline>
              </div>
              <h2 className="font-title" style={{ color: "#fff", fontSize: "clamp(2.1rem, 4vw, 3.4rem)", lineHeight: 1.04, textTransform: "none", marginBottom: "22px" }}>
                {TX.economyTitle[locale]}
              </h2>
              <p className="text-body-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.84)", marginBottom: "32px" }}>
                {TX.economyBody[locale]}
              </p>
              <p className="text-label" style={{ color: "rgba(255,255,255,0.6)", marginBottom: "14px" }}>{TX.whereLabel[locale]}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "12px" }}>
                {[
                  { Icon: BedDouble, l: TX.where1 },
                  { Icon: UtensilsCrossed, l: TX.where2 },
                  { Icon: Wheat, l: TX.where3 },
                  { Icon: Compass, l: TX.where4 },
                ].map(({ Icon, l }) => (
                  <div key={l.en} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "12px", backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <Icon size={20} strokeWidth={1.6} style={{ color: "var(--color-ntn-lime)", flexShrink: 0 }} />
                    <span style={{ color: "#fff", fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: "14px" }}>{l[locale]}</span>
                  </div>
                ))}
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{t("areasLabel")}</Overline>
            </div>
            <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "48px" }}>
              {t("areasTitle")}
            </h2>
          </FadeUp>
          <StaggerChildren speed="fast" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "20px" } as React.CSSProperties}>
            {areas.map(({ n, Icon }) => (
              <m.div
                key={n}
                variants={fadeUp}
                style={{ backgroundColor: "var(--color-ntn-white)", borderRadius: "14px", padding: "28px 26px 30px", border: "1px solid rgba(89,105,77,0.14)", display: "flex", flexDirection: "column" }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: "28px" }}>
                  <span style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "var(--color-ntn-lime)", color: "var(--color-ntn-black-900)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={24} strokeWidth={1.6} />
                  </span>
                  <span className="font-title" style={{ color: "rgba(89,105,77,0.35)", fontSize: "2rem", lineHeight: 1 }}>{String(n).padStart(2, "0")}</span>
                </div>
                <h3 className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontSize: "1.2rem", fontWeight: 700, marginBottom: "10px" }}>
                  {t(`area${n}Title`)}
                </h3>
                <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)" }}>
                  {t(`area${n}Body`)}
                </p>
              </m.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "var(--color-ntn-lime)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <FadeLeft>
            <div className="max-w-2xl">
              <h2 className="font-title" style={{ color: "#1a2510", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4.5vw, 3.5rem)", marginBottom: "24px" }}>
                {t("ctaTitle")}
              </h2>
              <p className="text-body-lg leading-relaxed" style={{ color: "#2d3b1e", marginBottom: "40px" }}>
                {t("ctaBody")}
              </p>
              <a
                href={`/${locale}#contact`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "16px 32px", backgroundColor: "#1a2510",
                  color: "var(--color-ntn-lime)", borderRadius: "3px", fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "11px",
                  letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                }}
              >
                {t("cta")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </FadeLeft>
        </div>
      </section>
    </main>
  );
}
