import { flattenMonsters } from "./parser/flatten";
import { analyzeLocations } from "./parser/analyzeLocations";

const encounters = flattenMonsters();
const locations = analyzeLocations(encounters);

console.log(
  JSON.stringify(
    locations.find(
      (location) =>
        location.location === "Route 212 (North)" &&
        location.method === "Grass" &&
        location.season === "Summer"
    ),
    null,
    2
  )
);