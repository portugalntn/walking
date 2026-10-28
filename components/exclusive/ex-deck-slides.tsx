"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { dayTours, exImages, journeys, regionIds, type ExRegionId } from "@/lib/exclusive";
import { ExMapa } from "./ex-territories";

/** Os ecrãs da apresentação para tablet. Os mesmos textos (messages ›
 *  exclusive.*, editáveis no FLOW) e as mesmas fotos (exImages, journeys,
 *  dayTours) da coleção, recompostos para caberem cada um num ecrã inteiro,
 *  sem scroll. Sem preços, itinerários nem distâncias, como na coleção. */

export type SlideId =
  | "capa"
  | "quem"
  | "compromisso"
  | "territorios"
  | "experiencias"
  | "formatos"
  | "viagens"
  | "oneday"
  | "padrao"
  | "trade"
  | "contacto";

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

/* 5 · Experiências: cinco fotografias em acordeão. Toca-se numa e ela abre com o texto. */
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

/* 6 · Formatos: Multi-day e One day (cada um leva ao seu ecrã) e o Tailor made. */
function Formatos({ go }: { go: Go }) {
  const t = useTranslations("exclusive.formats");
  const formatos: { k: string; to: SlideId }[] = [
    { k: "multi", to: "viagens" },
    { k: "one", to: "oneday" },
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
          <button key={k} type="button" className="ex-dk-format ex-dk-in" style={d(i + 2)} onClick={() => go(to)}>
            <span className="ex-over">{t(`${k}.sub`)}</span>
            <span className="ex-serif ex-dk-format-name">{t(`${k}.name`)}</span>
            <span className="ex-body ex-dk-small">{t(`${k}.text`)}</span>
            <span className="ex-over ex-over-accent ex-link">
              {t(`${k}.cta`)} <span aria-hidden>&rarr;</span>
            </span>
          </button>
        ))}
      </div>
      <p className="ex-formats-note ex-dk-in" style={{ ...d(4), marginTop: 0 }}>
        <span className="ex-over ex-over-accent">{t("tailorLabel")}</span>
        <span className="ex-serif-i">{t("tailor")}</span>
      </p>
    </div>
  );
}

/* 7 · Viagens de assinatura (Multi-day): as três, lado a lado. */
function Viagens() {
  const t = useTranslations("exclusive.journeys");
  const tt = useTranslations("exclusive.territories");
  const loc = useLocale() as Loc;
  return (
    <div className="ex-dk-body ex-dk-stack">
      <Cabeca over={t("overline")} title={t("title")} lead={t("lead")} />
      <div className="ex-dk-cards ex-dk-cards-journeys">
        {journeys.map((j, i) => (
          <article key={j.base} className="ex-dk-card ex-dk-in" style={d(i + 2)}>
            <div className="ex-figure">
              <Foto src={j.image} alt={j.name[loc]} sizes="(orientation: portrait) 92vw, 32vw" />
              <span className="ex-over ex-journey-days ex-dark">
                {j.days} {t("daysLabel")}
              </span>
            </div>
            <p className="ex-over">{tt(`${j.region}.name`)}</p>
            <h3 className="ex-serif ex-dk-h4">{j.name[loc]}</h3>
            <p className="ex-body ex-dk-small">{j.angle[loc]}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

/* 8 · One day: os dias no território, em grelha (no tablet a fila deslizante lutaria com o deslize entre ecrãs). */
function OneDay() {
  const t = useTranslations("exclusive.dayTours");
  const tt = useTranslations("exclusive.territories");
  const loc = useLocale() as Loc;
  return (
    <div className="ex-dk-body ex-dk-stack">
      <Cabeca over={t("overline")} title={t("title")} lead={t("lead")} />
      <div className="ex-dk-cards ex-dk-cards-days">
        {dayTours.map((dt, i) => (
          <article key={dt.base} className="ex-dk-card ex-dk-in" style={d(Math.min(i, 4) + 2)}>
            <div className="ex-figure">
              <Foto src={dt.image} alt={dt.name[loc]} sizes="(orientation: portrait) 46vw, 31vw" />
            </div>
            <p className="ex-over">{tt(`${dt.region}.name`)}</p>
            <h3 className="ex-serif ex-dk-h5">{dt.name[loc]}</h3>
          </article>
        ))}
      </div>
    </div>
  );
}

/* 9 · O padrão Exclusive: faixa verde floresta, escura nos dois temas. */
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

/* 10 · Como trabalhamos com o trade: o título grande à esquerda, as quatro condições à direita. */
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

/* 11 · Contacto: o vendedor preenche com o cliente ali mesmo. O pedido entra no FLOW
 *  (Comercial) como os outros, marcado "apresentacao"; depois, recomeça para o cliente seguinte. */
function Contacto({ go }: { go: Go }) {
  const t = useTranslations("exclusive.enquiry");
  const td = useTranslations("exclusive.deck");
  const locale = useLocale();
  const vazio = { name: "", email: "", company: "", country: "", message: "" };
  const [form, setForm] = useState(vazio);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/exclusive/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.name,
          email: form.email,
          empresa: form.company,
          pais: form.country,
          mensagem: form.message,
          idioma: locale,
          formulario: "apresentacao",
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  function recomecar() {
    setForm(vazio);
    setStatus("idle");
    go("capa");
  }

  return (
    <div className="ex-dk-body ex-dk-split ex-dk-contact">
      <div className="ex-dk-col">
        <p className="ex-over ex-over-accent ex-dk-in" style={d(0)}>
          {t("overline")}
        </p>
        <h2 className="ex-serif ex-dk-display ex-dk-in" style={{ ...d(1), maxWidth: "9ch" }}>
          {t("title")}
        </h2>
        <p className="ex-body ex-dk-text ex-dk-in" style={{ ...d(2), maxWidth: "40ch" }}>
          {t("lead")}
        </p>
      </div>

      {status === "sent" ? (
        <div className="ex-dk-sent">
          <h3 className="ex-serif ex-dk-h3">{t("sentTitle")}</h3>
          <p className="ex-body ex-dk-text" style={{ maxWidth: "34ch" }}>
            {t("sentText")}
          </p>
          <button type="button" className="ex-btn" onClick={recomecar}>
            {td("restart")}
          </button>
        </div>
      ) : (
        <form className="ex-dk-form ex-dk-in" style={d(3)} onSubmit={onSubmit}>
          <div className="ex-dk-fields">
            <input className="ex-field" required placeholder={t("name")} value={form.name} onChange={set("name")} autoComplete="off" />
            <input className="ex-field" required type="email" placeholder={t("email")} value={form.email} onChange={set("email")} autoComplete="off" />
            <input className="ex-field" required placeholder={t("company")} value={form.company} onChange={set("company")} autoComplete="off" />
            <input className="ex-field" placeholder={t("country")} value={form.country} onChange={set("country")} autoComplete="off" />
          </div>
          <textarea className="ex-field" rows={3} placeholder={t("message")} value={form.message} onChange={set("message")} style={{ resize: "none" }} />
          {status === "error" && (
            <p className="ex-over" style={{ color: "var(--ex-error)" }}>
              {t("error")}
            </p>
          )}
          <button type="submit" className="ex-btn ex-btn-solid" disabled={status === "sending"} style={{ alignSelf: "flex-start" }}>
            {status === "sending" ? t("sending") : t("submit")}
          </button>
        </form>
      )}
    </div>
  );
}

/** A ordem da apresentação = a ordem da coleção. `fundo`: "foto" (capa), "deep"
 *  (faixa verde, escura nos dois temas), "ink2" (o tom alternado) ou o chão da página. */
export const SLIDES: { id: SlideId; fundo?: "foto" | "deep" | "ink2"; Ecra: (p: { go: Go }) => React.ReactElement }[] = [
  { id: "capa", fundo: "foto", Ecra: Capa },
  { id: "quem", Ecra: Quem },
  { id: "compromisso", fundo: "ink2", Ecra: Compromisso },
  { id: "territorios", Ecra: Territorios },
  { id: "experiencias", fundo: "ink2", Ecra: Experiencias },
  { id: "formatos", Ecra: Formatos },
  { id: "viagens", fundo: "ink2", Ecra: Viagens },
  { id: "oneday", Ecra: OneDay },
  { id: "padrao", fundo: "deep", Ecra: Padrao },
  { id: "trade", Ecra: Trade },
  { id: "contacto", fundo: "ink2", Ecra: Contacto },
];
