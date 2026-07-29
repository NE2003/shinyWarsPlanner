import type { FlattenedEncounter } from "./FlattenedEncounter";
import type { Season } from "./season";

export type LocationAnalysis = {
  region: string;
  location: string;
  locationId: number;
  method: string;
  season: Season;

  encounters: FlattenedEncounter[];
};