"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.19, 1, 0.22, 1] as const;

export function ExHero() {
  const t = useTranslations("exclusive.hero");

  return (
    <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <m.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src="/images/hero/hero-1.jpg"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            style={{ objectFit: "cover", filter: "saturate(0.6) contrast(1.08) brightness(0.62)" }}
          />
        </m.div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(11,12,10,0.72) 0%, rgba(11,12,10,0.24) 32%, rgba(11,12,10,0.6) 72%, var(--ex-ink) 100%)",
          }}
        />
      </div>

      <div
        className="ex-wrap"
        style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "88px" }}
      >
        <m.p
          className="ex-over ex-over-accent"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        >
          {t("overline")}
        </m.p>

        <m.h1
          className="ex-serif"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.42 }}
          style={{ fontSize: "var(--ex-h1)", marginTop: "clamp(1rem, 2vw, 1.75rem)", letterSpacing: "-0.02em" }}
        >
          {t("title")}
        </m.h1>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.85 }}
          style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          <span className="ex-bracket">
            <span className="ex-serif-i" style={{ fontSize: "clamp(1.125rem, 2vw, 1.75rem)", color: "var(--ex-bone)" }}>
              {t("bracket")}
            </span>
          </span>
        </m.div>

        <m.p
          className="ex-body"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1 }}
          style={{ maxWidth: "46ch", marginTop: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          {t("lead")}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.15 }}
          style={{ marginTop: "clamp(2rem, 3.5vw, 3rem)" }}
        >
          <a href="#enquiry" className="ex-btn ex-btn-solid">
            {t("cta")}
          </a>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="ex-wrap"
        style={{ position: "relative", paddingBottom: "clamp(1.75rem, 3vw, 2.75rem)" }}
      >
        <hr className="ex-rule" style={{ marginBottom: "1.25rem" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(1.25rem, 4vw, 4rem)" }}>
          {["metaA", "metaB", "metaC"].map((k) => (
            <span key={k} className="ex-over">
              {t(k)}
            </span>
          ))}
        </div>
      </m.div>
    </section>
  );
}
