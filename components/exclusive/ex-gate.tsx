"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const EASE = [0.19, 1, 0.22, 1] as const;

const TIPOS = ["operador", "agencia", "dmc", "outro"] as const;
const INTERESSES = ["catalogo", "tailor_made", "ambos"] as const;

/** Portão comercial do B2B Exclusive. Quem preenche fica registado no FLOW
 *  (área Comercial) e a página abre logo a seguir, sem recarregar. */
export function ExGate() {
  const t = useTranslations("exclusive.gate");
  const locale = useLocale();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    tipoEmpresa: "operador",
    pais: "",
    email: "",
    telefone: "",
    interesse: "ambos",
    website: "",
  });

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/exclusive/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, idioma: locale, formulario: "acesso" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      window.scrollTo({ top: 0 });
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  const pillars = [
    { k: "catalog", n: "01" },
    { k: "tailor", n: "02" },
  ] as const;

  return (
    <section style={{ minHeight: "100svh", display: "flex", alignItems: "center", paddingBlock: "calc(88px + clamp(2rem, 5vw, 4.5rem)) clamp(3rem, 6vw, 5rem)" }}>
      <div
        className="ex-wrap"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "clamp(2.75rem, 6vw, 6.5rem)", alignItems: "start" }}
      >
        {/* Proposta */}
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE }}>
          <p className="ex-over ex-over-accent">{t("overline")}</p>
          <h1 className="ex-serif" style={{ fontSize: "clamp(2.75rem, 6vw, 5.25rem)", marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "14ch" }}>
            {t.rich("title", {
              em: (chunks) => <span className="ex-serif-i" style={{ color: "var(--ex-accent)" }}>{chunks}</span>,
            })}
          </h1>
          <p className="ex-body" style={{ maxWidth: "46ch", marginTop: "clamp(1.5rem, 2.5vw, 2rem)" }}>
            {t("lead")}
          </p>

          <div style={{ display: "grid", gap: "clamp(1.5rem, 2.5vw, 2rem)", marginTop: "clamp(2.25rem, 4vw, 3.25rem)" }}>
            {pillars.map((p) => (
              <div key={p.k} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.25rem" }}>
                <span className="ex-serif" style={{ fontSize: "1.25rem", color: "var(--ex-accent)", lineHeight: 1.3 }}>
                  {p.n}
                </span>
                <div style={{ borderTop: "1px solid var(--ex-line)", paddingTop: "1rem" }}>
                  <h2 className="ex-serif" style={{ fontSize: "clamp(1.35rem, 1.9vw, 1.7rem)", lineHeight: 1.15 }}>
                    {t(`${p.k}Title`)}
                  </h2>
                  <p className="ex-body" style={{ fontSize: "0.9375rem", marginTop: "0.5rem", maxWidth: "44ch" }}>
                    {t(`${p.k}Text`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="ex-figure" style={{ position: "relative", aspectRatio: "16 / 7", marginTop: "clamp(2.25rem, 4vw, 3.25rem)" }}>
            <Image src="/images/programs/douro/douro-a.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 45vw" quality={90} style={{ objectFit: "cover" }} />
          </div>
        </m.div>

        {/* Formulário */}
        <m.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
          style={{
            backgroundColor: "var(--ex-ink-2)",
            border: "1px solid var(--ex-line)",
            padding: "clamp(1.75rem, 3.5vw, 3rem)",
            display: "flex",
            flexDirection: "column",
            gap: "1.6rem",
          }}
        >
          <div>
            <p className="ex-over">{t("formOverline")}</p>
            <p className="ex-serif" style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.1rem)", marginTop: "0.6rem", lineHeight: 1.1 }}>
              {t("formTitle")}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: "1.6rem" }}>
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
            <legend className="ex-over" style={{ marginBottom: "0.85rem" }}>
              {t("interest")}
            </legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {INTERESSES.map((v) => (
                <label key={v} className={`ex-chip${form.interesse === v ? " is-on" : ""}`}>
                  <input type="radio" name="interesse" value={v} checked={form.interesse === v} onChange={set("interesse")} />
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

          <button type="submit" className="ex-btn ex-btn-solid" disabled={status === "sending"} style={{ justifyContent: "center", padding: "1.15rem 2rem" }}>
            {status === "sending" ? t("sending") : t("submit")}
            {status !== "sending" && <span aria-hidden>&rarr;</span>}
          </button>

          <p className="ex-body" style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}>
            {t("privacy")}
          </p>
        </m.form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <span className="ex-over">{label}</span>
      {children}
    </label>
  );
}
