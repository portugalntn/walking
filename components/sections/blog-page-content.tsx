"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { HoverCard } from "@/components/ui/animated";
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
      {/* Header */}
      <section
        style={{ backgroundColor: "var(--color-ntn-cream-50)", paddingTop: "160px", paddingBottom: "80px" }}
      >
        <div className="container-ntn">
          <div style={{ marginBottom: "16px" }}>
            <Overline color="var(--color-ntn-forest-400)">{t("label")}</Overline>
          </div>
          <h1
            className="font-title"
            style={{
              color: "var(--color-ntn-black-900)",
              lineHeight: 1.05,
              textTransform: "none",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              marginBottom: "20px",
            }}
          >
            {t("title")}
          </h1>
          <p className="text-body-lg" style={{ color: "var(--color-ntn-black-800)", maxWidth: "32rem" }}>
            {t("body")}
          </p>
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
