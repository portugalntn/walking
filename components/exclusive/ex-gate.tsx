"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const TIPOS = ["operador", "agencia", "dmc", "outro"] as const;
/** Escolha múltipla; o FLOW lê os mesmos códigos (lib/comercial.ts, INTERESSE). */
const INTERESSES = ["guiado", "autoguiado", "oneday", "multiday", "tailor"] as const;
/** Os formatos dos roteiros prontos, pela ordem em que aparecem. */
const FORMATOS = ["multiday", "oneday", "guiado", "autoguiado"] as const;

/** Portão comercial do B2B Exclusive. Quem preenche entra como lead B2B no FLOW
 *  (Comercial › Atendimento) e a coleção abre logo a seguir, sem recarregar.
 *  A foto do topo muda-se no FLOW (Site › Páginas › EXCLUSIVE · Entrada). */
export function ExGate({ image }: { image: string }) {
  const t = useTranslations("exclusive.gate");
  const locale = useLocale();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [interesses, setInteresses] = useState<string[]>([]);
  const [form, setForm] = useState({ nome: "", empresa: "", tipoEmpresa: "operador", pais: "", email: "", telefone: "", website: "" });

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const alternar = (v: string) => setInteresses((l) => (l.includes(v) ? l.filter((x) => x !== v) : [...l, v]));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/exclusive/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, interesses, idioma: locale, formulario: "acesso" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      window.scrollTo({ top: 0 });
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Topo: a fotografia e a frase. Fica escuro nos dois temas, por estar sobre a foto. */}
      <section className="ex-dark ex-gate-hero">
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div className="ex-settle" style={{ position: "absolute", inset: 0 }}>
            <Image src={image} alt={t("imageAlt")} fill priority quality={90} sizes="100vw" style={{ objectFit: "cover", filter: "saturate(0.72) contrast(1.06) brightness(0.7)" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,12,10,0.7) 0%, rgba(11,12,10,0.15) 38%, rgba(11,12,10,0.78) 100%)" }} />
        </div>

        <div className="ex-wrap" style={{ position: "relative", paddingTop: "120px", paddingBottom: "clamp(2.5rem, 5vw, 4.5rem)" }}>
          <p className="ex-over ex-over-accent ex-rise" style={{ animationDelay: "0.15s" }}>
            {t("overline")}
          </p>
          <h1
            className="ex-serif ex-rise"
            style={{ animationDelay: "0.28s", fontSize: "clamp(2.9rem, 7vw, 6.4rem)", marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "15ch", letterSpacing: "-0.015em" }}
          >
            {t.rich("title", { em: (chunks) => <span className="ex-serif-i" style={{ color: "var(--ex-accent)" }}>{chunks}</span> })}
          </h1>
          <div className="ex-rise" style={{ animationDelay: "0.55s", marginTop: "clamp(1.25rem, 2.5vw, 2rem)" }}>
            <span className="ex-bracket">
              <span className="ex-serif-i" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.6rem)", color: "var(--ex-bone)" }}>
                {t("bracket")}
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Corpo: o que fazemos e o formulário */}
      <section style={{ paddingBlock: "clamp(3.5rem, 7vw, 6.5rem)" }}>
        <div className="ex-wrap ex-gate-grid">
          <div className="ex-rise" style={{ animationDelay: "0.35s" }}>
            <p className="ex-serif" style={{ fontSize: "clamp(1.45rem, 2.1vw, 1.95rem)", lineHeight: 1.3, maxWidth: "30ch" }}>
              {t("lead")}
            </p>
            <p className="ex-body" style={{ marginTop: "1.25rem", maxWidth: "52ch" }}>
              {t("purpose")}
            </p>

            <p className="ex-over ex-over-accent" style={{ marginTop: "clamp(2.75rem, 5vw, 4rem)" }}>
              {t("waysOverline")}
            </p>

            {/* 01 · Roteiros prontos, com os quatro formatos */}
            <div className="ex-gate-way">
              <span className="ex-gate-num">01</span>
              <div>
                <h2 className="ex-serif ex-gate-way-title">{t("catalogTitle")}</h2>
                <p className="ex-body" style={{ fontSize: "0.9375rem", marginTop: "0.6rem", maxWidth: "52ch" }}>
                  {t("catalogText")}
                </p>
                <div className="ex-gate-formats">
                  {FORMATOS.map((f) => (
                    <div key={f}>
                      <p className="ex-over" style={{ color: "var(--ex-bone)" }}>{t(`formats.${f}.title`)}</p>
                      <p className="ex-body" style={{ fontSize: "0.875rem", marginTop: "0.4rem", lineHeight: 1.6 }}>
                        {t(`formats.${f}.text`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 02 · Tailor made */}
            <div className="ex-gate-way">
              <span className="ex-gate-num">02</span>
              <div>
                <h2 className="ex-serif ex-gate-way-title">{t("tailorTitle")}</h2>
                <p className="ex-body" style={{ fontSize: "0.9375rem", marginTop: "0.6rem", maxWidth: "52ch" }}>
                  {t("tailorText")}
                </p>
              </div>
            </div>
          </div>

          {/* Formulário: acompanha a leitura enquanto a coluna da esquerda desce. */}
          <form onSubmit={onSubmit} className="ex-gate-form ex-rise" style={{ animationDelay: "0.45s" }}>
            <div>
              <p className="ex-over">{t("formOverline")}</p>
              <p className="ex-serif" style={{ fontSize: "clamp(1.8rem, 2.6vw, 2.4rem)", marginTop: "0.7rem", lineHeight: 1.08 }}>
                {t("formTitle")}
              </p>
              <p className="ex-body" style={{ fontSize: "0.875rem", marginTop: "0.75rem", lineHeight: 1.6 }}>
                {t("formLead")}
              </p>
            </div>

            <div className="ex-gate-fields">
              <Field label={t("name")}>
                <input className="ex-field" required autoComplete="name" value={form.nome} onChange={set("nome")} />
              </Field>
              <Field label={t("company")}>
                <input className="ex-field" required autoComplete="organization" value={form.empresa} onChange={set("empresa")} />
              </Field>
              <Field label={t("type")}>
                <select className="ex-field" value={form.tipoEmpresa} onChange={set("tipoEmpresa")}>
                  {TIPOS.map((v) => (
                    <option key={v} value={v}>
                      {t(`types.${v}`)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("country")}>
                <input className="ex-field" required autoComplete="country-name" value={form.pais} onChange={set("pais")} />
              </Field>
              <Field label={t("email")}>
                <input className="ex-field" required type="email" autoComplete="email" value={form.email} onChange={set("email")} />
              </Field>
              <Field label={t("phone")}>
                <input className="ex-field" type="tel" autoComplete="tel" value={form.telefone} onChange={set("telefone")} />
              </Field>
            </div>

            <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="ex-over" style={{ marginBottom: "0.35rem" }}>
                {t("interest")}
              </legend>
              <p className="ex-body" style={{ fontSize: "0.8125rem", marginBottom: "0.9rem" }}>
                {t("interestHint")}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {INTERESSES.map((v) => (
                  <label key={v} className={`ex-chip${interesses.includes(v) ? " is-on" : ""}`}>
                    <input type="checkbox" value={v} checked={interesses.includes(v)} onChange={() => alternar(v)} />
                    {t(`interests.${v}`)}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Só os robôs veem e preenchem este campo. */}
            <input
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              value={form.website}
              onChange={set("website")}
              name="website"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />

            {status === "error" && (
              <p className="ex-over" style={{ color: "var(--ex-error)", lineHeight: 1.7 }}>
                {t("error")}
              </p>
            )}

            <div>
              <button type="submit" className="ex-btn ex-btn-solid" disabled={status === "sending"} style={{ width: "100%", justifyContent: "center", padding: "1.25rem 2rem" }}>
                {status === "sending" ? t("sending") : t("submit")}
                {status !== "sending" && <span aria-hidden>&rarr;</span>}
              </button>
              <p className="ex-body" style={{ fontSize: "0.8125rem", lineHeight: 1.6, marginTop: "1rem" }}>
                {t("privacy")}
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
      <span className="ex-over">{label}</span>
      {children}
    </label>
  );
}
