"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { dayTours } from "@/lib/exclusive";

const EASE = [0.19, 1, 0.22, 1] as const;

/** One day: os dias inteiros no território, em fila horizontal que desliza
 *  (no ecrã largo cabem três e meio, o que mostra que há mais). */
export function ExDayTours() {
  const t = useTranslations("exclusive.dayTours");
  const tt = useTranslations("exclusive.territories");
  const loc = useLocale() as "en" | "pt" | "es";

  return (
    <section id="daytours" className="ex-section" style={{ backgroundColor: "var(--ex-ink-2)" }}>
      <div className="ex-wrap">
        <div className="ex-head">
          <div>
            <p className="ex-over ex-over-accent">{t("overline")}</p>
            <h2 className="ex-serif ex-h2" style={{ marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "14ch" }}>
              {t("title")}
            </h2>
          </div>
          <p className="ex-body" style={{ maxWidth: "42ch" }}>
            {t("lead")}
          </p>
        </div>
      </div>

      <div className="ex-rail" tabIndex={0} aria-label={t("title")}>
        {dayTours.map((d, i) => (
          <m.article
            key={d.base}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 1, ease: EASE, delay: Math.min(i, 3) * 0.08 }}
          >
            <div className="ex-figure" style={{ aspectRatio: "4 / 5" }}>
              <Image src={d.image} alt={d.name[loc]} fill sizes="(max-width: 640px) 80vw, 30vw" quality={88} />
            </div>
            <p className="ex-over" style={{ marginTop: "1.25rem" }}>
              {tt(`${d.region}.name`)}
            </p>
            <h3 className="ex-serif" style={{ fontSize: "clamp(1.35rem, 1.8vw, 1.7rem)", marginTop: "0.55rem", lineHeight: 1.12 }}>
              {d.name[loc]}
            </h3>
          </m.article>
        ))}
      </div>
    </section>
  );
}
