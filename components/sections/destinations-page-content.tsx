"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp, HoverCard } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { regions, routes } from "@/lib/destinations";

const EASE = [0.19, 1, 0.22, 1] as const;
type Loc = "en" | "pt" | "es";
type Filter = "all" | "roteiro" | "programa";

export function DestinationsPageContent() {
  const t = useTranslations("destinationsPage");
  const locale = useLocale() as Loc;
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");
  const pausedRef = useRef(false);

  const active = regions[index];
  const total = regions.length;

  const filtered = filter === "all" ? routes : routes.filter((r) => r.format === filter);

  const selectFormat = (f: Filter) => {
    setFilter(f);
    document.getElementById("routes")?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-advance carousel
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % total);
    }, 6000);
    return () => clearInterval(id);
  }, [total]);

  const go = (dir: 1 | -1) => {
    pausedRef.current = true;
    setIndex((i) => (i + dir + total) % total);
  };

  return (
    <main>
      {/* ── Hero carousel ── */}
      <section
        className="relative overflow-hidden"
        style={{ height: "100vh", minHeight: "640px" }}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        {/* Background crossfade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <m.div
              key={active.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1 }, scale: { duration: 6, ease: "linear" } }}
              className="absolute inset-0"
            >
              <Image src={active.image} alt={active.name} fill priority className="object-cover" sizes="100vw" />
            </m.div>
          </AnimatePresence>
          {/* Gradients */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(20,20,18,0.88) 0%, rgba(20,20,18,0.5) 45%, rgba(20,20,18,0.15) 100%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(20,20,18,0.85) 0%, transparent 45%)" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full container-ntn flex flex-col justify-center" style={{ paddingTop: "120px", paddingBottom: "100px" }}>
          <div style={{ maxWidth: "40rem" }}>
            <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: "18px" }}>
              <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">{t("label")}</Overline>
            </m.div>

            <AnimatePresence mode="wait">
              <m.div
                key={active.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="text-label" style={{ color: "var(--color-ntn-lime)", marginBottom: "12px" }}>
                  {active.tagline[locale]}
                </p>
                <h1
                  className="font-title"
                  style={{
                    color: "#fff",
                    fontSize: "clamp(2.75rem, 6vw, 5.5rem)",
                    lineHeight: 0.98,
                    textTransform: "uppercase",
                    fontWeight: 900,
                    marginBottom: "22px",
                  }}
                >
                  {active.name}
                </h1>
                <p
                  className="text-body-lg leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.82)", maxWidth: "34rem", marginBottom: "28px" }}
                >
                  {active.description[locale]}
                </p>
                {/* Meta */}
                <div style={{ display: "flex", gap: "28px", marginBottom: "36px", flexWrap: "wrap" }}>
                  <Meta value={String(active.routes)} label={t("routesWord")} />
                  <Meta value={active.durations} label={t("days")} />
                </div>
              </m.div>
            </AnimatePresence>

            <m.a
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              href="#routes"
              className="btn btn-primary"
            >
              {t("viewRoutes")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </m.a>
          </div>

          {/* Carousel controls — bottom */}
          <div
            className="absolute left-0 right-0"
            style={{ bottom: "40px", paddingInline: "var(--spacing-container)", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            {/* Region dots */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {regions.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => { pausedRef.current = true; setIndex(i); }}
                  className="text-label"
                  style={{
                    color: i === index ? "var(--color-ntn-lime)" : "rgba(255,255,255,0.45)",
                    transition: "color 0.3s",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            {/* Arrows + counter */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <span className="font-title" style={{ color: "rgba(255,255,255,0.9)", fontSize: "15px", letterSpacing: "0.1em" }}>
                {String(index + 1).padStart(2, "0")}
                <span style={{ color: "rgba(255,255,255,0.4)" }}> / {String(total).padStart(2, "0")}</span>
              </span>
              <div style={{ display: "flex", gap: "10px" }}>
                <CarouselArrow dir="prev" onClick={() => go(-1)} />
                <CarouselArrow dir="next" onClick={() => go(1)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Formats block (1 Dia vs Multidias) ── */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{t("formatsLabel")}</Overline>
            </div>
            <h2
              className="font-title"
              style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "48px" }}
            >
              {t("formatsTitle")}
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "24px" }}>
            {([
              { key: "roteiro" as Filter, num: "01", title: t("format1Title"), desc: t("format1Desc"), tag: t("format1Tag") },
              { key: "programa" as Filter, num: "02", title: t("formatMultiTitle"), desc: t("formatMultiDesc"), tag: t("formatMultiTag") },
            ]).map((f, i) => (
              <m.button
                key={f.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                whileHover={{ y: -6 }}
                onClick={() => selectFormat(f.key)}
                className="group text-left"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "10px",
                  padding: "40px 36px",
                  backgroundColor: "var(--color-ntn-white)",
                  border: "1px solid rgba(89,105,77,0.14)",
                  cursor: "pointer",
                }}
              >
                <span className="font-title" style={{ color: "var(--color-ntn-sage-200)", fontSize: "13px", letterSpacing: "0.1em" }}>
                  {f.num}
                </span>
                <h3
                  className="font-title"
                  style={{ color: "var(--color-ntn-black-900)", fontSize: "clamp(1.6rem, 2.4vw, 2.1rem)", textTransform: "uppercase", lineHeight: 1, margin: "14px 0 12px" }}
                >
                  {f.title}
                </h3>
                <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-forest-600)", marginBottom: "20px", maxWidth: "26rem" }}>
                  {f.desc}
                </p>
                <span
                  className="inline-flex items-center gap-2 transition-all duration-200 group-hover:gap-3"
                  style={{ color: "var(--color-ntn-forest-400)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}
                >
                  {f.tag}
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </m.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Routes grid ── */}
      <section id="routes" style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          {/* Title */}
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{t("routesLabel")}</Overline>
            </div>
            <h2
              className="font-title"
              style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "24px" }}
            >
              {t("routesTitle")}
            </h2>
          </FadeUp>

          {/* Intro + filter on the same line */}
          <div
            className="flex flex-col sm:flex-row sm:items-end justify-between"
            style={{ gap: "24px", marginBottom: "56px" }}
          >
            <FadeUp>
              <p className="text-body-lg" style={{ color: "var(--color-ntn-black-800)", maxWidth: "32rem" }}>
                {t("intro")}
              </p>
            </FadeUp>

            {/* Filter tabs — larger, clearly separated */}
            <FadeUp delay={0.1}>
              <div className="flex flex-wrap gap-6 sm:gap-8 self-start sm:self-auto">
                {([
                  { key: "all" as Filter, label: t("filterAll") },
                  { key: "roteiro" as Filter, label: t("filter1day") },
                  { key: "programa" as Filter, label: t("filterMulti") },
                ]).map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className="relative pb-2 transition-colors duration-200"
                    style={{
                      color: filter === f.key ? "var(--color-ntn-black-900)" : "var(--color-ntn-sage-200)",
                      fontFamily: "var(--font-ui)",
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f.label}
                    {filter === f.key && (
                      <m.div
                        layoutId="dest-filter-line"
                        className="absolute bottom-0 left-0 right-0"
                        style={{ height: "2px", backgroundColor: "var(--color-ntn-lime)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </FadeUp>
          </div>

          <AnimatePresence mode="wait">
            <m.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              style={{ gap: "40px 32px" }}
            >
            {filtered.map((route, i) => (
              <m.div
                key={route.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: EASE }}
              >
                <HoverCard>
                  <a href={`/${locale}/programas/${route.id}`} className="group block">
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/11", borderRadius: "8px", marginBottom: "22px" }}>
                      <Image
                        src={route.image}
                        alt={route.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(29,29,26,0.55) 100%)" }} />
                      <span
                        className="absolute top-4 right-4"
                        style={{
                          backgroundColor: "var(--color-ntn-lime)",
                          color: "var(--color-ntn-black-900)",
                          fontFamily: "var(--font-ui)",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "7px 14px",
                          borderRadius: "5px",
                        }}
                      >
                        {route.duration}
                      </span>
                      <p
                        className="absolute bottom-4 text-label"
                        style={{ left: "16px", color: "rgba(255,255,255,0.9)", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                      >
                        {route.region} · {route.type[locale]}
                      </p>
                    </div>
                    {/* Below-card content — left-aligned with the in-image label (16px) */}
                    <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                      <h3
                        className="font-ui mb-1.5 leading-snug"
                        style={{ color: "var(--color-ntn-black-900)", fontSize: "var(--text-display-sm)", fontWeight: 600 }}
                      >
                        {route.title}
                      </h3>
                      <p className="text-body-md mb-3" style={{ color: "var(--color-ntn-sage-200)" }}>
                        {route.tagline[locale]}
                      </p>
                      <span
                        className="inline-flex items-center gap-1.5 transition-all duration-200 group-hover:gap-2.5"
                        style={{ color: "var(--color-ntn-forest-400)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em" }}
                      >
                        {t("discover")}
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </a>
                </HoverCard>
              </m.div>
            ))}
            </m.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

function Meta({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-title" style={{ color: "var(--color-ntn-lime)", fontSize: "28px", lineHeight: 1, marginBottom: "4px" }}>
        {value}
      </p>
      <p className="text-label" style={{ color: "rgba(255,255,255,0.6)" }}>
        {label}
      </p>
    </div>
  );
}

function CarouselArrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir}
      className="flex items-center justify-center transition-colors duration-200"
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "9999px",
        border: "1px solid rgba(255,255,255,0.3)",
        color: "#fff",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "#fff"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: dir === "prev" ? "rotate(180deg)" : "none" }}>
        <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
