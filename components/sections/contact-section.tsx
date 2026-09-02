"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { FadeUp, StaggerChildren } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { ProposalForm } from "@/components/sections/proposal-form";
import { fadeUpSoft } from "@/lib/motion";

const CONTACT_EMAIL = "info@portugalntn.com";

/** Public proof points shown beside the form. Values and labels come from i18n. */
const stats = ["stat1", "stat2", "stat3", "stat4"] as const;

export function ContactSection() {
  const t = useTranslations("home.contact");

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-ntn-cream-50)",
        paddingTop: "100px",
        paddingBottom: "100px",
        scrollMarginTop: "96px",
      }}
    >
      <div className="container-ntn">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left, the pitch and the proof */}
          <div>
            <FadeUp>
              <div style={{ marginBottom: "12px" }}>
                <Overline color="var(--color-ntn-forest-400)">{t("label")}</Overline>
              </div>
              <h2
                className="font-title text-display-lg"
                style={{
                  color: "var(--color-ntn-black-900)",
                  lineHeight: 1.1,
                  marginBottom: "28px",
                }}
              >
                {t("title")}
              </h2>
              <p
                className="text-body-lg leading-relaxed"
                style={{ color: "var(--color-ntn-black-800)", marginBottom: "48px" }}
              >
                {t("body")}
              </p>
            </FadeUp>

            <StaggerChildren
              speed="fast"
              className="grid grid-cols-2"
              style={{ rowGap: "32px", columnGap: "40px" } as React.CSSProperties}
            >
              {stats.map((s) => (
                <m.div key={s} variants={fadeUpSoft}>
                  <p
                    className="font-title leading-none"
                    style={{
                      color: "#2d3b1e",
                      fontSize: "48px",
                      fontWeight: 800,
                      marginBottom: "10px",
                    }}
                  >
                    {t(`${s}Value`)}
                  </p>
                  <p
                    style={{
                      color: "#6b7c5a",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {t(`${s}Label`)}
                  </p>
                </m.div>
              ))}
            </StaggerChildren>

            <FadeUp delay={0.3}>
              <div style={{ marginTop: "48px" }}>
                <p className="text-label" style={{ color: "var(--color-ntn-sage-200)", marginBottom: "6px" }}>
                  {t("emailLabel")}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-ui"
                  style={{
                    color: "#2d3b1e",
                    fontWeight: 700,
                    fontSize: "17px",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  }}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right, the form itself. This is the only conversion point on the home. */}
          <FadeUp delay={0.15}>
            <ProposalForm />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
