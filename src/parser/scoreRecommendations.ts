import type { Season } from "../models/season";
import type { PokemonRecommendation } from "./mergeTierPoints";

export function scoreRecommendations(
  pokemon: PokemonRecommendation[],
  selectedSeason: Season
): PokemonRecommendation[] {
  return pokemon
    .map((p) => {
      let score = p.tierPoints;

      // Not available this season
      if (!p.availableSeasons.includes(selectedSeason)) {
        return {
          ...p,
          score: 0,
        };
      }

      // Exclusive season bonus
      if (p.exclusiveSeason === selectedSeason) {
        score *= 2;
      }
      // Otherwise, best season bonus
      else if (p.bestSeasons.includes(selectedSeason)) {
        score *= 1.5;
      }

      // Horde bonus
      const encounter = p.bestEncounterBySeason[selectedSeason];

      if (encounter?.hordeType === "5x") {
        score *= 1.25;
      }

      return {
        ...p,
        score,
      };
    })
    .filter((p) => p.tierPoints > 0)
    .sort((a, b) => b.score - a.score);
}