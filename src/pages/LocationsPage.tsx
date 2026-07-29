import { useMemo } from "react";

import type { Season } from "../models/season";
import type { PokemonRecommendation } from "../parser/mergeTierPoints";
import type { LocationRecommendation } from "../parser/scoreLocations";

type Props = {
  locations: LocationRecommendation[];
  pokemon: PokemonRecommendation[];
  season: Season;
};

export default function LocationsPage({
  locations,
  pokemon,
  season,
}: Props) {
  const pokemonLookup = useMemo(
    () => new Map(pokemon.map((p) => [p.pokemonId, p])),
    [pokemon]
  );

  const filteredLocations = useMemo(
    () => locations.filter((location) => location.season === season),
    [locations, season]
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Locations</h1>

      <p className="mb-6 text-slate-400">
        {filteredLocations.length} encounter pools
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredLocations.map((location) => (
          <div
            key={`${location.region}-${location.location}-${location.method}-${location.season}`}
            className="rounded-xl bg-slate-800 p-5 shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{location.location}</h2>

                <p className="mt-1 text-sm text-slate-400">
                  {location.region} • {location.method}
                </p>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-green-400">
                  Avg {location.averageScore.toFixed(1)}
                </div>

                <div className="text-xs text-slate-400">
                  🌅 {location.morningScore.toFixed(1)}
                </div>

                <div className="text-xs text-slate-400">
                  ☀️ {location.dayScore.toFixed(1)}
                </div>

                <div className="text-xs text-slate-400">
                  🌙 {location.nightScore.toFixed(1)}
                </div>
              </div>
            </div>

            <hr className="my-4 border-slate-700" />

            <ul className="space-y-2">
              {location.encounters.map((encounter, index) => {
                const info = pokemonLookup.get(encounter.pokemonId);

                return (
                  <li
                    key={`${encounter.pokemonId}-${index}`}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div>{encounter.pokemonName}</div>

                      <div className="text-xs text-slate-400">
                        {info?.tierPoints ?? 0} pts
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {info?.exclusiveSeason === season && (
                        <span className="rounded bg-green-600 px-2 py-1 text-xs font-semibold">
                          Exclusive
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}