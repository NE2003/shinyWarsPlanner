import type { FlattenedEncounter } from "../models/FlattenedEncounter";
import type { LocationAnalysis } from "../models/locations";

export function analyzeLocations(
  encounters: FlattenedEncounter[],
): LocationAnalysis[] {
  const locationMap = new Map<string, FlattenedEncounter[]>();

  // Group encounters by region + location + method + season
  for (const encounter of encounters) {
    const key = [
      encounter.region,
      encounter.location,
      encounter.method,
      encounter.season,
    ].join("|");

    if (!locationMap.has(key)) {
      locationMap.set(key, []);
    }

    locationMap.get(key)!.push(encounter);
  }

  // Convert map into LocationAnalysis objects
  const analyses: LocationAnalysis[] = [];

  for (const encounters of locationMap.values()) {
    const first = encounters[0];

    analyses.push({
      region: first.region,
      location: first.location,
      method: first.method,
      season: first.season,
      encounters,
    });
  }

  return analyses;
}