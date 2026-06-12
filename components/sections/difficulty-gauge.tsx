"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { grades, type GradeLevel } from "@/lib/grades";
import { Overline } from "@/components/ui/overline";

type Loc = "en" | "pt" | "es";

// Light to dark green ramp: the darker the zone, the harder the walk.
const RAMP = ["#e2e6d8", "#c4d1a4", "#a3bd6b", "#7d9a44", "#566b2e"];

function polar(cx: number, cy: number, angle: number, r: number): [number, number] {
  const rad = (angle * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy - r * Math.sin(rad)];
}

// Sector of a ring between angles a0 (left) and a1 (right), along the top.
function sector(cx: number, cy: number, rO: number, rI: number, a0: number, a1: number): string {
  const [x1, y1] = polar(cx, cy, a0, rO);
  const [x2, y2] = polar(cx, cy, a1, rO);
  const [x3, y3] = polar(cx, cy, a1, rI);
  const [x4, y4] = polar(cx, cy, a0, rI);
  return `M ${x1} ${y1} A ${rO} ${rO} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rI} ${rI} 0 0 0 ${x4} ${y4} Z`;
}

export function DifficultyGauge({
  level,
  hideOverline = false,
  hideScaleLink,
}: {
  level?: GradeLevel;
  hideOverline?: boolean;
  hideScaleLink?: boolean;
}) {
  const t = useTranslations("productPage");
  const locale = useLocale() as Loc;
  const [hover, setHover] = useState<number | null>(null);

  const cx = 150;
  const cy = 158;
  const rO = 132;
  const rI = 80;

  // -1 when used in scale mode (no specific product level)
  const activeIndex = level != null ? level - 1 : -1;
  const shown = hover !== null ? hover : (activeIndex >= 0 ? activeIndex : 0);
  const g = grades[shown];

  // Needle only rendered when a product level is given
  const needleAngle = level != null ? 180 - (level - 0.5) * 36 : null;
  const [nx, ny] = needleAngle != null ? polar(cx, cy, needleAngle, rO - 16) : [cx, cy];

  // In scale mode, show all sectors at equal weight; in product mode, dim non-active
  const sectorOpacity = (i: number) => {
    if (activeIndex === -1) return i === hover ? 1 : 0.72;
    return i === activeIndex ? 1 : i === hover ? 0.92 : 0.5;
  };

  // Show scale link by default only on product pages (level provided)
  const showLink = hideScaleLink === true ? false : level != null;

  return (
    <div
      style={{
        backgroundColor: "var(--color-ntn-cream-50)",
        border: "1px solid rgba(89,105,77,0.16)",
        borderRadius: "12px",
        padding: "28px 30px",
      }}
    >
      {!hideOverline && (
        <div style={{ marginBottom: "8px" }}>
          <Overline color="var(--color-ntn-forest-400)">{t("difficultyHeading")}</Overline>
        </div>
      )}

      <div
        style={{ display: "grid", gap: "28px", alignItems: "center", gridTemplateColumns: "minmax(240px, 320px) 1fr" }}
        className="ntn-gauge-grid"
      >
        {/* Gauge */}
        <svg viewBox="0 0 300 178" width="100%" role="img" aria-label={`${t("difficultyHeading")}: ${g.name[locale]}`}>
          <title>{g.name[locale]}</title>
          {grades.map((gr, i) => {
            const a0 = 180 - i * 36;
            const a1 = 180 - (i + 1) * 36;
            const isActive = i === activeIndex;
            const isHover = i === hover;
            const [tx, ty] = polar(cx, cy, (a0 + a1) / 2, (rO + rI) / 2);
            return (
              <g
                key={i}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              >
                <path
                  d={sector(cx, cy, rO, rI, a0, a1)}
                  fill={RAMP[i]}
                  fillOpacity={sectorOpacity(i)}
                  stroke={isActive ? "#bccf02" : isHover ? "#45533b" : "transparent"}
                  strokeWidth={isActive ? 3 : isHover ? 1.5 : 0}
                  style={{ transition: "fill-opacity .2s" }}
                />
                <text
                  x={tx}
                  y={ty + 5}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight={isActive || isHover ? 700 : 500}
                  fill={i >= 3 ? "#fff" : "#2c2c2a"}
                  style={{ pointerEvents: "none", fontFamily: "var(--font-ui)" }}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
          {/* Needle rendered only when a specific product level is given */}
          {needleAngle != null && (
            <>
              <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#2c2c2a" strokeWidth="3" strokeLinecap="round" />
              <circle cx={cx} cy={cy} r="8" fill="#2c2c2a" />
              <circle cx={cx} cy={cy} r="3.5" fill="#bccf02" />
            </>
          )}
        </svg>

        {/* Legend (updates on hover; in scale mode defaults to grade 1 until hover) */}
        <div>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "var(--color-ntn-lime)",
              color: "#1a2510",
              fontFamily: "var(--font-ui)",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.04em",
              padding: "5px 14px",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            {g.name[locale]}
          </span>
          <p className="text-body-md" style={{ color: "var(--color-ntn-forest-600)", marginBottom: "10px" }}>
            {g.maxDistance[locale]} · {g.maxAscent[locale]}
          </p>
          <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)", maxWidth: "44ch" }}>
            {g.description[locale]}
          </p>
          {showLink && (
            <Link
              href={`/${locale}/grading`}
              className="text-label"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--color-ntn-forest-400)",
                marginTop: "16px",
                borderBottom: "1.5px solid rgba(89,105,77,0.3)",
                paddingBottom: "2px",
              }}
            >
              {t("gradeScaleLink")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      <style>{`@media (max-width: 720px){ .ntn-gauge-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
