"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { featured } from "@/lib/exclusive";
import { programs } from "@/lib/programs";

const EASE = [0.19, 1, 0.22, 1] as const;

/**
 * Itinerário desenhado sobre a fotografia.
 * O traçado é decorativo, não é GPS. Quando existir GPX, este path passa a
 * ser gerado a partir dele e os pontos deixam de ser posições à mão.
 */
export function ExItinerary() {
  const t = useTranslations("exclusive.itinerary");
  const loc = useLocale() as "en" | "pt" | "es";
  const p = programs[featured.base];

  const stats = [
    { label: t("statDistance"), value: p.totalDistance },
    { label: t("statDays"), value: String(p.duration.days) },
    { label: t("statGrade"), value: `${p.grade} / 5` },
  ];

  return (
    <section className="ex-section">
      <div className="ex-wrap">
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "2rem", alignItems: "flex-end" }}>
          <div>
            <p className="ex-over ex-over-accent">{t("overline")}</p>
            <h2 className="ex-serif" style={{ fontSize: "var(--ex-h2)", marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "16ch" }}>
              {featured.name[loc]}
            </h2>
          </div>
          <p className="ex-body" style={{ maxWidth: "40ch" }}>
            {t("lead")}
          </p>
        </div>

        <m.div
          className="ex-itin"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          <Image
            src={featured.image}
            alt={featured.name[loc]}
            fill
            sizes="100vw"
            quality={90}
            style={{ objectFit: "cover", filter: "saturate(0.62) contrast(1.08) brightness(0.68)" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,12,10,0.85), rgba(11,12,10,0.1) 55%)" }} />

          {/* traçado */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
            aria-hidden
          >
            <m.path
              d={featured.path}
              fill="none"
              stroke="var(--ex-bone)"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.92 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 2.6, ease: EASE, delay: 0.35 }}
            />
          </svg>

          {/* pontos e etiquetas */}
          {featured.waypoints.map((w, i) => (
            <m.div
              key={w.label}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.6 + i * 0.28 }}
              style={{
                position: "absolute",
                left: `${w.x}%`,
                top: `${w.y}%`,
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  width: w.kind ? "11px" : "7px",
                  height: w.kind ? "11px" : "7px",
                  borderRadius: "9999px",
                  backgroundColor: w.kind === "finish" ? "var(--ex-accent)" : "var(--ex-bone)",
                  boxShadow: "0 0 0 4px rgba(11,12,10,0.55)",
                  flexShrink: 0,
                }}
              />
              <span
                className="ex-over"
                style={{
                  color: "var(--ex-bone)",
                  fontSize: "0.5625rem",
                  textShadow: "0 1px 8px rgba(11,12,10,0.9)",
                }}
              >
                {w.label}
              </span>
            </m.div>
          ))}

          {/* estatísticas, sem preço */}
          <div
            style={{
              position: "absolute",
              inset: "auto 0 0 0",
              padding: "clamp(1.25rem, 3vw, 2.75rem)",
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(1.75rem, 5vw, 5rem)",
            }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="ex-over" style={{ marginBottom: "0.5rem" }}>
                  {s.label}
                </p>
                <p className="ex-itin-stat-value">{s.value}</p>
              </div>
            ))}
          </div>
        </m.div>

        <p className="ex-over" style={{ marginTop: "1.25rem", color: "rgba(145,143,131,0.75)" }}>
          {t("note")}
        </p>
      </div>
    </section>
  );
}
