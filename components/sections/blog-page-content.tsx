"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { HoverCard, FadeUp } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { posts } from "@/lib/posts";

const localeMap: Record<string, string> = { en: "en-GB", pt: "pt-PT", es: "es-ES" };

export function BlogPageContent() {
  const t = useTranslations("home.blog");
  const locale = useLocale() as "en" | "pt" | "es";

  const fmtDate = (iso: string) =>
    new Intl.DateTimeFormat(localeMap[locale] ?? "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));

  return (
    <main style={{ backgroundColor: "var(--color-ntn-white)" }}>
      {/* Hero com imagem */}
      <section className="relative flex items-end" style={{ minHeight: "58vh" }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-3.jpg"
            alt="Diário de trilhos Portugal NTN Walking"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(29,29,26,0.52) 0%, rgba(29,29,26,0.18) 40%, rgba(29,29,26,0.82) 100%)",
            }}
          />
        </div>
        <div className="container-ntn relative z-10" style={{ paddingTop: "160px", paddingBottom: "72px" }}>
          <FadeUp>
            <div style={{ marginBottom: "20px" }}>
              <Overline color="var(--color-ntn-lime)" lineColor="var(--color-ntn-lime)">{t("label")}</Overline>
            </div>
            <h1
              className="font-title"
              style={{
                color: "#fff",
                lineHeight: 1.05,
                textTransform: "none",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                marginBottom: "20px",
                maxWidth: "18ch",
              }}
            >
              {t("title")}
            </h1>
            <p className="text-body-lg" style={{ color: "rgba(255,255,255,0.82)", maxWidth: "36rem" }}>
              {t("body")}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Grid */}
      <section style={{ paddingTop: "80px", paddingBottom: "100px" }}>
        <div className="container-ntn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "40px 32px" }}>
            {posts.map((post, i) => (
              <m.div
                key={post.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.19, 1, 0.22, 1] }}
              >
                <HoverCard>
                  <a href={`/${locale}/blog/${post.slug}`} className="group block">
                    <div
                      className="relative w-full overflow-hidden mb-4"
                      style={{ aspectRatio: "3/2", borderRadius: "8px" }}
                    >
                      <Image
                        src={post.image}
                        alt={post.title[locale]}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-label" style={{ color: "var(--color-ntn-forest-400)" }}>
                        {post.category}
                      </span>
                      <span style={{ color: "var(--color-ntn-sage-200)", fontSize: "12px" }}>
                        {fmtDate(post.date)}
                      </span>
                    </div>
                    <h3
                      className="font-ui mb-2 leading-snug"
                      style={{ color: "var(--color-ntn-black-900)", fontSize: "19px", fontWeight: 600 }}
                    >
                      {post.title[locale]}
                    </h3>
                    <p className="text-body-md" style={{ color: "var(--color-ntn-forest-600)" }}>
                      {post.excerpt[locale]}
                    </p>
                  </a>
                </HoverCard>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
