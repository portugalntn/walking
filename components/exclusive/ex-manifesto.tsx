"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { exImages } from "@/lib/exclusive";

const EASE = [0.19, 1, 0.22, 1] as const;
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 1.1, ease: EASE, delay },
});

/** Quem somos: locais, que desenharam os trilhos antes de os operar.
 *  Texto à esquerda, duas fotografias desencontradas à direita, e por baixo
 *  os três verbos da sustentabilidade (sentir, viver, colaborar). */
export function ExManifesto() {
  const t = useTranslations("exclusive.manifesto");

  return (
    <section id="quem-somos" className="ex-section">
      <div className="ex-wrap ex-origin">
        <div className="ex-origin-text">
          <m.p className="ex-over ex-over-accent" {...rise()}>
            {t("overline")}
          </m.p>
          <m.h2 className="ex-serif ex-h2" {...rise(0.08)} style={{ maxWidth: "15ch", marginTop: "clamp(1.25rem, 2.5vw, 2rem)" }}>
            {t.rich("statement", { accent: (c) => <em className="ex-serif-i ex-accent">{c}</em> })}
          </m.h2>
          <m.p className="ex-body" {...rise(0.16)} style={{ maxWidth: "46ch", marginTop: "clamp(2rem, 3.5vw, 3rem)" }}>
            {t("p1")}
          </m.p>
          <m.p className="ex-body" {...rise(0.22)} style={{ maxWidth: "46ch", marginTop: "1.25rem" }}>
            {t("p2")}
          </m.p>

          <m.dl className="ex-stats" {...rise(0.28)}>
            {["s1", "s2", "s3"].map((k) => (
              <div key={k}>
                <dt className="ex-serif">{t(`${k}.value`)}</dt>
                <dd className="ex-over">{t(`${k}.label`)}</dd>
              </div>
            ))}
          </m.dl>
        </div>

        <div className="ex-origin-media">
          <m.figure className="ex-figure ex-origin-a" {...rise(0.1)}>
            <Image src={exImages.origemA} alt={t("altA")} fill sizes="(max-width: 960px) 70vw, 30vw" quality={88} />
          </m.figure>
          <m.figure className="ex-figure ex-origin-b" {...rise(0.25)}>
            <Image src={exImages.origemB} alt={t("altB")} fill sizes="(max-width: 960px) 60vw, 22vw" quality={88} />
          </m.figure>
          <p className="ex-over ex-origin-caption">
            <span className="ex-paren">(</span> {t("caption")} <span className="ex-paren">)</span>
          </p>
        </div>
      </div>

      <div className="ex-wrap">
        <div className="ex-verbs">
          {["sentir", "viver", "colaborar"].map((k, i) => (
            <m.div key={k} {...rise(i * 0.1)}>
              <span className="ex-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="ex-serif ex-h4">{t(`${k}.title`)}</h3>
              <p className="ex-body ex-small">{t(`${k}.text`)}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
