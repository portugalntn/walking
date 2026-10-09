/**
 * Elevation profiles of the 1-day programs, built with `npm run trail`
 * (scripts/trail-profile.mjs) from the operator's GPS files.
 *
 * Only distance and altitude are kept. The route coordinates are never
 * stored in the site, by decision of the company (no maps exposed).
 */

import profiles from "./trail-profiles.json";

export type Trail = {
  /** Measured length of the GPS track, in km. */
  length: number;
  /** Where the altitude came from (the GPS file or a terrain model). */
  source: string;
  /** [km, metres], evenly spaced along the walk. */
  profile: [number, number][];
};

const trails = profiles as unknown as Record<string, Trail>;

export function getTrail(id: string): Trail | undefined {
  return trails[id];
}
