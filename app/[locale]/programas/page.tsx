import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { DestinationsPageContent } from "@/components/sections/destinations-page-content";
import { routes } from "@/lib/destinations";
import { cardFacts } from "@/lib/program-facts";

export default function DestinationsPage() {
  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <DestinationsPageContent facts={cardFacts(routes.map((r) => r.id))} />
      <Footer />
    </>
  );
}
