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

/** As três formas de o caminhar, cada uma com a sua fotografia. A apresentação para tablet usa as mesmas. */
export const CAMINHO_ROTAS = [
  { k: "completo", img: exImages.caminhoCompleto },
  { k: "raia", img: exImages.caminhoRaia },
  { k: "prata", img: exImages.caminhoPrata },
] as const;
export const CAMINHO_ENTREGAS = ["e1", "e2", "e3", "e4", "e5", "e6"] as const;
/** "Desde Chaves · 11 dias · 213,6 km" em duas linhas iguais nos três cartões: de onde parte, e os dias e os km. */
export function CaminhoSub({ texto }: { texto: string }) {
  const i = texto.indexOf(" · ");
  if (i < 0) return <>{texto}</>;
  return (<>{texto.slice(0, i)}<br />{texto.slice(i + 3)}</>);
}

/** O Caminho Português de Santiago Interior, em conceito (Juliano, 02/11/2026).
 *  Três tempos: a ideia do caminho ao lado da natureza e de um troço histórico do
 *  lado português; três formas de o caminhar (Vila Pouca de Aguiar, Chaves,
 *  Allariz), que se ligam à Vía da Prata; e a sinalização do Caminho que a NTN
 *  estruturou do lado português, com o que entregamos. Sem itinerário, preço nem distâncias. */
export function ExCaminho() {
  const t = useTranslations("exclusive.caminho");

  return (
    <section id="caminho" className="ex-section">
      <div className="ex-wrap ex-caminho-top">
        <div>
          <m.p className="ex-over ex-over-accent" {...rise()}>
            {t("overline")}
          </m.p>
          <m.h2 className="ex-serif ex-h2" {...rise(0.08)} style={{ maxWidth: "21ch", textWrap: "balance", marginTop: "clamp(1.25rem, 2.5vw, 2rem)" }}>
            {t.rich("title", { em: (c) => <em className="ex-serif-i ex-accent">{c}</em> })}
          </m.h2>
          <m.p className="ex-body" {...rise(0.16)} style={{ maxWidth: "48ch", marginTop: "clamp(2rem, 3.5vw, 3rem)" }}>
            {t("p1")}
          </m.p>
          <m.p className="ex-body" {...rise(0.22)} style={{ maxWidth: "48ch", marginTop: "1.25rem" }}>
            {t("p2")}
          </m.p>
        </div>
        <div className="ex-origin-media">
          <m.figure className="ex-figure ex-caminho-topo" {...rise(0.1)}>
            <Image src={exImages.caminhoTopo} alt={t("altTopo")} fill sizes="(max-width: 960px) 70vw, 30vw" quality={90} />
          </m.figure>
          <m.figure className="ex-figure ex-origin-b" {...rise(0.25)}>
            <Image src={exImages.caminhoHistorico} alt={t("altHistorico")} fill sizes="(max-width: 960px) 50vw, 22vw" quality={90} />
          </m.figure>
          <p className="ex-over ex-origin-caption">
            <span className="ex-paren">(</span> {t("captionTopo")} <span className="ex-paren">)</span>
          </p>
        </div>
      </div>

      <div className="ex-wrap">
        <m.p className="ex-over" {...rise()} style={{ marginTop: "clamp(6rem, 11vw, 10rem)" }}>
          {t("rotasLabel")}
        </m.p>
        <div className="ex-caminho-rotas">
          {CAMINHO_ROTAS.map(({ k, img }, i) => (
            <m.div key={k} {...rise(i * 0.1)}>
              <figure className="ex-figure ex-caminho-rota-foto">
                <Image src={img} alt={t(`${k}.alt`)} fill sizes="(max-width: 960px) 90vw, 30vw" quality={88} />
              </figure>
              <span className="ex-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="ex-serif ex-h4">{t(`${k}.name`)}</h3>
              <p className="ex-over ex-over-accent" style={{ marginTop: "0.9rem", lineHeight: 1.7 }}><CaminhoSub texto={t(`${k}.sub`)} /></p>
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
            {CAMINHO_ENTREGAS.map((k) => (
              <li key={k} className="ex-body ex-small">{t(k)}</li>
            ))}
          </m.ul>
        </div>
      </div>
    </section>
  );
}
