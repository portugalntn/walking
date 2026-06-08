"use client";

import { useTranslations } from "next-intl";
import { FadeUp, StaggerChildren } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { SlidersHorizontal, Clock, Heart, MapPin, Handshake, Gem } from "lucide-react";

const values = [
  { n: 1, Icon: SlidersHorizontal },
  { n: 2, Icon: Clock },
  { n: 3, Icon: Heart },
  { n: 4, Icon: MapPin },
  { n: 5, Icon: Handshake },
  { n: 6, Icon: Gem },
];

export function WhyUsSection() {
  const t = useTranslations("home.whyus");

  return (
    <section
      style={{
        backgroundColor: "var(--color-ntn-cream-50)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <div className="container-ntn">
        {/* Header */}
        <FadeUp>
          <div style={{ marginBottom: "16px" }}>
            <Overline color="var(--color-ntn-forest-400)">{t("label")}</Overline>
          </div>
          <h2
            className="font-title text-display-lg"
            style={{
              color: "var(--color-ntn-black-900)",
              lineHeight: 1.1,
              textTransform: "none",
              marginBottom: "60px",
            }}
          >
            {t("title")}
          </h2>
        </FadeUp>

        {/* 3×2 values grid */}
        <StaggerChildren
          speed="fast"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ rowGap: "48px", columnGap: "48px" } as React.CSSProperties}
        >
          {values.map(({ n, Icon }) => (
            <m.div key={n} variants={fadeUp}>
              <Icon
                size={26}
                strokeWidth={1.5}
                style={{ color: "var(--color-ntn-forest-400)", marginBottom: "16px" }}
              />
              <p
                style={{
                  color: "var(--color-ntn-black-900)",
                  fontSize: "15px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "8px",
                }}
              >
                {t(`value${n}Title`)}
              </p>
              <p
                className="text-body-md"
                style={{ color: "var(--color-ntn-forest-600)", lineHeight: 1.6 }}
              >
                {t(`value${n}Desc`)}
              </p>
            </m.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
