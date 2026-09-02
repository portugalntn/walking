"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { journeys } from "@/lib/exclusive";

const EASE = [0.19, 1, 0.22, 1] as const;

export function ExJourneys() {
  const t = useTranslations("exclusive.journeys");
  const loc = useLocale() as "en" | "pt" | "es";

  return (
    <section id="journeys" className="ex-section" style={{ paddingBottom: 0 }}>
      <div className="ex-wrap">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(1.5rem, 4vw, 4rem)",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p className="ex-over ex-over-accent">{t("overline")}</p>
            <h2
              className="ex-serif"
              style={{ fontSize: "var(--ex-h2)", marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "14ch" }}
            >
              {t("title")}
            </h2>
          </div>
          <p className="ex-body" style={{ maxWidth: "42ch" }}>
            {t("lead")}
          </p>
        </div>
      </div>

      <div className="ex-triptych" style={{ marginTop: "clamp(3rem, 6vw, 5.5rem)" }}>
        {journeys.map((jour, i) => (
          <m.article
            key={jour.base}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
            style={{ backgroundColor: "var(--ex-ink)", position: "relative" }}
          >
            <div className="ex-figure" style={{ aspectRatio: "3 / 4" }}>
              <Image
                src={jour.image}
                alt={jour.name[loc]}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                quality={90}
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, rgba(11,12,10,0.15) 40%, rgba(11,12,10,0.9) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "auto 0 0 0",
                  padding: "clamp(1.5rem, 2.4vw, 2.5rem)",
                }}
              >
                <p className="ex-over">{jour.region}</p>
                <h3
                  className="ex-serif"
                  style={{ fontSize: "var(--ex-h3)", marginTop: "0.75rem", lineHeight: 1.1 }}
                >
                  {jour.name[loc]}
                </h3>
              </div>
            </div>

            <div style={{ padding: "clamp(1.5rem, 2.4vw, 2.5rem)" }}>
              <div style={{ display: "flex", gap: "2rem" }}>
                <span className="ex-over">
                  {jour.days} {t("daysLabel")}
                </span>
                <span className="ex-over">{jour.distance}</span>
              </div>
              <p className="ex-body" style={{ fontSize: "0.9375rem", marginTop: "1.25rem" }}>
                {jour.angle[loc]}
              </p>
              <a
                href="#enquiry"
                className="ex-over"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  marginTop: "1.75rem",
                  color: "var(--ex-accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--ex-line-2)",
                  paddingBottom: "0.5rem",
                }}
              >
                {t("cta")}
                <span aria-hidden>&rarr;</span>
              </a>
            </div>
          </m.article>
        ))}
      </div>
    </section>
  );
}
