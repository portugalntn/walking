"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { regions, routes } from "@/lib/destinations";
import type { CardFacts } from "@/lib/program-facts";
import { ProgramCard } from "@/components/ui/program-card";
import { ArrowRight, Compass, UtensilsCrossed, Sun, Footprints, BedDouble, CalendarDays } from "lucide-react";

const EASE = [0.19, 1, 0.22, 1] as const;
type Loc = "en" | "pt" | "es";
type Filter = "all" | "roteiro" | "programa";

const tri = (en: string, pt: string, es: string) => ({ en, pt, es });

/** Strings of the redesigned formats and list. Move to messages/*.json when approved. */
const TX = {
  formatsIntro: tri(
    "Two ways to walk with us. Pick one and we show you the programmes that fit.",
    "Duas formas de caminhar connosco. Escolha uma e mostramos os programas que encaixam.",
    "Dos formas de caminar con nosotros. Elija una y le mostramos los programas que encajan."
  ),
  intro: tri(
    "The territories we know by heart. Choose the format and the region, and find your walk.",
    "Os territórios que conhecemos de cor. Escolha o formato e a região, e encontre a sua caminhada.",
    "Los territorios que conocemos de memoria. Elija el formato y la región, y encuentre su caminata."
  ),
  oneDay: tri("1 day", "1 dia", "1 día"),
  multiDay: tri("Multi-day", "Vários dias", "Varios días"),
  formatAria: tri("Programme format", "Formato do programa", "Formato del programa"),
  programs: tri("programmes", "programas", "programas"),
  programOne: tri("programme", "programa", "programa"),
  daysRange: tri("days", "dias", "días"),
  to: tri("to", "a", "a"),
  see1: tri("See the one-day programmes", "Ver os programas de 1 dia", "Ver los programas de 1 día"),
  seeMulti: tri("See the multi-day journeys", "Ver os programas de vários dias", "Ver los programas de varios días"),
  p1a: tri("Expert local guide", "Guia especializado", "Guía especializado"),
  p1b: tri("Local flavours on the way", "Sabores locais pelo caminho", "Sabores locales por el camino"),
  p1c: tri("Start and finish the same day", "Começa e acaba no mesmo dia", "Empieza y acaba el mismo día"),
  pMa: tri("Self-guided or guided", "Self-guided ou guiado", "Autoguiado o guiado"),
  pMb: tri("Accommodation and logistics included", "Alojamento e logística incluídos", "Alojamiento y logística incluidos"),
  pMc: tri("Day-by-day itinerary", "Itinerário dia a dia", "Itinerario día a día"),
  multiDesc: tri(
    "Journeys of several days, self-guided or guided, with accommodation and logistics taken care of.",
    "Jornadas de vários dias, self-guided ou guiadas, com alojamento e logística tratados por nós.",
    "Jornadas de varios días, autoguiadas o guiadas, con alojamiento y logística a nuestro cargo."
  ),
  empty: tri("No programme matches this combination yet.", "Ainda não há programas para esta combinação.", "Aún no hay programas para esta combinación."),
  reset: tri("Show all programmes", "Ver todos os programas", "Ver todos los programas"),
};

/** Count of programmes for a format and region, used by the switch and the chips. */
function countFor(format: Filter, region: string) {
  return routes.filter((r) => (format === "all" || r.format === format) && (region === "all" || r.regionId === region)).length;
}

export function DestinationsPageContent({ facts }: { facts: Record<string, CardFacts> }) {
  const t = useTranslations("destinationsPage");
  const locale = useLocale() as Loc;
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const pausedRef = useRef(false);

  const active = regions[index];
  const total = regions.length;

  // Deep-link: /programas?tipo=1dia | multidias opens the matching format tab
  useEffect(() => {
    const tipo = new URLSearchParams(window.location.search).get("tipo");
    if (tipo === "1dia") setFilter("roteiro");
    else if (tipo === "multidias") setFilter("programa");
  }, []);

  const filtered = routes.filter(
    (r) =>
      (filter === "all" || r.format === filter) &&
      (regionFilter === "all" || r.regionId === regionFilter)
  );

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
      key: "programa" as Filter, title: t("formatMultiTitle"), desc: TX.multiDesc[locale], tag: multiRange,
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
              {TX.formatsIntro[locale]}
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
                  <button type="button" onClick={() => selectFormat(f.key)} className="btn btn-primary mt-auto self-start">
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
              {TX.intro[locale]}
            </p>
          </FadeUp>

          {/* Filters */}
          <div
            className="flex flex-col"
            style={{ gap: "16px", padding: "16px", marginBottom: "36px", backgroundColor: "var(--color-ntn-cream-50)", borderRadius: "14px", border: "1px solid rgba(89,105,77,0.12)" }}
          >
            {/* Format switch */}
            <div role="tablist" aria-label={TX.formatAria[locale]} className="inline-flex max-w-full overflow-x-auto" style={{ gap: "4px", padding: "4px", backgroundColor: "var(--color-ntn-white)", borderRadius: "9999px", border: "1px solid rgba(89,105,77,0.16)", alignSelf: "flex-start" }}>
              {([
                { key: "all" as Filter, label: t("filterAll") },
                { key: "roteiro" as Filter, label: TX.oneDay[locale] },
                { key: "programa" as Filter, label: TX.multiDay[locale] },
              ]).map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f.key)}
                    className="relative"
                    style={{ padding: "10px 18px", borderRadius: "9999px", fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em", color: active ? "var(--color-ntn-black-900)" : "var(--color-ntn-forest-600)", whiteSpace: "nowrap" }}
                  >
                    {active && (
                      <m.span layoutId="format-pill" className="absolute inset-0" style={{ backgroundColor: "var(--color-ntn-lime)", borderRadius: "9999px" }} transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    <span className="relative">
                      {f.label} <span style={{ opacity: 0.6, fontWeight: 600 }}>({countFor(f.key, regionFilter)})</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Region chips */}
            <div className="flex flex-wrap items-center" style={{ gap: "8px" }}>
              <span className="text-label" style={{ color: "var(--color-ntn-forest-600)", marginRight: "4px" }}>{t("filterRegion")}</span>
              {[{ id: "all", name: t("allRegions") }, ...regions.map((r) => ({ id: r.id, name: r.name }))].map((r) => {
                const active = regionFilter === r.id;
                const n = countFor(filter, r.id);
                return (
                  <button
                    key={r.id}
                    onClick={() => setRegionFilter(r.id)}
                    disabled={n === 0 && !active}
                    style={{
                      padding: "8px 14px", borderRadius: "9999px", fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 600,
                      border: `1px solid ${active ? "var(--color-ntn-forest-600)" : "rgba(89,105,77,0.25)"}`,
                      backgroundColor: active ? "var(--color-ntn-forest-600)" : "var(--color-ntn-white)",
                      color: active ? "#fff" : "var(--color-ntn-black-800)",
                      opacity: n === 0 && !active ? 0.4 : 1,
                      cursor: n === 0 && !active ? "default" : "pointer",
                      transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
                    }}
                  >
                    {r.name} <span style={{ opacity: 0.6 }}>{n}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <p aria-live="polite" className="text-label" style={{ color: "var(--color-ntn-forest-600)", marginBottom: "20px" }}>
            {filtered.length} {filtered.length === 1 ? TX.programOne[locale] : TX.programs[locale]}
          </p>

          <AnimatePresence mode="wait">
            <m.div
              key={`${filter}-${regionFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              style={{ gap: "28px" }}
            >
              {filtered.map((route, i) => (
                <m.div
                  key={route.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.07, ease: EASE }}
                >
                  <ProgramCard route={route} facts={facts[route.id]} locale={locale} />
                </m.div>
              ))}
            </m.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 16px" }}>
              <p className="text-body-lg" style={{ color: "var(--color-ntn-black-800)", marginBottom: "16px" }}>{TX.empty[locale]}</p>
              <button type="button" className="btn btn-ghost-dark" onClick={() => { setFilter("all"); setRegionFilter("all"); }}>
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
