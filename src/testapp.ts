import { flattenMonsters } from "./parser/flatten";
import { analyzeSeasons } from "./parser/analyzeSeasons";
import { mergeTierPoints } from "./parser/mergeTierPoints";

const encounters = flattenMonsters();
const analysis = analyzeSeasons(encounters);
const recommendations = mergeTierPoints(analysis);

console.log(
  JSON.stringify(
    recommendations.find((pokemon) => pokemon.pokemonId === 10),
    null,
    2
  )
);