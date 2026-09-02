"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.19, 1, 0.22, 1] as const;

export function ExManifesto() {
  const t = useTranslations("exclusive.manifesto");

  return (
    <section className="ex-section">
      <div className="ex-wrap">
        <m.p
          className="ex-over ex-over-accent"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {t("overline")}
        </m.p>

        <m.h2
          className="ex-serif"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          style={{
            fontSize: "var(--ex-h2)",
            lineHeight: 1.08,
            maxWidth: "18ch",
            marginTop: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          {t.rich("statement", {
            accent: (chunks) => <span style={{ color: "var(--ex-accent)", fontStyle: "italic" }}>{chunks}</span>,
          })}
        </m.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(2rem, 4vw, 4.5rem)",
            marginTop: "clamp(3rem, 6vw, 5.5rem)",
            maxWidth: "1100px",
            marginLeft: "auto",
          }}
        >
          {["p1", "p2"].map((k, i) => (
            <m.div
              key={k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 1, ease: EASE, delay: 0.12 * i }}
            >
              <hr className="ex-rule" style={{ marginBottom: "1.5rem" }} />
              <p className="ex-body">{t(k)}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
