"use client";

import { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { faqGroups } from "@/lib/faqs";
import { Plus, Mail } from "lucide-react";

type Loc = "en" | "pt" | "es";

function FaqItem({ q, a, locale }: { q: string; a: string; locale: Loc }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(89,105,77,0.16)" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          textAlign: "left",
          padding: "22px 4px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.35 }}>
          {q}
        </span>
        <span
          style={{
            flexShrink: 0,
            color: "var(--color-ntn-forest-400)",
            transition: "transform 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <Plus size={22} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="text-body-md leading-relaxed"
              style={{ color: "var(--color-ntn-black-800)", paddingBottom: "24px", paddingRight: "46px", maxWidth: "70ch" }}
            >
              {a}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqPageContent() {
  const t = useTranslations("faqPage");
  const locale = useLocale() as Loc;

  return (
    <main>
      {/* Hero */}
      <section style={{ backgroundColor: "var(--color-ntn-forest-600)", paddingTop: "180px", paddingBottom: "80px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "20px" }}>
              <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">
                {t("heroLabel")}
              </Overline>
            </div>
            <h1
              className="font-title"
              style={{ color: "#fff", fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", lineHeight: 1.04, textTransform: "none", maxWidth: "18ch", marginBottom: "24px" }}
            >
              {t("heroTitle")}
            </h1>
            <p className="text-body-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "54ch" }}>
              {t("intro")}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Groups */}
      <section style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container-ntn">
          <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            {faqGroups.map((group, gi) => (
              <FadeUp key={gi} delay={gi * 0.05}>
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]" style={{ gap: "40px", alignItems: "start" }}>
                  <div style={{ position: "sticky", top: "120px" }}>
                    <Overline color="var(--color-ntn-forest-400)">{group.category[locale]}</Overline>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(89,105,77,0.16)" }}>
                    {group.items.map((item, ii) => (
                      <FaqItem key={ii} q={item.q[locale]} a={item.a[locale]} locale={locale} />
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section style={{ backgroundColor: "var(--color-ntn-cream-100)", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "40px" }}>
              <div>
                <Overline color="var(--color-ntn-forest-400)">{t("ctaLabel")}</Overline>
                <h2 className="font-title" style={{ color: "var(--color-ntn-black-900)", fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", textTransform: "none", lineHeight: 1.1, marginTop: "16px", marginBottom: "16px" }}>
                  {t("ctaTitle")}
                </h2>
                <p className="text-body-lg leading-relaxed" style={{ color: "var(--color-ntn-black-800)", maxWidth: "44ch" }}>
                  {t("ctaBody")}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link href={`/${locale}/destinations`} className="btn btn-primary">
                  {t("ctaDestinations")}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a href="mailto:walking@portugalntn.com" className="btn btn-ghost-dark" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <Mail size={16} />
                  {t("ctaContact")}
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
