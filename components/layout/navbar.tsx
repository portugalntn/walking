"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { regions } from "@/lib/destinations";

const locales = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "pt", label: "PT", flag: "🇵🇹" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

const flagFor: Record<string, string> = {
  en: "🇬🇧",
  pt: "🇵🇹",
  es: "🇪🇸",
};

type NavChild = { href: string; label: string };
type NavEntry = { href: string; label: string; children?: NavChild[] };

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build locale-switched path
  const switchLocalePath = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  const navLinks: NavEntry[] = [
    {
      href: `/${locale}/destinos`,
      label: t("destinations"),
      children: regions.map((r) => ({ href: `/${locale}/destinos/${r.id}`, label: r.name })),
    },
    {
      href: `/${locale}/programas`,
      label: t("programs"),
      children: [
        { href: `/${locale}/programas`, label: t("all") },
        { href: `/${locale}/programas?tipo=1dia`, label: t("oneDay") },
        { href: `/${locale}/programas?tipo=multidias`, label: t("multiDays") },
      ],
    },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/sustainable`, label: t("sustainable") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}#contact`, label: t("contact") },
  ];

  return (
    <>
      <m.header
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

            {/* Logo — text wordmark */}
            <Link href={`/${locale}`} className="flex-shrink-0 leading-none">
              <span
                className="font-ui font-bold block leading-none"
                style={{ color: "var(--color-ntn-white)", fontSize: "clamp(1.25rem, 1.6vw, 1.6rem)", letterSpacing: "0.02em" }}
              >
                PORTUGAL<span style={{ color: "rgba(255,255,255,0.55)" }}>NTN</span>
              </span>
              <span
                className="font-ui font-bold italic block leading-none mt-0.5"
                style={{ color: "var(--color-ntn-lime)", fontSize: "clamp(0.95rem, 1.25vw, 1.25rem)", letterSpacing: "0.18em", textAlign: "right" }}
              >
                WALKING
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, idx) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setOpenIdx(idx)}
                  onMouseLeave={() => link.children && setOpenIdx((cur) => (cur === idx ? null : cur))}
                >
                  <Link
                    href={link.href}
                    className="font-ui text-label transition-colors duration-200 flex items-center gap-1.5"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ntn-white)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}
                  >
                    {link.label}
                    {link.children && (
                      <svg
                        width="9"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        className={`transition-transform duration-200 ${openIdx === idx ? "rotate-180" : ""}`}
                        style={{ opacity: 0.65 }}
                      >
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </Link>

                  {link.children && (
                    <AnimatePresence>
                      {openIdx === idx && (
                        <m.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-0 top-full pt-3"
                        >
                          <div
                            className="py-2 rounded overflow-hidden"
                            style={{ backgroundColor: "var(--color-ntn-black-900)", border: "1px solid rgba(255,255,255,0.1)", minWidth: "210px" }}
                          >
                            {link.children.map((c) => (
                              <Link
                                key={c.href}
                                href={c.href}
                                onClick={() => setOpenIdx(null)}
                                className="block px-5 py-2.5 transition-colors"
                                style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-ui)", fontSize: "13px", letterSpacing: "0.04em" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ntn-lime)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: Lang + CTA */}
            <div className="hidden lg:flex items-center gap-5">
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
            className="fixed inset-0 z-40 flex flex-col pt-24 pb-12 px-8 overflow-y-auto"
            style={{ backgroundColor: "var(--color-ntn-black-900)" }}
          >
            <nav className="flex flex-col gap-5 flex-1">
              {navLinks.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-display-sm block"
                    style={{ color: "var(--color-ntn-white)" }}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="flex flex-col gap-2.5 mt-3" style={{ paddingLeft: "2px" }}>
                      {link.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setMenuOpen(false)}
                          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-ui)", fontSize: "15px", letterSpacing: "0.02em" }}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </m.div>
              ))}
            </nav>

            {/* Mobile lang + CTA */}
            <div className="flex items-center gap-4 flex-wrap mt-8">
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
