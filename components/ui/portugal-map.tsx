"use client";

import { useState } from "react";
import { m } from "framer-motion";

/**
 * PortugalMap — terrain relief PNG (1080×1920 RGBA).
 * Coordinates calibrated from Google My Maps georef + visual reference.
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
  off: number;
  lines: string[];
};

const regions: Region[] = [
  { id: "geres",    x: 192, y: 162, side: "left",  off:  0, lines: ["Peneda-Gerês"] },
  { id: "tras",     x: 368, y: 112, side: "right", off:  0, lines: ["Trás-os-Montes"] },
  { id: "santiago", x: 274, y: 228, side: "right", off:  0, lines: ["Caminho de", "Santiago Interior"] },
  { id: "porto",    x: 148, y: 272, side: "left",  off:  0, lines: ["Porto"] },
  { id: "douro",    x: 322, y: 300, side: "right", off:  8, lines: ["Douro Valley"] },
  { id: "lisboa",   x:  96, y: 638, side: "left",  off:  0, lines: ["Lisboa & Sintra"] },
  { id: "algarve",  x: 244, y: 878, side: "right", off:  0, lines: ["Algarve"] },
];

const PIN_COLOR = "#ccff00";
const PIN_STROKE = "rgba(255,255,255,0.9)";
const LINE_COLOR = "rgba(20,20,20,0.75)";
const LINE_COLOR_ACTIVE = "#1a2e0a";

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
          {/* White glow filter for readable labels on terrain */}
          <filter id="label-bg" x="-15%" y="-30%" width="130%" height="160%">
            <feFlood floodColor="white" floodOpacity="0.75" result="bg" />
            <feComposite in="bg" in2="SourceGraphic" operator="over" />
          </filter>
          <filter id="label-glow" x="-15%" y="-30%" width="130%" height="160%">
            <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="expanded" />
            <feFlood floodColor="white" floodOpacity="0.9" result="white" />
            <feComposite in="white" in2="expanded" operator="in" result="halo" />
            <feMerge>
              <feMergeNode in="halo" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Relief map image — transparent PNG */}
        <image
          href="/images/portugal-map-relief.png"
          x="0"
          y="0"
          width={WIDTH}
          height={HEIGHT}
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Markers + leader lines + labels */}
        {regions.map((mk, i) => {
          const active = hovered === mk.id;
          const endX = mk.side === "left" ? LEFT_X : RIGHT_X;
          const labelY = mk.y + mk.off;
          const textX = mk.side === "left" ? endX - 8 : endX + 8;
          const anchor = mk.side === "left" ? "end" : "start";

          return (
            <g
              key={mk.id}
              onMouseEnter={() => setHovered(mk.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Leader line */}
              <m.line
                x1={mk.x} y1={mk.y}
                x2={endX} y2={labelY}
                stroke={active ? LINE_COLOR_ACTIVE : LINE_COLOR}
                strokeWidth={active ? 1.2 : 0.9}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
              />
              {/* Dot at label end */}
              <circle cx={endX} cy={labelY} r={2.5} fill={active ? LINE_COLOR_ACTIVE : "#1a1a1a"} />

              {/* White halo for pin visibility on terrain */}
              <circle cx={mk.x} cy={mk.y} r={14} fill="white" opacity={0.28} />

              {/* Pulse ring */}
              <m.circle
                cx={mk.x} cy={mk.y} r={6}
                fill={PIN_COLOR}
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.8, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
                style={{ transformOrigin: `${mk.x}px ${mk.y}px` }}
              />
              {/* Outer ring */}
              <circle
                cx={mk.x} cy={mk.y} r={9}
                fill="none"
                stroke={PIN_COLOR}
                strokeWidth={1.6}
                opacity={active ? 1 : 0.88}
              />
              {/* Centre dot */}
              <m.circle
                cx={mk.x} cy={mk.y}
                r={active ? 6.5 : 5}
                fill={PIN_COLOR}
                stroke={PIN_STROKE}
                strokeWidth={1.4}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 320, damping: 18 }}
              />

              {/* Label with white glow for readability */}
              <text
                x={textX}
                y={labelY}
                textAnchor={anchor}
                filter="url(#label-glow)"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  fill: active ? LINE_COLOR_ACTIVE : "#1a1a1a",
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
