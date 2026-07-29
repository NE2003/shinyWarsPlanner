import type {
  EncounterRate,
  HordeType,
  Season,
} from ".";
import type { EncounterMethod } from "./EncounterMethod";

export type FlattenedEncounter = {
  pokemonId: number;
  pokemonName: string;
  season: Season;
  method: EncounterMethod;
  region: string;
  location: string;
  encounterRate: EncounterRate;
  hordeType: HordeType;
};