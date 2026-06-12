"use client";

import { useState } from "react";
import { m } from "framer-motion";

/**
 * PortugalMap — uses the high-res terrain relief PNG (1080×1920 RGBA).
 * SVG viewBox matches the image aspect ratio (560 × 994 ≈ 9:16).
 * Pin coordinates derived from visual analysis of the relief map.
 */

const WIDTH = 560;
const HEIGHT = 994;

const LEFT_X = 50;
const RIGHT_X = 510;

type Region = {
  id: string;
  x: number;
  y: number;
  side: "left" | "right";
  off: number;
  lines: string[];
};

const regions: Region[] = [
  { id: "geres",    x: 215, y: 182, side: "left",  off: 0,   lines: ["Peneda-Gerês"] },
  { id: "santiago", x: 248, y: 278, side: "left",  off: 0,   lines: ["Caminho de", "Santiago Interior"] },
  { id: "tras",     x: 382, y: 208, side: "right", off: 0,   lines: ["Trás-os-Montes"] },
  { id: "douro",    x: 356, y: 336, side: "right", off: 0,   lines: ["Douro Valley"] },
  { id: "lisboa",   x: 122, y: 676, side: "left",  off: 0,   lines: ["Lisboa & Sintra"] },
  { id: "algarve",  x: 258, y: 905, side: "right", off: 0,   lines: ["Algarve"] },
];

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
        {/* Relief map image — transparent PNG, ocean shows container bg */}
        <image
          href="/images/portugal-map-relief.png"
          x="0"
          y="0"
          width={WIDTH}
          height={HEIGHT}
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Markers + leader lines + external labels */}
        {regions.map((mk, i) => {
          const active = hovered === mk.id;
          const endX = mk.side === "left" ? LEFT_X : RIGHT_X;
          const labelY = mk.y + mk.off;
          const textX = mk.side === "left" ? endX - 9 : endX + 9;
          const anchor = mk.side === "left" ? "end" : "start";

          return (
            <g
              key={mk.id}
              onMouseEnter={() => setHovered(mk.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Leader line: pin → elbow → label endpoint */}
              <m.polyline
                points={`${mk.x},${mk.y} ${endX},${labelY} ${textX},${labelY}`}
                fill="none"
                stroke={active ? "#3d5a1a" : "rgba(45,59,30,0.65)"}
                strokeWidth={active ? 1.2 : 0.8}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              />
              {/* Dot at label end */}
              <circle cx={endX} cy={labelY} r={2} fill="#2d3b1e" />

              {/* Pulse ring */}
              <m.circle
                cx={mk.x}
                cy={mk.y}
                r={5}
                fill="#bccf02"
                initial={{ opacity: 0.4, scale: 1 }}
                animate={{ opacity: [0.4, 0, 0.4], scale: [1, 2.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.35, ease: "easeOut" }}
                style={{ transformOrigin: `${mk.x}px ${mk.y}px` }}
              />
              {/* Marker outer ring */}
              <circle
                cx={mk.x}
                cy={mk.y}
                r={8}
                fill="none"
                stroke="#bccf02"
                strokeWidth={1.2}
                opacity={active ? 1 : 0.7}
              />
              {/* Marker centre dot */}
              <m.circle
                cx={mk.x}
                cy={mk.y}
                r={active ? 5.5 : 4}
                fill="#bccf02"
                stroke="#2d3b1e"
                strokeWidth={0.8}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 300, damping: 18 }}
              />

              {/* Label */}
              <text
                x={textX}
                y={labelY}
                textAnchor={anchor}
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fill: active ? "#3d5a1a" : "#2d3b1e",
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
