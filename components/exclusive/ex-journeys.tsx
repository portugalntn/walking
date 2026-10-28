"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { journeys } from "@/lib/exclusive";

const EASE = [0.19, 1, 0.22, 1] as const;

/** Multi-day: as viagens de assinatura. Sem itinerário, distâncias nem preços:
 *  o nome elevado, o território e o que a versão EXCLUSIVE acrescenta. */
export function ExJourneys() {
  const t = useTranslations("exclusive.journeys");
  const tt = useTranslations("exclusive.territories");
  const loc = useLocale() as "en" | "pt" | "es";

  return (
    <section id="journeys" className="ex-section" style={{ paddingTop: 0 }}>
      <div className="ex-wrap">
        <div className="ex-head">
          <div>
            <p className="ex-over ex-over-accent">{t("overline")}</p>
            <h2 className="ex-serif ex-h2" style={{ marginTop: "clamp(1rem, 2vw, 1.5rem)", maxWidth: "14ch" }}>
              {t("title")}
            </h2>
          </div>
          <p className="ex-body" style={{ maxWidth: "42ch" }}>
            {t("lead")}
          </p>
        </div>

        <div className="ex-journeys">
          {journeys.map((jour, i) => (
            <m.article
              key={jour.base}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
            >
              <div className="ex-figure" style={{ aspectRatio: "3 / 4" }}>
                <Image src={jour.image} alt={jour.name[loc]} fill sizes="(max-width: 900px) 100vw, 33vw" quality={90} />
                <span className="ex-over ex-journey-days ex-dark">
                  {jour.days} {t("daysLabel")}
                </span>
              </div>
              <p className="ex-over" style={{ marginTop: "1.5rem" }}>
                {tt(`${jour.region}.name`)}
              </p>
              <h3 className="ex-serif ex-h4" style={{ marginTop: "0.6rem" }}>
                {jour.name[loc]}
              </h3>
              <p className="ex-body ex-small" style={{ marginTop: "0.9rem" }}>
                {jour.angle[loc]}
              </p>
              <a href="#enquiry" className="ex-over ex-over-accent ex-link" style={{ marginTop: "1.4rem" }}>
                {t("cta")} <span aria-hidden>&rarr;</span>
              </a>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
