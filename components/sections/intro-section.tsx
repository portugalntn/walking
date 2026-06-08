"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp, FadeRight, StaggerChildren } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { m } from "framer-motion";
import { fadeUpSoft } from "@/lib/motion";

const features = [
  {
    text: "Certified trail network",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 10L4.5 5L7 7.5L9.5 4L12 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    text: "Expert local guides",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    text: "Sustainable operations",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 2C4.24 2 2 4.24 2 7s2.24 5 5 5 5-2.24 5-5S9.76 2 7 2z" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M7 4.5v2.8l1.8 1.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    text: "DMC for global agencies",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M2.5 7h9M7 2.5c-1.5 1.5-2 2.8-2 4.5s.5 3 2 4.5M7 2.5c1.5 1.5 2 2.8 2 4.5s-.5 3-2 4.5" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
];

export function IntroSection() {
  const t = useTranslations("home.intro");
  const locale = useLocale();

  return (
    <section
      id="about"
      className="section-padding overflow-hidden"
      style={{ backgroundColor: "var(--color-ntn-cream-100)" }}
    >
      <div className="container-ntn">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Left — Text */}
          <div>
            <FadeUp>
              <div className="mb-6">
                <Overline color="var(--color-ntn-forest-400)">{t("label")}</Overline>
              </div>
            </FadeUp>

            {/* Ghost "12" + headline */}
            <FadeUp delay={0.1}>
              <div className="relative mb-6">
                {/* Ghost number — decorative, behind text */}
                <span
                  className="font-title select-none pointer-events-none absolute -top-4 -left-1"
                  style={{
                    fontSize: "clamp(6rem, 16vw, 12rem)",
                    lineHeight: 1,
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(89,105,77,0.1)",
                  }}
                  aria-hidden
                >
                  12
                </span>
                <h2
                  className="font-title text-display-lg relative z-10 pt-10"
                  style={{
                    color: "var(--color-ntn-black-900)",
                    whiteSpace: "pre-line",
                    lineHeight: 1.1,
                    textTransform: "none",
                  }}
                >
                  {t("title")}
                </h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p
                className="text-body-lg mb-6 leading-relaxed"
                style={{ color: "var(--color-ntn-black-800)" }}
              >
                {t("body")}
              </p>
              <p
                className="text-body-md leading-relaxed"
                style={{ color: "var(--color-ntn-forest-600)" }}
              >
                {t("body2")}
              </p>
            </FadeUp>

            {/* Feature tags — outline style, with divider above */}
            <div
              style={{
                marginTop: "40px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <StaggerChildren speed="fast" className="flex flex-wrap gap-3">
                {features.map((f) => (
                  <m.div
                    key={f.text}
                    variants={fadeUpSoft}
                    className="flex items-center gap-2"
                    style={{
                      padding: "8px 16px",
                      border: "1px solid rgba(89,105,77,0.35)",
                      borderRadius: "3px",
                      color: "var(--color-ntn-forest-400)",
                    }}
                  >
                    <span style={{ color: "var(--color-ntn-forest-400)" }}>
                      {f.icon}
                    </span>
                    <span
                      style={{
                        color: "var(--color-ntn-forest-600)",
                        fontSize: "11px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                      }}
                    >
                      {f.text}
                    </span>
                  </m.div>
                ))}
              </StaggerChildren>
            </div>

            {/* CTA */}
            <FadeUp delay={0.2}>
              <a
                href={`/${locale}#contact`}
                className="btn btn-primary"
                style={{ marginTop: "40px" }}
              >
                {t("cta")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </FadeUp>
          </div>

          {/* Right — Single image + overflowing badge */}
          <FadeRight delay={0.2}>
            {/* Image wrapper is relative; badge overflows via negative offsets */}
            <div className="relative" style={{ marginRight: "24px", marginBottom: "24px" }}>
              {/* Main image */}
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "4/5", borderRadius: "8px" }}
              >
                <Image
                  src="/images/routes/tras-os-montes-1.jpg"
                  alt="Walking through Trás-os-Montes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 60%, rgba(29,29,26,0.35) 100%)",
                  }}
                />
              </div>

              {/* Floating "12" badge — transbordando o canto inferior-direito */}
              <div
                className="shadow-xl"
                style={{
                  position: "absolute",
                  bottom: "-24px",
                  right: "-24px",
                  zIndex: 10,
                  backgroundColor: "var(--color-ntn-forest-600)",
                  padding: "20px 24px",
                  borderRadius: "8px",
                  minWidth: "180px",
                }}
              >
                <p
                  className="font-title leading-none mb-2"
                  style={{
                    color: "var(--color-ntn-lime)",
                    fontSize: "52px",
                    fontWeight: 700,
                  }}
                >
                  12
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("stat1Label")}
                </p>
              </div>
            </div>
          </FadeRight>
        </div>
      </div>
    </section>
  );
}
