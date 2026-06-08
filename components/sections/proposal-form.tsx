"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check, Loader2 } from "lucide-react";

const EASE = [0.19, 1, 0.22, 1] as const;

const field: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-ui)",
  fontSize: "15px",
  color: "var(--color-ntn-black-900)",
  backgroundColor: "var(--color-ntn-white)",
  border: "1px solid rgba(45,59,30,0.18)",
  borderRadius: "6px",
  padding: "13px 14px",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-ui)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#3d5a1a",
  marginBottom: "7px",
};

export function ProposalForm({ program }: { program: string }) {
  const t = useTranslations("productPage");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, program }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      style={{
        backgroundColor: "var(--color-ntn-cream-50)",
        borderRadius: "14px",
        padding: "clamp(24px, 3vw, 36px)",
        boxShadow: "0 30px 60px -30px rgba(26,37,16,0.4)",
      }}
    >
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ textAlign: "center", padding: "32px 8px" }}
          >
            <div
              style={{
                width: "56px", height: "56px", borderRadius: "9999px",
                backgroundColor: "var(--color-ntn-lime)", color: "#1a2510",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Check size={28} strokeWidth={2.5} />
            </div>
            <h3 className="font-ui" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--color-ntn-black-900)", marginBottom: "10px" }}>
              {t("formSuccessTitle")}
            </h3>
            <p className="text-body-md" style={{ color: "var(--color-ntn-black-800)", maxWidth: "34ch", margin: "0 auto" }}>
              {t("formSuccess")}
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            {/* Program of interest */}
            <div
              style={{
                display: "flex", flexDirection: "column", gap: "4px",
                borderLeft: "3px solid var(--color-ntn-lime)", paddingLeft: "12px",
              }}
            >
              <span className="text-label" style={{ color: "var(--color-ntn-sage-200)" }}>{t("formProgramLabel")}</span>
              <span className="font-ui" style={{ fontWeight: 700, color: "var(--color-ntn-black-900)", fontSize: "15px" }}>{program}</span>
            </div>

            <div>
              <label style={labelStyle} htmlFor="pf-name">{t("formName")}</label>
              <input id="pf-name" style={field} value={form.name} onChange={set("name")} required
                onFocus={(e) => (e.target.style.borderColor = "var(--color-ntn-lime)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(45,59,30,0.18)")} />
            </div>

            <div>
              <label style={labelStyle} htmlFor="pf-email">{t("formEmail")}</label>
              <input id="pf-email" type="email" style={field} value={form.email} onChange={set("email")} required
                onFocus={(e) => (e.target.style.borderColor = "var(--color-ntn-lime)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(45,59,30,0.18)")} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "18px" }}>
              <div>
                <label style={labelStyle} htmlFor="pf-company">{t("formCompany")}</label>
                <input id="pf-company" style={field} value={form.company} onChange={set("company")}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-ntn-lime)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(45,59,30,0.18)")} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="pf-phone">{t("formPhone")}</label>
                <input id="pf-phone" style={field} value={form.phone} onChange={set("phone")}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-ntn-lime)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(45,59,30,0.18)")} />
              </div>
            </div>

            <div>
              <label style={labelStyle} htmlFor="pf-message">{t("formMessage")}</label>
              <textarea id="pf-message" rows={4} style={{ ...field, resize: "vertical" }}
                placeholder={t("formMessagePlaceholder")} value={form.message} onChange={set("message")} required
                onFocus={(e) => (e.target.style.borderColor = "var(--color-ntn-lime)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(45,59,30,0.18)")} />
            </div>

            {status === "error" && (
              <p className="text-body-md" style={{ color: "#b3261e" }}>{t("formError")}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
                padding: "16px 28px", backgroundColor: "#1a2510", color: "var(--color-ntn-lime)",
                borderRadius: "6px", border: "none", cursor: status === "sending" ? "wait" : "pointer",
                fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.12em",
                textTransform: "uppercase", opacity: status === "sending" ? 0.7 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {t("formSending")}
                </>
              ) : (
                <>
                  {t("formSend")}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
