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
        <h2 className="ex-serif ex-h2" style={{ marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "20ch" }}>
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
              <span className="ex-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <hr className="ex-rule" style={{ marginBlock: "1.25rem" }} />
              <h3 className="ex-serif ex-h4">
                {t(`${k}.title`)}
              </h3>
              <p className="ex-body ex-small" style={{ marginTop: "0.875rem" }}>
                {t(`${k}.text`)}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
