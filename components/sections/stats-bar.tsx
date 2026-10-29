"use client";

import { useTranslations } from "next-intl";
import { StaggerChildren, CountUp } from "@/components/ui/animated";
import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { regionsIn, routes } from "@/lib/destinations";

/**
 * The wording comes from home.statsBar in each locale. Active routes and
 * regions are counted from the data, so a product published in FLOW counts.
 */
const stats = [
  { key: "stat1", value: 12,  suffix: "" },
  { key: "stat2", value: routes.length, suffix: "" },
  { key: "stat3", value: regionsIn("home").length, suffix: "" },
  { key: "stat4", value: 100, suffix: "%" },
];

export function StatsBar() {
  const t = useTranslations("home.statsBar");

  return (
    <section style={{ backgroundColor: "var(--color-ntn-forest-400)" }}>
      <div
        className="container-ntn"
        style={{ paddingTop: "44px", paddingBottom: "44px" }}
      >
        <StaggerChildren
          speed="fast"
          className="grid grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <m.div
              key={stat.key}
              variants={fadeUp}
              className="flex flex-col items-center text-center px-6"
              style={{
                borderLeft:
                  i === 0 ? "none" : "1px solid rgba(255,255,255,0.14)",
                paddingTop: "12px",
                paddingBottom: "12px",
              }}
            >
              <p
                className="font-title text-display-lg mb-2"
                style={{ color: "var(--color-ntn-white)", lineHeight: 1 }}
              >
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p
                className="text-label mb-1.5"
                style={{ color: "var(--color-ntn-lime)", letterSpacing: "0.14em" }}
              >
                {t(`${stat.key}Label`)}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.75rem",
                  lineHeight: 1.4,
                }}
              >
                {t(`${stat.key}Sub`)}
              </p>
            </m.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
