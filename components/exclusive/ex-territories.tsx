"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { exImages, regionIds, type ExRegionId } from "@/lib/exclusive";
import { COAST, OUTLINE, project } from "@/lib/exclusive-map";

const EASE = [0.19, 1, 0.22, 1] as const;

/** Uma linha suave (Catmull-Rom em Bézier) pelos pontos dados. */
function curva(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

// Coordenadas reais (latitude, longitude), projetadas no mapa.
const P = {
  porto: project(41.1496, -8.6109),
  regua: project(41.1633, -7.7878),
  pinhao: project(41.1906, -7.5457),
  vilaReal: project(41.3006, -7.7441),
  chaves: project(41.74, -7.47),
  braganca: project(41.8061, -6.7567),
  miranda: project(41.495, -6.274),
  geres: project(41.728, -8.159),
  viseu: project(40.6566, -7.9125),
  verin: project(41.94, -7.436),
};
// O Douro, da foz a Barca d'Alva. Daí para cima o rio é a própria fronteira (o contorno).
const DOURO = curva([
  [41.144, -8.674], [41.13, -8.5], [41.085, -8.29], [41.12, -8.05], [41.158, -7.89], [41.1633, -7.7878],
  [41.18, -7.64], [41.1906, -7.5457], [41.215, -7.43], [41.166, -7.32], [41.135, -7.11], [41.025, -6.935],
].map(([la, lo]) => project(la, lo)));
// Caminho Português Interior: Viseu, Castro Daire, Lamego, Régua, Vila Real, Vila Pouca, Chaves, Verín.
const CAMINHO = curva([
  [40.6566, -7.9125], [40.898, -7.934], [41.097, -7.81], [41.1633, -7.7878], [41.3006, -7.7441],
  [41.5, -7.645], [41.74, -7.47], [41.83, -7.43], [41.94, -7.436],
].map(([la, lo]) => project(la, lo)));

// Zonas de cada território (manchas suaves recortadas pela terra) e onde fica o nome.
const AREA: Record<ExRegionId, { cx: number; cy: number; rx: number; ry: number; label: [number, number] }> = {
  geres: { cx: 236, cy: 82, rx: 34, ry: 30, label: [232, 120] },
  tras: { cx: 425, cy: 102, rx: 72, ry: 50, label: [430, 108] },
  douro: { cx: 330, cy: 200, rx: 92, ry: 22, label: [356, 232] },
  santiago: { cx: 0, cy: 0, rx: 0, ry: 0, label: [321, 146] },
};

/** O mapa do Norte com os quatro territórios. Tocar (ou passar por cima de)
 *  um nome escolhe o território. Serve a coleção e a apresentação para tablet. */
export function ExMapa({ ativo, onPick }: { ativo: ExRegionId; onPick: (id: ExRegionId) => void }) {
  const t = useTranslations("exclusive.territories");

  const escolher = (id: ExRegionId) => ({
    onClick: () => onPick(id),
    onMouseEnter: () => onPick(id),
    onFocus: () => onPick(id),
  });

  const cidade = (p: [number, number], nome: string, lado: "start" | "end", dy = 2.4) => (
    <g className="ex-map-town">
      <circle cx={p[0]} cy={p[1]} r={1.9} />
      <text x={p[0] + (lado === "start" ? 4.5 : -4.5)} y={p[1] + dy} textAnchor={lado}>
        {nome}
      </text>
    </g>
  );

  return (
    <svg viewBox="104 -28 446 352" role="img" aria-label={t("mapLabel")}>
      <defs>
        <pattern id="ex-dots" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="0.85" />
        </pattern>
        <clipPath id="ex-land">
          <path d={OUTLINE} />
        </clipPath>
        <linearGradient id="ex-fade-y" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.72" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ex-fade-x" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <radialGradient id="ex-area">
          <stop offset="0" className="ex-map-stop" />
          <stop offset="0.55" className="ex-map-stop" stopOpacity="0.7" />
          <stop offset="1" className="ex-map-stop" stopOpacity="0" />
        </radialGradient>
        <mask id="ex-fade">
          <rect x="104" y="-28" width="446" height="352" fill="url(#ex-fade-y)" />
        </mask>
        <mask id="ex-ocean">
          <rect x="104" y="-28" width="80" height="352" fill="url(#ex-fade-x)" />
        </mask>
      </defs>

      <g mask="url(#ex-fade)">
        {/* Mar em pontos, encostado à costa */}
        <path
          className="ex-map-ocean"
          d={`${COAST} L104,365 L104,66 Z`}
          fill="url(#ex-dots)"
          mask="url(#ex-ocean)"
        />
        <path className="ex-map-land" d={OUTLINE} />

        {/* Manchas dos territórios */}
        <g clipPath="url(#ex-land)">
          {regionIds
            .filter((id) => AREA[id].rx)
            .map((id) => (
              <ellipse
                key={id}
                className={`ex-map-area${ativo === id ? " is-on" : ""}`}
                cx={AREA[id].cx}
                cy={AREA[id].cy}
                rx={AREA[id].rx}
                ry={AREA[id].ry}
                fill="url(#ex-area)"
              />
            ))}
        </g>

        <path className="ex-map-river" d={DOURO} />
        <path className={`ex-map-caminho${ativo === "santiago" ? " is-on" : ""}`} d={CAMINHO} />
      </g>

      {/* Para lá da fronteira: Santiago de Compostela, a norte */}
      <path className={`ex-map-caminho ex-map-out${ativo === "santiago" ? " is-on" : ""}`} d={`M${P.verin[0]},${P.verin[1]} L${P.verin[0] - 4},${-2}`} />
      <path className="ex-map-arrow" d={`M${P.verin[0] - 7.5},${3} L${P.verin[0] - 4},${-3} L${P.verin[0] - 0.5},${3.6}`} />
      <g className="ex-map-pill">
        <rect x={P.verin[0] - 50} y={-22} width={92} height={13} rx={6.5} />
        <text x={P.verin[0] - 4} y={-13.2} textAnchor="middle">
          {t("santiagoPill")}
        </text>
      </g>

      <text className="ex-map-country" x={470} y={28} textAnchor="middle">
        {t("spain")}
      </text>
      <text className="ex-map-country" transform="translate(126 230) rotate(-90)" textAnchor="middle">
        {t("ocean")}
      </text>

      {cidade(P.porto, "Porto", "end")}
      {cidade(P.regua, "Régua", "end", 6)}
      {cidade(P.pinhao, "Pinhão", "start", -2.5)}
      {cidade(P.vilaReal, "Vila Real", "end")}
      {cidade(P.chaves, "Chaves", "start")}
      {cidade(P.braganca, "Bragança", "start")}
      {cidade(P.miranda, "Miranda", "end", -3)}
      {cidade(P.viseu, "Viseu", "start")}
      {cidade(P.geres, "Gerês", "start")}

      {regionIds.map((id) => (
        <text
          key={id}
          className={`ex-map-region${ativo === id ? " is-on" : ""}`}
          x={AREA[id].label[0]}
          y={AREA[id].label[1]}
          textAnchor={id === "santiago" ? "start" : "middle"}
          tabIndex={0}
          role="button"
          aria-pressed={ativo === id}
          {...escolher(id)}
        >
          {t(`${id}.short`)}
        </text>
      ))}
    </svg>
  );
}

export function ExTerritories() {
  const t = useTranslations("exclusive.territories");
  const [ativo, setAtivo] = useState<ExRegionId>("douro");

  const escolher = (id: ExRegionId) => ({
    onClick: () => setAtivo(id),
    onMouseEnter: () => setAtivo(id),
    onFocus: () => setAtivo(id),
  });

  return (
    <section id="territorios" className="ex-section" style={{ paddingTop: 0 }}>
      <div className="ex-wrap">
        <div className="ex-head">
          <div>
            <p className="ex-over ex-over-accent">{t("overline")}</p>
            <h2 className="ex-serif ex-h2" style={{ marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "14ch" }}>
              {t.rich("title", { em: (c) => <em className="ex-serif-i ex-accent">{c}</em> })}
            </h2>
          </div>
          <p className="ex-body" style={{ maxWidth: "42ch" }}>
            {t("lead")}
          </p>
        </div>

        <div className="ex-terr">
          <figure className="ex-map" aria-label={t("mapLabel")}>
            <ExMapa ativo={ativo} onPick={setAtivo} />
            <figcaption className="ex-over">
              <span className="ex-paren">(</span> {t("mapCaption")} <span className="ex-paren">)</span>
            </figcaption>
          </figure>

          <div className="ex-terr-panel">
            <AnimatePresence mode="wait">
              <m.div
                key={ativo}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <div className="ex-figure" style={{ aspectRatio: "5 / 4" }}>
                  <Image src={exImages[ativo]} alt={t(`${ativo}.name`)} fill sizes="(max-width: 960px) 100vw, 40vw" quality={88} />
                </div>
                <p className="ex-over ex-over-accent" style={{ marginTop: "1.75rem" }}>
                  {t(`${ativo}.tagline`)}
                </p>
                <h3 className="ex-serif ex-h3" style={{ marginTop: "0.75rem" }}>
                  {t(`${ativo}.name`)}
                </h3>
                <p className="ex-body ex-small" style={{ marginTop: "1rem", maxWidth: "48ch" }}>
                  {t(`${ativo}.text`)}
                </p>
                <ul className="ex-tags">
                  {t(`${ativo}.tags`)
                    .split("·")
                    .map((s) => (
                      <li key={s}>{s.trim()}</li>
                    ))}
                </ul>
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="ex-terr-tabs" role="tablist" aria-label={t("overline")}>
          {regionIds.map((id, i) => (
            <button key={id} type="button" role="tab" aria-selected={ativo === id} className={ativo === id ? "is-on" : undefined} {...escolher(id)}>
              <span className="ex-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="ex-serif">{t(`${id}.name`)}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
