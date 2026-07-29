import type { Encounter } from "./encounter";
import type { Status } from "./status";

export type SeasonType =
  | "exclusive"
  | "advantage"
  | "normal";

export type Pokemon = {
  id: number;

  name: string;

  tierPoints: number;

  priority: number;

  seasonType: SeasonType;

  seasonMultiplier: number;

  hordeMultiplier: number;

  bestEncounter: Encounter;

  encounters: Encounter[];

  status: Status;

  hunter?: string;
};