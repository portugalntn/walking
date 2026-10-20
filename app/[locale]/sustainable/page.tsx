import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { SustainablePageContent } from "@/components/sections/sustainable-page-content";
import { ChildPages } from "@/components/sections/child-pages";

export default async function SustainablePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BrandElements />
      <Navbar />
      <SustainablePageContent />
      <ChildPages mae="sustentabilidade" locale={locale} />
      <Footer />
    </>
  );
}
