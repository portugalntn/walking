"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { exImages } from "@/lib/exclusive";

/** Capa: a fotografia inteira, o título ao centro (o único texto centrado da
 *  página) e os quatro territórios por baixo. Animações em CSS, para que a
 *  capa apareça composta mesmo antes de o JavaScript carregar. */
export function ExHero() {
  const t = useTranslations("exclusive.hero");

  return (
    <section className="ex-dark ex-hero">
      <div className="ex-hero-media" aria-hidden>
        <div className="ex-settle" style={{ position: "absolute", inset: 0 }}>
          <Image
            src={exImages.hero}
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            style={{ objectFit: "cover", filter: "saturate(0.78) contrast(1.04) brightness(0.8)" }}
          />
        </div>
        <div className="ex-hero-veil" />
      </div>

      <div className="ex-wrap ex-hero-inner">
        <p className="ex-over ex-over-accent ex-rise" style={{ animationDelay: "0.2s" }}>
          {t("overline")}
        </p>
        <h1 className="ex-serif ex-hero-title ex-rise" style={{ animationDelay: "0.35s" }}>
          {t.rich("title", { em: (c) => <em className="ex-serif-i">{c}</em> })}
        </h1>
        <p className="ex-body ex-hero-lead ex-rise" style={{ animationDelay: "0.6s" }}>
          {t("lead")}
        </p>
        <div className="ex-rise" style={{ animationDelay: "0.8s", marginTop: "clamp(2rem, 3.5vw, 2.75rem)", display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#enquiry" className="ex-btn ex-btn-solid">
            {t("cta")}
          </a>
          <a href="#territorios" className="ex-btn">
            {t("discover")}
          </a>
        </div>
      </div>

      <div className="ex-wrap ex-rise" style={{ position: "relative", paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)", animationDelay: "1s" }}>
        <ul className="ex-hero-regions">
          {["r1", "r2", "r3", "r4"].map((k) => (
            <li key={k} className="ex-over">
              {t(k)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
