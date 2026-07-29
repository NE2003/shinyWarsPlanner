import { useMemo, useState } from "react";
import { flattenMonsters } from "./parser/flatten";
import { analyzeSeasons } from "./parser/analyzeSeasons";
import { mergeTierPoints } from "./parser/mergeTierPoints";
import { scoreRecommendations } from "./parser/scoreRecommendations";
import type { Season } from "./models/season";

const encounters = flattenMonsters();
const analyses = analyzeSeasons(encounters);
const pokemon = mergeTierPoints(analyses);

const seasons: Season[] = ["Spring", "Summer", "Autumn", "Winter"];

function App() {
  const [selectedSeason, setSelectedSeason] =
    useState<Season>("Spring");

  const recommendations = useMemo(
    () => scoreRecommendations(pokemon, selectedSeason),
    [selectedSeason]
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl p-8">
        <h1 className="mb-8 text-4xl font-bold">
          Shiny Wars Planner
        </h1>

        {/* Season selector */}
        <div className="mb-8 flex gap-2">
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                selectedSeason === season
                  ? "bg-blue-600"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {season}
            </button>
          ))}
        </div>

        <p className="mb-6 text-slate-400">
          {recommendations.length} Pokémon
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recommendations.map((p) => {
            const encounter =
              p.bestEncounterBySeason[selectedSeason];

            return (
              <div
                key={p.pokemonId}
                className="rounded-xl bg-slate-800 p-5 shadow"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {p.pokemonName}
                  </h2>

                  <div className="text-right">
                    <div className="rounded bg-green-600 px-2 py-1 text-sm font-bold">
                      {p.score.toFixed(2)}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {p.tierPoints} pts
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-sm">
                  <p>
                    <strong>Available:</strong>{" "}
                    {p.availableSeasons.join(", ")}
                  </p>

                  <p>
                    <strong>Best seasons:</strong>{" "}
                    {p.bestSeasons.join(", ")}
                  </p>

                  {p.exclusiveSeason && (
                    <p className="text-green-400">
                      Exclusive to {p.exclusiveSeason}
                    </p>
                  )}
                </div>

                <hr className="my-4 border-slate-700" />

                {encounter ? (
                  <>
                    <p>
                      <strong>Location:</strong>{" "}
                      {encounter.location}
                    </p>

                    <p>
                      <strong>Method:</strong>{" "}
                      {encounter.method}
                    </p>

                    <p>
                      <strong>Region:</strong>{" "}
                      {encounter.region}
                    </p>

                    <p>
                      <strong>Encounter:</strong>{" "}
                      {Math.max(
                        encounter.encounterRate.morning,
                        encounter.encounterRate.day,
                        encounter.encounterRate.night
                      )}
                      %
                    </p>

                    {encounter.hordeType && (
                      <p>
                        <strong>Horde:</strong>{" "}
                        {encounter.hordeType}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-red-400">
                    Not available this season
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;