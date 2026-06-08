"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp, FadeLeft, FadeRight, StaggerChildren } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { fadeUp } from "@/lib/motion";
import { TreePine, TrendingUp, Users, Landmark } from "lucide-react";

const areas = [
  { n: 1, Icon: TreePine },
  { n: 2, Icon: TrendingUp },
  { n: 3, Icon: Users },
  { n: 4, Icon: Landmark },
];

export function SustainablePageContent() {
  const t = useTranslations("sustainablePage");
  const locale = useLocale();

  return (
    <main>
      {/* Hero */}
      <section className="relative flex items-end" style={{ minHeight: "70vh" }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/routes/geres-2.jpg"
            alt="Sustainable walking in Portugal"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(29,29,26,0.55) 0%, rgba(29,29,26,0.2) 40%, rgba(29,29,26,0.85) 100%)",
            }}
          />
        </div>
        <div className="container-ntn relative z-10" style={{ paddingTop: "160px", paddingBottom: "80px" }}>
          <FadeUp>
            <div style={{ marginBottom: "20px" }}>
              <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">
                {t("heroLabel")}
              </Overline>
            </div>
            <h1
              className="font-title"
              style={{
                color: "var(--color-ntn-white)",
                whiteSpace: "pre-line",
                lineHeight: 1.05,
                textTransform: "none",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                maxWidth: "16ch",
              }}
            >
              {t("heroTitle")}
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Purpose */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeUp>
              <div style={{ marginBottom: "16px" }}>
                <Overline color="var(--color-ntn-forest-400)">{t("p1Label")}</Overline>
              </div>
              <h2
                className="font-title"
                style={{
                  color: "var(--color-ntn-black-900)",
                  lineHeight: 1.1,
                  textTransform: "none",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                }}
              >
                {t("p1Title")}
              </h2>
            </FadeUp>
            <FadeRight delay={0.1}>
              <p className="text-body-lg leading-relaxed" style={{ color: "var(--color-ntn-black-800)" }}>
                {t("heroBody")}
              </p>
              <p
                className="text-body-lg leading-relaxed"
                style={{ color: "var(--color-ntn-forest-600)", marginTop: "24px" }}
              >
                {t("p1Body")}
              </p>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{t("areasLabel")}</Overline>
            </div>
            <h2
              className="font-title"
              style={{
                color: "var(--color-ntn-black-900)",
                lineHeight: 1.1,
                textTransform: "none",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginBottom: "60px",
              }}
            >
              {t("areasTitle")}
            </h2>
          </FadeUp>

          <StaggerChildren
            speed="fast"
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ rowGap: "48px", columnGap: "64px" } as React.CSSProperties}
          >
            {areas.map(({ n, Icon }) => (
              <m.div key={n} variants={fadeUp} className="flex gap-5">
                <div
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "8px",
                    backgroundColor: "var(--color-ntn-cream-100)",
                    color: "var(--color-ntn-forest-400)",
                  }}
                >
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3
                    className="font-ui mb-2"
                    style={{ color: "var(--color-ntn-black-900)", fontSize: "19px", fontWeight: 700 }}
                  >
                    {t(`area${n}Title`)}
                  </h3>
                  <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-forest-600)" }}>
                    {t(`area${n}Body`)}
                  </p>
                </div>
              </m.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "var(--color-ntn-lime)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <FadeLeft>
            <div className="max-w-2xl">
              <h2
                className="font-title"
                style={{
                  color: "#1a2510",
                  lineHeight: 1.1,
                  textTransform: "none",
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  marginBottom: "24px",
                }}
              >
                {t("ctaTitle")}
              </h2>
              <p className="text-body-lg leading-relaxed" style={{ color: "#2d3b1e", marginBottom: "40px" }}>
                {t("ctaBody")}
              </p>
              <a
                href={`/${locale}#contact`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "16px 32px",
                  backgroundColor: "#1a2510",
                  color: "var(--color-ntn-lime)",
                  borderRadius: "3px",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                {t("cta")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </FadeLeft>
        </div>
      </section>
    </main>
  );
}
