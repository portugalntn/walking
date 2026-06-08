"use client";

import { useTranslations, useLocale } from "next-intl";
import { FadeUp, StaggerChildren } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { m } from "framer-motion";
import { fadeUpSoft } from "@/lib/motion";

const highlights = [
  { value: "DMC", label: "Destination Management" },
  { value: "B2B", label: "Trade-only pricing" },
  { value: "NET", label: "Commission-friendly" },
  { value: "24H", label: "Response guarantee" },
];

export function B2BSection() {
  const t = useTranslations("home.b2b");
  const locale = useLocale();

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-ntn-cream-50)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <div className="container-ntn">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — content */}
          <div>
            <FadeUp>
              <div style={{ marginBottom: "12px" }}>
                <Overline color="var(--color-ntn-forest-400)">{t("label")}</Overline>
              </div>
              <h2
                className="font-title text-display-lg"
                style={{
                  color: "var(--color-ntn-black-900)",
                  lineHeight: 1.1,
                  marginBottom: "28px",
                }}
              >
                {t("title")}
              </h2>
              <p
                className="text-body-lg leading-relaxed"
                style={{ color: "var(--color-ntn-black-800)", marginBottom: "40px" }}
              >
                {t("body")}
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="flex flex-wrap" style={{ gap: "16px" }}>
                <a href={`/${locale}#contact`} className="btn btn-primary">
                  {t("cta")}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="mailto:info@portugalntn.com" className="btn btn-ghost-dark">
                  {t("ctaSecondary")}
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right — minimalist 2×2 grid, no cards, no borders */}
          <div>
            <StaggerChildren
              speed="fast"
              className="grid grid-cols-2"
              style={{ rowGap: "32px", columnGap: "40px" } as React.CSSProperties}
            >
              {highlights.map((h) => (
                <m.div key={h.value} variants={fadeUpSoft}>
                  <p
                    className="font-title leading-none"
                    style={{
                      color: "#2d3b1e",
                      fontSize: "48px",
                      fontWeight: 800,
                      marginBottom: "10px",
                    }}
                  >
                    {h.value}
                  </p>
                  <p
                    style={{
                      color: "#6b7c5a",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {h.label}
                  </p>
                </m.div>
              ))}
            </StaggerChildren>

            <FadeUp delay={0.3}>
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: "14px",
                  color: "#6b7c5a",
                  marginTop: "40px",
                }}
              >
                All prices are NET rates. Your margin is yours.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
