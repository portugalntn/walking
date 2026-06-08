"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/ui/animated";
import { SealsStrip } from "@/components/layout/seals-strip";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="3"/>
        <path d="M7 10v7M7 7v.5M12 17v-4a2 2 0 014 0v4M12 10v7"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
];

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <>
      {/* Certification seals band — above the footer on every page */}
      <SealsStrip />

      <footer
      style={{ backgroundColor: "var(--color-ntn-black-900)" }}
    >
      {/* Top separator line with lime accent */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-ntn-lime) 30%, var(--color-ntn-lime) 70%, transparent)",
          opacity: 0.4,
        }}
      />

      <div
        className="container-ntn"
        style={{ paddingTop: "60px", paddingBottom: "48px" }}
      >

        {/* Main grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-16"
          style={{ columnGap: "80px", rowGap: "48px" }}
        >

          {/* Brand column */}
          <div className="lg:col-span-2">
            <FadeUp>
              <Link href={`/${locale}`} className="inline-block mb-6">
                <Image
                  src="/images/logos/PortugalNTN_A2.png"
                  alt="Portugal NTN Walking"
                  width={48}
                  height={68}
                  className="w-12 h-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </Link>
              <p
                className="text-body-md mb-6"
                style={{
                  color: "var(--color-ntn-sage-200)",
                  maxWidth: "240px",
                  lineHeight: 1.7,
                }}
              >
                {t("tagline")} Premium walking tours crafted by the people who built the trails.
              </p>
              {/* Social */}
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded flex items-center justify-center transition-colors duration-200"
                    style={{
                      color: "var(--color-ntn-sage-200)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-ntn-lime)";
                      e.currentTarget.style.borderColor = "var(--color-ntn-lime)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-ntn-sage-200)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Routes column */}
          <div>
            <FadeUp delay={0.1}>
              <p
                className="text-label mb-5"
                style={{ color: "var(--color-ntn-lime)" }}
              >
                {t("routes")}
              </p>
              <ul className="space-y-2" style={{ lineHeight: 2 }}>
                {[
                  "Alto Douro Wine Region",
                  "Peneda-Gerês National Park",
                  "Trás-os-Montes",
                  "Mystic Sintra",
                  "Arrábida Natural Park",
                  "Quadrassal e Romeu",
                ].map((name) => (
                  <li key={name}>
                    <Link
                      href={`/${locale}#routes`}
                      className="text-body-md transition-colors duration-150"
                      style={{ color: "rgba(190,194,181,0.65)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--color-ntn-white)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(190,194,181,0.65)")
                      }
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* Company column */}
          <div>
            <FadeUp delay={0.15}>
              <p
                className="text-label mb-5"
                style={{ color: "var(--color-ntn-lime)" }}
              >
                {t("company")}
              </p>
              <ul className="space-y-2" style={{ lineHeight: 2 }}>
                {[
                  { label: t("about"), href: `/${locale}#about` },
                  { label: t("consulting"), href: "https://portugalntn.com" },
                  { label: t("contact"), href: `/${locale}#contact` },
                  { label: t("privacy"), href: `/${locale}/privacy` },
                  { label: t("terms"), href: `/${locale}/terms` },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-body-md transition-colors duration-150"
                      style={{ color: "rgba(190,194,181,0.65)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--color-ntn-white)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "rgba(190,194,181,0.65)")
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "24px",
            marginTop: "40px",
          }}
        >
          <p
            className="text-label"
            style={{ color: "rgba(190,194,181,0.4)" }}
          >
            {t("copyright", { year })}
          </p>
          {/* Lang switcher bottom */}
          <div className="flex gap-4">
            {["en", "pt", "es"].map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className="text-label transition-colors duration-150"
                style={{
                  color:
                    l === locale
                      ? "var(--color-ntn-lime)"
                      : "rgba(190,194,181,0.35)",
                }}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
