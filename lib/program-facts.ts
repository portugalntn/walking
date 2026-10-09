/**
 * The few facts a program card needs (distance, difficulty), resolved on the
 * server so the full program data never ships to the browser with a list.
 */

import { getProgram } from "./programs";
import type { L } from "./destinations";

export type CardFacts = { distance?: string; difficulty?: L };

export function cardFacts(ids: string[]): Record<string, CardFacts> {
  const out: Record<string, CardFacts> = {};
  for (const id of ids) {
    const p = getProgram(id);
    if (p) out[id] = { distance: p.totalDistance || undefined, difficulty: p.difficulty };
  }
  return out;
}
