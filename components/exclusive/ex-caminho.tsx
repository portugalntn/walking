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

/** O Caminho Português de Santiago Interior, em conceito (Juliano, 02/11/2026).
 *  Três tempos: a ideia do caminho ao lado da chegada a Santiago; três formas
 *  de o caminhar a partir do lado português (Vila Pouca de Aguiar, Chaves,
 *  Allariz), que se ligam à Vía da Prata; e a sinalização que a NTN estruturou
 *  do lado português, com o que entregamos. Sem itinerário, preço nem distâncias. */
export function ExCaminho() {
  const t = useTranslations("exclusive.caminho");
  const rotas = ["completo", "raia", "prata"] as const;
  const entregas = ["e1", "e2", "e3", "e4", "e5", "e6"] as const;

  return (
    <section id="caminho" className="ex-section">
      <div className="ex-wrap ex-caminho-top">
        <div>
          <m.p className="ex-over ex-over-accent" {...rise()}>
            {t("overline")}
          </m.p>
          <m.h2 className="ex-serif ex-h2" {...rise(0.08)} style={{ maxWidth: "14ch", marginTop: "clamp(1.25rem, 2.5vw, 2rem)" }}>
            {t.rich("title", { em: (c) => <em className="ex-serif-i ex-accent">{c}</em> })}
          </m.h2>
          <m.p className="ex-body" {...rise(0.16)} style={{ maxWidth: "48ch", marginTop: "clamp(2rem, 3.5vw, 3rem)" }}>
            {t("p1")}
          </m.p>
          <m.p className="ex-body" {...rise(0.22)} style={{ maxWidth: "48ch", marginTop: "1.25rem" }}>
            {t("p2")}
          </m.p>
        </div>
        <m.figure className="ex-figure ex-caminho-luz" {...rise(0.12)}>
          <Image src={exImages.caminhoLuz} alt={t("altLuz")} fill sizes="(max-width: 960px) 80vw, 34vw" quality={90} />
        </m.figure>
      </div>

      <div className="ex-wrap">
        <m.p className="ex-over" {...rise()} style={{ marginTop: "clamp(5rem, 10vw, 9rem)" }}>
          {t("rotasLabel")}
        </m.p>
        <div className="ex-caminho-rotas">
          {rotas.map((k, i) => (
            <m.div key={k} {...rise(i * 0.1)}>
              <span className="ex-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="ex-serif ex-h4">{t(`${k}.name`)}</h3>
              <p className="ex-over ex-over-accent" style={{ marginTop: "0.9rem" }}>{t(`${k}.sub`)}</p>
              <p className="ex-body ex-small">{t(`${k}.text`)}</p>
            </m.div>
          ))}
        </div>
        <p className="ex-formats-note">
          <span className="ex-over ex-over-accent">{t("noteLabel")}</span>
          <span className="ex-serif-i">{t("note")}</span>
        </p>
      </div>

      <div className="ex-wrap ex-caminho-sinal">
        <div className="ex-origin-media">
          <m.figure className="ex-figure ex-caminho-sinal-a" {...rise(0.1)}>
            <Image src={exImages.caminhoSinal} alt={t("altSinal")} fill sizes="(max-width: 960px) 80vw, 36vw" quality={90} />
          </m.figure>
          <m.figure className="ex-figure ex-origin-b" {...rise(0.25)}>
            <Image src={exImages.caminhoMarca} alt={t("altMarca")} fill sizes="(max-width: 960px) 50vw, 22vw" quality={90} />
          </m.figure>
          <p className="ex-over ex-origin-caption">
            <span className="ex-paren">(</span> {t("caption")} <span className="ex-paren">)</span>
          </p>
        </div>
        <div>
          <m.h3 className="ex-serif ex-h3" {...rise()} style={{ maxWidth: "16ch" }}>
            {t.rich("sinalTitle", { em: (c) => <em className="ex-serif-i ex-accent">{c}</em> })}
          </m.h3>
          <m.p className="ex-body" {...rise(0.08)} style={{ maxWidth: "46ch", marginTop: "1.5rem" }}>
            {t("sinalText")}
          </m.p>
          <m.p className="ex-over" {...rise(0.14)} style={{ marginTop: "clamp(2.5rem, 4vw, 3.5rem)" }}>
            {t("entregasLabel")}
          </m.p>
          <m.ul className="ex-caminho-entregas" {...rise(0.18)}>
            {entregas.map((k) => (
              <li key={k} className="ex-body ex-small">{t(k)}</li>
            ))}
          </m.ul>
        </div>
      </div>
    </section>
  );
}
