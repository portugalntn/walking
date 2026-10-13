"use client";

/**
 * Program card and grid shared by the programs list and the region pages.
 * Duration in the visitor's language, the walk's distance and difficulty
 * up front, and a clear call to action.
 *
 * ProgramGrid never leaves a row half empty: rows of three; two leftovers
 * share the last row; a single leftover becomes a wide, horizontal card.
 */

import Image from "next/image";
import { m } from "framer-motion";
import { Footprints, TrendingUp, ArrowRight, Check } from "lucide-react";
import type { RouteProduct } from "@/lib/destinations";
import type { CardFacts } from "@/lib/program-facts";

type Loc = "en" | "pt" | "es";
const EASE = [0.19, 1, 0.22, 1] as const;

const TX = {
  day: { en: "day", pt: "dia", es: "día" },
  days: { en: "days", pt: "dias", es: "días" },
  see: { en: "See the programme", pt: "Ver programa", es: "Ver programa" },
};

export function durationLabel(days: number, locale: Loc): string {
  return `${days} ${days === 1 ? TX.day[locale] : TX.days[locale]}`;
}

/**
 * Spacing classes carry "!": globals.css resets margin and padding outside the
 * Tailwind layers, which silently cancels plain spacing utilities.
 *
 * Where the card turns horizontal. Written out in full so Tailwind sees every
 * class: "md" (tablet and up), "lg" (desktop only) or "mdOnly" (tablet only,
 * back to a normal card on desktop).
 */
type Wide = "md" | "lg" | "mdOnly";
const WIDE: Record<Wide, { root: string; image: string; body: string; extra: string; short: string }> = {
  md: {
    root: "md:flex-row",
    image: "md:w-[56%] md:shrink-0 md:aspect-auto md:min-h-[360px]",
    body: "md:justify-center md:!px-10 md:!py-9",
    extra: "hidden md:block",
    short: "md:hidden",
  },
  lg: {
    root: "lg:flex-row",
    image: "lg:w-[56%] lg:shrink-0 lg:aspect-auto lg:min-h-[380px]",
    body: "lg:justify-center lg:!px-12 lg:!py-10",
    extra: "hidden lg:block",
    short: "lg:hidden",
  },
  mdOnly: {
    root: "md:flex-row lg:flex-col",
    image: "md:w-[56%] md:shrink-0 md:aspect-auto md:min-h-[340px] lg:w-full lg:aspect-[16/11] lg:min-h-0",
    body: "md:justify-center md:!px-10 md:!py-9 lg:!px-[22px] lg:!pt-5 lg:!pb-[22px]",
    extra: "hidden md:block lg:hidden",
    short: "md:hidden lg:block",
  },
};

export function ProgramCard({
  route,
  facts,
  locale,
  wide,
}: {
  route: RouteProduct;
  facts?: CardFacts;
  locale: Loc;
  /** Horizontal layout from this breakpoint, for a card that fills its row. */
  wide?: Wide;
}) {
  const w = wide ? WIDE[wide] : undefined;
  return (
    <a
      href={`/${locale}/programas/${route.id}`}
      className={`group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_50px_-28px_rgba(29,29,26,0.45)] ${w?.root ?? ""}`}
      style={{ backgroundColor: "var(--color-ntn-white)", borderRadius: "12px", border: "1px solid rgba(89,105,77,0.14)" }}
    >
      <div className={`relative w-full overflow-hidden aspect-[16/11] ${w?.image ?? ""}`}>
        <Image
          src={route.image}
          alt={route.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          sizes={w ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(29,29,26,0.25) 0%, transparent 35%, transparent 55%, rgba(29,29,26,0.65) 100%)" }} />
        <span
          className="absolute top-4 left-4"
          style={{
            backgroundColor: "var(--color-ntn-lime)", color: "var(--color-ntn-black-900)", fontFamily: "var(--font-ui)",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "7px 12px", borderRadius: "5px",
          }}
        >
          {durationLabel(route.days, locale)}
        </span>
        <p className="absolute bottom-4 left-4 right-4 text-label" style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.45)" }}>
          {route.region} · {route.type[locale]}
        </p>
      </div>

      <div className={`flex flex-1 flex-col !px-[22px] !pt-5 !pb-[22px] ${w?.body ?? ""}`}>
        <h3 className="font-ui leading-snug" style={{ color: "var(--color-ntn-black-900)", fontSize: w ? "clamp(1.3rem, 2.2vw, 1.75rem)" : "1.3rem", fontWeight: 700, marginBottom: "6px" }}>
          {route.title}
        </h3>
        {/* The short tagline gives way to the fuller subtitle when the card is wide */}
        <p className={`text-body-md ${w && facts?.subtitle ? w.short : ""}`} style={{ color: "var(--color-ntn-black-800)", opacity: 0.8, marginBottom: "16px" }}>
          {route.tagline[locale]}
        </p>

        {/* Wide card only: the programme's own subtitle and its first highlights */}
        {w && (facts?.subtitle || facts?.highlights?.length) && (
          <div className={w.extra} style={{ marginBottom: "20px" }}>
            {facts?.subtitle && (
              <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)", marginBottom: "14px", maxWidth: "46ch" }}>
                {facts.subtitle[locale]}
              </p>
            )}
            {facts?.highlights && facts.highlights.length > 0 && (
              <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {facts.highlights.map((h) => (
                  <li key={h.en} className="flex items-start" style={{ gap: "10px", color: "var(--color-ntn-black-900)", fontSize: "14px", fontFamily: "var(--font-ui)", fontWeight: 500 }}>
                    <span style={{ width: "20px", height: "20px", borderRadius: "9999px", backgroundColor: "rgba(188,207,2,0.28)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                      <Check size={12} style={{ color: "var(--color-ntn-forest-600)" }} />
                    </span>
                    {h[locale]}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {facts && (facts.distance || facts.difficulty) && (
          <div className="flex flex-wrap" style={{ gap: "8px 18px", marginBottom: "18px" }}>
            {facts.distance && (
              <span className="inline-flex items-center gap-1.5" style={{ color: "var(--color-ntn-forest-600)", fontSize: "13px", fontFamily: "var(--font-ui)", fontWeight: 600 }}>
                <Footprints size={15} /> {facts.distance}
              </span>
            )}
            {facts.difficulty && (
              <span className="inline-flex items-center gap-1.5" style={{ color: "var(--color-ntn-forest-600)", fontSize: "13px", fontFamily: "var(--font-ui)", fontWeight: 600 }}>
                <TrendingUp size={15} /> {facts.difficulty[locale]}
              </span>
            )}
          </div>
        )}

        <span
          className="!mt-auto inline-flex items-center gap-2 transition-all duration-200 group-hover:gap-3"
          style={{ color: "var(--color-ntn-forest-400)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-ui)" }}
        >
          {TX.see[locale]}
          <ArrowRight size={15} />
        </span>
      </div>
    </a>
  );
}

/**
 * Grid of program cards that always fills its rows.
 * Desktop works on 6 columns: a normal card spans 2 (three per row), the two
 * cards of an incomplete last row span 3 each, a lone last card spans all 6
 * and turns horizontal. Tablet (2 per row): a lone last card spans both.
 */
export function ProgramGrid({
  routes,
  facts,
  locale,
}: {
  routes: RouteProduct[];
  facts: Record<string, CardFacts>;
  locale: Loc;
}) {
  const n = routes.length;
  const remLg = n % 3;
  const remMd = n % 2;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6" style={{ gap: "28px" }}>
      {routes.map((route, i) => {
        const last = i === n - 1;
        const lgFull = remLg === 1 && last;
        const lgHalf = remLg === 2 && i >= n - 2;
        const mdFull = remMd === 1 && last;
        const lgSpan = lgFull ? "lg:col-span-6" : lgHalf ? "lg:col-span-3" : "lg:col-span-2";
        const mdSpan = mdFull ? "md:col-span-2" : "";
        const wide: Wide | undefined = mdFull && lgFull ? "md" : lgFull ? "lg" : mdFull ? "mdOnly" : undefined;
        return (
          <m.div
            key={route.id}
            className={`${mdSpan} ${lgSpan}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.07, ease: EASE }}
          >
            <ProgramCard route={route} facts={facts[route.id]} locale={locale} wide={wide} />
          </m.div>
        );
      })}
    </div>
  );
}
