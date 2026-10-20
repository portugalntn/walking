import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BrandElements } from "@/components/ui/brand-elements";
import { PageFadeIn } from "@/components/ui/page-fade-in";
import { CustomPageContent } from "@/components/sections/custom-page-content";
import { childrenOf, tx, type CustomPage } from "@/lib/custom-pages";

/** A page created in FLOW with the site's frame (menu and footer), and links to its own sub-pages. */
export function CreatedPageView({ page, locale }: { page: CustomPage; locale: string }) {
  const filhas = childrenOf(page.id).map((p) => ({ titulo: tx(p.titulo, locale), href: `/${locale}/${p.path.join("/")}` }));
  return (
    <>
      <PageFadeIn />
      <BrandElements />
      <Navbar />
      <CustomPageContent page={page} filhas={filhas} />
      <Footer />
    </>
  );
}
