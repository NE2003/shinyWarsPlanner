import type { Season } from "./season";

export type HordeType = "3x" | "5x";

export type EncounterRate = {
  morning: number;
  day: number;
  night: number;
};

export type Encounter = {
  season: Season;

  region: string;

  location: string;

  available: boolean;

  encounterRate: EncounterRate;

  hordeType: HordeType;

  method: string;
};