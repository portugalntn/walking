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
