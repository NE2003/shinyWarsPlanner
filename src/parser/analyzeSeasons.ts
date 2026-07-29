import type {
  FlattenedEncounter,
  Season,
} from "../models";

export type PokemonSeasonAnalysis = {
  pokemonId: number;
  pokemonName: string;

  encounters: FlattenedEncounter[];

  availableSeasons: Season[];

  bestEncounterBySeason: Partial<Record<Season, FlattenedEncounter>>;

  bestSeasons: Season[];

  exclusiveSeason?: Season;
};

function getBestEncounter(
  encounters: FlattenedEncounter[]
): FlattenedEncounter {
  return encounters.reduce((best, current) => {
    const bestRate = Math.max(
      best.encounterRate.morning,
      best.encounterRate.day,
      best.encounterRate.night
    );

    const currentRate = Math.max(
      current.encounterRate.morning,
      current.encounterRate.day,
      current.encounterRate.night
    );

    if (currentRate > bestRate) {
      return current;
    }

    if (
      currentRate === bestRate &&
      current.hordeType === "5x" &&
      best.hordeType === "3x"
    ) {
      return current;
    }

    return best;
  });
}

export function analyzeSeasons(
  encounters: FlattenedEncounter[]
): PokemonSeasonAnalysis[] {
  const pokemonMap = new Map<number, FlattenedEncounter[]>();

  for (const encounter of encounters) {
    if (!pokemonMap.has(encounter.pokemonId)) {
      pokemonMap.set(encounter.pokemonId, []);
    }

    pokemonMap.get(encounter.pokemonId)!.push(encounter);
  }

  const analyses: PokemonSeasonAnalysis[] = [];

  for (const pokemonEncounters of pokemonMap.values()) {
    const first = pokemonEncounters[0];

    const availableSeasons = [
  ...new Set(
    pokemonEncounters.map((encounter) => encounter.season)
  ),
];

const bestEncounterBySeason: Partial<Record<Season, FlattenedEncounter>> = {};

for (const season of availableSeasons) {
  const encountersThisSeason = pokemonEncounters.filter(
    (encounter) => encounter.season === season
  );

  bestEncounterBySeason[season] = getBestEncounter(encountersThisSeason);
}

const bestEncounters = Object.values(bestEncounterBySeason);

const highestRate = Math.max(
  ...bestEncounters.map((encounter) =>
    Math.max(
      encounter.encounterRate.morning,
      encounter.encounterRate.day,
      encounter.encounterRate.night
    )
  )
);

const bestSeasons = Object.entries(bestEncounterBySeason)
  .filter(([, encounter]) => {
    const rate = Math.max(
      encounter.encounterRate.morning,
      encounter.encounterRate.day,
      encounter.encounterRate.night
    );

    return rate === highestRate;
  })
  .map(([season]) => season as Season);

    analyses.push({
  pokemonId: first.pokemonId,
  pokemonName: first.pokemonName,

  encounters: pokemonEncounters,

  availableSeasons,

  bestEncounterBySeason,
  bestSeasons: [],

  exclusiveSeason:
    availableSeasons.length === 1
      ? availableSeasons[0]
      : undefined,
});
  }

  return analyses;
}