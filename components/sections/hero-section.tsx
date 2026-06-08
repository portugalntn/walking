"use client";

import { useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const heroImages = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/hero-4.jpg",
  "/images/hero/hero-5.jpg",
];

// Headline font-size per locale — Spanish is longer, needs to be smaller
const headlineSize: Record<string, string> = {
  es: "clamp(2.8rem, 6vw, 7rem)",
  pt: "clamp(3.4rem, 8vw, 9rem)",
  en: "clamp(3.4rem, 8vw, 9rem)",
};

export function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  // Random hero image on each load
  const [heroImg] = useState(
    () => heroImages[Math.floor(Math.random() * heroImages.length)]
  );

  const titleFontSize = headlineSize[locale] ?? headlineSize.en;

  return (
    <section className="relative min-h-screen flex flex-col">

      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImg}
          alt="Portugal NTN Walking"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        {/* Gradient overlays — layered for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(29,29,26,0.3) 0%, rgba(29,29,26,0.05) 30%, rgba(29,29,26,0.5) 65%, rgba(29,29,26,0.9) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(29,29,26,0.6) 0%, rgba(29,29,26,0.0) 65%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col flex-1 container-ntn">
        <div
          className="flex flex-col justify-center flex-1 pb-28 max-w-4xl"
          style={{ paddingTop: "max(160px, calc(96px + 80px))" }}
        >

          {/* Tagline */}
          <m.p
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.14em" }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            className="text-label mb-10"
            style={{ color: "var(--color-ntn-lime)" }}
          >
            {t("tagline")}
          </m.p>

          {/* Headline — DIN Next LT Pro Bold, 3 linhas máx */}
          <div className="mb-10">
            {[
              { text: t("headline1"), color: "var(--color-ntn-white)", delay: 0.45 },
              { text: t("headline2"), color: "var(--color-ntn-white)", delay: 0.6  },
              { text: t("headline3"), color: "var(--color-ntn-lime)",  delay: 0.75 },
            ].map(({ text, color, delay }) => (
              <div key={text} className="overflow-hidden leading-none">
                <m.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay }}
                  className="font-title block"
                  style={{ color, fontSize: titleFontSize }}
                >
                  {text}
                </m.h1>
              </div>
            ))}
          </div>

          {/* Divider accent */}
          <m.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 1.0 }}
            className="mb-8 origin-left"
            style={{ width: "3rem", height: "1.5px", backgroundColor: "var(--color-ntn-lime)" }}
          />

          {/* Sub-headline */}
          <m.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 1.1 }}
            className="text-body-lg mb-12 max-w-md leading-relaxed"
            style={{ color: "rgba(190,194,181,0.85)" }}
          >
            {t("subheadline")}
          </m.p>

          {/* CTAs */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 1.3 }}
            className="flex flex-wrap gap-4"
          >
            <a href={`/${locale}#routes`} className="btn btn-primary">
              {t("cta")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href={`/${locale}#about`} className="btn btn-outline-light">
              {t("ctaSecondary")}
            </a>
          </m.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-label" style={{ color: "rgba(255,255,255,0.3)" }}>
          scroll
        </span>
        <div
          className="w-px h-14 relative overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        >
          <m.div
            className="absolute top-0 left-0 right-0"
            style={{ height: "40%", backgroundColor: "var(--color-ntn-lime)" }}
            animate={{ y: ["0%", "250%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
          />
        </div>
      </m.div>
    </section>
  );
}
