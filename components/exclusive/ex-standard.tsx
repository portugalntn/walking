"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { exImages } from "@/lib/exclusive";

const EASE = [0.19, 1, 0.22, 1] as const;
const ITENS = ["vehicles", "picnic", "quintas", "stays", "guides", "private"] as const;

/** O padrão EXCLUSIVE: o que se acrescenta a cada percurso do site público.
 *  Faixa forte em verde floresta (escura nos dois temas), como contraponto
 *  ao creme do resto da página. */
export function ExStandard() {
  const t = useTranslations("exclusive.standard");

  return (
    <section id="padrao" className="ex-dark ex-standard">
      <div className="ex-wrap ex-standard-grid">
        <div>
          <p className="ex-over ex-over-accent">{t("overline")}</p>
          <h2 className="ex-serif ex-h2" style={{ marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "13ch" }}>
            {t.rich("title", { em: (c) => <em className="ex-serif-i ex-accent">{c}</em> })}
          </h2>
          <p className="ex-body" style={{ maxWidth: "40ch", marginTop: "clamp(1.5rem, 2.5vw, 2rem)" }}>
            {t("lead")}
          </p>
          <m.figure
            className="ex-figure ex-standard-photo"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <Image src={exImages.padrao} alt={t("photoAlt")} fill sizes="(max-width: 960px) 100vw, 40vw" quality={88} />
          </m.figure>
        </div>

        <ul className="ex-standard-list">
          {ITENS.map((k, i) => (
            <m.li
              key={k}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 2) * 0.1 }}
            >
              <span className="ex-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="ex-serif ex-h4">{t(`${k}.title`)}</h3>
              <p className="ex-body ex-small">{t(`${k}.text`)}</p>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
