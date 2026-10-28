"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { featured } from "@/lib/exclusive";
import { programs } from "@/lib/programs";

const EASE = [0.19, 1, 0.22, 1] as const;
/** Duração da linha a desenhar-se; os pontos de cada dia acendem ao ritmo dela. */
const TRACO = 2.4;

/** "16,7 km" → 16.7 (dias sem caminhada, como a chegada e a partida, dão 0). */
function km(v?: string) {
  const n = parseFloat((v ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

/** Curva suave (Catmull-Rom em Bézier) que passa por todos os pontos. */
function curva(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1].toFixed(1)}`;
  }
  return d;
}

/**
 * Itinerário em destaque: a fotografia é atmosfera (sem nomes por cima, porque
 * uma foto em perspetiva não é um mapa) e o caminho desenha-se por baixo, dia a
 * dia, com a altura de cada ponto igual à distância caminhada nesse dia.
 * Tudo vem dos dias do produto (FLOW › Walking › Produtos): muda-se lá, muda aqui.
 */
export function ExItinerary() {
  const t = useTranslations("exclusive.itinerary");
  const loc = useLocale() as "en" | "pt" | "es";
  const p = programs[featured.base];
  if (!p) return null;

  const dias = p.days.map((d) => ({ day: d.day, title: d.title[loc], distance: d.distance, km: km(d.distance) }));
  const n = dias.length;
  const max = Math.max(...dias.map((d) => d.km), 1);
  // Caixa do desenho: 1000 × 140. A base (y = 140) é a própria linha que separa os dias,
  // por baixo; o dia mais longo sobe até 18.
  const W = 1000;
  const H = 140;
  const pts = dias.map((d, i) => [((i + 0.5) / n) * W, H - (d.km / max) * (H - 18)] as [number, number]);
  const linha = curva(pts);

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

        {/* A fotografia: só a legenda verdadeira e a ficha. */}
        <m.div
          className="ex-itin ex-dark"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          <Image
            src={featured.image}
            alt={t("photoCaption")}
            fill
            sizes="100vw"
            quality={90}
            style={{ objectFit: "cover", filter: "saturate(0.62) contrast(1.08) brightness(0.72)" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,12,10,0.85), rgba(11,12,10,0.05) 55%)" }} />

          <p className="ex-over" style={{ position: "absolute", top: "clamp(1.25rem, 3vw, 2.25rem)", left: "clamp(1.25rem, 3vw, 2.75rem)", color: "var(--ex-bone)" }}>
            <span className="ex-theme-toggle-mark" aria-hidden>(</span> {t("photoCaption")} <span className="ex-theme-toggle-mark" aria-hidden>)</span>
          </p>

          <div style={{ position: "absolute", inset: "auto 0 0 0", padding: "clamp(1.25rem, 3vw, 2.75rem)", display: "flex", flexWrap: "wrap", gap: "clamp(1.75rem, 5vw, 5rem)" }}>
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

        {/* O caminho, dia a dia. A deteção de "entrou no ecrã" fica neste bloco, que não
            tem recorte: o browser trata um elemento recortado a zero como invisível e a
            animação nunca arrancaria. A linha e os pontos recebem o sinal por variantes. */}
        <m.div
          className="ex-route"
          style={{ ["--n" as string]: n }}
          initial="oculto"
          whileInView="visivel"
          viewport={{ once: true, margin: "-10%" }}
        >
          <p className="ex-over ex-over-accent">{t("routeOverline", { days: p.duration.days })}</p>

          <m.div
            className="ex-route-draw"
            aria-hidden
            variants={{
              oculto: { clipPath: "inset(0 100% 0 0)" },
              visivel: { clipPath: "inset(0 0% 0 0)", transition: { duration: TRACO, ease: [0.45, 0, 0.2, 1] } },
            }}
          >
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
              <path d={`${linha} L${pts[n - 1][0]},${H} L${pts[0][0]},${H} Z`} className="ex-route-area" />
              <path d={linha} className="ex-route-line" vectorEffect="non-scaling-stroke" />
            </svg>
            {pts.map(([x, y], i) => (
              <m.span
                key={i}
                className={`ex-route-dot${dias[i].day === featured.photoDay ? " is-photo" : ""}`}
                style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
                variants={{
                  oculto: { scale: 0, opacity: 0 },
                  visivel: { scale: 1, opacity: 1, transition: { duration: 0.45, ease: EASE, delay: ((i + 0.5) / n) * TRACO } },
                }}
              />
            ))}
          </m.div>

          <ol className="ex-route-days">
            {dias.map((d) => (
              <li key={d.day} className={d.day === featured.photoDay ? "is-photo" : undefined}>
                <p className="ex-over">{t("day", { n: d.day })}</p>
                <p className="ex-serif ex-route-title">{d.title}</p>
                {d.km > 0 && <p className="ex-body ex-route-km">{d.distance}</p>}
                {d.day === featured.photoDay && <p className="ex-over ex-over-accent ex-route-km">{t("photoDay")}</p>}
              </li>
            ))}
          </ol>
        </m.div>

        <p className="ex-over" style={{ marginTop: "1.5rem", opacity: 0.75, lineHeight: 1.8 }}>
          {t("note")}
        </p>
      </div>
    </section>
  );
}
