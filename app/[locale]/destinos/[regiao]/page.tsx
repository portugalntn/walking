import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { RegionPageContent } from "@/components/sections/region-page-content";
import { getRegion, routesForRegion, regions } from "@/lib/destinations";

type Loc = "en" | "pt" | "es";
type Props = { params: Promise<{ locale: string; regiao: string }> };

export function generateStaticParams() {
  return regions.map((r) => ({ regiao: r.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { regiao } = await params;
  const region = getRegion(regiao);
  return { title: region ? `${region.name} · Portugal NTN Walking` : "Destino" };
}

export default async function RegionPage({ params }: Props) {
  const { locale, regiao } = await params;
  const region = getRegion(regiao);

  if (!region) notFound();

  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <RegionPageContent region={region} routes={routesForRegion(regiao)} locale={locale as Loc} />
      <Footer />
    </>
  );
}
