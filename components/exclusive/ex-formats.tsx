"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.19, 1, 0.22, 1] as const;

/** Os formatos: Multi-day e One day, lado a lado, e a nota do feito à medida.
 *  Cada formato leva à sua coleção mais abaixo. */
export function ExFormats() {
  const t = useTranslations("exclusive.formats");
  const formatos = [
    { k: "multi", href: "#journeys" },
    { k: "one", href: "#daytours" },
  ];

  return (
    <section id="formatos" className="ex-section">
      <div className="ex-wrap">
        <p className="ex-over ex-over-accent">{t("overline")}</p>
        <h2 className="ex-serif ex-h2" style={{ marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "16ch" }}>
          {t.rich("title", { em: (c) => <em className="ex-serif-i ex-accent">{c}</em> })}
        </h2>

        <div className="ex-formats">
          {formatos.map(({ k, href }, i) => (
            <m.a
              key={k}
              href={href}
              className="ex-format"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
            >
              <p className="ex-over">{t(`${k}.sub`)}</p>
              <h3 className="ex-serif ex-format-name">{t(`${k}.name`)}</h3>
              <p className="ex-body ex-small" style={{ maxWidth: "44ch" }}>
                {t(`${k}.text`)}
              </p>
              <span className="ex-over ex-over-accent ex-link">
                {t(`${k}.cta`)} <span aria-hidden>&rarr;</span>
              </span>
            </m.a>
          ))}
        </div>

        <p className="ex-formats-note">
          <span className="ex-over ex-over-accent">{t("tailorLabel")}</span>
          <span className="ex-serif-i">{t("tailor")}</span>
        </p>
      </div>
    </section>
  );
}
