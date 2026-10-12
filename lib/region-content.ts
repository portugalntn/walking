/**
 * Editorial content for each destination (region) page.
 * Edited in the CMS (/keystatic) and stored in content/destinos/*.json.
 * Localised text uses { en, pt, es }. No em dashes (house rule).
 * Keyed by Region.id (see lib/destinations.ts).
 */

import type { L } from "./destinations";
import { regionEntries, tl, tlList, images } from "./content";

export type RegionContent = {
  essence: {
    title: L;
    body: L;
    image: string;
    badgeValue: string;
    badgeLabel: L;
  };
  heritage?: {
    title: L;
    body: L;
    gallery: string[];
  };
  highlights: L[];
};

export const regionContent: Record<string, RegionContent> = Object.fromEntries(
  regionEntries.map((r) => [
    r.id,
    {
      essence: {
        title: tl(r.essence?.title),
        body: tl(r.essence?.body),
        image: r.essence?.image || r.image || "",
        badgeValue: r.essence?.badgeValue ?? "",
        badgeLabel: tl(r.essence?.badgeLabel),
      },
      heritage: r.heritage?.show
        ? { title: tl(r.heritage.title), body: tl(r.heritage.body), gallery: images(r.heritage.gallery) }
        : undefined,
      highlights: tlList(r.highlights),
    },
  ])
);
