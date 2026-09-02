"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.19, 1, 0.22, 1] as const;

export function ExOperators() {
  const t = useTranslations("exclusive.operators");
  const items = ["one", "two", "three", "four"] as const;

  return (
    <section id="howwework" className="ex-section">
      <div className="ex-wrap">
        <p className="ex-over ex-over-accent">{t("overline")}</p>
        <h2 className="ex-serif" style={{ fontSize: "var(--ex-h2)", marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "20ch" }}>
          {t("title")}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "clamp(2rem, 3.5vw, 3.5rem)",
            marginTop: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          {items.map((k, i) => (
            <m.div
              key={k}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.95, ease: EASE, delay: i * 0.09 }}
            >
              <span className="ex-serif" style={{ fontSize: "1.25rem", color: "var(--ex-accent)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <hr className="ex-rule" style={{ marginBlock: "1.25rem" }} />
              <h3 className="ex-serif" style={{ fontSize: "clamp(1.25rem, 1.7vw, 1.6rem)", lineHeight: 1.15 }}>
                {t(`${k}.title`)}
              </h3>
              <p className="ex-body" style={{ fontSize: "0.9375rem", marginTop: "0.875rem" }}>
                {t(`${k}.text`)}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
