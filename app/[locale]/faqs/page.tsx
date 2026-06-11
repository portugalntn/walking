import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { FaqPageContent } from "@/components/sections/faq-page-content";

export const metadata: Metadata = { title: "FAQs" };

export default function FaqsPage() {
  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <FaqPageContent />
      <Footer />
    </>
  );
}
