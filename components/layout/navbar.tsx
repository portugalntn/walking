"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

/**
 * Idiomas pelo nome na própria língua, sem bandeiras: o Windows não desenha
 * bandeiras em emoji (mostrava "PT PT"), e uma bandeira é um país, não uma língua.
 */
const locales = [
  { code: "pt", label: "PT", name: "Português" },
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
];

/** Nome do seletor para leitores de ecrã, na língua da página. */
const LANG_LABEL: Record<string, string> = { pt: "Idioma", en: "Language", es: "Idioma" };

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

/** Menu do topo: uma letra abaixo do text-label, e o espaço entre itens a crescer com a largura do ecrã. */
const NAV_FONT = "10px";
const NAV_GAP = "clamp(16px, 2.2vw, 38px)";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const currentLang = locales.find((l) => l.code === locale) ?? locales[0];
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

  // A lista de idiomas fecha com um clique fora dela ou com Esc.
  useEffect(() => {
    if (!langOpen) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [langOpen]);

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

            {/* Desktop Nav a partir de 1280 px (abaixo não cabe: usa o menu ☰). 10 px, o espaço cresce com o ecrã, sem partir linhas */}
            <nav className="hidden xl:flex items-center" style={{ gap: NAV_GAP }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-ui text-label whitespace-nowrap transition-colors duration-200"
                  style={{ color: linkColor, fontSize: NAV_FONT }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: Exclusive + Lang + CTA */}
            <div className="hidden xl:flex items-center" style={{ gap: "clamp(12px, 1.4vw, 22px)" }}>
              {/* Porta para o site B2B. Tom de latão, para se ler como outro sítio. */}
              {/* A etiqueta B2B é sólida para se ler sobre qualquer fotografia do hero. */}
              <Link
                href={`/${locale}/exclusive`}
                title={t("exclusiveFor")}
                className="font-ui text-label whitespace-nowrap transition-opacity duration-200 hover:opacity-80"
                style={{
                  fontSize: NAV_FONT,
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

              {/* Idioma: globo + código; a lista mostra cada língua pelo seu nome. A cor segue o tom da barra. */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  aria-haspopup="true"
                  aria-expanded={langOpen}
                  aria-label={`${LANG_LABEL[locale] ?? LANG_LABEL.en}: ${currentLang.name}`}
                  className="flex items-center gap-1.5 font-ui text-label transition-colors duration-200"
                  style={{ color: langOpen ? linkHover : linkColor, fontSize: NAV_FONT }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = langOpen ? linkHover : linkColor)}
                >
                  <Globe size={14} strokeWidth={1.6} aria-hidden />
                  {currentLang.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}>
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
                      className="absolute top-full right-0 rounded overflow-hidden"
                      // Espaços em style: o reset do globals.css anula as classes de margem e padding.
                      style={{ marginTop: "0.75rem", padding: "0.375rem 0", backgroundColor: "var(--color-ntn-black-900)", border: "1px solid rgba(255,255,255,0.1)", minWidth: "176px" }}
                    >
                      {locales.map((l) => {
                        const active = l.code === locale;
                        const color = active ? "var(--color-ntn-white)" : "rgba(255,255,255,0.6)";
                        return (
                          <Link
                            key={l.code}
                            href={switchLocalePath(l.code)}
                            hrefLang={l.code}
                            lang={l.code}
                            aria-current={active ? "true" : undefined}
                            onClick={() => setLangOpen(false)}
                            className="flex items-center gap-3 font-ui transition-colors"
                            style={{ color, padding: "0.55rem 1rem", fontSize: "13px", fontWeight: 500, letterSpacing: "0.02em" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ntn-white)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = color)}
                          >
                            {l.name}
                            <span className="text-label" style={{ marginLeft: "auto", fontSize: NAV_FONT, color: active ? "var(--color-ntn-lime)" : "rgba(255,255,255,0.35)" }}>
                              {l.label}
                            </span>
                          </Link>
                        );
                      })}
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
              className="xl:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
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
            className="fixed inset-0 z-40 flex flex-col !pt-24 !pb-12 !px-8"
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
              <Globe size={16} strokeWidth={1.6} aria-hidden style={{ color: "rgba(255,255,255,0.4)" }} />
              {locales.map((l) => (
                <Link
                  key={l.code}
                  href={switchLocalePath(l.code)}
                  hrefLang={l.code}
                  lang={l.code}
                  aria-label={l.name}
                  aria-current={l.code === locale ? "true" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="text-label"
                  style={{ color: l.code === locale ? "var(--color-ntn-lime)" : "rgba(255,255,255,0.4)" }}
                >
                  {l.label}
                </Link>
              ))}
              <Link href={`/${locale}#contact`} onClick={() => setMenuOpen(false)} className="btn btn-primary !ml-auto">
                {t("bookNow")}
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
