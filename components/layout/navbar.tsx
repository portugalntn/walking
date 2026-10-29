"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const locales = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "pt", label: "PT", flag: "🇵🇹" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

/**
 * Brand artwork (do not set the wordmark in a web font). One PNG per background:
 * white "PORTUGAL" for dark backgrounds, dark green for light ones.
 */
const LOGO = {
  dark: "/images/brand/logo-walking-fundo-escuro.png",
  light: "/images/brand/logo-walking-fundo-claro.png",
};

/** Relative luminance of an rgb()/rgba() colour, or null when it is (almost) transparent. */
function luminance(css: string): number | null {
  const m = css.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(",").map((x) => parseFloat(x));
  if (a < 0.5) return null;
  const lin = (c: number) => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

const flagFor: Record<string, string> = {
  en: "🇬🇧",
  pt: "🇵🇹",
  es: "🇪🇸",
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  // Tone of what sits behind the bar. Scrolled, the bar has its own dark background;
  // at the top it is transparent, so we read the page under it (photo = dark).
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const read = () => {
      const isScrolled = window.scrollY > 60;
      setScrolled(isScrolled);
      if (isScrolled) return setOnLight(false);
      const h = headerRef.current;
      if (!h) return;
      const y = h.getBoundingClientRect().height / 2;
      const under = document.elementsFromPoint(window.innerWidth / 2, y).filter((el) => !h.contains(el));
      for (const el of under) {
        if (el.tagName === "IMG" || el.tagName === "VIDEO") return setOnLight(false);
        const cs = getComputedStyle(el);
        if (cs.backgroundImage && cs.backgroundImage !== "none") return setOnLight(false);
        const lum = luminance(cs.backgroundColor);
        if (lum !== null) return setOnLight(lum > 0.5);
      }
      setOnLight(false);
    };
    read();
    // Images and fonts settle after the first paint; read again once they do.
    const late = window.setTimeout(read, 400);
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.clearTimeout(late);
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [pathname]);

  // Nav link colours follow the tone, so the bar stays readable on either background.
  const linkColor = onLight ? "rgba(29,29,26,0.72)" : "rgba(255,255,255,0.72)";
  const linkHover = onLight ? "var(--color-ntn-black-900)" : "var(--color-ntn-white)";

  // Build locale-switched path
  const switchLocalePath = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  const navLinks = [
    { href: `/${locale}/destinos`, label: t("destinations") },
    { href: `/${locale}/programas`, label: t("programs") },
    { href: `/${locale}/sustainable`, label: t("sustainable") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}#contact`, label: t("contact") },
    // "Sobre nós" closes the menu, by decision of the company (first or last, never in the middle).
    { href: `/${locale}/about`, label: t("about") },
  ];

  return (
    <>
      <m.header
        ref={headerRef}
        data-tone={onLight ? "light" : "dark"}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(29, 29, 26, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="container-ntn">
          <div className="flex items-center justify-between h-24">

            {/* Logo: brand artwork, the version that contrasts with what is behind the bar */}
            <Link href={`/${locale}`} className="relative block flex-shrink-0" aria-label="Portugal NTN Walking" style={{ height: "clamp(38px, 3.1vw, 46px)", aspectRatio: "442 / 98" }}>
              {(["dark", "light"] as const).map((tone) => (
                <Image
                  key={tone}
                  src={LOGO[tone]}
                  alt={tone === "dark" ? "Portugal NTN Walking" : ""}
                  aria-hidden={tone === "light"}
                  fill
                  priority
                  sizes="210px"
                  // Both are loaded; a cross-fade avoids a flash when the tone changes.
                  style={{ objectFit: "contain", objectPosition: "left center", opacity: (tone === "light") === onLight ? 1 : 0, transition: "opacity 0.3s ease" }}
                />
              ))}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-ui text-label transition-colors duration-200"
                  style={{ color: linkColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: Exclusive + Lang + CTA */}
            <div className="hidden lg:flex items-center gap-5">
              {/* Porta para o site B2B. Tom de latão, para se ler como outro sítio. */}
              {/* A etiqueta B2B é sólida para se ler sobre qualquer fotografia do hero. */}
              <Link
                href={`/${locale}/exclusive`}
                title={t("exclusiveFor")}
                className="font-ui text-label transition-opacity duration-200 hover:opacity-80"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  color: "var(--color-ntn-white)",
                  letterSpacing: "0.22em",
                  paddingRight: "1.25rem",
                  borderRight: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#b9ad72",
                    color: "var(--color-ntn-black-900)",
                    padding: "0.2rem 0.4rem",
                    borderRadius: "2px",
                    letterSpacing: "0.14em",
                    lineHeight: 1,
                  }}
                >
                  {t("exclusiveTag")}
                </span>
                {t("exclusive")}
              </Link>

              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 font-ui text-label transition-colors"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  <span style={{ fontSize: "14px", verticalAlign: "middle" }}>{flagFor[locale]}</span>
                  {locale.toUpperCase()}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}>
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <m.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full right-0 mt-2 py-1 rounded overflow-hidden"
                      style={{ backgroundColor: "var(--color-ntn-black-900)", border: "1px solid rgba(255,255,255,0.1)", minWidth: "70px" }}
                    >
                      {locales
                        .filter((l) => l.code !== locale)
                        .map((l) => (
                          <Link
                            key={l.code}
                            href={switchLocalePath(l.code)}
                            onClick={() => setLangOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 font-ui text-label transition-colors"
                            style={{ color: "rgba(255,255,255,0.6)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ntn-white)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                          >
                            <span style={{ fontSize: "14px" }}>{l.flag}</span>
                            {l.label}
                          </Link>
                        ))}
                    </m.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href={`/${locale}#contact`} className="btn btn-primary">
                {t("bookNow")}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {[0, 1, 2].map((i) => (
                <m.span
                  key={i}
                  className="block h-[1.5px] w-full"
                  style={{ backgroundColor: "var(--color-ntn-white)" }}
                  animate={
                    menuOpen
                      ? i === 0
                        ? { rotate: 45, y: 6.5 }
                        : i === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -6.5 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.25 }}
                />
              ))}
            </button>
          </div>
        </div>
      </m.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 flex flex-col pt-24 pb-12 px-8"
            style={{ backgroundColor: "var(--color-ntn-black-900)" }}
          >
            <nav className="flex flex-col gap-6 flex-1">
              {navLinks.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-display-md block"
                    style={{ color: "var(--color-ntn-white)" }}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07 + 0.1 }}
                style={{ marginTop: "0.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Link
                  href={`/${locale}/exclusive`}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-display-md block"
                  style={{ color: "#c8bd8a" }}
                >
                  {t("exclusiveTag")} {t("exclusive")}
                  <span className="font-ui text-label block" style={{ color: "rgba(255,255,255,0.55)", marginTop: "0.4rem", letterSpacing: "0.22em" }}>
                    {t("exclusiveFor")}
                  </span>
                </Link>
              </m.div>
            </nav>

            {/* Mobile lang + CTA */}
            <div className="flex items-center gap-4 flex-wrap">
              {locales.map((l) => (
                <Link
                  key={l.code}
                  href={switchLocalePath(l.code)}
                  onClick={() => setMenuOpen(false)}
                  className="text-label flex items-center gap-1.5"
                  style={{ color: l.code === locale ? "var(--color-ntn-lime)" : "rgba(255,255,255,0.4)" }}
                >
                  <span style={{ fontSize: "14px" }}>{l.flag}</span>
                  {l.label}
                </Link>
              ))}
              <Link href={`/${locale}#contact`} onClick={() => setMenuOpen(false)} className="btn btn-primary ml-auto">
                {t("bookNow")}
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
