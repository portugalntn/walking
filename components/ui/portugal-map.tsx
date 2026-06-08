"use client";

import { useEffect, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { Feature, Geometry } from "geojson";
import { m } from "framer-motion";

/**
 * PortugalMap — real Portugal geometry (world-atlas 50m) projected with
 * d3-geo. Editorial style: clean forest outline, soft cream fill,
 * dotted ocean, lime region markers with labels.
 */

const WIDTH = 420;
const HEIGHT = 640;

type Region = {
  id: string;
  coords: [number, number]; // [lng, lat]
  anchor: "start" | "middle" | "end";
  dx: number;
  dy: number;
  lines: string[];
};

const regions: Region[] = [
  { id: "geres",   coords: [-8.20, 41.86], anchor: "end",    dx: -13, dy: 4,   lines: ["Peneda-Gerês"] },
  { id: "santiago",coords: [-7.45, 41.74], anchor: "middle", dx: 0,   dy: -22, lines: ["Caminho de Santiago", "Interior"] },
  { id: "tras",    coords: [-6.78, 41.74], anchor: "start",  dx: 13,  dy: 0,   lines: ["Trás-os-Montes"] },
  { id: "douro",   coords: [-7.65, 41.10], anchor: "start",  dx: 13,  dy: 0,   lines: ["Douro Valley"] },
  { id: "lisboa",  coords: [-9.20, 38.72], anchor: "end",    dx: -13, dy: 0,   lines: ["Lisboa & Sintra"] },
  { id: "algarve", coords: [-8.00, 37.10], anchor: "start",  dx: 13,  dy: 0,   lines: ["Algarve"] },
];

export function PortugalMap() {
  const [pathD, setPathD] = useState<string | null>(null);
  const [markers, setMarkers] = useState<
    (Region & { x: number; y: number })[]
  >([]);
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
          .scale(3600)
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
    <div className="relative w-full" style={{ maxWidth: "560px", margin: "0 auto" }}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        fill="none"
        className="w-full h-auto"
        style={{ overflow: "visible" }}
      >
        <defs>
          <pattern id="ocean-dots" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="#a0b4c8" />
          </pattern>
          <clipPath id="map-clip">
            <rect x="-40" y="0" width={WIDTH + 40} height={HEIGHT} />
          </clipPath>
        </defs>

        {/* Ocean dots */}
        <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#ocean-dots)" opacity="0.22" />

        {/* Country outline */}
        <g clipPath="url(#map-clip)">
          {pathD && (
            <m.path
              d={pathD}
              fill="#e8e4dc"
              stroke="#2d3b1e"
              strokeWidth={1.2}
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            />
          )}
        </g>

        {/* Region markers */}
        {markers.map((mk, i) => {
          const active = hovered === mk.id;
          return (
            <g
              key={mk.id}
              onMouseEnter={() => setHovered(mk.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
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
              <circle
                cx={mk.x}
                cy={mk.y}
                r={8}
                fill="none"
                stroke="#bccf02"
                strokeWidth={1.2}
                opacity={active ? 1 : 0.7}
              />
              <m.circle
                cx={mk.x}
                cy={mk.y}
                r={active ? 5 : 4}
                fill="#bccf02"
                stroke="#2d3b1e"
                strokeWidth={0.8}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 300, damping: 18 }}
              />
              {/* Label (supports multiple lines) */}
              <text
                x={mk.x + mk.dx}
                y={mk.y + mk.dy}
                textAnchor={mk.anchor}
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "10px",
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
                    x={mk.x + mk.dx}
                    dy={li === 0 ? 0 : 11}
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
