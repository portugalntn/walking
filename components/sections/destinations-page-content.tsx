"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { regions, routes } from "@/lib/destinations";
import type { CardFacts } from "@/lib/program-facts";
import { ProgramGrid } from "@/components/ui/program-card";
import { KeepWords } from "@/components/ui/keep-words";
import { ArrowRight, Compass, UtensilsCrossed, Sun, Footprints, BedDouble, CalendarDays, ChevronDown, X } from "lucide-react";
import { UI } from "@/lib/ui-texts";

const EASE = [0.19, 1, 0.22, 1] as const;
type Loc = "en" | "pt" | "es";
type Filter = "all" | "roteiro" | "programa";
type Style = "all" | "guided" | "self";


/** Texts editable in FLOW (Site > Páginas): lib/ui-texts.ts, "ui.programs.*". */
const TX = UI.programs;

/** Self-guided or guided, read from the programme type ("Self-Guided" / "Guided"). */
const styleOf = (r: (typeof routes)[number]): Style => (/self/i.test(r.type.en) ? "self" : "guided");

/** Programmes matching a format, a style and a region ("all" = any). Used by the list and every count. */
function matching(format: Filter, style: Style, region: string) {
  return routes.filter(
    (r) =>
      (format === "all" || r.format === format) &&
      (style === "all" || styleOf(r) === style) &&
      (region === "all" || r.regionId === region)
  );
}

export function DestinationsPageContent({ facts }: { facts: Record<string, CardFacts> }) {
  const t = useTranslations("destinationsPage");
  const locale = useLocale() as Loc;
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [styleFilter, setStyleFilter] = useState<Style>("all");
  const [regionOpen, setRegionOpen] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const anyFilter = filter !== "all" || styleFilter !== "all" || regionFilter !== "all";
  const clearFilters = () => { setFilter("all"); setStyleFilter("all"); setRegionFilter("all"); };

  // Region menu: closes on a click outside or Escape.
  useEffect(() => {
    if (!regionOpen) return;
    const onDown = (e: MouseEvent) => { if (!regionRef.current?.contains(e.target as Node)) setRegionOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setRegionOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [regionOpen]);
  const pausedRef = useRef(false);

  const active = regions[index];
  const total = regions.length;

  // Deep-link: /programas?tipo=1dia | multidias opens the matching format tab
  useEffect(() => {
    const tipo = new URLSearchParams(window.location.search).get("tipo");
    if (tipo === "1dia") setFilter("roteiro");
    else if (tipo === "multidias") setFilter("programa");
  }, []);

  const filtered = matching(filter, styleFilter, regionFilter);

  const oneDay = routes.filter((r) => r.format === "roteiro");
  const multi = routes.filter((r) => r.format === "programa");
  const multiDays = multi.map((r) => r.days);
  const multiRange = multiDays.length
    ? Math.min(...multiDays) === Math.max(...multiDays)
      ? `${Math.min(...multiDays)} ${TX.daysRange[locale]}`
      : `${Math.min(...multiDays)} ${TX.to[locale]} ${Math.max(...multiDays)} ${TX.daysRange[locale]}`
    : "";
  const formats = [
    {
      key: "roteiro" as Filter, title: t("format1Title"), desc: t("format1Desc"), tag: t("format1Tag"),
      count: oneDay.length, image: oneDay[0]?.image, cta: TX.see1[locale],
      points: [
        { Icon: Compass, text: TX.p1a[locale] },
        { Icon: UtensilsCrossed, text: TX.p1b[locale] },
        { Icon: Sun, text: TX.p1c[locale] },
      ],
    },
    {
      key: "programa" as Filter, title: t("formatMultiTitle"), desc: t("formatMultiDesc"), tag: multiRange,
      count: multi.length, image: multi.find((r) => r.regionId === "douro")?.image ?? multi[0]?.image, cta: TX.seeMulti[locale],
      points: [
        { Icon: Footprints, text: TX.pMa[locale] },
        { Icon: BedDouble, text: TX.pMb[locale] },
        { Icon: CalendarDays, text: TX.pMc[locale] },
      ],
    },
  ];

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
          {/* Wide enough for a region name on one line; the description keeps its own reading width */}
          <div style={{ maxWidth: "min(100%, 64rem)" }}>
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
                    fontSize: "clamp(2.1rem, 6vw, 5.5rem)",
                    textWrap: "balance",
                    lineHeight: 0.98,
                    textTransform: "uppercase",
                    fontWeight: 900,
                    marginBottom: "22px",
                  }}
                >
                  <KeepWords text={active.heroTitle ?? active.name} />
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

      {/* ── Formats: two photographic doors, each says what it is and how many ── */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "96px", paddingBottom: "96px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{t("formatsLabel")}</Overline>
            </div>
            <h2
              className="font-title"
              style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "12px" }}
            >
              {t("formatsTitle")}
            </h2>
            <p className="text-body-lg" style={{ color: "var(--color-ntn-black-800)", maxWidth: "40rem", marginBottom: "40px" }}>
              {t("formatsIntro")}
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "24px" }}>
            {formats.map((f, i) => (
              <m.article
                key={f.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                className="flex flex-col overflow-hidden"
                style={{ borderRadius: "16px", backgroundColor: "var(--color-ntn-white)", border: "1px solid rgba(89,105,77,0.14)" }}
              >
                {/* Photo: tags only */}
                <button type="button" onClick={() => selectFormat(f.key)} className="group relative block w-full overflow-hidden aspect-[16/9]" aria-label={f.cta}>
                  {f.image && (
                    <Image src={f.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 50vw" />
                  )}
                  <span className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,20,18,0.3) 0%, transparent 30%, transparent 70%, rgba(20,20,18,0.35) 100%)" }} />
                  <span
                    className="absolute top-4 left-4 font-title"
                    style={{ backgroundColor: "var(--color-ntn-lime)", color: "var(--color-ntn-black-900)", borderRadius: "9999px", padding: "6px 14px", fontSize: "13px", textTransform: "none" }}
                  >
                    {f.count} {TX.programs[locale]}
                  </span>
                  <span
                    className="absolute bottom-4 left-4 text-label"
                    style={{ color: "#fff", backgroundColor: "rgba(20,20,18,0.55)", backdropFilter: "blur(6px)", borderRadius: "9999px", padding: "6px 12px" }}
                  >
                    {f.tag}
                  </span>
                </button>

                {/* Presentation */}
                <div className="flex flex-1 flex-col" style={{ padding: "clamp(22px, 3vw, 32px)" }}>
                  <h3 className="font-title" style={{ color: "var(--color-ntn-black-900)", fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)", textTransform: "uppercase", lineHeight: 1, marginBottom: "12px" }}>
                    {f.title}
                  </h3>
                  <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)", marginBottom: "22px", maxWidth: "34rem" }}>{f.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "10px", marginBottom: "26px" }}>
                    {f.points.map(({ Icon, text }) => (
                      <div key={text} style={{ padding: "14px", borderRadius: "12px", border: "1px solid rgba(89,105,77,0.16)", backgroundColor: "var(--color-ntn-cream-50)" }}>
                        <Icon size={18} strokeWidth={1.6} style={{ color: "var(--color-ntn-forest-400)", marginBottom: "8px" }} />
                        <p className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontWeight: 600, fontSize: "13px", lineHeight: 1.35 }}>{text}</p>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => selectFormat(f.key)} className="btn btn-primary !mt-auto self-start">
                    {f.cta}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </m.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programmes: clear format switch, region chips with counts, rich cards ── */}
      <section id="routes" style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "96px", paddingBottom: "110px", scrollMarginTop: "80px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{t("routesLabel")}</Overline>
            </div>
            <h2
              className="font-title"
              style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "12px" }}
            >
              {t("routesTitle")}
            </h2>
            <p className="text-body-lg" style={{ color: "var(--color-ntn-black-800)", maxWidth: "40rem", marginBottom: "36px" }}>
              {t("intro")}
            </p>
          </FadeUp>

          {/* Filters: one line from 1024 px. Two toggle groups (click again to clear) and a compact region menu,
              so a third group fits without wrapping (region chips alone needed ~800 px). */}
          <div
            className="flex flex-col lg:flex-row lg:items-center"
            style={{ gap: "12px", padding: "12px", marginBottom: "36px", backgroundColor: "var(--color-ntn-cream-50)", borderRadius: "14px", border: "1px solid rgba(89,105,77,0.12)" }}
          >
            <ToggleGroup
              aria={TX.formatAria[locale]}
              value={filter}
              onChange={(v) => setFilter(v as Filter)}
              options={[
                { key: "roteiro", label: TX.oneDay[locale], n: matching("roteiro", styleFilter, regionFilter).length },
                { key: "programa", label: TX.multiDay[locale], n: matching("programa", styleFilter, regionFilter).length },
              ]}
            />
            <ToggleGroup
              aria={TX.styleAria[locale]}
              value={styleFilter}
              onChange={(v) => setStyleFilter(v as Style)}
              options={[
                { key: "guided", label: TX.guided[locale], n: matching(filter, "guided", regionFilter).length },
                { key: "self", label: TX.selfGuided[locale], n: matching(filter, "self", regionFilter).length },
              ]}
            />

            <span aria-hidden className="hidden lg:block" style={{ width: "1px", alignSelf: "stretch", backgroundColor: "rgba(89,105,77,0.2)" }} />

            {/* Region menu */}
            <div ref={regionRef} className="relative self-start lg:self-center" style={{ zIndex: 30 }}>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={regionOpen}
                onClick={() => setRegionOpen((o) => !o)}
                className="inline-flex items-center"
                style={{
                  gap: "8px", padding: "9px 14px", borderRadius: "9999px", fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap",
                  border: `1px solid ${regionFilter !== "all" ? "var(--color-ntn-forest-600)" : "rgba(89,105,77,0.25)"}`,
                  backgroundColor: regionFilter !== "all" ? "var(--color-ntn-forest-600)" : "var(--color-ntn-white)",
                  color: regionFilter !== "all" ? "#fff" : "var(--color-ntn-black-800)",
                }}
              >
                <span style={{ opacity: 0.7, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "11px" }}>{t("filterRegion")}</span>
                {regionFilter === "all" ? t("allRegions") : regions.find((r) => r.id === regionFilter)?.name}
                <ChevronDown size={15} style={{ transition: "transform 0.2s", transform: regionOpen ? "rotate(180deg)" : "none" }} />
              </button>
              <AnimatePresence>
                {regionOpen && (
                  <m.ul
                    role="listbox"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-0 top-full"
                    style={{ marginTop: "8px", minWidth: "260px", padding: "6px", backgroundColor: "var(--color-ntn-white)", border: "1px solid rgba(89,105,77,0.18)", borderRadius: "12px", boxShadow: "0 18px 40px -18px rgba(29,29,26,0.35)" }}
                  >
                    {[{ id: "all", name: t("allRegions") }, ...regions.map((r) => ({ id: r.id, name: r.name }))].map((r) => {
                      const n = matching(filter, styleFilter, r.id).length;
                      const on = regionFilter === r.id;
                      return (
                        <li key={r.id}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={on}
                            disabled={n === 0 && !on}
                            onClick={() => { setRegionFilter(r.id); setRegionOpen(false); }}
                            className="flex w-full items-center justify-between"
                            style={{
                              gap: "16px", padding: "10px 12px", borderRadius: "8px", fontFamily: "var(--font-ui)", fontSize: "14px", fontWeight: on ? 700 : 500, textAlign: "left",
                              backgroundColor: on ? "rgba(188,207,2,0.22)" : "transparent",
                              color: "var(--color-ntn-black-900)", opacity: n === 0 && !on ? 0.4 : 1, cursor: n === 0 && !on ? "default" : "pointer",
                            }}
                          >
                            <span>{r.name}</span>
                            <span style={{ color: "var(--color-ntn-forest-600)", fontWeight: 600 }}>{n}</span>
                          </button>
                        </li>
                      );
                    })}
                  </m.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Right end of the bar: result count (and Clear when a filter is on), so the line has no empty tail */}
            <div className="flex items-center self-start lg:!ml-auto lg:self-center" style={{ gap: "14px", paddingRight: "6px" }}>
            {anyFilter && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center"
                style={{ gap: "6px", padding: "8px 4px", fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 600, color: "var(--color-ntn-forest-600)", whiteSpace: "nowrap" }}
              >
                <X size={14} />
                {TX.clear[locale]}
              </button>
            )}
              <p aria-live="polite" className="text-label" style={{ color: "var(--color-ntn-forest-600)", whiteSpace: "nowrap" }}>
                {filtered.length} {filtered.length === 1 ? TX.programOne[locale] : TX.programs[locale]}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <m.div
              key={`${filter}-${styleFilter}-${regionFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProgramGrid routes={filtered} facts={facts} locale={locale} />
            </m.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 16px" }}>
              <p className="text-body-lg" style={{ color: "var(--color-ntn-black-800)", marginBottom: "16px" }}>{TX.empty[locale]}</p>
              <button type="button" className="btn btn-ghost-dark" onClick={clearFilters}>
                {TX.reset[locale]}
              </button>
            </div>
          )}
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

/** Pill group where one option can be on; clicking the active one turns the group off (= all). */
function ToggleGroup({
  aria, value, onChange, options,
}: {
  aria: string;
  value: string;
  onChange: (v: string) => void;
  options: { key: string; label: string; n: number }[];
}) {
  return (
    <div role="group" aria-label={aria} className="inline-flex max-w-full shrink-0 self-start lg:self-center" style={{ gap: "4px", padding: "4px", backgroundColor: "var(--color-ntn-white)", borderRadius: "9999px", border: "1px solid rgba(89,105,77,0.16)" }}>
      {options.map((o) => {
        const on = value === o.key;
        const empty = o.n === 0 && !on;
        return (
          <button
            key={o.key}
            type="button"
            aria-pressed={on}
            disabled={empty}
            onClick={() => onChange(on ? "all" : o.key)}
            style={{
              padding: "9px 16px", borderRadius: "9999px", fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 700, whiteSpace: "nowrap",
              backgroundColor: on ? "var(--color-ntn-lime)" : "transparent",
              color: on ? "var(--color-ntn-black-900)" : "var(--color-ntn-forest-600)",
              opacity: empty ? 0.4 : 1, cursor: empty ? "default" : "pointer", transition: "background-color 0.2s, color 0.2s",
            }}
          >
            {o.label} <span style={{ opacity: 0.6, fontWeight: 600 }}>({o.n})</span>
          </button>
        );
      })}
    </div>
  );
}
