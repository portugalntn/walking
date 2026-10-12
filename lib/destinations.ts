/**
 * Destinations data — regions (hero carousel) + route products (grid).
 * The content is edited in the CMS (/keystatic) and lives in
 * content/destinos/*.json and content/produtos/*.json; this file shapes it.
 * Localised fields use { en, pt, es }.
 */

import { productEntries, regionEntries, tl } from "./content";

export type L = { en: string; pt: string; es: string };

export type Region = {
  id: string;
  name: string;
  /** Shorter name for cards, when the full one is long. */
  shortName?: string;
  image: string;
  /** Durations on offer, e.g. "1 · 8". Derived from the visible products. */
  durations: string;
  /** Number of visible products. Derived. */
  routes: number;
  tagline: L;
  description: L;
  /** Kept in the data but left out of the public site (no visible programs). */
  hidden?: boolean;
  /** Pin on the home map (viewBox 560 × 994). */
  mapPin?: { x: number; y: number; side: "left" | "right"; lines: string[] };
};

export type RouteProduct = {
  id: string;
  regionId: string; // matches a Region.id (groups products under a destination)
  region: string;
  duration: string; // "1 Day" | "8 Days" | "11 Days"
  days: number;
  format: "roteiro" | "programa"; // roteiro = 1-day walk, programa = multiday
  type: L;
  image: string;
  title: string;
  tagline: L;
  /** Kept for the EXCLUSIVE and for later, but not shown on the public site. */
  hidden?: boolean;
  /** Listed in the footer. */
  footer?: boolean;
};

/** Region name as shown on product cards and pages. */
export function regionLabel(regionId: string): string {
  const r = regionEntries.find((e) => e.id === regionId);
  return r ? r.shortName || r.name : "";
}

const allRoutes: RouteProduct[] = productEntries.map((p) => ({
  id: p.id,
  regionId: p.regionId,
  region: regionLabel(p.regionId),
  duration: p.days === 1 ? "1 Day" : `${p.days} Days`,
  days: p.days,
  format: p.format,
  type: tl(p.type),
  image: p.cardImage || p.heroImage || "",
  title: p.title,
  tagline: tl(p.cardTagline),
  hidden: p.hidden || undefined,
  footer: p.footer || undefined,
}));

const allRegions: Region[] = regionEntries.map((r) => {
  const own = allRoutes.filter((p) => p.regionId === r.id && !p.hidden);
  const pin = r.mapPin;
  return {
    id: r.id,
    name: r.name,
    shortName: r.shortName || undefined,
    image: r.image || "",
    durations: [...new Set(own.map((p) => p.days))].sort((a, b) => a - b).join(" · "),
    routes: own.length,
    tagline: tl(r.tagline),
    description: tl(r.description),
    hidden: r.hidden || undefined,
    mapPin:
      pin?.show && pin.x != null && pin.y != null
        ? { x: pin.x, y: pin.y, side: pin.side ?? "right", lines: pin.lines?.length ? pin.lines : [r.name] }
        : undefined,
  };
});

/** Public lists: hidden regions and routes stay in the data but are not shown. */
export const regions: Region[] = allRegions.filter((r) => !r.hidden);
export const routes: RouteProduct[] = allRoutes.filter((r) => !r.hidden);

/** True when a route exists but is hidden from the public site. */
export function isHiddenRoute(id: string): boolean {
  return allRoutes.some((r) => r.id === id && r.hidden);
}

/** Region (destination) by its id. */
export function getRegion(id: string): Region | undefined {
  return regions.find((r) => r.id === id);
}

/** All route products that belong to a given region (destination). */
export function routesForRegion(regionId: string): RouteProduct[] {
  return routes.filter((r) => r.regionId === regionId);
}
