"use client";

import { useState, useEffect, useRef } from "react";
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

type Seg = "consulting" | "walking";

export function PortalContent() {
  const t = useTranslations("portal");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [autoSeg, setAutoSeg] = useState<Seg>("consulting");
  const [hovered, setHovered] = useState<Seg | null>(null);
  const [diving, setDiving] = useState<Seg | null>(null);
  const pausedRef = useRef(false);

  // Effective active segment: hover overrides the automatic cycle
  const active: Seg = hovered ?? autoSeg;

  // Automatic alternation between segments
  useEffect(() => {
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setAutoSeg((s) => (s === "consulting" ? "walking" : "consulting"));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const switchLocalePath = (newLocale: string) => {
    const seg = pathname.split("/");
    seg[1] = newLocale;
    return seg.join("/");
  };

  const cards = [
    {
      id: "consulting" as Seg,
      num: "01",
      image: "/images/portal/consulting-card.jpg",
      title: t("consultingTitle"),
      tagline: t("cardDescConsulting"),
      href: "#",
      disabled: true,
    },
    {
      id: "walking" as Seg,
      num: "02",
      image: "/images/portal/walking-card.jpg",
      title: t("walkingTitle"),
      tagline: t("cardDescWalking"),
      href: `/${locale}`,
      disabled: false,
    },
  ];

  const onEnter = (seg: Seg) => {
    pausedRef.current = true;
    setHovered(seg);
  };
  const onLeave = () => {
    pausedRef.current = false;
    setHovered(null);
  };

  const dive = (seg: Seg, href: string, disabled: boolean) => {
    if (disabled) return;
    setDiving(seg);
    setTimeout(() => router.push(href), 700);
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>

      {/* ── Dynamic background (crossfade by active segment) ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        {(["consulting", "walking"] as Seg[]).map((seg) => (
          <m.div
            key={seg}
            initial={false}
            animate={{ opacity: active === seg ? 1 : 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={seg === "consulting" ? "/images/portal/bg-consulting.jpg" : "/images/portal/bg-walking.jpg"}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </m.div>
        ))}
        {/* Black lens (darker for contrast) */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.72)" }} />
      </div>

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
          style={{ color: "#fff", fontSize: "15px", fontWeight: 700, letterSpacing: "0.12em" }}
        >
          PORTUGAL<span style={{ color: "rgba(255,255,255,0.55)" }}>NTN</span>
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
                color: l.code === locale ? "var(--color-ntn-lime)" : "rgba(255,255,255,0.7)",
              }}
            >
              <span style={{ fontSize: "14px" }}>{l.flag}</span>
              {l.label}
            </Link>
          ))}
        </div>
      </header>

      {/* Layout */}
      <div className="portal-layout" style={{ position: "relative", zIndex: 10 }}>
        {/* LEFT — brand + title + copy + buttons (light text over image) */}
        <div className="portal-left">
          {/* Bigger logo, higher */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ marginBottom: "36px" }}
          >
            <Image
              src="/images/portal/ntn-symbol-v2.png"
              alt="Portugal NTN"
              width={108}
              height={108}
              style={{
                width: "108px",
                height: "108px",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
              priority
            />
          </m.div>

          {/* Title */}
          <div style={{ marginBottom: "26px" }}>
            {t("chooseTitle").split("\n").map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <m.h1
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 }}
                  className="font-title"
                  style={{
                    color: /sustentab|sustainab|sostenib/i.test(line)
                      ? "var(--color-ntn-lime)"
                      : "#ffffff",
                    fontSize: "clamp(2rem, 3.4vw, 3.4rem)",
                    lineHeight: 1.02,
                    textTransform: "none",
                    fontWeight: 800,
                  }}
                >
                  {line}
                </m.h1>
              </div>
            ))}
          </div>

          {/* Copy — changes with the active segment */}
          <div style={{ minHeight: "7.5rem", marginBottom: "28px", maxWidth: "25rem" }}>
            <AnimatePresence mode="wait">
              <m.p
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="text-body-md"
                style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}
              >
                {active === "walking" ? t("leadWalking") : t("leadConsulting")}
              </m.p>
            </AnimatePresence>
          </div>

          {/* Choose label */}
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-label"
            style={{ color: "rgba(255,255,255,0.55)", marginBottom: "18px" }}
          >
            {t("chooseLabel")}
          </m.p>

          {/* Buttons */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.78 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}
          >
            <button
              onMouseEnter={() => onEnter("walking")}
              onMouseLeave={onLeave}
              onClick={() => dive("walking", `/${locale}`, false)}
              className="btn btn-primary"
              style={{
                transform: active === "walking" ? "translateY(-2px) scale(1.04)" : "none",
                boxShadow: active === "walking" ? "0 12px 30px -8px rgba(188,207,2,0.7)" : "none",
                transition: "transform 0.35s var(--ease-smooth), box-shadow 0.35s var(--ease-smooth)",
              }}
            >
              {t("enterWalking")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              onMouseEnter={() => onEnter("consulting")}
              onMouseLeave={onLeave}
              className="btn btn-outline-light"
              style={{
                cursor: "default",
                transform: active === "consulting" ? "translateY(-2px) scale(1.04)" : "none",
                borderColor: active === "consulting" ? "var(--color-ntn-lime)" : "rgba(255,255,255,0.45)",
                backgroundColor: active === "consulting" ? "rgba(255,255,255,0.10)" : "transparent",
                transition: "transform 0.35s var(--ease-smooth), border-color 0.35s, background-color 0.35s",
              }}
            >
              {t("enterConsulting")}
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "9px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  padding: "2px 7px",
                  borderRadius: "2px",
                }}
              >
                {t("soon")}
              </span>
            </button>
          </m.div>
        </div>

        {/* RIGHT — two cards, smaller, with shadow, reacting to active */}
        <div className="portal-cards">
          {cards.map((card, i) => {
            const isActive = active === card.id;
            return (
              <div
                key={card.id}
                className="portal-card-float"
                style={{ animationDelay: `${i * -4}s` }}
                onMouseEnter={() => onEnter(card.id)}
                onMouseLeave={onLeave}
                onClick={() => dive(card.id, card.href, card.disabled)}
              >
                <m.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: isActive ? 1.1 : 0.94,
                  }}
                  transition={{
                    scale: { duration: 0.7, ease: EASE },
                    y: { duration: 0.8, ease: EASE, delay: 0.3 + i * 0.15 },
                  }}
                  className="portal-card group"
                  style={{ cursor: card.disabled ? "default" : "pointer", height: "100%" }}
                >
                  <div className="portal-card-img">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]"
                      sizes="(max-width: 1024px) 100vw, 28vw"
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to bottom, rgba(29,29,26,0.25) 0%, rgba(29,29,26,0.05) 35%, rgba(29,29,26,0.4) 70%, rgba(29,29,26,0.9) 100%)",
                      }}
                    />
                  </div>

                  {/* Top chip */}
                  <div
                    style={{
                      position: "absolute",
                      top: "18px",
                      left: "18px",
                      right: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      zIndex: 2,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Image
                        src="/images/portal/ntn-symbol-v2.png"
                        alt=""
                        width={20}
                        height={20}
                        style={{ width: "20px", height: "20px", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.9 }}
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

                  {/* Bottom content */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 24px", zIndex: 2 }}>
                    <h2
                      className="font-title"
                      style={{
                        color: "#ffffff",
                        fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)",
                        lineHeight: 0.95,
                        textTransform: "uppercase",
                        fontWeight: 900,
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ color: card.id === "walking" ? "#bccf02" : "#ffffff" }}>
                        {card.title}
                      </span>
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "12.5px", lineHeight: 1.5, maxWidth: "22rem" }}>
                      {card.tagline}
                    </p>
                  </div>
                </m.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dive transition */}
      <AnimatePresence>
        {diving && (
          <m.div
            initial={{ clipPath: "inset(45% 0% 45% 0%)", opacity: 0.6 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ position: "fixed", inset: 0, zIndex: 200 }}
          >
            <Image
              src={diving === "walking" ? "/images/portal/walking-card.jpg" : "/images/portal/consulting-card.jpg"}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(29,29,26,0.55)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <m.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="font-title"
                style={{ color: "#bccf02", fontSize: "clamp(3rem, 8vw, 7rem)", textTransform: "uppercase", fontWeight: 900 }}
              >
                WALKING
              </m.h2>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
