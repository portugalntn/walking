"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp, FadeRight, StaggerChildren } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { ShieldCheck, Users, Leaf } from "lucide-react";
import { fadeUpSoft } from "@/lib/motion";

const EASE = [0.19, 1, 0.22, 1] as const;

const CONSULTING_GALLERY = [
  { src: "/images/consulting/c-sinal-12.jpg", alt: "Sinalética GeoParc NTN" },
  { src: "/images/consulting/c-sinal-13.jpg", alt: "Marco de trilho NTN" },
  { src: "/images/consulting/c-sinal-8.jpg", alt: "Marcação de trilho" },
  { src: "/images/consulting/c-sinal-15.jpg", alt: "Percurso pedestre NTN" },
  { src: "/images/consulting/c-sinal-16.jpg", alt: "Sinalética percurso NTN" },
  { src: "/images/consulting/c-sinal-18.jpg", alt: "Rota religiosa NTN" },
];

const TEAM_IMAGES = [
  { src: "/images/about/team-1.jpg", alt: "Equipa NTN Walking" },
  { src: "/images/about/team-2.jpg", alt: "Guia certificado NTN" },
  { src: "/images/about/team-3.jpg", alt: "Guia NTN no terreno" },
  { src: "/images/about/team-4.jpg", alt: "Caminhada guiada NTN" },
];

const features = [
  { text: "Certified trail network" },
  { text: "Expert local guides" },
  { text: "Sustainable operations" },
  { text: "DMC for global agencies" },
];

export function AboutPageContent() {
  const t = useTranslations("aboutPage");
  const tIntro = useTranslations("home.intro");
  const locale = useLocale();

  const conduct = [
    { Icon: Users, title: t("conduct1Title"), body: t("conduct1Body") },
    { Icon: Leaf, title: t("conduct2Title"), body: t("conduct2Body") },
    { Icon: ShieldCheck, title: t("conduct3Title"), body: t("conduct3Body") },
  ];

  const consultingServices = [
    t("consultingService1"),
    t("consultingService2"),
    t("consultingService3"),
    t("consultingService4"),
    t("consultingService5"),
    t("consultingService6"),
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative flex items-end" style={{ minHeight: "72vh" }}>
        <div className="absolute inset-0 z-0">
          <Image src="/images/routes/santiago-1.jpg" alt="Caminho de Santiago Portugal NTN" fill priority className="object-cover" sizes="100vw" />
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
              style={{ color: "#fff", whiteSpace: "pre-line", lineHeight: 1.04, textTransform: "none", fontSize: "clamp(2.5rem, 6vw, 5rem)", maxWidth: "100%", marginBottom: "20px" }}
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
        </div>
      </section>

      {/* Nascemos do território */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-100)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            {/* Left — Text */}
            <div>
              <FadeUp>
                <div style={{ marginBottom: "24px" }}>
                  <Overline color="var(--color-ntn-forest-400)">{tIntro("label")}</Overline>
                </div>
                <h2
                  className="font-title"
                  style={{ color: "var(--color-ntn-black-900)", whiteSpace: "pre-line", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "24px" }}
                >
                  {tIntro("title")}
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-body-lg leading-relaxed" style={{ color: "var(--color-ntn-black-800)", marginBottom: "16px" }}>
                  {tIntro("body")}
                </p>
                <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-forest-600)" }}>
                  {tIntro("body2")}
                </p>
              </FadeUp>
              <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                <StaggerChildren speed="fast" className="flex flex-wrap gap-3">
                  {features.map((f) => (
                    <m.div
                      key={f.text}
                      variants={fadeUpSoft}
                      style={{ padding: "8px 16px", border: "1px solid rgba(89,105,77,0.35)", borderRadius: "3px" }}
                    >
                      <span style={{ color: "var(--color-ntn-forest-600)", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>
                        {f.text}
                      </span>
                    </m.div>
                  ))}
                </StaggerChildren>
              </div>
              <FadeUp delay={0.15}>
                <div style={{ marginTop: "36px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
                  <Link href={`/${locale}/programas`} className="btn btn-primary">
                    {t("ctaDestinations")}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a href={`/${locale}#contact`} className="btn btn-ghost-dark">
                    {tIntro("cta")}
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Right — Image with badge */}
            <FadeRight delay={0.2}>
              <div className="relative" style={{ marginRight: "24px", marginBottom: "24px" }}>
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5", borderRadius: "8px" }}>
                  <Image
                    src="/images/about/nascemos.jpg"
                    alt="Portugal NTN no terreno"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(29,29,26,0.35) 100%)" }}
                  />
                </div>
                <div
                  className="shadow-xl"
                  style={{ position: "absolute", bottom: "-24px", right: "-24px", zIndex: 10, backgroundColor: "var(--color-ntn-forest-600)", padding: "20px 24px", borderRadius: "8px", minWidth: "180px" }}
                >
                  <p className="font-title leading-none" style={{ color: "var(--color-ntn-lime)", fontSize: "52px", fontWeight: 700, marginBottom: "8px" }}>12</p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    {tIntro("stat1Label")}
                  </p>
                </div>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* Consulting bridge — 12 anos no terreno */}
      <section style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeUp>
              <div style={{ marginBottom: "16px" }}>
                <Overline color="var(--color-ntn-forest-400)">{t("consultingLabel")}</Overline>
              </div>
              <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", whiteSpace: "pre-line", marginBottom: "24px" }}>
                {t("consultingTitle")}
              </h2>
              <p className="text-body-lg leading-relaxed" style={{ color: "var(--color-ntn-black-800)", marginBottom: "32px" }}>
                {t("consultingBody")}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                {consultingServices.map((svc, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-ntn-lime)", display: "inline-block", flexShrink: 0 }} />
                    <span className="text-body-md" style={{ color: "var(--color-ntn-black-800)" }}>{svc}</span>
                  </li>
                ))}
              </ul>
              <a href="https://portugalntnwalking.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                {t("consultingCta")}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </FadeUp>

            <FadeRight delay={0.1}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "6px" }}>
                {CONSULTING_GALLERY.map((img) => (
                  <div key={img.src} className="relative overflow-hidden" style={{ aspectRatio: "1", borderRadius: "4px" }}>
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 1024px) 33vw, 17vw" />
                  </div>
                ))}
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* Our team — photo grid */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-100)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeUp>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "6px", borderRadius: "8px", overflow: "hidden" }}>
                {TEAM_IMAGES.map((img) => (
                  <div key={img.src} className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                  </div>
                ))}
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
      <section style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "100px", paddingBottom: "100px" }}>
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
                style={{ backgroundColor: "var(--color-ntn-cream-50)", borderRadius: "10px", padding: "36px 32px", border: "1px solid rgba(89,105,77,0.12)" }}
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
                <Link href={`/${locale}/programas`} className="btn btn-primary">
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
