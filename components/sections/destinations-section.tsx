"use client";

import { useTranslations } from "next-intl";
import { FadeUp, FadeRight } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { PortugalMap } from "@/components/ui/portugal-map";

export function DestinationsSection() {
  const t = useTranslations("home.destinations");

  return (
    <section
      id="destinations"
      style={{
        backgroundColor: "var(--color-ntn-cream-50)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <div className="container-ntn">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 lg:gap-20 items-center">

          {/* Left — minimal text */}
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{t("label")}</Overline>
            </div>
            <h2
              className="font-title"
              style={{
                color: "var(--color-ntn-black-900)",
                whiteSpace: "pre-line",
                lineHeight: 1.1,
                textTransform: "none",
                fontSize: "clamp(2rem, 4vw, 2.5rem)",
                marginBottom: "28px",
              }}
            >
              {t("title")}
            </h2>
            <p
              className="text-body-lg leading-relaxed"
              style={{ color: "var(--color-ntn-black-800)", maxWidth: "26rem" }}
            >
              {t("body")}
            </p>
          </FadeUp>

          {/* Right — interactive map, dominant */}
          <FadeRight delay={0.2}>
            <div className="flex items-center justify-center">
              <PortugalMap />
            </div>
          </FadeRight>
        </div>
      </div>
    </section>
  );
}
