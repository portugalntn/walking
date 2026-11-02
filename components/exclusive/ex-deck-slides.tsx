"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { dayTours, exImages, journeys, regionIds, type ExDayTour, type ExJourney, type ExRegionId } from "@/lib/exclusive";
import { ExLogo } from "./ex-chrome";
import { ExMapa } from "./ex-territories";
import { CAMINHO_ENTREGAS, CAMINHO_ROTAS } from "./ex-caminho";

/** Os ecrãs da apresentação para tablet. Os mesmos textos (messages ›
 *  exclusive.*, editáveis no FLOW) e as mesmas fotos (exImages, journeys,
 *  dayTours) da coleção, recompostos para caberem cada um num ecrã inteiro,
 *  sem scroll. É para reunião: tópicos e destaques, não descritivos. Sem preços,
 *  itinerários nem distâncias, como na coleção. */

export type SlideId =
  | "capa"
  | "quem"
  | "compromisso"
  | "territorios"
  | "caminho"
  | "caminho-rotas"
  | "experiencias"
  | "formatos"
  | "modos"
  | "viagens"
  | `oneday-${ExRegionId}`
  | "padrao"
  | "trade"
  | "assinatura";

type Loc = "en" | "pt" | "es";
type Go = (id: SlideId) => void;

/** Ordem de entrada de cada bloco quando o ecrã aparece. */
const d = (i: number) => ({ "--i": i }) as React.CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");
const em = (c: React.ReactNode) => <em className="ex-serif-i ex-accent">{c}</em>;

/** Imagens: todas carregadas logo à entrada, para a apresentação correr sem
 *  esperas (e sem rede, numa feira) depois de aberta. */
function Foto({ src, alt, sizes, priority }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  return <Image src={src} alt={alt} fill sizes={sizes} quality={90} loading={priority ? undefined : "eager"} priority={priority} />;
}

function Cabeca({ over, title, lead, wide }: { over: string; title: React.ReactNode; lead?: string; wide?: boolean }) {
  return (
    <div className="ex-dk-head">
      <div>
        <p className="ex-over ex-over-accent ex-dk-in" style={d(0)}>
          {over}
        </p>
        <h2 className="ex-serif ex-dk-h2 ex-dk-in" style={{ ...d(1), maxWidth: wide ? "20ch" : "15ch" }}>
          {title}
        </h2>
      </div>
      {lead && (
        <p className="ex-body ex-dk-text ex-dk-in" style={{ ...d(2), maxWidth: "42ch" }}>
          {lead}
        </p>
      )}
    </div>
  );
}

/* 1 · Capa: a fotografia inteira e o título ao centro (o único texto centrado). */
function Capa() {
  const t = useTranslations("exclusive.hero");
  const td = useTranslations("exclusive.deck");
  return (
    <>
      <div className="ex-dk-bleed" aria-hidden>
        <Foto src={exImages.hero} alt="" sizes="100vw" priority />
        <div className="ex-hero-veil" />
      </div>
      <div className="ex-dk-cover">
        <p className="ex-over ex-over-accent ex-dk-in" style={d(0)}>
          {t("overline")}
        </p>
        <h1 className="ex-serif ex-dk-h1 ex-dk-in" style={d(1)}>
          {t.rich("title", { em: (c) => <em className="ex-serif-i">{c}</em> })}
        </h1>
        <p className="ex-body ex-dk-text ex-dk-cover-lead ex-dk-in" style={d(2)}>
          {t("lead")}
        </p>
        <p className="ex-over ex-dk-hint ex-dk-in" style={d(4)}>
          {td("swipe")} <span aria-hidden>&rarr;</span>
        </p>
      </div>
      <ul className="ex-hero-regions ex-dk-in" style={d(3)}>
        {["r1", "r2", "r3", "r4"].map((k) => (
          <li key={k} className="ex-over">
            {t(k)}
          </li>
        ))}
      </ul>
    </>
  );
}

/* 2 · Quem somos: a frase, o primeiro parágrafo e as duas fotografias desencontradas. */
function Quem() {
  const t = useTranslations("exclusive.manifesto");
  return (
    <div className="ex-dk-body ex-dk-split ex-dk-origin">
      <div className="ex-dk-col">
        <p className="ex-over ex-over-accent ex-dk-in" style={d(0)}>
          {t("overline")}
        </p>
        <h2 className="ex-serif ex-dk-h2 ex-dk-in" style={{ ...d(1), maxWidth: "15ch" }}>
          {t.rich("statement", { accent: em })}
        </h2>
        <p className="ex-body ex-dk-text ex-dk-in" style={{ ...d(2), maxWidth: "46ch" }}>
          {t("p1")}
        </p>
      </div>
      <div className="ex-dk-origin-media">
        <figure className="ex-figure ex-dk-origin-a ex-dk-in" style={d(1)}>
          <Foto src={exImages.origemA} alt={t("altA")} sizes="(orientation: portrait) 70vw, 34vw" />
        </figure>
        <figure className="ex-figure ex-dk-origin-b ex-dk-in" style={d(3)}>
          <Foto src={exImages.origemB} alt={t("altB")} sizes="(orientation: portrait) 50vw, 24vw" />
        </figure>
        <p className="ex-over ex-dk-caption ex-dk-in" style={d(4)}>
          <span className="ex-paren">(</span> {t("caption")} <span className="ex-paren">)</span>
        </p>
      </div>
    </div>
  );
}

/* 3 · O compromisso: os números grandes, o segundo parágrafo e sentir / viver / colaborar. */
function Compromisso() {
  const t = useTranslations("exclusive.manifesto");
  const td = useTranslations("exclusive.deck");
  return (
    <div className="ex-dk-body ex-dk-split">
      <div className="ex-dk-col">
        <p className="ex-over ex-over-accent ex-dk-in" style={d(0)}>
          {td("commitment")}
        </p>
        <dl className="ex-dk-stats">
          {["s1", "s2", "s3"].map((k, i) => (
            <div key={k} className="ex-dk-in" style={d(i + 1)}>
              <dt className="ex-serif">{t(`${k}.value`)}</dt>
              <dd className="ex-over">{t(`${k}.label`)}</dd>
            </div>
          ))}
        </dl>
        <p className="ex-body ex-dk-text ex-dk-in" style={{ ...d(4), maxWidth: "46ch" }}>
          {t("p2")}
        </p>
      </div>
      <div className="ex-dk-verbs">
        {["sentir", "viver", "colaborar"].map((k, i) => (
          <div key={k} className="ex-dk-in" style={d(i + 2)}>
            <span className="ex-num">{pad(i + 1)}</span>
            <h3 className="ex-serif ex-dk-h4">{t(`${k}.title`)}</h3>
            <p className="ex-body ex-dk-small">{t(`${k}.text`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 4 · Territórios: o mapa à esquerda; à direita os quatro botões e o território escolhido.
 *  Os quatro painéis ficam montados (um por cima do outro) para as fotos já estarem carregadas. */
function Territorios() {
  const t = useTranslations("exclusive.territories");
  const [ativo, setAtivo] = useState<ExRegionId>("douro");
  return (
    <div className="ex-dk-body ex-dk-split ex-dk-terr">
      <div className="ex-dk-col ex-dk-terr-map">
        <p className="ex-over ex-over-accent ex-dk-in" style={d(0)}>
          {t("overline")}
        </p>
        <h2 className="ex-serif ex-dk-h2 ex-dk-in" style={{ ...d(1), maxWidth: "16ch" }}>
          {t.rich("title", { em })}
        </h2>
        <figure className="ex-map ex-dk-map ex-dk-in" style={d(2)}>
          <ExMapa ativo={ativo} onPick={setAtivo} />
        </figure>
      </div>

      <div className="ex-dk-col ex-dk-terr-side">
        <div className="ex-dk-terr-tabs ex-dk-in" style={d(2)} role="tablist" aria-label={t("overline")}>
          {regionIds.map((id, i) => (
            <button key={id} type="button" role="tab" aria-selected={ativo === id} className={ativo === id ? "is-on" : undefined} onClick={() => setAtivo(id)}>
              <span className="ex-num">{pad(i + 1)}</span>
              <span className="ex-serif">{t(`${id}.name`)}</span>
            </button>
          ))}
        </div>
        <div className="ex-dk-terr-panels ex-dk-in" style={d(3)}>
          {regionIds.map((id) => (
            <div key={id} className={`ex-dk-terr-panel${ativo === id ? " is-on" : ""}`} aria-hidden={ativo !== id}>
              <div className="ex-figure">
                <Foto src={exImages[id]} alt={t(`${id}.name`)} sizes="(orientation: portrait) 90vw, 42vw" />
              </div>
              <p className="ex-over ex-over-accent">{t(`${id}.tagline`)}</p>
              <p className="ex-body ex-dk-small" style={{ maxWidth: "52ch" }}>
                {t(`${id}.text`)}
              </p>
              <ul className="ex-tags">
                {t(`${id}.tags`)
                  .split("·")
                  .map((s) => (
                    <li key={s}>{s.trim()}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 5 · O Caminho Português de Santiago Interior: o conceito em tópicos, com a natureza e a
 *  sinalização do Caminho do lado português (a mesma do bloco da coleção). */
function Caminho() {
  const t = useTranslations("exclusive.caminho");
  return (
    <div className="ex-dk-body ex-dk-split ex-dk-origin ex-dk-caminho">
      <div className="ex-dk-col">
        <p className="ex-over ex-over-accent ex-dk-in" style={d(0)}>
          {t("overline")}
        </p>
        <h2 className="ex-serif ex-dk-h3 ex-dk-in" style={{ ...d(1), maxWidth: "20ch", textWrap: "balance" }}>
          {t.rich("title", { em })}
        </h2>
        <div className="ex-dk-in" style={d(2)}>
          <Pontos itens={[t("deckP1"), t("deckP2"), t("deckP3")]} />
        </div>
      </div>
      <div className="ex-dk-origin-media">
        <figure className="ex-figure ex-dk-origin-a ex-dk-in" style={d(1)}>
          <Foto src={exImages.caminhoTopo} alt={t("altTopo")} sizes="(orientation: portrait) 70vw, 34vw" />
        </figure>
        <figure className="ex-figure ex-dk-origin-b ex-dk-in" style={d(3)}>
          <Foto src={exImages.caminhoSinal} alt={t("altSinal")} sizes="(orientation: portrait) 50vw, 24vw" />
        </figure>
        <p className="ex-over ex-dk-caption ex-dk-in" style={d(4)}>
          <span className="ex-paren">(</span> {t("caption")} <span className="ex-paren">)</span>
        </p>
      </div>
    </div>
  );
}

/* 6 · O Caminho: as três formas de o caminhar, cada uma com a sua fotografia, e o que entregamos. */
function CaminhoRotas() {
  const t = useTranslations("exclusive.caminho");
  return (
    <div className="ex-dk-body ex-dk-stack">
      <Cabeca over={t("overline")} title={t("rotasLabel")} wide />
      <div className="ex-dk-cards ex-dk-cards-trips" style={{ "--cols": CAMINHO_ROTAS.length } as React.CSSProperties}>
        {CAMINHO_ROTAS.map(({ k, img }, i) => (
          <article key={k} className="ex-dk-card ex-dk-in" style={d(i + 2)}>
            <div className="ex-figure">
              <Foto src={img} alt={t(`${k}.alt`)} sizes="(orientation: portrait) 40vw, 32vw" />
            </div>
            <div className="ex-dk-card-text">
              <p className="ex-over">{t(`${k}.sub`)}</p>
              <h3 className="ex-serif ex-dk-h4">{t(`${k}.name`)}</h3>
              <p className="ex-body ex-dk-small ex-dk-caminho-texto">{t(`${k}.text`)}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="ex-dk-caminho-entregas ex-dk-in" style={d(5)}>
        <span className="ex-over ex-over-accent">{t("entregasLabel")}</span>
        <Pontos itens={CAMINHO_ENTREGAS.map((k) => t(k))} />
      </div>
    </div>
  );
}

/* 7 · Experiências: cinco fotografias em acordeão. Toca-se numa e ela abre com o texto. */
const EXPERIENCIAS = ["mesa", "vinho", "azeite", "cultura", "natureza"] as const;

function Experiencias() {
  const t = useTranslations("exclusive.experiences");
  const [aberta, setAberta] = useState(0);
  return (
    <div className="ex-dk-body ex-dk-stack">
      <Cabeca over={t("overline")} title={t.rich("title", { em })} lead={t("lead")} />
      <div className="ex-dk-acc">
        {EXPERIENCIAS.map((k, i) => (
          <button
            key={k}
            type="button"
            className={`ex-dk-acc-item ex-dark ex-dk-in${aberta === i ? " is-on" : ""}`}
            style={d(i + 2)}
            aria-expanded={aberta === i}
            onClick={() => setAberta(i)}
          >
            <span className="ex-figure">
              <Foto src={exImages[k]} alt={t(`${k}.title`)} sizes="(orientation: portrait) 92vw, 52vw" />
            </span>
            <span className="ex-dk-acc-veil" aria-hidden />
            <span className="ex-dk-acc-text">
              <span className="ex-num">{pad(i + 1)}</span>
              <span className="ex-serif ex-dk-acc-title">{t(`${k}.title`)}</span>
              <span className="ex-body ex-dk-small ex-dk-acc-desc">{t(`${k}.text`)}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Tópicos curtos (é uma apresentação, não um descritivo): um traço de acento por linha. */
function Pontos({ itens }: { itens: string[] }) {
  return (
    <ul className="ex-dk-points">
      {itens.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

/* 8 · Formatos: Multi-day e One day em tópicos (cada um leva aos seus roteiros) e o Tailor made. */
function Formatos({ go }: { go: Go }) {
  const t = useTranslations("exclusive.formats");
  const formatos: { k: string; to: SlideId }[] = [
    { k: "multi", to: "viagens" },
    { k: "one", to: ONE_DAY[0]?.id ?? "viagens" },
  ];
  return (
    <div className="ex-dk-body ex-dk-stack ex-dk-spread">
      <div>
        <p className="ex-over ex-over-accent ex-dk-in" style={d(0)}>
          {t("overline")}
        </p>
        <h2 className="ex-serif ex-dk-h2 ex-dk-in" style={{ ...d(1), maxWidth: "18ch" }}>
          {t.rich("title", { em })}
        </h2>
      </div>
      <div className="ex-dk-formats">
        {formatos.map(({ k, to }, i) => (
          <div key={k} className="ex-dk-format ex-dk-in" style={d(i + 2)}>
            <span className="ex-over">{t(`${k}.sub`)}</span>
            <span className="ex-serif ex-dk-format-name">{t(`${k}.name`)}</span>
            <Pontos itens={[t(`${k}.p1`), t(`${k}.p2`), t(`${k}.p3`)]} />
            <button type="button" className="ex-over ex-over-accent ex-link" onClick={() => go(to)}>
              {t(`${k}.cta`)} <span aria-hidden>&rarr;</span>
            </button>
          </div>
        ))}
      </div>
      <p className="ex-formats-note ex-dk-in" style={{ ...d(4), marginTop: 0 }}>
        <span className="ex-over ex-over-accent">{t("tailorLabel")}</span>
        <span className="ex-serif-i">{t("tailor")}</span>
      </p>
    </div>
  );
}

/* 9 · Como se caminha: guiado ou autoguiado, em tópicos. */
function Modos() {
  const t = useTranslations("exclusive.modes");
  return (
    <div className="ex-dk-body ex-dk-split">
      <div className="ex-dk-col">
        <p className="ex-over ex-over-accent ex-dk-in" style={d(0)}>
          {t("overline")}
        </p>
        <h2 className="ex-serif ex-dk-display ex-dk-in" style={{ ...d(1), maxWidth: "12ch" }}>
          {t.rich("title", { em })}
        </h2>
      </div>
      <div className="ex-dk-modes-list">
        {(["guided", "self"] as const).map((k, i) => (
          <div key={k} className="ex-dk-format ex-dk-in" style={d(i + 2)}>
            <span className="ex-over">{t(`${k}.sub`)}</span>
            <span className="ex-serif ex-dk-format-name">{t(`${k}.name`)}</span>
            <Pontos itens={[t(`${k}.p1`), t(`${k}.p2`), t(`${k}.p3`)]} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Um roteiro: a foto, o nome, como se caminha (Guiado / Autoguiado) e os destaques do
 *  produto (FLOW › Produtos › Destaques) em tópicos. Sem preços, itinerários nem distâncias. */
function Roteiro({ r, i, dias, territorio = true }: { r: ExJourney | ExDayTour; i: number; dias?: number; territorio?: boolean }) {
  const t = useTranslations("exclusive");
  const loc = useLocale() as Loc;
  return (
    <article className="ex-dk-card ex-dk-in" style={d(i + 2)}>
      <div className="ex-figure">
        <Foto src={r.image} alt={r.name[loc]} sizes="(orientation: portrait) 40vw, 32vw" />
        {dias ? (
          <span className="ex-over ex-journey-days ex-dark">
            {dias} {t("journeys.daysLabel")}
          </span>
        ) : null}
      </div>
      <div className="ex-dk-card-text">
        {territorio && <p className="ex-over">{t(`territories.${r.region}.name`)}</p>}
        <h3 className="ex-serif ex-dk-h4">{r.name[loc]}</h3>
        <ul className="ex-dk-modos">
          {r.modos.map((m) => (
            <li key={m}>{t(`modes.${m === "guiado" ? "guided" : "self"}.name`)}</li>
          ))}
        </ul>
        <Pontos itens={r.highlights.slice(0, 4).map((h) => h[loc])} />
      </div>
    </article>
  );
}

/* 10 · Multi-day: as três viagens de assinatura, com os destaques de cada uma. */
function Viagens() {
  const t = useTranslations("exclusive.journeys");
  return (
    <div className="ex-dk-body ex-dk-stack">
      <Cabeca over={t("overline")} title={t("title")} wide />
      <div className="ex-dk-cards ex-dk-cards-trips" style={{ "--cols": journeys.length } as React.CSSProperties}>
        {journeys.map((j, i) => (
          <Roteiro key={j.base} r={j} i={i} dias={j.days} />
        ))}
      </div>
    </div>
  );
}

/* 11 e 12 · One day: um ecrã por território, com os dias de cada um e os seus destaques. */
function OneDay({ regiao }: { regiao?: ExRegionId }) {
  const t = useTranslations("exclusive");
  const dias = dayTours.filter((x) => x.region === regiao);
  return (
    <div className="ex-dk-body ex-dk-stack">
      <Cabeca over={t("dayTours.overline")} title={t(`territories.${regiao}.name`)} wide />
      <div className="ex-dk-cards ex-dk-cards-trips" style={{ "--cols": dias.length } as React.CSSProperties}>
        {dias.map((x, i) => (
          <Roteiro key={x.base} r={x} i={i} territorio={false} />
        ))}
      </div>
    </div>
  );
}

/* 13 · O padrão Exclusive: faixa verde floresta, escura nos dois temas. */
const PADRAO = ["vehicles", "picnic", "quintas", "stays", "guides", "private"] as const;

function Padrao() {
  const t = useTranslations("exclusive.standard");
  return (
    <div className="ex-dk-body ex-dk-split ex-dk-standard">
      <div className="ex-dk-col">
        <p className="ex-over ex-over-accent ex-dk-in" style={d(0)}>
          {t("overline")}
        </p>
        <h2 className="ex-serif ex-dk-h2 ex-dk-in" style={{ ...d(1), maxWidth: "13ch" }}>
          {t.rich("title", { em })}
        </h2>
        <p className="ex-body ex-dk-text ex-dk-in" style={{ ...d(2), maxWidth: "40ch" }}>
          {t("lead")}
        </p>
        <figure className="ex-figure ex-dk-fill ex-dk-in" style={d(3)}>
          <Foto src={exImages.padrao} alt={t("photoAlt")} sizes="(orientation: portrait) 92vw, 40vw" />
        </figure>
      </div>
      <ul className="ex-dk-standard-list">
        {PADRAO.map((k, i) => (
          <li key={k} className="ex-dk-in" style={d(i + 2)}>
            <span className="ex-num">{pad(i + 1)}</span>
            <h3 className="ex-serif ex-dk-h4">{t(`${k}.title`)}</h3>
            <p className="ex-body ex-dk-small">{t(`${k}.text`)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 14 · Como trabalhamos com o trade: o título grande à esquerda, as quatro condições à direita. */
function Trade() {
  const t = useTranslations("exclusive.operators");
  return (
    <div className="ex-dk-body ex-dk-split">
      <div className="ex-dk-col">
        <p className="ex-over ex-over-accent ex-dk-in" style={d(0)}>
          {t("overline")}
        </p>
        <h2 className="ex-serif ex-dk-display ex-dk-in" style={{ ...d(1), maxWidth: "11ch" }}>
          {t("title")}
        </h2>
      </div>
      <div className="ex-dk-four">
        {(["one", "two", "three", "four"] as const).map((k, i) => (
          <div key={k} className="ex-dk-in" style={d(i + 2)}>
            <span className="ex-num">{pad(i + 1)}</span>
            <h3 className="ex-serif ex-dk-h4">{t(`${k}.title`)}</h3>
            <p className="ex-body ex-dk-small">{t(`${k}.text`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 15 · Assinatura: a marca e os contactos, como uma contracapa (centrada, como a capa). */
function Assinatura({ go }: { go: Go }) {
  const t = useTranslations("exclusive");
  return (
    <div className="ex-dk-body ex-dk-sign">
      <div className="ex-dk-sign-logo ex-dk-in" style={d(0)}>
        <ExLogo h={96} />
      </div>
      <p className="ex-serif ex-dk-sign-line ex-dk-in" style={d(1)}>
        {t.rich("gate.title", { em })}
      </p>
      <p className="ex-over ex-dk-sign-contacts ex-dk-in" style={d(2)}>
        <a href={`mailto:${t("deck.email")}`}>{t("deck.email")}</a>
        <span aria-hidden>·</span>
        <span>{t("deck.site")}</span>
      </p>
      <button type="button" className="ex-btn ex-dk-in" style={d(3)} onClick={() => go("capa")}>
        {t("deck.backToStart")}
      </button>
    </div>
  );
}

type Slide = {
  id: SlideId;
  /** "foto" (capa), "deep" (faixa verde, escura nos dois temas), "ink2" (o tom alternado) ou o chão da página. */
  fundo?: "foto" | "deep" | "ink2";
  /** O nome do ecrã no índice e na barra de baixo (recebe o t de exclusive.*). */
  rotulo: (t: (chave: string) => string) => string;
  regiao?: ExRegionId;
  Ecra: (p: { go: Go; regiao?: ExRegionId }) => React.ReactElement;
};

/** Um ecrã de One day por território, pela ordem da coleção (o Douro primeiro). */
const ONE_DAY: Slide[] = [...new Set(dayTours.map((x) => x.region))].map((regiao, i) => ({
  id: `oneday-${regiao}`,
  fundo: i % 2 === 0 ? "ink2" : undefined,
  rotulo: (t) => `${t("dayTours.overline")} · ${t(`territories.${regiao}.short`)}`,
  regiao,
  Ecra: OneDay,
}));

/** A ordem da apresentação = a ordem da coleção. */
export const SLIDES: Slide[] = [
  { id: "capa", fundo: "foto", rotulo: (t) => t("deck.cover"), Ecra: Capa },
  { id: "quem", rotulo: (t) => t("manifesto.overline"), Ecra: Quem },
  { id: "compromisso", fundo: "ink2", rotulo: (t) => t("deck.commitment"), Ecra: Compromisso },
  { id: "territorios", rotulo: (t) => t("nav.territories"), Ecra: Territorios },
  { id: "caminho", fundo: "ink2", rotulo: (t) => t("territories.santiago.short"), Ecra: Caminho },
  { id: "caminho-rotas", rotulo: (t) => t("caminho.rotasLabel"), Ecra: CaminhoRotas },
  { id: "experiencias", fundo: "ink2", rotulo: (t) => t("nav.experiences"), Ecra: Experiencias },
  { id: "formatos", rotulo: (t) => t("nav.formats"), Ecra: Formatos },
  { id: "modos", fundo: "ink2", rotulo: (t) => t("modes.overline"), Ecra: Modos },
  { id: "viagens", rotulo: (t) => t("journeys.title"), Ecra: Viagens },
  ...ONE_DAY,
  { id: "padrao", fundo: "deep", rotulo: (t) => t("standard.overline"), Ecra: Padrao },
  { id: "trade", rotulo: (t) => t("nav.howWeWork"), Ecra: Trade },
  { id: "assinatura", fundo: "deep", rotulo: (t) => t("deck.contacts"), Ecra: Assinatura },
];
