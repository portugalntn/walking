"use client";

/**
 * Product page, design proposal v2 (reference: /[locale]/programas/[id]/proposta).
 * Photos lead, the day is told as a sequence of moments placed on the real
 * elevation profile (no map: the route is not published), and a sticky
 * booking card keeps the next step in reach.
 * Same data as the live page (lib/programs.ts) plus lib/trails.ts.
 * pt-PT, no em dashes (house rule).
 */

import { useState, useEffect, useCallback, useMemo, useRef, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { formatPrice } from "@/lib/utils";
import type { Program } from "@/lib/programs";
import type { Trail } from "@/lib/trails";
import type { L } from "@/lib/destinations";
import {
  Check, X, ChevronLeft, ChevronRight, Images, Mail, Clock, MapPin, CalendarDays,
  ShieldCheck, Wallet, RotateCcw, ArrowRight, Camera,
} from "lucide-react";
import { ProposalForm } from "@/components/sections/proposal-form";
import { DifficultyGauge } from "@/components/sections/difficulty-gauge";

const EASE = [0.19, 1, 0.22, 1] as const;
type Loc = "en" | "pt" | "es";
const tri = (en: string, pt: string, es: string): L => ({ en, pt, es });

/** Strings used only by this proposal. They move to messages/*.json once approved. */
const TX = {
  seeGallery: tri("See the gallery", "Ver galeria", "Ver galería"),
  photos: tri("photos", "fotos", "fotos"),
  photoSoon: tri("Photo coming soon", "Foto em breve", "Foto próximamente"),
  whyLabel: tri("Why this day", "Porquê este dia", "Por qué este día"),
  dayLabel: tri("The day, step by step", "O dia, passo a passo", "El día, paso a paso"),
  routeLabel: tri("The route", "O percurso", "El recorrido"),
  routeTitle: tri("The shape of the day", "O relevo do dia", "El relieve del día"),
  routeHint: tri(
    "The walk drawn kilometre by kilometre. When it ends, move along the profile to see each point.",
    "A caminhada desenhada quilómetro a quilómetro. No fim, percorra o perfil para ver cada ponto.",
    "La caminata dibujada kilómetro a kilómetro. Al terminar, recorra el perfil para ver cada punto."
  ),
  replay: tri("Walk it again", "Rever o percurso", "Ver de nuevo"),
  of: tri("of", "de", "de"),
  altitude: tri("altitude", "altitude", "altitud"),
  start: tri("Start", "Partida", "Salida"),
  finish: tri("Finish", "Chegada", "Llegada"),
  ask: tri("Ask a question", "Fazer uma pergunta", "Hacer una pregunta"),
  perGroupFrom: tri("From, per group", "Desde, por grupo", "Desde, por grupo"),
  whatsIncluded: tri("What is included", "O que está incluído", "Qué está incluido"),
};

export function ProductPageV2({ program, trail }: { program: Program; trail?: Trail }) {
  const t = useTranslations("productPage");
  const locale = useLocale() as Loc;
  const numLocale = { en: "en-GB", pt: "pt-PT", es: "es-ES" }[locale];
  const tx = (k: keyof typeof TX) => TX[k][locale];
  const day = program.days[0];
  const startPoint = typeof program.startPoint === "string" ? program.startPoint : program.startPoint[locale];
  const paragraphs = (text: string) => text.split("\n\n");
  const km = (n: number) => n.toLocaleString(numLocale, { maximumFractionDigits: 1 });

  // ── Images: one list for the bento, the moments and the lightbox ──
  const images = useMemo(() => {
    const list = [...(day.gallery ?? []), ...(program.moments ?? []).map((mo) => mo.image).filter(Boolean) as string[]];
    const unique = Array.from(new Set(list.filter((src) => src !== program.heroImage)));
    return [...unique, program.heroImage];
  }, [day.gallery, program.moments, program.heroImage]);

  // ── Lightbox ──
  const [lightbox, setLightbox] = useState<number | null>(null);
  const open = useCallback((src: string) => setLightbox(Math.max(0, images.indexOf(src))), [images]);
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightbox((i) => (i !== null && i < images.length - 1 ? i + 1 : i)), [images.length]);
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  // ── Mobile booking bar: after the hero, until the proposal form ──
  const [barVisible, setBarVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById("proposal");
      const formTop = form ? form.getBoundingClientRect().top : Infinity;
      setBarVisible(window.scrollY > window.innerHeight * 0.7 && formTop > window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hasPrice = Boolean(program.priceTiers?.length || program.prices);
  const fromPrice = program.priceTiers?.length
    ? Math.min(...program.priceTiers.map((p) => p.price))
    : program.prices?.low.from;

  const heroFacts = [
    { value: program.totalDistance, label: t("total") },
    day.elevation && { value: `+${day.elevation.gain} m`, label: t("elevGain") },
    day.elevation && { value: `${day.elevation.max} m`, label: t("elevMax") },
    { value: program.difficulty[locale], label: t("difficulty") },
    { value: startPoint, label: t("meetingPoint") },
  ].filter(Boolean) as { value: string; label: string }[];

  // Reassurance lines come from the program's own conditions, never invented.
  const insurance = program.included.find((it) => /insurance/i.test(it.en));
  const reassurance = [
    program.payment[0] && { icon: <Wallet size={16} />, text: program.payment[0][locale] },
    program.cancellation[0] && { icon: <RotateCcw size={16} />, text: program.cancellation[0][locale] },
    insurance && { icon: <ShieldCheck size={16} />, text: insurance[locale] },
  ].filter(Boolean) as { icon: React.ReactNode; text: string }[];

  return (
    <main>
      {/* ── 1. Hero: the place first, the numbers on the image ── */}
      <section className="relative flex items-end" style={{ minHeight: "92vh" }}>
        <div className="absolute inset-0 z-0">
          <Image src={program.heroImage} alt={program.title} fill priority className="object-cover" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(29,29,26,0.55) 0%, rgba(29,29,26,0.1) 34%, rgba(29,29,26,0.45) 64%, rgba(29,29,26,0.94) 100%)" }}
          />
        </div>

        <div className="container-ntn relative z-10" style={{ paddingTop: "150px", paddingBottom: "40px", width: "100%" }}>
          <FadeUp>
            <Link
              href={`/${locale}/programas`}
              className="text-label inline-flex items-center gap-2"
              style={{ color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}
            >
              <ChevronLeft size={14} />
              {t("back")}
            </Link>
            <div style={{ marginBottom: "14px" }}>
              <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">
                {program.region} · {t("formatDay")}
              </Overline>
            </div>
            <h1
              className="font-title"
              style={{ color: "#fff", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", lineHeight: 0.96, textTransform: "uppercase", fontWeight: 900, marginBottom: "18px", maxWidth: "18ch" }}
            >
              {program.title}
            </h1>
            <p className="text-body-lg" style={{ color: "rgba(255,255,255,0.84)", maxWidth: "38rem", marginBottom: "30px" }}>
              {program.subtitle[locale]}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="#proposal" className="btn btn-primary">
                {t("requestProposal")}
                <ArrowRight size={16} />
              </a>
              <button type="button" onClick={() => setLightbox(0)} className="btn btn-outline-light">
                <Images size={16} />
                {tx("seeGallery")} · {images.length} {tx("photos")}
              </button>
            </div>
          </FadeUp>

          {/* Facts rail */}
          <FadeUp delay={0.15}>
            <dl
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
              style={{ marginTop: "56px", borderTop: "1px solid rgba(255,255,255,0.22)" }}
            >
              {heroFacts.map((f) => (
                <div key={f.label} style={{ padding: "20px 20px 4px 0" }}>
                  <dt className="text-label" style={{ color: "rgba(255,255,255,0.6)", marginBottom: "6px" }}>{f.label}</dt>
                  <dd className="font-title" style={{ color: "#fff", fontSize: "clamp(1.25rem, 2vw, 1.7rem)", lineHeight: 1.1, textTransform: "none" }}>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </section>

      {/* ── 2. Bento gallery: photos right after the hero, not after the text ── */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "28px", paddingBottom: "28px" }}>
        <div className="container-ntn">
          <BentoGallery images={images} onOpen={open} soon={tx("photoSoon")} morePhotos={tx("photos")} />
        </div>
      </section>

      {/* ── 3. Story column + sticky booking card ── */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "64px", paddingBottom: "96px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px]" style={{ gap: "clamp(40px, 5vw, 72px)" }}>
            <div style={{ minWidth: 0 }}>
              {/* Overview */}
              <FadeUp>
                <Overline color="var(--color-ntn-forest-400)">{t("overview")}</Overline>
                <div style={{ marginTop: "20px" }}>
                  {paragraphs(program.overview[locale]).map((para, i) => (
                    <p
                      key={i}
                      className={i === 0 ? "font-ui" : "text-body-md leading-relaxed"}
                      style={
                        i === 0
                          ? { color: "var(--color-ntn-black-900)", fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)", lineHeight: 1.55, fontWeight: 500 }
                          : { color: "var(--color-ntn-black-800)", marginTop: "18px" }
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </FadeUp>

              {/* Highlights, editorial */}
              <FadeUp delay={0.05}>
                <div style={{ marginTop: "64px" }}>
                  <Overline color="var(--color-ntn-forest-400)">{tx("whyLabel")}</Overline>
                  <ol className="grid grid-cols-1 sm:grid-cols-2" style={{ marginTop: "24px", columnGap: "40px" }}>
                    {program.highlights.map((h, i) => (
                      <li
                        key={i}
                        style={{ display: "flex", gap: "18px", alignItems: "baseline", padding: "18px 0", borderTop: "1px solid rgba(89,105,77,0.18)" }}
                      >
                        <span className="font-title" style={{ color: "var(--color-ntn-forest-400)", fontSize: "1.1rem", minWidth: "2ch" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-body-md" style={{ color: "var(--color-ntn-black-900)", fontWeight: 500, lineHeight: 1.45 }}>
                          {h[locale]}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </FadeUp>

              {/* The day, step by step */}
              {program.moments && program.moments.length > 0 && (
                <div style={{ marginTop: "80px" }}>
                  <FadeUp>
                    <Overline color="var(--color-ntn-forest-400)">{tx("dayLabel")}</Overline>
                    <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", fontSize: "clamp(1.9rem, 3.4vw, 2.75rem)", textTransform: "none", lineHeight: 1.1, margin: "14px 0 36px" }}>
                      {day.title[locale]}
                    </h2>
                  </FadeUp>
                  <div role="list">
                    {program.moments.map((mo, i) => {
                      const last = i === program.moments!.length - 1;
                      return (
                        <FadeUp key={i} delay={0.04 * i}>
                          <div role="listitem" className="grid grid-cols-[64px_minmax(0,1fr)]" style={{ gap: "8px" }}>
                            {/* km rail */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <span
                                className="font-ui"
                                style={{
                                  minWidth: "56px", padding: "6px 0", textAlign: "center", borderRadius: "9999px",
                                  backgroundColor: last ? "var(--color-ntn-lime)" : "var(--color-ntn-forest-400)",
                                  color: last ? "var(--color-ntn-black-900)" : "#fff",
                                  fontSize: "12px", fontWeight: 700, letterSpacing: "0.02em",
                                }}
                              >
                                km {km(mo.km)}
                              </span>
                              {!last && <span style={{ flex: 1, width: "2px", backgroundColor: "rgba(89,105,77,0.22)", margin: "8px 0" }} />}
                            </div>
                            {/* content */}
                            <div className="flex flex-col sm:flex-row" style={{ gap: "20px", paddingBottom: last ? 0 : "36px" }}>
                              <div style={{ flex: "1 1 auto", paddingTop: "2px" }}>
                                <h3 className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}>
                                  {mo.title[locale]}
                                </h3>
                                <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)" }}>{mo.text[locale]}</p>
                              </div>
                              <PhotoTile
                                src={mo.image}
                                alt={mo.title[locale]}
                                onOpen={open}
                                soon={tx("photoSoon")}
                                style={{ flex: "0 0 auto", width: "100%", maxWidth: "240px", aspectRatio: "3 / 2", borderRadius: "10px" }}
                                sizes="240px"
                              />
                            </div>
                          </div>
                        </FadeUp>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* The route: real GPS trace + linked elevation profile */}
              {trail && (
                <FadeUp>
                  <ProfilePanel
                    trail={trail}
                    program={program}
                    locale={locale}
                    km={km}
                    labels={{
                      over: tx("routeLabel"), title: tx("routeTitle"), hint: tx("routeHint"),
                      replay: tx("replay"), of: tx("of"), altitude: tx("altitude"),
                      start: tx("start"), finish: tx("finish"), total: t("total"),
                      min: t("elevMin"), avg: t("elevAvg"), max: t("elevMax"), gain: t("elevGain"), loss: t("elevLoss"),
                    }}
                  />
                </FadeUp>
              )}

              {/* Difficulty */}
              <FadeUp>
                <div style={{ marginTop: "72px" }}>
                  <DifficultyGauge level={program.grade} />
                  {program.difficultyNote && (
                    <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)", maxWidth: "68ch", marginTop: "24px" }}>
                      {program.difficultyNote[locale]}
                    </p>
                  )}
                </div>
              </FadeUp>

              {/* Included / not included */}
              <FadeUp>
                <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "40px", marginTop: "72px" }}>
                  <div>
                    <Overline color="var(--color-ntn-forest-400)">{t("included")}</Overline>
                    <ul style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {program.included.map((it, i) => (
                        <li key={i} className="text-body-md" style={{ display: "flex", gap: "10px", color: "var(--color-ntn-black-800)" }}>
                          <Check size={18} style={{ color: "var(--color-ntn-forest-400)", flexShrink: 0, marginTop: "2px" }} />
                          {it[locale]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Overline color="var(--color-ntn-forest-400)">{t("notIncluded")}</Overline>
                    <ul style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {program.notIncluded.map((it, i) => (
                        <li key={i} className="text-body-md" style={{ display: "flex", gap: "10px", color: "var(--color-ntn-black-800)" }}>
                          <X size={18} style={{ color: "var(--color-ntn-sage-200)", flexShrink: 0, marginTop: "2px" }} />
                          {it[locale]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>

              {/* Prices and conditions */}
              <FadeUp>
                <div style={{ marginTop: "72px", paddingTop: "40px", borderTop: "1px solid rgba(89,105,77,0.18)" }}>
                  <Overline color="var(--color-ntn-forest-400)">{t("prices")}</Overline>
                  {program.priceTiers?.length ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: "1px", marginTop: "20px", backgroundColor: "rgba(89,105,77,0.16)", border: "1px solid rgba(89,105,77,0.16)", borderRadius: "10px", overflow: "hidden" }}>
                      {program.priceTiers.map((tier) => (
                        <div key={tier.pax} style={{ backgroundColor: "var(--color-ntn-white)", padding: "16px 20px" }}>
                          <p className="text-label" style={{ color: "var(--color-ntn-forest-400)" }}>
                            {tier.pax} {tier.pax === 1 ? t("paxOne") : t("paxMany")}
                          </p>
                          <p className="font-title" style={{ color: "var(--color-ntn-black-900)", fontSize: "1.4rem" }}>{formatPrice(tier.price, numLocale)}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ marginTop: "16px" }}>
                      <p className="font-title" style={{ color: "var(--color-ntn-black-900)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", textTransform: "none" }}>
                        {t("priceOnRequestTitle")}
                      </p>
                      <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)", maxWidth: "60ch", marginTop: "8px" }}>
                        {t("priceOnRequestBody")}
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "32px", marginTop: "36px" }}>
                    <ConditionList title={t("availability")} items={[t("availabilityNote")]} />
                    <ConditionList title={t("payment")} items={program.payment.map((p) => p[locale])} />
                    <ConditionList title={t("cancellation")} items={program.cancellation.map((p) => p[locale])} />
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Sticky booking card (desktop) */}
            <aside className="hidden lg:block">
              <div style={{ position: "sticky", top: "112px" }}>
                <div
                  style={{
                    backgroundColor: "var(--color-ntn-white)", borderRadius: "14px", padding: "28px",
                    border: "1px solid rgba(89,105,77,0.14)", boxShadow: "0 18px 50px -24px rgba(29,29,26,0.28)",
                  }}
                >
                  <p className="text-label" style={{ color: "var(--color-ntn-forest-400)" }}>{program.region} · {t("formatDay")}</p>
                  <p className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontWeight: 700, fontSize: "1.25rem", lineHeight: 1.2, margin: "8px 0 18px" }}>
                    {program.title}
                  </p>
                  <div style={{ padding: "16px 0", borderTop: "1px solid rgba(89,105,77,0.14)", borderBottom: "1px solid rgba(89,105,77,0.14)" }}>
                    {hasPrice && fromPrice ? (
                      <>
                        <p className="text-label" style={{ color: "var(--color-ntn-sage-200)" }}>{tx("perGroupFrom")}</p>
                        <p className="font-title" style={{ color: "var(--color-ntn-black-900)", fontSize: "2rem", lineHeight: 1.1 }}>{formatPrice(fromPrice, numLocale)}</p>
                      </>
                    ) : (
                      <>
                        <p className="font-title" style={{ color: "var(--color-ntn-black-900)", fontSize: "1.5rem", lineHeight: 1.15, textTransform: "none" }}>{t("priceOnRequestTitle")}</p>
                        <p className="text-body-md" style={{ color: "var(--color-ntn-black-800)", marginTop: "6px", fontSize: "14px" }}>{t("priceOnRequestBody")}</p>
                      </>
                    )}
                  </div>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "18px 0 22px" }}>
                    <CardFact icon={<Clock size={16} />} text={`${t("oneDay")} · ${program.type[locale]}`} />
                    <CardFact icon={<MapPin size={16} />} text={`${t("meetingPoint")}: ${startPoint}`} />
                    <CardFact icon={<CalendarDays size={16} />} text={`${t("season")}: ${program.season[locale]}`} />
                  </ul>
                  <a href="#proposal" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    {t("requestProposal")}
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href={`mailto:info@portugalntn.com?subject=${encodeURIComponent(program.title)}`}
                    className="btn btn-ghost-dark"
                    style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}
                  >
                    <Mail size={16} />
                    {tx("ask")}
                  </a>
                  {reassurance.length > 0 && (
                    <ul style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "22px", paddingTop: "18px", borderTop: "1px solid rgba(89,105,77,0.14)" }}>
                      {reassurance.map((r, i) => (
                        <li key={i} style={{ display: "flex", gap: "10px", color: "var(--color-ntn-black-800)", fontSize: "13px", lineHeight: 1.45 }}>
                          <span style={{ color: "var(--color-ntn-forest-400)", flexShrink: 0, marginTop: "1px" }}>{r.icon}</span>
                          {r.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── 4. Proposal form (unchanged) ── */}
      <section id="proposal" style={{ backgroundColor: "var(--color-ntn-lime)", paddingTop: "90px", paddingBottom: "90px", scrollMarginTop: "96px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start" style={{ gap: "clamp(40px, 6vw, 80px)" }}>
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
                  display: "inline-flex", alignItems: "center", gap: "10px", color: "#1a2510", fontFamily: "var(--font-ui)", fontWeight: 700,
                  fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
                  borderBottom: "1.5px solid rgba(26,37,16,0.4)", paddingBottom: "3px",
                }}
              >
                <Mail size={16} />
                info@portugalntn.com
              </a>
            </FadeUp>
            <FadeUp delay={0.12}>
              <ProposalForm program={program.title} />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Mobile booking bar ── */}
      <AnimatePresence>
        {barVisible && (
          <m.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="lg:hidden"
            style={{
              position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 60,
              backgroundColor: "var(--color-ntn-white)", borderTop: "1px solid rgba(89,105,77,0.16)",
              boxShadow: "0 -10px 30px -12px rgba(29,29,26,0.25)",
              padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <p className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontWeight: 700, fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {program.title}
              </p>
              <p style={{ color: "var(--color-ntn-forest-400)", fontSize: "12px", fontFamily: "var(--font-ui)" }}>
                {hasPrice && fromPrice ? `${tx("perGroupFrom")} ${formatPrice(fromPrice, numLocale)}` : t("priceOnRequestTitle")}
              </p>
            </div>
            <a href="#proposal" className="btn btn-primary" style={{ flexShrink: 0 }}>
              {t("requestProposal")}
            </a>
          </m.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            style={{
              position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(15,15,13,0.94)",
              display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(20px, 5vw, 80px)",
            }}
          >
            <button aria-label="Fechar" onClick={close} style={{ position: "absolute", top: "28px", right: "32px", color: "#fff", background: "none", border: "none", cursor: "pointer", zIndex: 10 }}>
              <X size={28} />
            </button>
            <span style={{ position: "absolute", top: "32px", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-ui)", fontSize: "13px", letterSpacing: "0.06em" }}>
              {lightbox + 1} / {images.length}
            </span>
            {lightbox > 0 && (
              <button aria-label="Anterior" onClick={(e) => { e.stopPropagation(); prev(); }} style={navBtn("left")}>
                <ChevronLeft size={24} />
              </button>
            )}
            {lightbox < images.length - 1 && (
              <button aria-label="Seguinte" onClick={(e) => { e.stopPropagation(); next(); }} style={navBtn("right")}>
                <ChevronRight size={24} />
              </button>
            )}
            <m.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", width: "min(100%, 1200px)", aspectRatio: "16/10", maxHeight: "85vh" }}
            >
              <AnimatePresence mode="wait">
                <m.div
                  key={lightbox}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Image src={images[lightbox]} alt="" fill className="object-contain" sizes="100vw" />
                </m.div>
              </AnimatePresence>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ─────────────────────────── pieces ─────────────────────────── */

function navBtn(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute", [side]: "clamp(8px, 3vw, 32px)", top: "50%", transform: "translateY(-50%)",
    color: "#fff", background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "50%",
    width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", zIndex: 10, backdropFilter: "blur(4px)",
  };
}

/** A photo that opens the lightbox, or a placeholder tile while the photo is missing. */
function PhotoTile({
  src, alt, onOpen, soon, style, sizes, className, overlay,
}: {
  src?: string; alt: string; onOpen: (src: string) => void; soon: string;
  style?: React.CSSProperties; sizes: string; className?: string; overlay?: React.ReactNode;
}) {
  if (!src) {
    return (
      <div
        className={className}
        style={{
          ...style, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px",
          backgroundColor: "rgba(89,105,77,0.08)", border: "1.5px dashed rgba(89,105,77,0.35)", color: "var(--color-ntn-forest-400)",
        }}
      >
        <Camera size={22} strokeWidth={1.6} />
        <span className="text-label">{soon}</span>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onOpen(src)}
      className={`group/img ${className ?? ""}`}
      style={{ ...style, position: "relative", overflow: "hidden", padding: 0, border: "none", background: "none", cursor: "zoom-in" }}
    >
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 group-hover/img:scale-[1.05]" sizes={sizes} />
      <span className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover/img:opacity-100" style={{ background: "rgba(29,29,26,0.16)" }} />
      {overlay}
    </button>
  );
}

/**
 * One large photo and four smaller ones on desktop; a swipeable strip on mobile.
 * Missing photos show a placeholder so the layout holds while photos are uploaded.
 */
function BentoGallery({ images, onOpen, soon, morePhotos }: { images: string[]; onOpen: (src: string) => void; soon: string; morePhotos: string }) {
  const slots: (string | undefined)[] = Array.from({ length: 5 }, (_, i) => images[i]);
  const extra = images.length - 5;
  return (
    <div
      className="flex md:grid md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory"
      style={{ gap: "10px", height: "clamp(300px, 48vw, 640px)" }}
    >
      {slots.map((src, i) => (
        <PhotoTile
          key={i}
          src={src}
          alt=""
          onOpen={onOpen}
          soon={soon}
          sizes={i === 0 ? "(max-width: 768px) 85vw, 50vw" : "(max-width: 768px) 85vw, 25vw"}
          className={`snap-start shrink-0 w-[85%] md:w-auto ${i === 0 ? "md:row-span-2" : ""}`}
          style={{ height: "100%", borderRadius: "12px" }}
          overlay={
            i === 4 && extra > 0 ? (
              <span
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: "rgba(20,20,18,0.5)", color: "#fff", fontFamily: "var(--font-ui)" }}
              >
                <span style={{ fontSize: "1.6rem", fontWeight: 700 }}>+{extra}</span>
                <span style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{morePhotos}</span>
              </span>
            ) : undefined
          }
        />
      ))}
    </div>
  );
}

/**
 * Elevation profile of the day, drawn left to right as the walk unfolds:
 * a marker follows the real relief, the km counter runs and each moment of
 * the day lights up when it is reached. Afterwards it can be explored with
 * the pointer. No map on purpose: the route itself is not published.
 */
function ProfilePanel({
  trail, program, locale, km, labels,
}: {
  trail: Trail;
  program: Program;
  locale: Loc;
  km: (n: number) => string;
  labels: {
    over: string; title: string; hint: string; replay: string; of: string; altitude: string; start: string; finish: string;
    total: string; min: string; avg: string; max: string; gain: string; loss: string;
  };
}) {
  const day = program.days[0];
  const moments = program.moments ?? [];
  const total = trail.profile[trail.profile.length - 1][0];
  const elevs = trail.profile.map((p) => p[1]);
  const eMin = Math.min(...elevs), eMax = Math.max(...elevs);
  const clipId = useId().replace(/:/g, "");

  // Animation state: km reached by the walk; pointer position overrides it once done.
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hoverKm, setHoverKm] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const raf = useRef<number | null>(null);

  const play = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(total);
      return;
    }
    const DURATION = 6000;
    const t0 = performance.now();
    setPlaying(true);
    setHoverKm(null);
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setProgress(eased * total);
      if (t < 1) raf.current = requestAnimationFrame(step);
      else setPlaying(false);
    };
    raf.current = requestAnimationFrame(step);
  }, [total]);

  // Start once, when the panel is well into view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [play]);

  // Geometry (viewBox 1000 x 220)
  const PW = 1000, PH = 220, PT = 24, PB = 6;
  const yLo = Math.floor((eMin - 20) / 100) * 100, yHi = Math.ceil((eMax + 20) / 100) * 100;
  const px = (k: number) => (k / total) * PW;
  const py = (e: number) => PT + (1 - (e - yLo) / (yHi - yLo)) * (PH - PT - PB);
  const line = trail.profile.map(([k, e], i) => `${i ? "L" : "M"}${px(k).toFixed(1)},${py(e).toFixed(1)}`).join(" ");
  const area = `${line} L${PW},${PH - PB} L0,${PH - PB} Z`;
  const yTicks = Array.from({ length: (yHi - yLo) / 100 + 1 }, (_, i) => yLo + i * 100);
  const kmTicks = Array.from({ length: Math.floor(total) + 1 }, (_, i) => i).filter((k) => total - k > 0.8 || k === 0);

  const elevAt = (k: number) => {
    const p = trail.profile;
    for (let i = 1; i < p.length; i++) {
      if (p[i][0] >= k) {
        const [k0, e0] = p[i - 1], [k1, e1] = p[i];
        return Math.round(e0 + ((e1 - e0) * (k - k0)) / Math.max(k1 - k0, 1e-6));
      }
    }
    return p[p.length - 1][1];
  };

  const activeKm = !playing && hoverKm !== null ? hoverKm : progress;
  const done = !playing && progress >= total;
  const reachedIdx = moments.reduce((acc, mo, i) => (mo.km <= activeKm + 0.05 ? i : acc), -1);
  const current = reachedIdx >= 0 ? moments[reachedIdx] : undefined;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (playing) return;
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    setHoverKm(Math.min(total, Math.max(0, ((e.clientX - r.left) / r.width) * total)));
  };

  const ratio = activeKm / total;

  return (
    <div
      ref={wrapRef}
      style={{ marginTop: "80px", backgroundColor: "var(--color-ntn-forest-600)", borderRadius: "16px", padding: "clamp(24px, 4vw, 44px)", color: "#fff", overflow: "hidden" }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px 32px" }}>
        <div>
          <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">{labels.over}</Overline>
          <h2 className="font-title" style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.75rem)", textTransform: "none", lineHeight: 1.1, margin: "14px 0 8px" }}>
            {labels.title}
          </h2>
          <p className="text-body-md" style={{ color: "rgba(255,255,255,0.72)", maxWidth: "46ch" }}>{labels.hint}</p>
        </div>
        {/* Live counter: distance walked and altitude */}
        <div style={{ display: "flex", gap: "28px", fontFamily: "var(--font-ui)" }} aria-live="off">
          <div>
            <p className="font-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1, color: "var(--color-ntn-lime)", fontVariantNumeric: "tabular-nums" }}>
              {km(activeKm)}<span style={{ fontSize: "0.45em", marginLeft: "4px" }}>km</span>
            </p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "6px" }}>
              {labels.of} {program.totalDistance}
            </p>
          </div>
          <div>
            <p className="font-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
              {elevAt(activeKm)}<span style={{ fontSize: "0.45em", marginLeft: "4px" }}>m</span>
            </p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "6px" }}>{labels.altitude}</p>
          </div>
        </div>
      </div>

      {/* Moment reached */}
      <div style={{ minHeight: "28px", marginTop: "28px", display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-ui)" }}>
        {current && (
          <>
            <span style={{ width: "24px", height: "24px", borderRadius: "9999px", backgroundColor: "var(--color-ntn-lime)", color: "var(--color-ntn-black-900)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>
              {reachedIdx + 1}
            </span>
            <m.span
              key={reachedIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ fontSize: "15px", fontWeight: 700 }}
            >
              {current.title[locale]}
            </m.span>
          </>
        )}
      </div>

      {/* Profile */}
      <div style={{ position: "relative", marginTop: "18px", paddingTop: "26px" }}>
        {/* Moment markers along the top */}
        {moments.map((mo, i) => {
          const reached = i <= reachedIdx;
          return (
            <span
              key={i}
              title={mo.title[locale]}
              style={{
                position: "absolute", top: 0, left: `${(mo.km / total) * 100}%`, transform: "translateX(-50%)",
                width: "22px", height: "22px", borderRadius: "9999px",
                border: `1.5px solid ${reached ? "var(--color-ntn-lime)" : "rgba(255,255,255,0.5)"}`,
                backgroundColor: reached ? "var(--color-ntn-lime)" : "var(--color-ntn-forest-600)",
                color: reached ? "var(--color-ntn-black-900)" : "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-ui)", fontSize: "11px", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none",
                transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
              }}
            >
              {i + 1}
            </span>
          );
        })}

        <div style={{ position: "relative" }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${PW} ${PH}`}
          preserveAspectRatio="none"
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setHoverKm(null)}
          role="img"
          aria-label={`${labels.over}: ${program.totalDistance}`}
          style={{ width: "100%", height: "clamp(170px, 22vw, 240px)", display: "block", cursor: done ? "crosshair" : "default", touchAction: "pan-y" }}
        >
          <defs>
            <linearGradient id={`${clipId}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bccf02" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#bccf02" stopOpacity="0.03" />
            </linearGradient>
            <clipPath id={clipId}>
              <rect x="0" y="0" width={px(progress)} height={PH} />
            </clipPath>
          </defs>
          {yTicks.map((v) => (
            <line key={v} x1="0" x2={PW} y1={py(v)} y2={py(v)} stroke="rgba(255,255,255,0.1)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          {moments.map((mo, i) => (
            <line key={i} x1={px(mo.km)} x2={px(mo.km)} y1="0" y2={PH - PB} stroke="rgba(255,255,255,0.28)" strokeDasharray="3 4" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          {/* The day still to come, faint */}
          <path d={line} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="2 5" vectorEffect="non-scaling-stroke" />
          {/* The day walked so far */}
          <g clipPath={`url(#${clipId})`}>
            <path d={area} fill={`url(#${clipId}-fill)`} />
            <path d={line} fill="none" stroke="var(--color-ntn-lime)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          </g>
          <line x1={px(activeKm)} x2={px(activeKm)} y1="0" y2={PH - PB} stroke="rgba(255,255,255,0.7)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Walker marker, as HTML so it stays round on a stretched SVG */}
        <span
          aria-hidden
          style={{
            position: "absolute", left: `${ratio * 100}%`,
            top: `${(py(elevAt(activeKm)) / PH) * 100}%`,
            width: "16px", height: "16px", marginLeft: "-8px", marginTop: "-8px", borderRadius: "9999px",
            backgroundColor: "#fff", border: "4px solid var(--color-ntn-lime)", boxShadow: "0 0 0 8px rgba(188,207,2,0.25)", pointerEvents: "none",
          }}
        />

        {yTicks.slice(1, -1).map((v) => (
          <span key={v} style={{ position: "absolute", left: 0, top: `${(py(v) / PH) * 100}%`, transform: "translateY(-120%)", fontSize: "10px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-ui)", pointerEvents: "none" }}>
            {v} m
          </span>
        ))}

        </div>

        {/* Distance axis */}
        <div style={{ position: "relative", height: "18px", marginTop: "8px", fontFamily: "var(--font-ui)", fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>
          {kmTicks.map((k) => (
            <span key={k} style={{ position: "absolute", left: `${(k / total) * 100}%`, transform: k === 0 ? "none" : "translateX(-50%)" }}>
              {k} km
            </span>
          ))}
          <span style={{ position: "absolute", right: 0, color: "#fff", fontWeight: 700 }}>{program.totalDistance}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-ui)", fontSize: "11px", color: "rgba(255,255,255,0.55)", marginTop: "10px" }}>
          <span>{labels.start} · {typeof program.startPoint === "string" ? program.startPoint : program.startPoint[locale]}</span>
          {done ? (
            <button
              type="button"
              onClick={play}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#fff", background: "none", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "9999px", padding: "6px 12px", cursor: "pointer", fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              <RotateCcw size={12} />
              {labels.replay}
            </button>
          ) : (
            <span>{labels.finish}</span>
          )}
        </div>
      </div>

      {/* Official figures from the program sheet */}
      {day.elevation && (
        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" style={{ gap: "18px", marginTop: "28px", paddingTop: "22px", borderTop: "1px solid rgba(255,255,255,0.16)" }}>
          {[
            [labels.total, program.totalDistance],
            [labels.gain, `+${day.elevation.gain} m`],
            [labels.loss, `-${day.elevation.loss} m`],
            [labels.max, `${day.elevation.max} m`],
            [labels.min, `${day.elevation.min} m`],
            [labels.avg, `${day.elevation.avg} m`],
          ].map(([l, v]) => (
            <div key={l}>
              <dt className="text-label" style={{ color: "rgba(255,255,255,0.55)", marginBottom: "4px" }}>{l}</dt>
              <dd className="font-title" style={{ fontSize: "1.35rem", textTransform: "none" }}>{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function ConditionList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-label" style={{ color: "var(--color-ntn-forest-400)", marginBottom: "12px" }}>{title}</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map((it, i) => (
          <li key={i} className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)", fontSize: "14px" }}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function CardFact({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li style={{ display: "flex", gap: "10px", alignItems: "center", color: "var(--color-ntn-black-800)", fontSize: "14px", fontFamily: "var(--font-ui)" }}>
      <span style={{ color: "var(--color-ntn-forest-400)", display: "inline-flex" }}>{icon}</span>
      {text}
    </li>
  );
}
