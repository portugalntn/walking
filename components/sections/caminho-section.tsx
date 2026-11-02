"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FadeUp } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { getProgram } from "@/lib/programs";
import { pageImage } from "@/lib/pages";

const PRODUCT_ID = "santiago-interior";

/**
 * Caminho Português de Santiago Interior: a featured band on the home that
 * leads to the product page (Juliano, 02/11/2026). Days, stages and distance
 * come from the product in FLOW, so the band never disagrees with the page.
 * Texts in messages (home.caminho), photos editable in FLOW (img.caminho*).
 */
export function CaminhoSection() {
  const t = useTranslations("home.caminho");
  const locale = useLocale();
  const program = getProgram(PRODUCT_ID);
  if (!program) return null;

  const stages = program.days.filter((d) => d.distance).length;
  const facts = [
    { value: String(program.duration.days), label: t("days") },
    { value: String(stages), label: t("stages") },
    { value: program.totalDistance.replace(/\s*km$/i, ""), label: t("km") },
  ];

  return (
    <section
      id="caminho"
      style={{ backgroundColor: "var(--color-ntn-forest-600)", paddingTop: "100px", paddingBottom: "100px", overflow: "hidden" }}
    >
      <div
        className="container-ntn grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center"
        style={{ gap: "clamp(48px, 6vw, 96px)" }}
      >
        <FadeUp>
          <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">{t("label")}</Overline>
          <h2
            className="font-title text-display-lg"
            style={{ color: "var(--color-ntn-white)", lineHeight: 1.08, textTransform: "none", marginTop: "18px", maxWidth: "14ch" }}
          >
            {t("title")}
          </h2>
          <p className="text-body-lg" style={{ color: "rgba(255,255,255,0.78)", marginTop: "24px", maxWidth: "46ch", lineHeight: 1.6 }}>
            {t("lead")}
          </p>

          <dl className="grid grid-cols-3" style={{ gap: "16px", marginTop: "36px", maxWidth: "420px" }}>
            {facts.map((f) => (
              <div key={f.label} style={{ borderTop: "1px solid rgba(255,255,255,0.22)", paddingTop: "14px" }}>
                <dt className="font-title" style={{ color: "var(--color-ntn-lime)", fontSize: "clamp(1.8rem, 2.6vw, 2.4rem)", lineHeight: 1 }}>
                  {f.value}
                </dt>
                <dd className="text-label" style={{ color: "rgba(255,255,255,0.7)", marginTop: "8px" }}>{f.label}</dd>
              </div>
            ))}
          </dl>

          <Link href={`/${locale}/programas/${PRODUCT_ID}`} className="btn btn-primary" style={{ marginTop: "40px" }}>
            {t("cta")} <span aria-hidden>&rarr;</span>
          </Link>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ position: "relative", paddingBottom: "clamp(40px, 6vw, 72px)" }}>
            <Link
              href={`/${locale}/programas/${PRODUCT_ID}`}
              aria-label={t("title")}
              className="group relative block overflow-hidden"
              style={{ aspectRatio: "16 / 10", borderRadius: "10px" }}
            >
              <Image
                src={pageImage("home", "caminho", "/images/caminho/caminho-home.jpg")}
                alt={t("altMain")}
                fill
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 92vw, 760px"
                quality={90}
              />
            </Link>
            <div
              className="relative overflow-hidden"
              style={{
                position: "absolute", left: "clamp(-32px, -2vw, -12px)", bottom: 0, width: "clamp(150px, 34%, 280px)",
                aspectRatio: "4 / 3", borderRadius: "8px", border: "5px solid var(--color-ntn-forest-600)",
                boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
              }}
            >
              <Image
                src={pageImage("home", "caminhoDetalhe", "/images/caminho/caminho-catedral.jpg")}
                alt={t("altDetail")}
                fill
                className="object-cover"
                sizes="280px"
                quality={90}
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
