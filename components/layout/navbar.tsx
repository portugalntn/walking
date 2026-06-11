"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
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

  const navLinks = [
    { href: `/${locale}/destinations`, label: t("destinations") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/sustainable`, label: t("sustainable") },
    { href: `/${locale}/faqs`, label: t("faq") },
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
          backgroundColor: scrolled
            ? "rgba(29, 29, 26, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "none",
        }}
      >
        <div className="container-ntn">
          <div className="flex items-center justify-between h-24">

            {/* Logo — text wordmark */}
            <Link href={`/${locale}`} className="flex-shrink-0 leading-none">
              <span
                className="font-ui font-bold block leading-none"
                style={{
                  color: "var(--color-ntn-white)",
                  fontSize: "clamp(1.25rem, 1.6vw, 1.6rem)",
                  letterSpacing: "0.02em",
                }}
              >
                PORTUGAL<span style={{ color: "rgba(255,255,255,0.55)" }}>NTN</span>
              </span>
              <span
                className="font-ui font-bold italic block leading-none mt-0.5"
                style={{
                  color: "var(--color-ntn-lime)",
                  fontSize: "clamp(0.95rem, 1.25vw, 1.25rem)",
                  letterSpacing: "0.18em",
                  textAlign: "right",
                }}
              >
                WALKING
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-ui text-label transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-ntn-white)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.72)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: Lang + CTA */}
            <div className="hidden lg:flex items-center gap-5">
              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 font-ui text-label transition-colors"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  <span style={{ fontSize: "14px", verticalAlign: "middle" }}>
                    {flagFor[locale]}
                  </span>
                  {locale.toUpperCase()}
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
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
                      style={{
                        backgroundColor: "var(--color-ntn-black-900)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        minWidth: "70px",
                      }}
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
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = "var(--color-ntn-white)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                            }
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
            </nav>

            {/* Mobile lang + CTA */}
            <div className="flex items-center gap-4 flex-wrap">
              {locales.map((l) => (
                <Link
                  key={l.code}
                  href={switchLocalePath(l.code)}
                  onClick={() => setMenuOpen(false)}
                  className="text-label flex items-center gap-1.5"
                  style={{
                    color:
                      l.code === locale
                        ? "var(--color-ntn-lime)"
                        : "rgba(255,255,255,0.4)",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>{l.flag}</span>
                  {l.label}
                </Link>
              ))}
              <Link
                href={`/${locale}#contact`}
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary ml-auto"
              >
                {t("bookNow")}
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
