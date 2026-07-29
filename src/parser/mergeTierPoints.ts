import { tierPoints } from "../data/tierPoints";
import type { PokemonSeasonAnalysis } from "./analyzeSeasons";

export type PokemonRecommendation = PokemonSeasonAnalysis & {
  tierPoints: number;
  score: number;
};

export function mergeTierPoints(
  analyses: PokemonSeasonAnalysis[]
): PokemonRecommendation[] {
  return analyses.map((analysis) => {
    const points = tierPoints[analysis.pokemonId] ?? 0;

    return {
      ...analysis,
      tierPoints: points,
      score: 0,
    };
  });
}