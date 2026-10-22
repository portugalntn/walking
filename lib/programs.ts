/**
 * Full program detail data (product pages).
 * Edited in the CMS (/keystatic) and stored in content/produtos/*.json; this
 * file shapes it. Keyed by the same id used in lib/destinations.ts routes.
 * Localised text uses { en, pt, es }. Trail names are proper nouns (kept).
 * Meals are keys translated in the UI. No em dashes (house rule).
 */

import { regionLabel, type L } from "./destinations";
import type { GradeLevel } from "./grades";
import { productEntries, tl, optL, tlList, images, type PerfilEntry, type ProductEntry } from "./content";
import type { Trail } from "./trails";

/** Um perfil vindo do FLOW, se tiver pontos que cheguem para um gráfico. */
function perfil(p: PerfilEntry | null | undefined): Trail | undefined {
  const pts = (p?.profile ?? []).filter((x) => Array.isArray(x) && Number.isFinite(x[0]) && Number.isFinite(x[1]));
  if (pts.length < 2) return undefined;
  return { length: Number(p?.length) || pts[pts.length - 1][0], source: p?.source || "FLOW", profile: pts };
}

export type Day = {
  day: number;
  title: L;
  trail?: string;
  description?: L;
  distance?: string;
  shape?: "circular" | "linear";
  ascent?: string;
  /** Walking time for the day, e.g. "2h". Used mainly by 1-day routes. */
  walkTime?: string;
  /** Elevation profile of the trail, in metres. Shown as a small stats row. */
  elevation?: { min: number; avg: number; max: number; gain: number; loss: number };
  /** The day's elevation chart (km, metres), from FLOW. No coordinates: the route is not published. */
  profile?: Trail;
  meals: ("breakfast" | "packedLunch" | "dinner")[];
  accommodation?: string;
  gallery?: string[];
  note?: L;
};

/** A stop in the day, placed by its km on the trail. Drives the day timeline. */
export type Moment = {
  km: number;
  title: L;
  text: L;
  image?: string;
};

export type Program = {
  /** One-day: the elevation chart from FLOW (a GPS file in lib/trail-profiles.json wins). */
  profile?: Trail;
  id: string;
  format: "roteiro" | "programa";
  title: string;
  subtitle: L;
  region: string;
  heroImage: string;
  duration: { days: number; nights: number };
  type: L;
  difficulty: L;
  /** Walking difficulty grade (1 to 5) on the NTN scale. See lib/grades.ts. */
  grade: GradeLevel;
  season: L;
  /** Proper noun (string) or a localised phrase such as "to be confirmed". */
  startPoint: string | L;
  totalDistance: string;
  /** Paragraphs separated by a blank line ("\n\n"). Same for Day.description. */
  overview: L;
  /** Program-specific note shown under the difficulty gauge. */
  difficultyNote?: L;
  /** The day, step by step (1-day programs). */
  moments?: Moment[];
  days: Day[];
  included: L[];
  notIncluded: L[];
  extras: L[];
  highlights: L[];
  /** Season-based pricing (multi-day programs). Omit for per-group day routes. */
  prices?: {
    low: { from: number; single: number };
    /** Omit when the program has a single year-round price. */
    high?: { from: number; single: number };
  };
  /**
   * Pricing by group size (1-day guided routes). Either the group total for
   * exactly `pax` people, or (perPax) a price per person for groups of
   * `pax` to `maxPax` people, the commercial bands set in FLOW.
   */
  priceTiers?: { pax: number; price: number; maxPax?: number; perPax?: boolean }[];
  /** Note shown under the price tiers, e.g. groups above 6 on request. */
  priceTiersNote?: L;
  /** Optional commercial condition shown under the price cards. */
  priceCondition?: L;
  payment: L[];
  cancellation: L[];
};


function toProgram(p: ProductEntry): Program {
  const pr = p.prices;
  return {
    id: p.id,
    format: p.format,
    title: p.title,
    subtitle: tl(p.subtitle),
    region: regionLabel(p.regionId),
    heroImage: p.heroImage || p.cardImage || "",
    duration: { days: p.days, nights: p.nights ?? 0 },
    type: tl(p.type),
    difficulty: tl(p.difficulty),
    grade: (Number(p.grade) || 3) as GradeLevel,
    season: tl(p.season),
    startPoint: tl(p.startPoint),
    totalDistance: p.totalDistance ?? "",
    profile: perfil(p.elevationProfile),
    overview: tl(p.overview),
    difficultyNote: optL(p.difficultyNote),
    moments: p.moments?.length
      ? p.moments.map((m) => ({ km: m.km, title: tl(m.title), text: tl(m.text), image: m.image || undefined }))
      : undefined,
    days: (p.itinerary ?? []).map((d, i) => {
      const e = d.elevation;
      return {
        day: i + 1,
        title: tl(d.title),
        trail: d.trail || undefined,
        description: optL(d.description),
        distance: d.distance || undefined,
        shape: d.shape || undefined,
        ascent: d.ascent || undefined,
        walkTime: d.walkTime || undefined,
        elevation:
          e && e.min != null && e.avg != null && e.max != null && e.gain != null && e.loss != null
            ? { min: e.min, avg: e.avg, max: e.max, gain: e.gain, loss: e.loss }
            : undefined,
        profile: perfil(d.elevationProfile),
        meals: d.meals ?? [],
        accommodation: d.accommodation || undefined,
        gallery: images(d.gallery).length ? images(d.gallery) : undefined,
        note: optL(d.note),
      };
    }),
    included: tlList(p.included),
    notIncluded: tlList(p.notIncluded),
    extras: tlList(p.extras),
    highlights: tlList(p.highlights),
    prices:
      pr?.lowFrom != null
        ? {
            low: { from: pr.lowFrom, single: pr.lowSingle ?? 0 },
            high: pr.highFrom != null ? { from: pr.highFrom, single: pr.highSingle ?? 0 } : undefined,
          }
        : undefined,
    priceTiers: p.priceTiers?.length ? p.priceTiers.map((t) => ({
          pax: t.pax,
          price: t.price,
          ...(t.maxPax != null && t.maxPax > t.pax ? { maxPax: t.maxPax } : {}),
          ...(t.perPax ? { perPax: true } : {}),
        })) : undefined,
    priceTiersNote: optL(p.priceTiersNote),
    priceCondition: optL(p.priceCondition),
    payment: tlList(p.payment),
    cancellation: tlList(p.cancellation),
  };
}

/** Every product with a full page, hidden ones included (the EXCLUSIVE reads them). */
export const programs: Record<string, Program> = Object.fromEntries(
  productEntries.filter((p) => p.hasPage !== false).map((p) => [p.id, toProgram(p)])
);

export function getProgram(id: string): Program | undefined {
  return programs[id];
}
