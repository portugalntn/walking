"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { dayTours } from "@/lib/exclusive";

const EASE = [0.19, 1, 0.22, 1] as const;

export function ExDayTours() {
  const t = useTranslations("exclusive.dayTours");
  const loc = useLocale() as "en" | "pt" | "es";

  return (
    <section id="daytours" className="ex-section" style={{ backgroundColor: "var(--ex-ink-2)" }}>
      <div className="ex-wrap">
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "2rem", alignItems: "flex-end" }}>
          <div>
            <p className="ex-over ex-over-accent">{t("overline")}</p>
            <h2 className="ex-serif" style={{ fontSize: "var(--ex-h2)", marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "14ch" }}>
              {t("title")}
            </h2>
          </div>
          <p className="ex-body" style={{ maxWidth: "42ch" }}>
            {t("lead")}
          </p>
        </div>

        <div className="ex-grid-3" style={{ marginTop: "clamp(3rem, 5vw, 4.5rem)" }}>
          {dayTours.map((d, i) => (
            <m.article
              key={d.base}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.95, ease: EASE, delay: (i % 3) * 0.1 }}
            >
              <div className="ex-figure" style={{ aspectRatio: "4 / 5" }}>
                <Image
                  src={d.image}
                  alt={d.name[loc]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  quality={90}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ paddingTop: "1.25rem" }}>
                <p className="ex-over">{d.region}</p>
                <h3 className="ex-serif" style={{ fontSize: "clamp(1.35rem, 1.9vw, 1.75rem)", marginTop: "0.625rem" }}>
                  {d.name[loc]}
                </h3>
                <hr className="ex-rule" style={{ marginBlock: "1.125rem" }} />
                <div style={{ display: "flex", gap: "1.75rem" }}>
                  <span className="ex-over">{d.distance}</span>
                  <span className="ex-over">
                    {d.walkTime} {t("walkLabel")}
                  </span>
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
