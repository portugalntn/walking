"use client";

/**
 * Program card shared by the programs list and the region pages.
 * Duration in the visitor's language, the walk's distance and difficulty
 * up front, and a clear call to action.
 */

import Image from "next/image";
import { Footprints, TrendingUp, ArrowRight } from "lucide-react";
import type { RouteProduct } from "@/lib/destinations";
import type { CardFacts } from "@/lib/program-facts";

type Loc = "en" | "pt" | "es";

const TX = {
  day: { en: "day", pt: "dia", es: "día" },
  days: { en: "days", pt: "dias", es: "días" },
  see: { en: "See the programme", pt: "Ver programa", es: "Ver programa" },
};

export function durationLabel(days: number, locale: Loc): string {
  return `${days} ${days === 1 ? TX.day[locale] : TX.days[locale]}`;
}

export function ProgramCard({
  route,
  facts,
  locale,
  feature = false,
}: {
  route: RouteProduct;
  facts?: CardFacts;
  locale: Loc;
  /** Wider, landscape card for a single highlighted programme. */
  feature?: boolean;
}) {
  return (
    <a
      href={`/${locale}/programas/${route.id}`}
      className="group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_50px_-28px_rgba(29,29,26,0.45)]"
      style={{ backgroundColor: "var(--color-ntn-white)", borderRadius: "12px", border: "1px solid rgba(89,105,77,0.14)" }}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: feature ? "16/8" : "16/11" }}>
        <Image
          src={route.image}
          alt={route.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          sizes={feature ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
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

      <div className="flex flex-1 flex-col" style={{ padding: "20px 22px 22px" }}>
        <h3 className="font-ui leading-snug" style={{ color: "var(--color-ntn-black-900)", fontSize: feature ? "1.6rem" : "1.3rem", fontWeight: 700, marginBottom: "6px" }}>
          {route.title}
        </h3>
        <p className="text-body-md" style={{ color: "var(--color-ntn-black-800)", opacity: 0.8, marginBottom: "16px" }}>
          {route.tagline[locale]}
        </p>

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
          className="mt-auto inline-flex items-center gap-2 transition-all duration-200 group-hover:gap-3"
          style={{ color: "var(--color-ntn-forest-400)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-ui)" }}
        >
          {TX.see[locale]}
          <ArrowRight size={15} />
        </span>
      </div>
    </a>
  );
}
