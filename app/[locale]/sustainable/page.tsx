import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { SustainablePageContent } from "@/components/sections/sustainable-page-content";

export default function SustainablePage() {
  return (
    <>
      <BrandElements />
      <Navbar />
      <SustainablePageContent />
      <Footer />
    </>
  );
}
