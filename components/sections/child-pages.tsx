import { childrenOf, tx } from "@/lib/custom-pages";
import { uiText } from "@/lib/ui-texts";
import { SubPages } from "@/components/sections/custom-page-content";

/** The pages created in FLOW under a fixed page ("sustentabilidade", "sobre"…), as links at its end. */
export function ChildPages({ mae, locale }: { mae: string; locale: string }) {
  const links = childrenOf(mae).map((p) => ({ titulo: tx(p.titulo, locale), href: `/${locale}/${p.path.join("/")}` }));
  return <SubPages links={links} titulo={uiText("layout", "subpages", locale)} />;
}
