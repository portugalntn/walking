import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { DestinationsPageContent } from "@/components/sections/destinations-page-content";
import { routes } from "@/lib/destinations";
import { cardFacts } from "@/lib/program-facts";
import { ChildPages } from "@/components/sections/child-pages";

export default async function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <DestinationsPageContent facts={cardFacts(routes.map((r) => r.id))} />
      <ChildPages mae="programas" locale={locale} />
      <Footer />
    </>
  );
}
