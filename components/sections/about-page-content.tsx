"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp, FadeRight } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { ShieldCheck, Users, Leaf } from "lucide-react";

const EASE = [0.19, 1, 0.22, 1] as const;

export function AboutPageContent() {
  const t = useTranslations("aboutPage");
  const locale = useLocale();

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  const conduct = [
    { Icon: Users, title: t("conduct1Title"), body: t("conduct1Body") },
    { Icon: Leaf, title: t("conduct2Title"), body: t("conduct2Body") },
    { Icon: ShieldCheck, title: t("conduct3Title"), body: t("conduct3Body") },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative flex items-end" style={{ minHeight: "72vh" }}>
        <div className="absolute inset-0 z-0">
          <Image src="/images/routes/douro-1.jpg" alt="Portugal NTN Walking" fill priority className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(29,29,26,0.55) 0%, rgba(29,29,26,0.2) 40%, rgba(29,29,26,0.88) 100%)" }}
          />
        </div>
        <div className="container-ntn relative z-10" style={{ paddingTop: "160px", paddingBottom: "80px" }}>
          <FadeUp>
            <div style={{ marginBottom: "20px" }}>
              <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">
                {t("heroLabel")}
              </Overline>
            </div>
            <h1
              className="font-title"
              style={{ color: "#fff", whiteSpace: "pre-line", lineHeight: 1.04, textTransform: "none", fontSize: "clamp(2.5rem, 6vw, 5rem)", maxWidth: "18ch", marginBottom: "20px" }}
            >
              {t("heroTitle")}
            </h1>
            <p className="text-body-lg" style={{ color: "rgba(255,255,255,0.82)", maxWidth: "44rem" }}>
              {t("heroSubtitle")}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Our company */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeUp>
              <div style={{ marginBottom: "16px" }}>
                <Overline color="var(--color-ntn-forest-400)">{t("companyLabel")}</Overline>
              </div>
              <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                {t("companyTitle")}
              </h2>
            </FadeUp>
            <FadeRight delay={0.1}>
              <p className="text-body-lg leading-relaxed" style={{ color: "var(--color-ntn-black-800)", marginBottom: "20px" }}>
                {t("companyBody1")}
              </p>
              <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-forest-600)" }}>
                {t("companyBody2")}
              </p>
            </FadeRight>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ marginTop: "64px", borderTop: "1px solid rgba(89,105,77,0.16)" }}>
            {stats.map((s, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                style={{ padding: "32px 8px", borderBottom: "1px solid rgba(89,105,77,0.16)" }}
              >
                <p className="font-title" style={{ color: "var(--color-ntn-forest-400)", fontSize: "3rem", lineHeight: 1 }}>{s.value}</p>
                <p className="text-label" style={{ color: "var(--color-ntn-sage-200)", marginTop: "8px" }}>{s.label}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our team */}
      <section style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeUp>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3", borderRadius: "8px" }}>
                <Image src="/images/routes/tras-os-montes-1.jpg" alt={t("teamTitle")} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </FadeUp>
            <FadeRight delay={0.1}>
              <div style={{ marginBottom: "16px" }}>
                <Overline color="var(--color-ntn-forest-400)">{t("teamLabel")}</Overline>
              </div>
              <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "24px" }}>
                {t("teamTitle")}
              </h2>
              <p className="text-body-lg leading-relaxed" style={{ color: "var(--color-ntn-black-800)", marginBottom: "20px" }}>
                {t("teamBody1")}
              </p>
              <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-forest-600)" }}>
                {t("teamBody2")}
              </p>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* Code of conduct */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-100)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{t("conductLabel")}</Overline>
            </div>
            <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", maxWidth: "20ch", marginBottom: "56px" }}>
              {t("conductTitle")}
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "32px" }}>
            {conduct.map((c, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                style={{ backgroundColor: "var(--color-ntn-white)", borderRadius: "10px", padding: "36px 32px", border: "1px solid rgba(89,105,77,0.12)" }}
              >
                <span style={{ color: "var(--color-ntn-forest-400)", display: "inline-flex", marginBottom: "20px" }}>
                  <c.Icon size={28} strokeWidth={1.6} />
                </span>
                <h3 className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontWeight: 700, fontSize: "1.2rem", marginBottom: "12px" }}>
                  {c.title}
                </h3>
                <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)" }}>
                  {c.body}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "var(--color-ntn-forest-600)", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "40px" }}>
              <div>
                <h2 className="font-title" style={{ color: "#fff", fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)", textTransform: "none", lineHeight: 1.1, marginBottom: "16px", maxWidth: "20ch" }}>
                  {t("ctaTitle")}
                </h2>
                <p className="text-body-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "46ch" }}>
                  {t("ctaBody")}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link href={`/${locale}/destinations`} className="btn btn-primary">
                  {t("ctaDestinations")}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link href={`/${locale}/sustainable`} className="btn btn-outline-light">
                  {t("ctaSustainable")}
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
