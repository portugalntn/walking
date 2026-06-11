"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp, StaggerChildren } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { fadeUp } from "@/lib/motion";
import { formatPrice } from "@/lib/utils";
import type { Program } from "@/lib/programs";
import { Check, X, Clock, Footprints, MapPin, CalendarDays, TrendingUp, Mail, HelpCircle } from "lucide-react";
import { ProposalForm } from "@/components/sections/proposal-form";

const EASE = [0.19, 1, 0.22, 1] as const;
type Loc = "en" | "pt" | "es";

export function ProductPageContent({ program }: { program: Program }) {
  const t = useTranslations("productPage");
  const locale = useLocale() as Loc;
  const priceLocale = { en: "en-GB", pt: "pt-PT", es: "es-ES" }[locale];
  const [lightbox, setLightbox] = useState<string | null>(null);

  const mealLabel = (k: string) =>
    k === "breakfast" ? t("mealBreakfast") : k === "packedLunch" ? t("mealPackedLunch") : t("mealDinner");

  const isDay = program.format === "roteiro";

  const facts = [
    {
      icon: <Clock size={20} />,
      label: t("duration"),
      value: program.duration.nights > 0
        ? `${program.duration.days} ${t("daysWord")} · ${program.duration.nights} ${t("nights")}`
        : t("oneDay"),
    },
    { icon: <Footprints size={20} />, label: t("format"), value: program.type[locale] },
    { icon: <TrendingUp size={20} />, label: t("difficulty"), value: program.difficulty[locale] },
    { icon: <MapPin size={20} />, label: isDay ? t("meetingPoint") : t("startPoint"), value: program.startPoint },
    { icon: <CalendarDays size={20} />, label: t("season"), value: program.season[locale] },
    { icon: <Footprints size={20} />, label: t("total"), value: program.totalDistance },
  ];

  // Text column + rows-of-two photo grid, shared by multi-day timeline and 1-day walk.
  const dayBody = (d: Program["days"][number]) => {
    // House standard: photos always in clean rows of two (1 / 2 / 4).
    const raw = d.gallery ?? [];
    const gal = raw.length > 1 && raw.length % 2 === 1 ? raw.slice(0, -1) : raw;
    return (
      <div
        style={{
          flex: 1,
          paddingTop: "4px",
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          alignItems: "flex-start",
        }}
      >
        {/* Text column, given more room than the photos */}
        <div style={{ flex: "1.3 1 320px", minWidth: "280px" }}>
          <p className="text-label" style={{ color: "var(--color-ntn-forest-400)", marginBottom: "4px" }}>
            {isDay ? d.trail : `${t("day")} ${d.day}`}
          </p>
          <h3 className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontSize: "1.35rem", fontWeight: 700, marginBottom: "12px" }}>
            {d.title[locale]}
          </h3>
          {d.description && (
            <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)", marginBottom: "16px" }}>
              {d.description[locale]}
            </p>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {d.distance && <Chip>{d.distance}{d.shape ? ` · ${t(d.shape)}` : ""}</Chip>}
            {d.walkTime && <Chip>{d.walkTime}</Chip>}
            {d.ascent && <Chip>{d.ascent}</Chip>}
            {d.meals.map((mk) => (
              <Chip key={mk} accent>{mealLabel(mk)}</Chip>
            ))}
          </div>
          {d.accommodation && (
            <p className="text-body-md" style={{ color: "var(--color-ntn-black-800)", marginTop: "12px" }}>
              <span style={{ color: "var(--color-ntn-sage-200)" }}>{t("accommodation")}: </span>
              {d.accommodation}
            </p>
          )}
          {d.note && (
            <p className="text-body-md" style={{ color: "var(--color-ntn-forest-600)", marginTop: "8px" }}>
              {d.note[locale]}
            </p>
          )}
        </div>

        {/* Photos: clean grid in rows of two (1 / 2 / 4), each opens lightbox */}
        {gal.length > 0 && (
          <div
            style={{
              flex: "1 1 300px",
              maxWidth: "440px",
              width: "100%",
              display: "grid",
              gridTemplateColumns: gal.length === 1 ? "1fr" : "repeat(2, 1fr)",
              gap: "10px",
            }}
          >
            {gal.map((src, gi) => {
              const spanFull = gal.length > 1 && gal.length % 2 === 1 && gi === gal.length - 1;
              return (
                <button
                  key={gi}
                  type="button"
                  onClick={() => setLightbox(src)}
                  className="group/img"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "8px",
                    aspectRatio: "3 / 2",
                    cursor: "zoom-in",
                    padding: 0,
                    border: "none",
                    background: "none",
                    width: "100%",
                    gridColumn: spanFull ? "1 / -1" : undefined,
                  }}
                >
                  <Image
                    src={src}
                    alt={d.title[locale]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/img:scale-[1.06]"
                    sizes="(max-width: 1024px) 50vw, 220px"
                  />
                  <span
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover/img:opacity-100"
                    style={{ background: "rgba(29,29,26,0.18)" }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative flex items-end" style={{ minHeight: "78vh" }}>
        <div className="absolute inset-0 z-0">
          <Image src={program.heroImage} alt={program.title} fill priority className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(29,29,26,0.5) 0%, rgba(29,29,26,0.15) 38%, rgba(29,29,26,0.55) 72%, rgba(29,29,26,0.92) 100%)" }}
          />
        </div>

        <div className="container-ntn relative z-10" style={{ paddingTop: "150px", paddingBottom: "72px" }}>
          <FadeUp>
            <Link
              href={`/${locale}/destinations`}
              className="text-label inline-flex items-center gap-2"
              style={{ color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transform: "rotate(180deg)" }}>
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t("back")}
            </Link>
            <div style={{ marginBottom: "14px" }}>
              <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">
                {program.region} · {t(program.format === "programa" ? "formatMultiday" : "formatDay")}
              </Overline>
            </div>
            <h1
              className="font-title"
              style={{ color: "#fff", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", lineHeight: 0.98, textTransform: "uppercase", fontWeight: 900, marginBottom: "16px", maxWidth: "20ch" }}
            >
              {program.title}
            </h1>
            <p className="text-body-lg" style={{ color: "rgba(255,255,255,0.82)", maxWidth: "36rem", marginBottom: "32px" }}>
              {program.subtitle[locale]}
            </p>
            <a href="#proposal" className="btn btn-primary">
              {t("requestProposal")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── Overview + facts bar ── */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "90px", paddingBottom: "90px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{t("overview")}</Overline>
            </div>
            <p
              className="text-body-lg leading-relaxed"
              style={{ color: "var(--color-ntn-black-800)", maxWidth: "62ch", marginBottom: "56px" }}
            >
              {program.overview[locale]}
            </p>
          </FadeUp>

          {/* Horizontal facts bar */}
          <FadeUp delay={0.1}>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
              style={{ borderTop: "1px solid rgba(89,105,77,0.16)" }}
            >
              {facts.map((f, i) => (
                <div
                  key={i}
                  style={{
                    padding: "24px 20px",
                    borderBottom: "1px solid rgba(89,105,77,0.16)",
                    borderLeft: i % 2 !== 0 ? "1px solid rgba(89,105,77,0.16)" : "none",
                  }}
                  className="lg:!border-l lg:first:!border-l-0"
                >
                  <span style={{ color: "var(--color-ntn-forest-400)", display: "inline-flex", marginBottom: "10px" }}>{f.icon}</span>
                  <p className="text-label" style={{ color: "var(--color-ntn-sage-200)", marginBottom: "4px" }}>{f.label}</p>
                  <p className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontWeight: 700, fontSize: "15px" }}>{f.value}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Itinerary ── */}
      <section style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "90px", paddingBottom: "90px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{isDay ? t("theWalk") : t("itinerary")}</Overline>
            </div>
            <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", fontSize: "clamp(2rem, 4vw, 3rem)", textTransform: "none", lineHeight: 1.1, marginBottom: "48px" }}>
              {program.title}
            </h2>
          </FadeUp>

          {isDay ? (
            <FadeUp>{dayBody(program.days[0])}</FadeUp>
          ) : (
            <StaggerChildren speed="fast" className="relative">
              {program.days.map((d) => (
                <m.div
                  key={d.day}
                  variants={fadeUp}
                  style={{ display: "flex", gap: "24px", paddingBottom: "48px", position: "relative" }}
                >
                  {/* Day number + line */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div
                      className="font-title"
                      style={{
                        width: "52px", height: "52px", borderRadius: "9999px",
                        backgroundColor: "var(--color-ntn-forest-400)", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "13px", letterSpacing: "0.06em", flexShrink: 0,
                      }}
                    >
                      {String(d.day).padStart(2, "0")}
                    </div>
                    {d.day !== program.days.length && (
                      <div style={{ flex: 1, width: "1.5px", backgroundColor: "rgba(89,105,77,0.2)", marginTop: "8px" }} />
                    )}
                  </div>

                  {dayBody(d)}
                </m.div>
              ))}
            </StaggerChildren>
          )}
        </div>
      </section>

      {/* ── Included / Not included / Extras ── */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-100)", paddingTop: "90px", paddingBottom: "90px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: "48px" }}>
            <FadeUp>
              <Overline color="var(--color-ntn-forest-400)">{t("included")}</Overline>
              <ul style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {program.included.map((it, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", color: "var(--color-ntn-black-800)" }} className="text-body-md">
                    <Check size={18} style={{ color: "var(--color-ntn-forest-400)", flexShrink: 0, marginTop: "2px" }} />
                    {it[locale]}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.1}>
              <Overline color="var(--color-ntn-sage-200)">{t("notIncluded")}</Overline>
              <ul style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {program.notIncluded.map((it, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", color: "var(--color-ntn-black-800)" }} className="text-body-md">
                    <X size={18} style={{ color: "var(--color-ntn-sage-200)", flexShrink: 0, marginTop: "2px" }} />
                    {it[locale]}
                  </li>
                ))}
              </ul>

              {program.extras.length > 0 && (
                <div style={{ marginTop: "32px" }}>
                  <Overline color="var(--color-ntn-sage-200)">{t("extras")}</Overline>
                  <ul style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {program.extras.map((it, i) => (
                      <li key={i} className="text-body-md" style={{ color: "var(--color-ntn-black-800)", paddingLeft: "28px", position: "relative" }}>
                        <span style={{ position: "absolute", left: "8px", top: "8px", width: "5px", height: "5px", borderRadius: "9999px", backgroundColor: "var(--color-ntn-forest-400)" }} />
                        {it[locale]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </FadeUp>

            <FadeUp delay={0.2}>
              <Overline color="var(--color-ntn-forest-400)">{t("highlights")}</Overline>
              <ul style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {program.highlights.map((it, i) => (
                  <li key={i} className="text-body-md" style={{ color: "var(--color-ntn-black-900)", fontWeight: 500, paddingLeft: "28px", position: "relative" }}>
                    <span style={{ position: "absolute", left: "6px", top: "6px", width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "var(--color-ntn-lime)" }} />
                    {it[locale]}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Prices ── */}
      <section style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "90px", paddingBottom: "90px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{t("prices")}</Overline>
            </div>
          </FadeUp>
          {program.priceTiers && (
            <FadeUp>
              {/* Two large columns across the full page width: table left, notes right */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "56px", alignItems: "flex-start" }}>
                {/* Left: tier table in two sub-columns of three rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ flex: "2 1 480px", gap: "24px" }}>
                  {[
                    program.priceTiers.slice(0, Math.ceil(program.priceTiers.length / 2)),
                    program.priceTiers.slice(Math.ceil(program.priceTiers.length / 2)),
                  ].map((group, ci) => (
                    <div key={ci} style={{ border: "1px solid rgba(89,105,77,0.16)", borderRadius: "10px", overflow: "hidden" }}>
                      {group.map((tier, i) => (
                        <div
                          key={tier.pax}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            padding: "16px 24px",
                            borderTop: i > 0 ? "1px solid rgba(89,105,77,0.12)" : "none",
                          }}
                        >
                          <span className="text-body-md" style={{ color: "var(--color-ntn-black-800)" }}>
                            {tier.pax} {tier.pax === 1 ? t("paxOne") : t("paxMany")}
                          </span>
                          <span className="font-title" style={{ color: "var(--color-ntn-black-900)", fontSize: "1.4rem", lineHeight: 1 }}>
                            {formatPrice(tier.price, priceLocale)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Right: pricing notes and conditions, filling the remaining width */}
                <div style={{ flex: "1 1 280px" }}>
                  <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)" }}>
                    {t("groupPriceNote")}
                  </p>
                  {program.priceTiersNote && (
                    <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)", marginTop: "12px" }}>
                      {program.priceTiersNote[locale]}
                    </p>
                  )}
                  <p style={{ fontStyle: "italic", fontSize: "14px", color: "#6b7c5a", marginTop: "20px" }}>{t("netNote")}</p>
                  <p className="text-label" style={{ color: "var(--color-ntn-sage-200)", marginTop: "8px" }}>{t("priceNote")}</p>
                </div>
              </div>
            </FadeUp>
          )}

          {program.prices && (
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "24px", maxWidth: "760px" }}>
            {(program.prices.high
              ? [
                  { key: "low", note: t("lowSeasonNote"), label: t("lowSeason"), p: program.prices.low },
                  { key: "high", note: t("highSeasonNote"), label: t("highSeason"), p: program.prices.high },
                ]
              : [{ key: "all", note: "", label: program.season[locale], p: program.prices.low }]
            ).map((s, i) => (
              <m.div
                key={s.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                style={{ border: "1px solid rgba(89,105,77,0.16)", borderRadius: "10px", padding: "28px 30px" }}
              >
                <p className="text-label" style={{ color: "var(--color-ntn-forest-400)", marginBottom: s.note ? 0 : "16px" }}>{s.label}</p>
                {s.note && (
                  <p className="text-body-md" style={{ color: "var(--color-ntn-sage-200)", marginBottom: "16px" }}>{s.note}</p>
                )}
                <p style={{ color: "var(--color-ntn-sage-200)", fontSize: "12px" }}>{t("from")}</p>
                <p className="font-title" style={{ color: "var(--color-ntn-black-900)", fontSize: "2.5rem", lineHeight: 1 }}>
                  {formatPrice(s.p.from, priceLocale)}
                  <span style={{ fontFamily: "var(--font-ui)", fontWeight: 400, fontSize: "13px", color: "var(--color-ntn-sage-200)", marginLeft: "8px" }}>
                    {t("perPerson")}
                  </span>
                </p>
                <p className="text-body-md" style={{ color: "var(--color-ntn-black-800)", marginTop: "12px" }}>
                  {t("singleSupp")}: {formatPrice(s.p.single, priceLocale)}
                </p>
              </m.div>
            ))}
          </div>
          )}
          {program.prices && (
            <FadeUp delay={0.2}>
              {program.priceCondition && (
                <p className="text-body-md" style={{ color: "var(--color-ntn-sage-200)", marginTop: "20px" }}>
                  {program.priceCondition[locale]}
                </p>
              )}
              <p style={{ fontStyle: "italic", fontSize: "14px", color: "#6b7c5a", marginTop: "24px" }}>{t("netNote")}</p>
              <p className="text-label" style={{ color: "var(--color-ntn-sage-200)", marginTop: "8px" }}>{t("priceNote")}</p>
            </FadeUp>
          )}

          {/* Availability + Payment + Cancellation */}
          <FadeUp delay={0.25}>
            <div style={{ marginTop: "44px", paddingTop: "32px", borderTop: "1px solid rgba(89,105,77,0.12)" }}>
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "40px" }}>
                {/* Availability */}
                <div>
                  <Overline color="var(--color-ntn-forest-400)">{t("availability")}</Overline>
                  <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)", marginTop: "14px" }}>
                    {t("availabilityNote")}
                  </p>
                </div>
                {/* Payment */}
                <div>
                  <Overline color="var(--color-ntn-forest-400)">{t("payment")}</Overline>
                  <ul style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {program.payment.map((it, i) => (
                      <li key={i} className="text-body-md" style={{ color: "var(--color-ntn-black-800)", paddingLeft: "18px", position: "relative" }}>
                        <span style={{ position: "absolute", left: "2px", top: "9px", width: "5px", height: "5px", borderRadius: "9999px", backgroundColor: "var(--color-ntn-forest-400)" }} />
                        {it[locale]}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Cancellation */}
                <div>
                  <Overline color="var(--color-ntn-forest-400)">{t("cancellation")}</Overline>
                  <ul style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {program.cancellation.map((it, i) => (
                      <li key={i} className="text-body-md" style={{ color: "var(--color-ntn-black-800)", paddingLeft: "18px", position: "relative" }}>
                        <span style={{ position: "absolute", left: "2px", top: "9px", width: "5px", height: "5px", borderRadius: "9999px", backgroundColor: "var(--color-ntn-sage-200)" }} />
                        {it[locale]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* FAQ helper card */}
          <FadeUp delay={0.3}>
            <div
              style={{
                marginTop: "48px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
                backgroundColor: "var(--color-ntn-cream-50)",
                border: "1px solid rgba(89,105,77,0.16)",
                borderLeft: "4px solid var(--color-ntn-lime)",
                borderRadius: "10px",
                padding: "30px 34px",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                <span style={{ color: "var(--color-ntn-forest-400)", flexShrink: 0, marginTop: "2px" }}>
                  <HelpCircle size={30} strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-label" style={{ color: "var(--color-ntn-forest-400)", marginBottom: "6px" }}>{t("faqCardLabel")}</p>
                  <p className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontWeight: 700, fontSize: "1.15rem", marginBottom: "4px" }}>{t("faqCardTitle")}</p>
                  <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)", maxWidth: "54ch" }}>{t("faqCardBody")}</p>
                </div>
              </div>
              <Link href={`/${locale}/faqs`} className="btn btn-ghost-dark" style={{ flexShrink: 0 }}>
                {t("faqCardCta")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA + proposal form (B2B) ── */}
      <section id="proposal" style={{ backgroundColor: "var(--color-ntn-lime)", paddingTop: "90px", paddingBottom: "90px", scrollMarginTop: "96px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start" style={{ gap: "clamp(40px, 6vw, 80px)" }}>
            {/* Left: pitch */}
            <FadeUp>
              <h2 className="font-title" style={{ color: "#1a2510", fontSize: "clamp(2rem, 4vw, 3.25rem)", textTransform: "none", lineHeight: 1.1, marginBottom: "20px" }}>
                {t("ctaTitle")}
              </h2>
              <p className="text-body-lg leading-relaxed" style={{ color: "#2d3b1e", marginBottom: "32px", maxWidth: "44ch" }}>
                {t("ctaBody")}
              </p>
              <a
                href="mailto:info@portugalntn.com"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  color: "#1a2510", fontFamily: "var(--font-ui)", fontWeight: 700,
                  fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase",
                  textDecoration: "none", borderBottom: "1.5px solid rgba(26,37,16,0.4)", paddingBottom: "3px",
                }}
              >
                <Mail size={16} />
                info@portugalntn.com
              </a>
            </FadeUp>

            {/* Right: form */}
            <FadeUp delay={0.12}>
              <ProposalForm program={program.title} />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 300,
              backgroundColor: "rgba(20,20,18,0.92)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "clamp(20px, 5vw, 80px)", cursor: "zoom-out",
            }}
          >
            <button
              aria-label="Close"
              onClick={() => setLightbox(null)}
              style={{ position: "absolute", top: "28px", right: "32px", color: "#fff", background: "none", border: "none", cursor: "pointer" }}
            >
              <X size={28} />
            </button>
            <m.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", width: "min(100%, 1100px)", aspectRatio: "16/10", maxHeight: "85vh" }}
            >
              <Image src={lightbox} alt="" fill className="object-contain" sizes="100vw" />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Chip({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-ui)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em",
        padding: "5px 12px", borderRadius: "9999px",
        backgroundColor: accent ? "rgba(188,207,2,0.18)" : "rgba(89,105,77,0.1)",
        color: accent ? "var(--color-ntn-forest-600)" : "var(--color-ntn-black-800)",
      }}
    >
      {children}
    </span>
  );
}
