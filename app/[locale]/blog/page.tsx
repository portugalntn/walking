import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { BlogPageContent } from "@/components/sections/blog-page-content";
import { ChildPages } from "@/components/sections/child-pages";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <BrandElements />
      <Navbar />
      <BlogPageContent />
      <ChildPages mae="blog" locale={locale} />
      <Footer />
    </>
  );
}
