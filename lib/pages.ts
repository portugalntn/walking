/**
 * Page texts and images edited in FLOW (FLOW Walking > Site > Páginas).
 *
 * Each page is a content/paginas/<id>.json pulled from Supabase before the
 * build (scripts/pull-content.mjs). Its keys are of two kinds:
 *  - a message path ("aboutPage.heroTitle") holding { pt, en, es }: it replaces
 *    that string in messages/*.json, so every component that already uses t()
 *    shows the edited text without knowing about FLOW;
 *  - "img.<name>" holding an image URL (or "img.<name>" holding a list).
 * An empty value keeps the text or image that is in the code, so a page can
 * be filled in bit by bit and the site never breaks if FLOW is down.
 */

import { pageFiles } from "./content.generated";

type Loc = "en" | "pt" | "es";
type Messages = { [key: string]: string | Messages };
type PageValue = Partial<Record<Loc, string>> | string | string[] | null | undefined;

const pages = pageFiles as unknown as Record<string, Record<string, PageValue>>;

function isL(v: PageValue): v is Partial<Record<Loc, string>> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

/** messages with every non-empty page text for this locale applied on top. */
export function withPageTexts(messages: Messages, locale: string): Messages {
  const out = structuredClone(messages);
  for (const page of Object.values(pages)) {
    for (const [path, value] of Object.entries(page ?? {})) {
      if (path.startsWith("img.") || !isL(value)) continue;
      const text = (value[locale as Loc] ?? "").trim() ? value[locale as Loc]! : "";
      if (!text) continue;
      // Only replace strings that exist: a mistyped key never adds junk.
      const keys = path.split(".");
      let node: Messages | string | undefined = out;
      for (const k of keys.slice(0, -1)) node = typeof node === "object" ? node[k] : undefined;
      const last = keys[keys.length - 1];
      if (node && typeof node === "object" && typeof node[last] === "string") node[last] = text;
    }
  }
  return out;
}

/** Every edited "ui.*" text across all pages, by key (the page it sits in does not matter). */
const flat = new Map<string, Partial<Record<Loc, string>>>();
for (const page of Object.values(pages)) {
  for (const [path, value] of Object.entries(page ?? {})) if (path.startsWith("ui.") && isL(value)) flat.set(path, value);
}

function isTri(v: unknown): v is Record<Loc, string> {
  return !!v && typeof v === "object" && !Array.isArray(v) && typeof (v as Record<string, unknown>).pt === "string" && typeof (v as Record<string, unknown>).en === "string";
}

/**
 * Texts that live in the code as { en, pt, es } (labels, alt texts, grades…)
 * made editable in FLOW: each one under "<prefix>.<path>" ("ui.product.seeGallery").
 * A language left empty in FLOW keeps the code's text.
 */
export function editable<T>(prefix: string, data: T): T {
  const walk = (v: unknown, path: string): unknown => {
    if (isTri(v)) {
      const e = flat.get(path);
      if (!e) return v;
      const out = { ...v };
      for (const l of ["en", "pt", "es"] as Loc[]) if ((e[l] ?? "").trim()) out[l] = e[l]!;
      return out;
    }
    if (Array.isArray(v)) return v.map((x, i) => walk(x, `${path}.${i}`));
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, `${path}.${k}`)]));
    return v;
  };
  return walk(data, prefix) as T;
}

/** A list edited in FLOW ("lista.<name>" on a page: FAQs, blog posts…), or the code's list while it is empty. */
export function pageList<T>(pageId: string, name: string, fallback: T[]): T[] {
  const v = pages[pageId]?.[`lista.${name}`] as unknown;
  return Array.isArray(v) && v.length ? (v as T[]) : fallback;
}

/** An image set in FLOW for this page, or the one in the code. */
export function pageImage(pageId: string, name: string, fallback: string): string;
export function pageImage(pageId: string, name: string, fallback?: string): string | undefined;
export function pageImage(pageId: string, name: string, fallback?: string) {
  const v = pages[pageId]?.[`img.${name}`];
  return typeof v === "string" && v.trim() ? v.trim() : fallback;
}

/** A list of images set in FLOW for this page, or the ones in the code. */
export function pageImages(pageId: string, name: string, fallback: string[]): string[] {
  const v = pages[pageId]?.[`img.${name}`];
  const list = Array.isArray(v) ? v.filter((s): s is string => typeof s === "string" && !!s.trim()) : [];
  return list.length ? list : fallback;
}
