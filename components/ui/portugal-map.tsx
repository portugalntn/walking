"use client";

import { useEffect, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { Feature, Geometry } from "geojson";
import { m } from "framer-motion";

/**
 * PortugalMap — real Portugal geometry (world-atlas 50m) projected with
 * d3-geo. Editorial style: clean forest outline, soft cream fill, dotted
 * ocean, and leader lines connecting each marker to a label OUTSIDE the
 * silhouette (so labels never sit on the border).
 */

const WIDTH = 560;
const HEIGHT = 620;
const LEFT_X = 150; // leader-line end on the left side
const RIGHT_X = 410; // leader-line end on the right side

type Region = {
  id: string;
  coords: [number, number]; // [lng, lat]
  side: "left" | "right";
  off: number; // vertical nudge of the label end (avoid crowding)
  lines: string[];
};

const regions: Region[] = [
  { id: "geres",    coords: [-8.20, 41.86], side: "left",  off: -10, lines: ["Peneda-Gerês"] },
  { id: "santiago", coords: [-7.45, 41.74], side: "left",  off: 44,  lines: ["Caminho de", "Santiago Interior"] },
  { id: "tras",     coords: [-6.78, 41.74], side: "right", off: -8,  lines: ["Trás-os-Montes"] },
  { id: "douro",    coords: [-7.65, 41.10], side: "right", off: 8,   lines: ["Douro Valley"] },
  { id: "lisboa",   coords: [-9.20, 38.72], side: "left",  off: 0,   lines: ["Lisboa & Sintra"] },
  { id: "algarve",  coords: [-8.00, 37.10], side: "right", off: 0,   lines: ["Algarve"] },
];

type Marker = Region & { x: number; y: number };

export function PortugalMap() {
  const [pathD, setPathD] = useState<string | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    fetch("/portugal.geojson")
      .then((r) => r.json())
      .then((geo: Feature<Geometry>) => {
        const projection = geoMercator()
          .center([-8.0, 39.6])
          .scale(3400)
          .translate([WIDTH / 2, HEIGHT / 2]);

        const path = geoPath(projection);
        setPathD(path(geo) ?? null);

        setMarkers(
          regions.map((reg) => {
            const p = projection(reg.coords);
            return { ...reg, x: p ? p[0] : 0, y: p ? p[1] : 0 };
          })
        );
      })
      .catch(() => {});
  }, []);

  return (
    <div className="relative w-full" style={{ maxWidth: "620px", margin: "0 auto" }}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none" className="w-full h-auto">
        <defs>
          <pattern id="ocean-dots" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="#a0b4c8" />
          </pattern>
        </defs>

        {/* Ocean dots */}
        <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#ocean-dots)" opacity="0.20" />

        {/* Country outline */}
        {pathD && (
          <m.path
            d={pathD}
            fill="#e8e4dc"
            stroke="#2d3b1e"
            strokeWidth={1}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          />
        )}

        {/* Markers + leader lines + external labels */}
        {markers.map((mk, i) => {
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
              {/* Leader line: marker -> elbow -> label end */}
              <m.polyline
                points={`${mk.x},${mk.y} ${endX},${labelY} ${textX},${labelY}`}
                fill="none"
                stroke={active ? "#3d5a1a" : "rgba(45,59,30,0.5)"}
                strokeWidth={active ? 1.2 : 0.8}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              />
              {/* Small dot at the label end */}
              <circle cx={endX} cy={labelY} r={2} fill="#2d3b1e" />

              {/* Pulse */}
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
              {/* Marker ring + dot */}
              <circle cx={mk.x} cy={mk.y} r={8} fill="none" stroke="#bccf02" strokeWidth={1.2} opacity={active ? 1 : 0.7} />
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

              {/* External label */}
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
