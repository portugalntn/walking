"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { grades } from "@/lib/grades";
import { Route, Mountain } from "lucide-react";
import { DifficultyGauge } from "@/components/sections/difficulty-gauge";

type Loc = "en" | "pt" | "es";
const EASE = [0.19, 1, 0.22, 1] as const;
const RAMP = ["#e2e6d8", "#c4d1a4", "#a3bd6b", "#7d9a44", "#566b2e"];

export function GradingPageContent() {
  const t = useTranslations("gradingPage");
  const locale = useLocale() as Loc;

  return (
    <main>
      {/* Hero */}
      <section style={{ backgroundColor: "var(--color-ntn-forest-600)", paddingTop: "180px", paddingBottom: "72px" }}>
        <div className="container-ntn">
          <FadeUp>
            <div style={{ marginBottom: "20px" }}>
              <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">
                {t("heroLabel")}
              </Overline>
            </div>
            <h1
              className="font-title"
              style={{ color: "#fff", fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.05, textTransform: "none", maxWidth: "20ch", marginBottom: "22px" }}
            >
              {t("heroTitle")}
            </h1>
            <p className="text-body-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "60ch" }}>
              {t("intro")}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Scale */}
      <section style={{ backgroundColor: "var(--color-ntn-white)", paddingTop: "72px", paddingBottom: "80px" }}>
        <div className="container-ntn">
          {/* Interactive gauge — hover each zone to explore */}
          <FadeUp>
            <div style={{ maxWidth: "760px", marginBottom: "56px" }}>
              <DifficultyGauge
                hideOverline
                hideScaleLink
                cardStyle={{ backgroundColor: "var(--color-ntn-white)", border: "none", padding: "0" }}
              />
            </div>
          </FadeUp>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "880px" }}>
            {grades.map((g, i) => (
              <m.div
                key={g.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                style={{
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-start",
                  border: "1px solid rgba(89,105,77,0.16)",
                  borderRadius: "12px",
                  padding: "24px 28px",
                  backgroundColor: "var(--color-ntn-cream-50)",
                }}
              >
                {/* Level badge */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "52px",
                    height: "52px",
                    borderRadius: "9999px",
                    backgroundColor: RAMP[i],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-title)",
                    fontSize: "1.5rem",
                    color: i >= 3 ? "#fff" : "#2c2c2a",
                  }}
                >
                  {g.level}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "16px", marginBottom: "10px" }}>
                    <h2 className="font-ui" style={{ color: "var(--color-ntn-black-900)", fontWeight: 700, fontSize: "1.3rem" }}>
                      {g.name[locale]}
                    </h2>
                    <span className="text-body-md" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--color-ntn-forest-600)" }}>
                      <Route size={15} /> {g.maxDistance[locale]}
                    </span>
                    <span className="text-body-md" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--color-ntn-forest-600)" }}>
                      <Mountain size={15} /> {g.maxAscent[locale]}
                    </span>
                  </div>
                  <p className="text-body-md leading-relaxed" style={{ color: "var(--color-ntn-black-800)", maxWidth: "62ch" }}>
                    {g.description[locale]}
                  </p>
                </div>
              </m.div>
            ))}
          </div>

          <FadeUp delay={0.1}>
            <div style={{ marginTop: "48px" }}>
              <Link href={`/${locale}/programas`} className="btn btn-primary">
                {t("ctaDestinations")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
