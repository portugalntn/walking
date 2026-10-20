import type { Metadata } from "next";
import { uiText } from "@/lib/ui-texts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { DestinosHubContent } from "@/components/sections/destinos-hub-content";
import { ChildPages } from "@/components/sections/child-pages";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return { title: uiText("meta", "destinations", (await params).locale) };
}

export default async function DestinosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <DestinosHubContent />
      <ChildPages mae="destinos" locale={locale} />
      <Footer />
    </>
  );
}
