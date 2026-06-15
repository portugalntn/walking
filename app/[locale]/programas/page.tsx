import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { DestinationsPageContent } from "@/components/sections/destinations-page-content";

export default function DestinationsPage() {
  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <DestinationsPageContent />
      <Footer />
    </>
  );
}
