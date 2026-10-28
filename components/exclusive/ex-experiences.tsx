"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { exImages } from "@/lib/exclusive";

const EASE = [0.19, 1, 0.22, 1] as const;

/** O que se vive: mesa, vinho, azeite, cultura e natureza. Mosaico editorial
 *  em que as fotografias têm o peso maior e o texto acompanha por baixo. */
const ITENS = ["mesa", "vinho", "azeite", "cultura", "natureza"] as const;

export function ExExperiences() {
  const t = useTranslations("exclusive.experiences");

  return (
    <section id="experiencias" className="ex-section" style={{ backgroundColor: "var(--ex-ink-2)" }}>
      <div className="ex-wrap">
        <div className="ex-head">
          <div>
            <p className="ex-over ex-over-accent">{t("overline")}</p>
            <h2 className="ex-serif ex-h2" style={{ marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "15ch" }}>
              {t.rich("title", { em: (c) => <em className="ex-serif-i ex-accent">{c}</em> })}
            </h2>
          </div>
          <p className="ex-body" style={{ maxWidth: "40ch" }}>
            {t("lead")}
          </p>
        </div>

        <div className="ex-mosaic">
          {ITENS.map((k, i) => (
            <m.article
              key={k}
              className={`ex-mosaic-${k}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.1, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <div className="ex-figure">
                <Image src={exImages[k]} alt={t(`${k}.title`)} fill sizes="(max-width: 760px) 100vw, 50vw" quality={88} />
              </div>
              <div className="ex-mosaic-text">
                <span className="ex-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="ex-serif ex-h4">{t(`${k}.title`)}</h3>
                  <p className="ex-body ex-small">{t(`${k}.text`)}</p>
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
