import type { Metadata } from "next";
import { uiText } from "@/lib/ui-texts";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { RegionPageContent } from "@/components/sections/region-page-content";
import { getRegion, routesForRegion, regions } from "@/lib/destinations";
import { cardFacts } from "@/lib/program-facts";
import { customPageAt, customPages, tx } from "@/lib/custom-pages";
import { CreatedPageView } from "@/components/sections/created-page-view";

type Loc = "en" | "pt" | "es";
type Props = { params: Promise<{ locale: string; regiao: string }> };

export function generateStaticParams() {
  // also the pages created in FLOW under Destinos
  const criadas = customPages().filter((p) => p.path[0] === "destinos" && p.path.length === 2).map((p) => ({ regiao: p.path[1] }));
  return [...regions.map((r) => ({ regiao: r.id })), ...criadas];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, regiao } = await params;
  const region = getRegion(regiao);
  const criada = region ? undefined : customPageAt(["destinos", regiao]);
  if (criada) return { title: tx(criada.titulo, locale) };
  return { title: region ? region.name : uiText("meta", "destination", locale) };
}

export default async function RegionPage({ params }: Props) {
  const { locale, regiao } = await params;
  const region = getRegion(regiao);

  if (!region) {
    const criada = customPageAt(["destinos", regiao]);
    if (criada) return <CreatedPageView page={criada} locale={locale} />;
    notFound();
  }

  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <RegionPageContent
        region={region}
        routes={routesForRegion(regiao)}
        locale={locale as Loc}
        facts={cardFacts(routesForRegion(regiao).map((r) => r.id))}
      />
      <Footer />
    </>
  );
}
