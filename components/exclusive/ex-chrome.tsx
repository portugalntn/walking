"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const EASE = [0.19, 1, 0.22, 1] as const;

/** Assinatura tipográfica. Enquanto não houver logótipo em versão clara,
 *  o wordmark é desenhado em tipo, o que também é mais sóbrio. */
function Wordmark() {
  const locale = useLocale();
  return (
    <Link href={`/${locale}/exclusive`} style={{ textDecoration: "none", display: "block", lineHeight: 1 }}>
      <span className="ex-over" style={{ display: "block", marginBottom: "5px", letterSpacing: "0.34em" }}>
        Portugal NTN
      </span>
      <span
        className="ex-serif"
        style={{ display: "block", fontSize: "1.55rem", color: "var(--ex-bone)", letterSpacing: "0.06em" }}
      >
        Exclusive
      </span>
    </Link>
  );
}

export function ExNavbar() {
  const t = useTranslations("exclusive.nav");
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#journeys", label: t("journeys") },
    { href: "#daytours", label: t("dayTours") },
    { href: "#howwework", label: t("howWeWork") },
  ];

  return (
    <m.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{
        position: "fixed",
        insetInline: 0,
        top: 0,
        zIndex: 50,
        backgroundColor: solid ? "rgba(11, 12, 10, 0.86)" : "transparent",
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
          <div className="hidden md:flex" style={{ gap: "clamp(1.25rem, 2.6vw, 2.5rem)" }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} className="ex-over" style={{ textDecoration: "none" }}>
                {l.label}
              </a>
            ))}
          </div>
          <a href="#enquiry" className="ex-btn" style={{ padding: "0.8125rem 1.5rem" }}>
            {t("enquire")}
          </a>
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
          <Wordmark />
          <p className="ex-body" style={{ marginTop: "1.25rem", fontSize: "0.875rem" }}>
            {t("line")}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-start" }}>
          <Link href={`/${locale}`} className="ex-over" style={{ textDecoration: "none" }}>
            {t("public")}
          </Link>
          <span className="ex-over" style={{ color: "rgba(145,143,131,0.5)" }}>
            © {new Date().getFullYear()} Portugal NTN
          </span>
        </div>
      </div>
    </footer>
  );
}
