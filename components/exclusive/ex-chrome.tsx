"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { ExThemeToggle } from "./ex-theme";

const EASE = [0.19, 1, 0.22, 1] as const;

/** Logótipo Portugal NTN Exclusive. Há duas versões (letra escura e letra clara)
 *  e o CSS mostra a que serve ao fundo: o tema da página, ou escuro por cima
 *  de fotografia (.ex-dark). Ficheiros em public/images/exclusive/. */
function Wordmark({ size = "nav" }: { size?: "nav" | "footer" }) {
  const locale = useLocale();
  const h = size === "footer" ? 56 : 40;
  const w = Math.round(h * 4.3);
  return (
    <Link href={`/${locale}/exclusive`} className="ex-logo" aria-label="Portugal NTN Exclusive" style={{ display: "block", lineHeight: 0 }}>
      <Image className="ex-logo-escuro" src="/images/exclusive/logo-exclusive-fundo-escuro.png" alt="Portugal NTN Exclusive" width={w} height={h} priority={size === "nav"} unoptimized />
      <Image className="ex-logo-claro" src="/images/exclusive/logo-exclusive-fundo-claro.png" alt="" aria-hidden width={w} height={h} priority={size === "nav"} unoptimized />
    </Link>
  );
}

/** `gate`: no portão não há secções para onde saltar nem botão de contacto. */
export function ExNavbar({ variant = "page" }: { variant?: "page" | "gate" }) {
  const t = useTranslations("exclusive.nav");
  const locale = useLocale();
  const gate = variant === "gate";
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#territorios", label: t("territories") },
    { href: "#experiencias", label: t("experiences") },
    { href: "#formatos", label: t("formats") },
    { href: "#howwework", label: t("howWeWork") },
  ];

  return (
    <m.header
      // Por cima do hero o navbar fica sempre escuro; ao descer segue o tema.
      className={solid ? undefined : "ex-dark"}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{
        position: "fixed",
        insetInline: 0,
        top: 0,
        zIndex: 50,
        backgroundColor: solid ? "var(--ex-glass)" : "transparent",
        backdropFilter: solid ? "blur(14px)" : "none",
        borderBottom: `1px solid ${solid ? "var(--ex-line)" : "transparent"}`,
        transition: "background-color 600ms, border-color 600ms, backdrop-filter 600ms",
      }}
    >
      <div
        className="ex-wrap"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "88px" }}
      >
        <Wordmark />

        <nav style={{ display: "flex", alignItems: "center", gap: "clamp(1.25rem, 3vw, 2.75rem)" }}>
          {!gate && (
            <div className="hidden md:flex" style={{ gap: "clamp(1.25rem, 2.6vw, 2.5rem)" }}>
              {links.map((l) => (
                <a key={l.href} href={l.href} className="ex-over" style={{ textDecoration: "none" }}>
                  {l.label}
                </a>
              ))}
            </div>
          )}
          <ExThemeToggle />
          {gate ? (
            <Link href={`/${locale}`} className="ex-over hidden sm:inline" style={{ textDecoration: "none" }}>
              {t("publicSite")}
            </Link>
          ) : (
            <a href="#enquiry" className="ex-btn" style={{ padding: "0.8125rem 1.5rem" }}>
              {t("enquire")}
            </a>
          )}
        </nav>
      </div>
    </m.header>
  );
}

export function ExFooter() {
  const locale = useLocale();
  const t = useTranslations("exclusive.footer");

  return (
    <footer style={{ borderTop: "1px solid var(--ex-line)", paddingBlock: "clamp(3rem, 6vw, 5rem)" }}>
      <div
        className="ex-wrap"
        style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between", alignItems: "flex-end" }}
      >
        <div style={{ maxWidth: "34ch" }}>
          <Wordmark size="footer" />
          <p className="ex-body" style={{ marginTop: "1.25rem", fontSize: "0.875rem" }}>
            {t("line")}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-start" }}>
          <Link href={`/${locale}`} className="ex-over" style={{ textDecoration: "none" }}>
            {t("public")}
          </Link>
          <span className="ex-over" style={{ opacity: 0.55 }}>
            © {new Date().getFullYear()} Portugal NTN
          </span>
        </div>
      </div>
    </footer>
  );
}
