/**
 * Pages created in FLOW (Marketing > Site > Páginas > Criar página).
 *
 * Each one is a content/paginas/<id>.json like the fixed pages, marked with
 * `_tipo: "criada"`. It says under which page it hangs (`_mae`), its short
 * address (`_slug`) and the blocks it is made of (`_blocos`, chosen from a
 * layout when it was created). The blocks' texts and photos are "b<n>.<field>".
 * A hidden page (`_oculta`) is not built.
 */

import { pageFiles } from "./content.generated";

type Loc = "en" | "pt" | "es";
export type Tri = Partial<Record<Loc, string>>;
export type BlockType = "hero" | "texto" | "faixa" | "textoImagem" | "grelha" | "numeros" | "cartoes" | "galeria" | "fecho";
export type Block = { tipo: BlockType; i: number; d: Record<string, unknown> };
export type CustomPage = { id: string; path: string[]; titulo: Tri; mae: string; blocos: Block[]; dados: Record<string, unknown> };

/** Where the fixed pages live on the site (the FLOW ids). */
const FIXED_PATHS: Record<string, string[]> = {
  home: [],
  programas: ["programas"],
  destinos: ["destinos"],
  sobre: ["about"],
  sustentabilidade: ["sustainable"],
  faq: ["faqs"],
  graus: ["grading"],
  blog: ["blog"],
  portal: ["portal"],
};

const all = pageFiles as unknown as Record<string, Record<string, unknown>>;

function raw(): [string, Record<string, unknown>][] {
  return Object.entries(all).filter(([, d]) => d?._tipo === "criada" && typeof d._slug === "string" && d._slug);
}

function pathOf(id: string, seen = new Set<string>()): string[] | null {
  const d = all[id];
  if (!d || seen.has(id)) return null;
  seen.add(id);
  const mae = String(d._mae ?? "home");
  const base = FIXED_PATHS[mae] ?? (all[mae]?._tipo === "criada" ? pathOf(mae, seen) : null);
  return base ? [...base, String(d._slug)] : null;
}

/** Every visible page created in FLOW, with its full path. */
export function customPages(): CustomPage[] {
  return raw()
    .filter(([, d]) => !d._oculta)
    .map(([id, d]) => {
      const blocos = (Array.isArray(d._blocos) ? (d._blocos as string[]) : []).map((tipo, i) => ({
        tipo: tipo as BlockType,
        i,
        d: Object.fromEntries(
          Object.entries(d)
            .filter(([k]) => k.startsWith(`b${i}.`))
            .map(([k, v]) => [k.slice(`b${i}.`.length), v])
        ),
      }));
      return { id, path: pathOf(id) ?? [], titulo: (d._titulo as Tri) ?? {}, mae: String(d._mae ?? "home"), blocos, dados: d };
    })
    .filter((p) => p.path.length > 0);
}

export function customPageAt(path: string[]): CustomPage | undefined {
  const k = path.join("/");
  return customPages().find((p) => p.path.join("/") === k);
}

/** The pages created under a page (fixed or created), for the "Também nesta secção" links. */
export function childrenOf(mae: string): CustomPage[] {
  return customPages().filter((p) => p.mae === mae);
}

export function tx(v: unknown, locale: string): string {
  if (!v || typeof v !== "object") return "";
  const t = v as Tri;
  return ((t[locale as Loc] ?? "").trim() || (t.pt ?? "").trim() || (t.en ?? "").trim()) as string;
}
