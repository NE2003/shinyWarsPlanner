import fs from "node:fs";

const INPUT = "./raw/monsters.json";
const OUTPUT = "./src/data/monsters.json";

// Remove illegal control characters but keep tabs/newlines.
const removeControlCharacters = (text) =>
  text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");

console.log("Reading raw file...");

const raw = fs.readFileSync(INPUT, "utf8");

const cleanedText = removeControlCharacters(raw);

console.log("Parsing JSON...");

const monsters = JSON.parse(cleanedText);

console.log(`Loaded ${monsters.length} Pokémon`);

const cleaned = monsters
  .map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    locations: (pokemon.locations ?? [])
      .filter((location) => location.is_horde_3x || location.is_horde_5x)
      .map((location) => ({
        season: location.season,
        region: location.region_name,
        location: location.location_name_full,
        locationID: location.location_id,
        method: location.type,
        encounterRate: {
          morning: location.rarity_morning,
          day: location.rarity_day,
          night: location.rarity_night,
        },
        
        hordeType: location.is_horde_5x ? "5x" : "3x",
      })),
  }))
  .filter((pokemon) => pokemon.locations.length > 0);

console.log("Writing cleaned file...");

fs.writeFileSync(
  OUTPUT,
  JSON.stringify(cleaned, null, 2),
  "utf8"
);

console.log("Done!");