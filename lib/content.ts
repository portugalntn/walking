/**
 * Raw content entries (content/*.json), edited in FLOW (area Walking) and
 * pulled at build by scripts/pull-content.mjs. The shapes mirror FLOW's
 * lib/walking/esquema.ts. lib/destinations.ts, lib/programs.ts
 * and lib/region-content.ts turn them into the types the components use.
 */

import { productFiles, regionFiles } from "./content.generated";
import type { L } from "./destinations";

/** Empty optional fields come as null, "" or a missing key. */
type Opt<T> = T | null | undefined;
type LEntry = Opt<Partial<L>>;
/** Perfil de altimetria: [km, metros] ao longo do caminho. */
export type PerfilEntry = { length?: Opt<number>; source?: Opt<string>; profile?: Opt<[number, number][]> };

export type ProductEntry = {
  id: string;
  title: string;
  order?: Opt<number>;
  hidden?: Opt<boolean>;
  footer?: Opt<boolean>;
  hasPage?: Opt<boolean>;
  format: "roteiro" | "programa";
  regionId: string;
  /** FLOW > Modalidade. Wins over the `type` text for the Guided / Self-guided filter. */
  modality?: Opt<"self-guided" | "guided" | "grupo-regular" | "">;
  /** FLOW > Atividade. Missing = walk (the site is Walking; bike only shows through the filter). */
  activity?: Opt<"walk" | "bike" | "">;
  days: number;
  nights?: Opt<number>;
  type?: LEntry;
  cardImage?: Opt<string>;
  cardTagline?: LEntry;
  heroImage?: Opt<string>;
  subtitle?: LEntry;
  overview?: LEntry;
  highlights?: LEntry[];
  difficulty?: LEntry;
  grade?: Opt<string>;
  difficultyNote?: LEntry;
  season?: LEntry;
  startPoint?: LEntry;
  totalDistance?: Opt<string>;
  /** Num roteiro (1 dia): o perfil de altimetria vindo do FLOW. */
  elevationProfile?: Opt<PerfilEntry>;
  moments?: { km: number; title?: LEntry; text?: LEntry; image?: Opt<string> }[];
  itinerary?: {
    title?: LEntry;
    trail?: Opt<string>;
    description?: LEntry;
    distance?: Opt<string>;
    shape?: Opt<"" | "circular" | "linear">;
    ascent?: Opt<string>;
    walkTime?: Opt<string>;
    elevation?: Opt<{ min?: Opt<number>; avg?: Opt<number>; max?: Opt<number>; gain?: Opt<number>; loss?: Opt<number> }>;
    /** Perfil de altimetria do dia, vindo do FLOW (só km e metros: o percurso não é publicado). */
    elevationProfile?: Opt<PerfilEntry>;
    meals?: ("breakfast" | "packedLunch" | "dinner")[];
    accommodation?: Opt<string>;
    gallery?: Opt<string>[];
    note?: LEntry;
  }[];
  included?: LEntry[];
  notIncluded?: LEntry[];
  extras?: LEntry[];
  priceTiers?: { pax: number; price: number; maxPax?: Opt<number>; perPax?: Opt<boolean> }[];
  priceTiersNote?: LEntry;
  prices?: Opt<{ lowFrom?: Opt<number>; lowSingle?: Opt<number>; highFrom?: Opt<number>; highSingle?: Opt<number> }>;
  priceCondition?: LEntry;
  payment?: LEntry[];
  cancellation?: LEntry[];
};

export type RegionEntry = {
  id: string;
  name: string;
  shortName?: Opt<string>;
  /** Title for the top of the region page, with manual line breaks (FLOW). */
  heroTitle?: Opt<string>;
  hidden?: Opt<boolean>;
  /** FLOW > Onde aparece no site. Missing = everywhere (destinations made before 29/10/2026). */
  showOn?: Opt<string[]>;
  order?: Opt<number>;
  image?: Opt<string>;
  tagline?: LEntry;
  description?: LEntry;
  mapPin?: Opt<{ show?: Opt<boolean>; x?: Opt<number>; y?: Opt<number>; side?: Opt<"left" | "right">; lines?: string[] }>;
  essence?: Opt<{ title?: LEntry; body?: LEntry; image?: Opt<string>; badgeValue?: Opt<string>; badgeLabel?: LEntry }>;
  heritage?: Opt<{ show?: Opt<boolean>; title?: LEntry; body?: LEntry; gallery?: Opt<string>[] }>;
  highlights?: LEntry[];
};

const byOrder = (a: { id: string; order?: Opt<number> }, b: { id: string; order?: Opt<number> }) =>
  (a.order ?? 99) - (b.order ?? 99) || a.id.localeCompare(b.id);

/** All products, hidden ones included, in CMS order. */
export const productEntries: ProductEntry[] = Object.entries(productFiles as unknown as Record<string, Omit<ProductEntry, "id">>)
  .map(([id, e]) => ({ ...e, id }))
  .sort(byOrder);

/** All regions, hidden ones included, in CMS order. */
export const regionEntries: RegionEntry[] = Object.entries(regionFiles as unknown as Record<string, Omit<RegionEntry, "id">>)
  .map(([id, e]) => ({ ...e, id }))
  .sort(byOrder);

/**
 * Localised text. A language left empty in the CMS falls back to Portuguese,
 * then English, so a product written only in PT still reads on /en and /es.
 */
export function tl(v: LEntry): L {
  const fb = v?.pt || v?.en || v?.es || "";
  return { en: v?.en || fb, pt: v?.pt || fb, es: v?.es || fb };
}

/** Like tl(), but undefined when the field was left empty. */
export function optL(v: LEntry): L | undefined {
  return v && (v.pt || v.en || v.es) ? tl(v) : undefined;
}

/** Non-empty localised items of a list. */
export function tlList(list: Opt<LEntry[]>): L[] {
  return (list ?? []).map(optL).filter((x): x is L => !!x);
}

/** Non-empty image paths of a list. */
export function images(list: Opt<Opt<string>[]>): string[] {
  return (list ?? []).filter((x): x is string => !!x);
}
