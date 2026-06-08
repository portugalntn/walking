"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FadeUp, HoverCard } from "@/components/ui/animated";
import { Overline } from "@/components/ui/overline";
import { posts } from "@/lib/posts";

const localeMap: Record<string, string> = { en: "en-GB", pt: "pt-PT", es: "es-ES" };

export function BlogTeaserSection() {
  const t = useTranslations("home.blog");
  const locale = useLocale() as "en" | "pt" | "es";
  const featured = posts.slice(0, 3);

  const fmtDate = (iso: string) =>
    new Intl.DateTimeFormat(localeMap[locale] ?? "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));

  return (
    <section
      id="blog"
      style={{
        backgroundColor: "var(--color-ntn-white)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <div className="container-ntn">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <FadeUp>
            <div style={{ marginBottom: "16px" }}>
              <Overline color="var(--color-ntn-forest-400)">{t("label")}</Overline>
            </div>
            <h2
              className="font-title text-display-lg"
              style={{ color: "var(--color-ntn-black-900)", lineHeight: 1.1, textTransform: "none" }}
            >
              {t("title")}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <a
              href={`/${locale}/blog`}
              className="text-label inline-flex items-center gap-2"
              style={{ color: "var(--color-ntn-forest-400)" }}
            >
              {t("viewAll")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </FadeUp>
        </div>

        {/* 3 featured posts */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "32px" }}>
          {featured.map((post, i) => (
            <m.div
              key={post.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
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
                    <span
                      className="text-label"
                      style={{ color: "var(--color-ntn-forest-400)" }}
                    >
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
  );
}
