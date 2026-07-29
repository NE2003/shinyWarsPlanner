import type { LocationAnalysis } from "../models/locations";
import type { PokemonRecommendation } from "./mergeTierPoints";

export type LocationRecommendation = LocationAnalysis & {
  morningScore: number;
  dayScore: number;
  nightScore: number;
  averageScore: number;
};

export function scoreLocations(
  locations: LocationAnalysis[],
  pokemon: PokemonRecommendation[]
): LocationRecommendation[] {
  const pokemonLookup = new Map(
    pokemon.map((p) => [p.pokemonId, p.tierPoints])
  );

  return locations
    .map((location) => {
      let morningScore = 0;
      let dayScore = 0;
      let nightScore = 0;

      for (const encounter of location.encounters) {
        const tierPoints =
          pokemonLookup.get(encounter.pokemonId) ?? 0;

        morningScore +=
          tierPoints * (encounter.encounterRate.morning / 100);

        dayScore +=
          tierPoints * (encounter.encounterRate.day / 100);

        nightScore +=
          tierPoints * (encounter.encounterRate.night / 100);
      }

      const averageScore =
        (morningScore + dayScore + nightScore) / 3;

      return {
        ...location,
        morningScore,
        dayScore,
        nightScore,
        averageScore,
      };
    })
    .sort((a, b) => b.averageScore - a.averageScore);
}