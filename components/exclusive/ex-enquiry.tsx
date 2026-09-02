"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.19, 1, 0.22, 1] as const;

export function ExEnquiry() {
  const t = useTranslations("exclusive.enquiry");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", country: "", message: "" });

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `${form.message}\n\nEmpresa: ${form.company}\nPaís: ${form.country}`,
          program: "EXCLUSIVE (B2B)",
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="enquiry" className="ex-section" style={{ backgroundColor: "var(--ex-ink-2)" }}>
      <div
        className="ex-wrap"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(2.5rem, 6vw, 6rem)" }}
      >
        <div>
          <p className="ex-over ex-over-accent">{t("overline")}</p>
          <h2 className="ex-serif" style={{ fontSize: "var(--ex-h2)", marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "13ch" }}>
            {t("title")}
          </h2>
          <p className="ex-body" style={{ maxWidth: "40ch", marginTop: "clamp(1.5rem, 2.5vw, 2rem)" }}>
            {t("lead")}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <m.div
              key="sent"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{ alignSelf: "center", borderLeft: "1px solid var(--ex-accent)", paddingLeft: "2rem" }}
            >
              <h3 className="ex-serif" style={{ fontSize: "var(--ex-h3)" }}>
                {t("sentTitle")}
              </h3>
              <p className="ex-body" style={{ marginTop: "1rem", maxWidth: "34ch" }}>
                {t("sentText")}
              </p>
            </m.div>
          ) : (
            <m.form
              key="form"
              onSubmit={onSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.75rem" }}>
                <input className="ex-field" required placeholder={t("name")} value={form.name} onChange={set("name")} />
                <input className="ex-field" required type="email" placeholder={t("email")} value={form.email} onChange={set("email")} />
                <input className="ex-field" placeholder={t("company")} value={form.company} onChange={set("company")} />
                <input className="ex-field" placeholder={t("country")} value={form.country} onChange={set("country")} />
              </div>

              <textarea
                className="ex-field"
                rows={4}
                placeholder={t("message")}
                value={form.message}
                onChange={set("message")}
                style={{ resize: "vertical" }}
              />

              {status === "error" && (
                <p className="ex-over" style={{ color: "#c98b7a" }}>
                  {t("error")}
                </p>
              )}

              <button type="submit" className="ex-btn ex-btn-solid" disabled={status === "sending"} style={{ alignSelf: "flex-start" }}>
                {status === "sending" ? t("sending") : t("submit")}
              </button>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
