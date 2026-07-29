import type { FlattenedEncounter } from "../models/FlattenedEncounter";
import type { Season } from "../models/season";

export type LocationAnalysis = {
  region: string;
  location: string;
  method: string;
  season: Season;

  encounters: FlattenedEncounter[];
};