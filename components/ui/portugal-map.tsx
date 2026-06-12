"use client";

import { useState } from "react";
import { m } from "framer-motion";

/**
 * PortugalMap — terrain relief PNG (1080×1920 RGBA).
 * Pin coords measured from user's annotated PNG (green dots × 0.668 scale).
 * ViewBox 560×994 mirrors the 9:16 image ratio.
 */

const WIDTH = 560;
const HEIGHT = 994;

const LEFT_X = 46;
const RIGHT_X = 514;

type Region = {
  id: string;
  x: number;
  y: number;
  side: "left" | "right";
  lines: string[];
};

// Coordinates derived from user-placed green dots on the 1080×1920 source PNG.
// Each value = dot_pixel_in_display × (560/839) for x, × (994/1491) for y.
const regions: Region[] = [
  { id: "geres",    x: 204, y:  99, side: "left",  lines: ["Peneda-Gerês"] },
  { id: "tras",     x: 400, y:  67, side: "right", lines: ["Trás-os-Montes"] },
  { id: "santiago", x: 302, y: 147, side: "right", lines: ["Caminho de", "Santiago Interior"] },
  { id: "porto",    x: 132, y: 195, side: "left",  lines: ["Porto"] },
  { id: "douro",    x: 286, y: 207, side: "right", lines: ["Douro Valley"] },
  { id: "lisboa",   x:  92, y: 637, side: "left",  lines: ["Lisboa & Sintra"] },
  { id: "algarve",  x: 219, y: 929, side: "right", lines: ["Algarve"] },
];

const PIN_COLOR  = "#ccff00";
const PIN_STROKE = "rgba(255,255,255,0.9)";
const LINE_COLOR = "rgba(20,20,20,0.72)";
const LINE_ACTIVE = "#1a2e0a";

export function PortugalMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full" style={{ maxWidth: "480px", margin: "0 auto" }}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        fill="none"
        className="w-full h-auto"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Drop shadow that follows the Portugal silhouette (respects PNG transparency) */}
          <filter id="map-shadow" x="-10%" y="-5%" width="126%" height="116%">
            <feDropShadow
              dx="4" dy="10" stdDeviation="18"
              floodColor="rgba(28,32,18,0.22)"
            />
          </filter>

          {/* White halo behind label text for readability on terrain */}
          <filter id="label-glow" x="-18%" y="-35%" width="136%" height="170%">
            <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="expanded" />
            <feFlood floodColor="white" floodOpacity="0.88" result="white" />
            <feComposite in="white" in2="expanded" operator="in" result="halo" />
            <feMerge>
              <feMergeNode in="halo" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Relief map — shadow follows silhouette thanks to RGBA transparency */}
        <image
          href="/images/portugal-map-relief.png"
          x="0" y="0"
          width={WIDTH} height={HEIGHT}
          preserveAspectRatio="xMidYMid meet"
          filter="url(#map-shadow)"
        />

        {/* Pins + leader lines + labels */}
        {regions.map((mk, i) => {
          const active = hovered === mk.id;
          const endX   = mk.side === "left" ? LEFT_X : RIGHT_X;
          const textX  = mk.side === "left" ? endX - 8 : endX + 8;
          const anchor = mk.side === "left" ? "end" : "start";

          return (
            <g
              key={mk.id}
              onMouseEnter={() => setHovered(mk.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Leader line — straight from pin to label anchor */}
              <m.line
                x1={mk.x} y1={mk.y} x2={endX} y2={mk.y}
                stroke={active ? LINE_ACTIVE : LINE_COLOR}
                strokeWidth={active ? 1.2 : 0.85}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
              />
              {/* Dot at label end */}
              <circle cx={endX} cy={mk.y} r={2.5} fill={active ? LINE_ACTIVE : "#1a1a1a"} />

              {/* Soft white halo behind pin for contrast on dark terrain */}
              <circle cx={mk.x} cy={mk.y} r={14} fill="white" opacity={0.25} />

              {/* Pulse ring */}
              <m.circle
                cx={mk.x} cy={mk.y} r={6} fill={PIN_COLOR}
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.8, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
                style={{ transformOrigin: `${mk.x}px ${mk.y}px` }}
              />
              {/* Outer ring */}
              <circle
                cx={mk.x} cy={mk.y} r={9}
                fill="none" stroke={PIN_COLOR} strokeWidth={1.6}
                opacity={active ? 1 : 0.88}
              />
              {/* Centre dot */}
              <m.circle
                cx={mk.x} cy={mk.y} r={active ? 6.5 : 5}
                fill={PIN_COLOR} stroke={PIN_STROKE} strokeWidth={1.4}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 320, damping: 18 }}
              />

              {/* Label */}
              <text
                x={textX} y={mk.y}
                textAnchor={anchor}
                filter="url(#label-glow)"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  fill: active ? LINE_ACTIVE : "#1a1a1a",
                  transition: "fill 0.2s",
                }}
              >
                {mk.lines.map((line, li) => (
                  <tspan
                    key={li}
                    x={textX}
                    dy={li === 0 ? (mk.lines.length > 1 ? -5 : 3) : 12}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
