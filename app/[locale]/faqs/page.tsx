import type { Metadata } from "next";
import { uiText } from "@/lib/ui-texts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { FaqPageContent } from "@/components/sections/faq-page-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return { title: uiText("meta", "faqs", (await params).locale) };
}

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
