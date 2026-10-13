/**
 * The few facts a program card needs (distance, difficulty, and for the wide
 * card a subtitle and three highlights), resolved on the server so the full
 * program data never ships to the browser with a list.
 */

import { getProgram } from "./programs";
import type { L } from "./destinations";

export type CardFacts = { distance?: string; difficulty?: L; subtitle?: L; highlights?: L[] };

export function cardFacts(ids: string[]): Record<string, CardFacts> {
  const out: Record<string, CardFacts> = {};
  for (const id of ids) {
    const p = getProgram(id);
    if (p) {
      out[id] = {
        distance: p.totalDistance || undefined,
        difficulty: p.difficulty,
        subtitle: p.subtitle,
        highlights: p.highlights.slice(0, 3),
      };
    }
  }
  return out;
}
