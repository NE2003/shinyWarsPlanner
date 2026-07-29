import monsters from "../data/monsters.json";

import type {
  EncounterMethod,
  HordeType,
  FlattenedEncounter,
  Season,
} from "../models";

function parseEncounterRate(rate: string, method: EncounterMethod): number {
  if (rate === "--") {
    return 0;
  }

  const value = Number(rate.replace("%", ""));

  if (method === "Sweet Scent") {
    return value;
  }

  return value * 20;
}

function parseSeason(season: string): Season {
  switch (season) {
    case "Spring":
    case "Summer":
    case "Autumn":
    case "Winter":
    case "Any":
      return season;

    default:
      throw new Error(`Unknown season: ${season}`);
  }
}

function parseEncounterMethod(method: string): EncounterMethod {
  switch (method) {
    case "Grass":
    case "Dark Grass":
    case "Cave":
    case "Inside":
    case "Water":
    case "Sweet Scent":
      return method;

    default:
      throw new Error(`Unknown encounter method: ${method}`);
  }
}

function parseHordeType(hordeType: string): HordeType {
  switch (hordeType) {
    case "3x":
    case "5x":
      return hordeType;

    default:
      throw new Error(`Unknown horde type: ${hordeType}`);
  }
}

export function flattenMonsters(): FlattenedEncounter[] {
  const encounters: FlattenedEncounter[] = [];

  for (const pokemon of monsters) {
    for (const location of pokemon.locations) {
      const season = parseSeason(location.season);
      const method = parseEncounterMethod(location.method);
      const hordeType = parseHordeType(location.hordeType);

      encounters.push({
        pokemonId: pokemon.id,
        pokemonName: pokemon.name,

        season,
        method,

        region: location.region,
        location: location.location,

        encounterRate: {
          morning: parseEncounterRate(location.encounterRate.morning, method),
          day: parseEncounterRate(location.encounterRate.day, method),
          night: parseEncounterRate(location.encounterRate.night, method),
        },

        hordeType,
      });
    }
  }

  return encounters;
}