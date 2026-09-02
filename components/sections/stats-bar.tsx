"use client";

import { StaggerChildren, CountUp } from "@/components/ui/animated";
import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const stats = [
  { value: 12, suffix: "", label: "Years of expertise", sublabel: "Building & operating trails" },
  { value: 9,  suffix: "+", label: "Active routes",     sublabel: "1 · 3 · 5 · 8 · 11 days" },
  { value: 4,  suffix: "",  label: "Regions covered",   sublabel: "North to South Portugal" },
  { value: 100, suffix: "%", label: "Own programmes",   sublabel: "Designed and certified by us" },
];

export function StatsBar() {
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
              key={stat.label}
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
                {stat.label}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.75rem",
                  lineHeight: 1.4,
                }}
              >
                {stat.sublabel}
              </p>
            </m.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
