"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FadeUp } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { getProgram } from "@/lib/programs";
import { pageImage } from "@/lib/pages";

/** The versions of the Caminho on the site, one button each ("From Vila Pouca de Aguiar", "From Chaves"…). */
const PRODUCT_IDS = ["santiago-interior", "santiago-interior-chaves"];

type Loc = "en" | "pt" | "es";

/**
 * Caminho Português de Santiago Interior: a featured band on the home (Juliano, 02/11/2026).
 * One button per starting point, with the days and the distance read from each product in
 * FLOW, so the band never disagrees with the pages (03/11/2026: from Vila Pouca and from Chaves).
 * Texts in messages (home.caminho), photos editable in FLOW (img.caminho*).
 */
export function CaminhoSection() {
  const t = useTranslations("home.caminho");
  const locale = useLocale() as Loc;
  const partidas = PRODUCT_IDS.map((id) => getProgram(id)).filter((p) => p !== undefined);
  if (!partidas.length) return null;
  const principal = partidas[0];
  const lugar = (p: (typeof partidas)[number]) => (typeof p.startPoint === "string" ? p.startPoint : p.startPoint[locale]);

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

          <div style={{ display: "grid", gap: "12px", marginTop: "36px", maxWidth: "460px" }}>
            {partidas.map((p, i) => (
              <Link
                key={p.id}
                href={`/${locale}/programas/${p.id}`}
                className="group"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px",
                  padding: "14px 20px", borderRadius: "var(--radius-md)", textDecoration: "none",
                  backgroundColor: i === 0 ? "var(--color-ntn-lime)" : "transparent",
                  border: `1px solid ${i === 0 ? "var(--color-ntn-lime)" : "rgba(255,255,255,0.4)"}`,
                  color: i === 0 ? "var(--color-ntn-black-900)" : "var(--color-ntn-white)",
                  transition: "transform 0.25s, border-color 0.25s",
                }}
              >
                <span style={{ minWidth: 0 }}>
                  <span className="text-label" style={{ display: "block", opacity: 0.75 }}>{t("from")}</span>
                  <span className="font-ui" style={{ display: "block", fontWeight: 700, fontSize: "1.15rem", lineHeight: 1.25 }}>{lugar(p)}</span>
                </span>
                <span className="font-ui" style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontWeight: 700, fontSize: "14px", whiteSpace: "nowrap" }}>
                  {p.duration.days} {t("days")} · {p.totalDistance}
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ position: "relative", paddingBottom: "clamp(40px, 6vw, 72px)" }}>
            <Link
              href={`/${locale}/programas/${principal.id}`}
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
