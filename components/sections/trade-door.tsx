"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { FadeUp } from "@/components/ui/animated";

/**
 * Porta para o EXCLUSIVE (B2B) a partir do site público.
 *
 * Fica entre o contacto e o rodapé, deliberadamente sóbria e curta: o site
 * público fala com o cliente final, por isso isto é uma porta, não uma
 * secção de venda B2B. Usa o latão do EXCLUSIVE para se ler como outro sítio.
 */
export function TradeDoor() {
  const t = useTranslations("tradeDoor");
  const locale = useLocale();

  return (
    <section
      style={{
        backgroundColor: "var(--color-ntn-black-900)",
        borderTop: "1px solid rgba(236, 232, 221, 0.1)",
        paddingBlock: "clamp(3.5rem, 7vw, 6rem)",
      }}
    >
      <div
        className="container-ntn"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "clamp(1.75rem, 4vw, 4rem)",
        }}
      >
        <FadeUp>
          <p className="text-label" style={{ color: "#c8bd8a", letterSpacing: "0.24em" }}>
            {t("overline")}
          </p>
          <p
            className="font-ui"
            style={{
              color: "var(--color-ntn-white)",
              fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginTop: "0.875rem",
            }}
          >
            {t("title")}
          </p>
          <p
            className="text-body-md"
            style={{ color: "rgba(255,255,255,0.6)", maxWidth: "52ch", marginTop: "0.875rem" }}
          >
            {t("lead")}
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Link
            href={`/${locale}/exclusive`}
            className="btn"
            style={{
              padding: "1.0625rem 2.5rem",
              backgroundColor: "#b9ad72",
              color: "var(--color-ntn-black-900)",
              borderRadius: "var(--radius-md)",
            }}
          >
            {t("cta")}
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
