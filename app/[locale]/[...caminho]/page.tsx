import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreatedPageView } from "@/components/sections/created-page-view";
import { customPageAt, customPages, tx } from "@/lib/custom-pages";
import { routing } from "@/i18n/routing";

/** Pages created in FLOW (Marketing > Site > Páginas > Criar página), at the path of their parent page. */
type Props = { params: Promise<{ locale: string; caminho: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // /destinos/<x> and /programas/<x> are served by their own dynamic routes.
  const pages = customPages().filter((p) => p.path[0] !== "destinos" && p.path[0] !== "programas");
  return routing.locales.flatMap((locale) => pages.map((p) => ({ locale, caminho: p.path })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, caminho } = await params;
  const page = customPageAt(caminho.map(decodeURIComponent));
  return page ? { title: tx(page.titulo, locale) } : {};
}

export default async function CreatedPage({ params }: Props) {
  const { locale, caminho } = await params;
  const page = customPageAt(caminho.map(decodeURIComponent));
  if (!page) notFound();
  return <CreatedPageView page={page} locale={locale} />;
}
