"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const locales = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "pt", label: "PT", flag: "🇵🇹" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

const EASE = [0.19, 1, 0.22, 1] as const;

type Card = {
  id: "consulting" | "walking";
  num: string;
  image: string;
  title: string;
  tagline: string;
  cta: string;
  href: string;
  disabled: boolean;
};

export function PortalContent() {
  const t = useTranslations("portal");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [expanding, setExpanding] = useState<Card | null>(null);

  const switchLocalePath = (newLocale: string) => {
    const seg = pathname.split("/");
    seg[1] = newLocale;
    return seg.join("/");
  };

  const cards: Card[] = [
    {
      id: "consulting",
      num: "01",
      image: "/images/portal/consulting.jpg",
      title: t("consultingTitle"),
      tagline: t("consultingTagline"),
      cta: t("consultingCta"),
      href: "#",
      disabled: true,
    },
    {
      id: "walking",
      num: "02",
      image: "/images/portal/walking.jpg",
      title: t("walkingTitle"),
      tagline: t("walkingTagline"),
      cta: t("walkingCta"),
      href: `/${locale}`,
      disabled: false,
    },
  ];

  const handleClick = (card: Card) => {
    if (card.disabled) return;
    setExpanding(card);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-ntn-cream-50)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px clamp(20px, 4vw, 56px)",
        }}
      >
        <span
          className="font-ui"
          style={{
            color: "var(--color-ntn-black-900)",
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "0.12em",
          }}
        >
          PORTUGAL<span style={{ color: "var(--color-ntn-sage-200)" }}>NTN</span>
        </span>
        <div style={{ display: "flex", gap: "16px" }}>
          {locales.map((l) => (
            <Link
              key={l.code}
              href={switchLocalePath(l.code)}
              className="text-label"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: l.code === locale ? "var(--color-ntn-forest-400)" : "var(--color-ntn-sage-200)",
              }}
            >
              <span style={{ fontSize: "14px" }}>{l.flag}</span>
              {l.label}
            </Link>
          ))}
        </div>
      </header>

      {/* Main grid */}
      <div className="portal-layout">
        {/* LEFT — text */}
        <div className="portal-left">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "40px" }}
          >
            <Image
              src="/images/portal/ntn-symbol.png"
              alt="Portugal NTN"
              width={44}
              height={44}
              style={{ width: "44px", height: "44px", objectFit: "contain" }}
              priority
            />
          </m.div>

          {/* Title */}
          <div style={{ marginBottom: "28px" }}>
            {t("chooseTitle").split("\n").map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <m.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 }}
                  className="font-title"
                  style={{
                    color: "var(--color-ntn-black-900)",
                    fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
                    lineHeight: 1.0,
                    textTransform: "none",
                    fontWeight: 800,
                  }}
                >
                  {line}
                </m.h1>
              </div>
            ))}
          </div>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="text-body-lg"
            style={{ color: "var(--color-ntn-black-800)", maxWidth: "24rem", lineHeight: 1.7, marginBottom: "36px" }}
          >
            {t("lead")}
          </m.p>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-label"
            style={{ color: "var(--color-ntn-sage-200)", display: "flex", alignItems: "center", gap: "10px" }}
          >
            <span>{t("chooseLabel")}</span>
            <span className="portal-arrow-hint" aria-hidden>→</span>
          </m.div>
        </div>

        {/* RIGHT — two cards (CSS grid avoids flex width bug) */}
        <div className="portal-cards">
          {cards.map((card, i) => (
            <m.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.15 }}
              whileHover={{ y: -10 }}
              onClick={() => handleClick(card)}
              className="portal-card group"
              style={{ cursor: card.disabled ? "default" : "pointer" }}
            >
              {/* Image */}
              <div className="portal-card-img">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.07]"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(29,29,26,0.25) 0%, rgba(29,29,26,0.05) 35%, rgba(29,29,26,0.45) 70%, rgba(29,29,26,0.9) 100%)",
                  }}
                />
              </div>

              {/* Top — brand chip + number */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  right: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  zIndex: 2,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Image
                    src="/images/portal/ntn-symbol.png"
                    alt=""
                    width={22}
                    height={22}
                    style={{ width: "22px", height: "22px", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.9 }}
                  />
                  <span className="text-label" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {card.num}
                  </span>
                </div>
                {card.disabled && (
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.85)",
                      border: "1px solid rgba(255,255,255,0.35)",
                      padding: "4px 10px",
                      borderRadius: "2px",
                      fontFamily: "var(--font-ui)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {t("soon")}
                  </span>
                )}
              </div>

              {/* Bottom — content */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "32px 28px",
                  zIndex: 2,
                }}
              >
                <h2
                  className="font-title"
                  style={{
                    color: "#ffffff",
                    fontSize: "clamp(1.75rem, 2.6vw, 2.5rem)",
                    lineHeight: 0.95,
                    textTransform: "uppercase",
                    fontWeight: 900,
                    marginBottom: "10px",
                  }}
                >
                  {card.id === "walking" ? (
                    <>
                      <span style={{ color: "#ffffff" }}>WALK</span>
                      <span style={{ color: "#bccf02" }}>ING</span>
                    </>
                  ) : (
                    card.title
                  )}
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "13px",
                    marginBottom: "18px",
                    maxWidth: "22rem",
                  }}
                >
                  {card.tagline}
                </p>
                <span
                  className="portal-card-cta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#bccf02",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    opacity: card.disabled ? 0.7 : 1,
                  }}
                >
                  {card.cta}
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Expand transition overlay — "dive into the segment" */}
      <AnimatePresence>
        {expanding && (
          <m.div
            initial={{ clipPath: "inset(45% 0% 45% 0%)", opacity: 0.6 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            onAnimationComplete={() => router.push(expanding.href)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
            }}
          >
            <Image src={expanding.image} alt="" fill className="object-cover" priority sizes="100vw" />
            <div style={{ position: "absolute", inset: 0, background: "rgba(29,29,26,0.55)" }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <m.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="font-title"
                style={{
                  color: "#fff",
                  fontSize: "clamp(3rem, 8vw, 7rem)",
                  textTransform: "uppercase",
                  fontWeight: 900,
                }}
              >
                {expanding.id === "walking" ? (
                  <>
                    <span style={{ color: "#fff" }}>WALK</span>
                    <span style={{ color: "#bccf02" }}>ING</span>
                  </>
                ) : (
                  expanding.title
                )}
              </m.h2>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
