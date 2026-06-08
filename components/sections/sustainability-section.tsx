"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp, FadeLeft, StaggerChildren } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { m, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { TreePine, TrendingUp, Users, Landmark } from "lucide-react";

const pillars = [
  { key: "pillar1" as const, Icon: TreePine },
  { key: "pillar2" as const, Icon: TrendingUp },
  { key: "pillar3" as const, Icon: Users },
  { key: "pillar4" as const, Icon: Landmark },
];

// Bloco 7 — cycling gallery images
const galleryImages = [
  "/images/routes/geres-2.jpg",
  "/images/routes/geres-1.jpg",
  "/images/routes/tras-os-montes-1.jpg",
  "/images/routes/douro-1.jpg",
];

export function SustainabilitySection() {
  const t = useTranslations("home.sustainability");
  const locale = useLocale();
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((i) => (i + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-ntn-lime)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      {/* Decorative brand symbol — top right, very low opacity */}
      <div
        className="absolute pointer-events-none select-none"
        style={{ top: "40px", right: "3%", width: "200px", opacity: 0.07 }}
        aria-hidden
      >
        <Image
          src="/images/logos/PortugalNTN_A2.png"
          alt=""
          width={200}
          height={283}
          style={{ filter: "brightness(0)", width: "200px", height: "auto" }}
        />
      </div>

      <div className="container-ntn relative z-10">
        {/* Top block — 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text + 4 pillars */}
          <div>
            <FadeUp>
              <div style={{ marginBottom: "16px" }}>
                <Overline color="#3d5a1a">{t("label")}</Overline>
              </div>
              <h2
                className="font-title text-display-lg"
                style={{
                  color: "#1a2510",
                  whiteSpace: "pre-line",
                  lineHeight: 1.1,
                  textTransform: "none",
                  marginBottom: "32px",
                }}
              >
                {t("title")}
              </h2>
              <p
                className="text-body-lg leading-relaxed"
                style={{ color: "#2d3b1e", marginBottom: "56px" }}
              >
                {t("body")}
              </p>
            </FadeUp>

            <StaggerChildren
              speed="normal"
              className="grid grid-cols-2"
              style={{ rowGap: "32px", columnGap: "40px" } as React.CSSProperties}
            >
              {pillars.map(({ key, Icon }) => (
                <m.div key={key} variants={fadeUp}>
                  <Icon size={24} strokeWidth={1.5} style={{ color: "#1a2510", marginBottom: "12px" }} />
                  <p className="font-ui text-body-md" style={{ color: "#1a2510", fontWeight: 700 }}>
                    {t(key)}
                  </p>
                </m.div>
              ))}
            </StaggerChildren>
          </div>

          {/* Right — cycling gallery */}
          <FadeLeft delay={0.2}>
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "3/4", borderRadius: "8px" }}
            >
              <AnimatePresence>
                <m.div
                  key={imgIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={galleryImages[imgIndex]}
                    alt="Portugal nature"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </m.div>
              </AnimatePresence>
            </div>
          </FadeLeft>
        </div>

        {/* CTA → dedicated sustainability page */}
        <FadeUp delay={0.2}>
          <div style={{ marginTop: "56px" }}>
            <a
              href={`/${locale}/sustainable`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "14px 28px",
                border: "2px solid #2c2c2a",
                borderRadius: "3px",
                color: "#2c2c2a",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                backgroundColor: "transparent",
                textDecoration: "none",
              }}
            >
              {t("cta")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
