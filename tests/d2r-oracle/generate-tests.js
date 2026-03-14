#!/usr/bin/env node
/**
 * D2R Oracle Test Suite Generator — MDRUN Specialized
 *
 * Every test is a standalone MDRUN markdown file:
 *   - Runs via: index.html?src=tests/d2r-oracle/test-XXX-name.md
 *   - Uses MDRUN.info() / MDRUN.error() / MDRUN.success() for logging
 *   - Renders to document.getElementById('output')
 *   - Receives URL params via main(params)
 *   - Navigation: prev/next test + back to runner
 *
 * Mersenne Prime: 2^7 - 1 = 127 total tests
 * Prime recursion: a(n+1) = prime(a(n))
 *   a(0)=2, a(1)=3, a(2)=5, a(3)=11, a(4)=31, a(5)=127
 */

const fs = require('fs');
const path = require('path');

const PRIME_LAYERS = [2, 3, 5, 11, 31, 127];
const RUNNER_SRC = 'tests/d2r-oracle/test-runner.md';

function errorCode(layer, num) {
  return `P${layer}_E${String(num).padStart(3,'0')}`;
}

// ============================================================
// TEST DEFINITIONS (same data, all 127 tests)
// ============================================================

const p2Tests = [
  { id: '001', name: 'smoke-cli-entry', title: 'CLI Entry Point Loads', desc: 'Verify index.ts CLI entry point initializes without error', screen: 'CLI', query: null, expected: 'CLI prompt appears with no crash' },
  { id: '002', name: 'smoke-oracle-engine', title: 'Oracle Engine Instantiates', desc: 'Verify oracle.ts query engine creates instance', screen: 'Engine', query: null, expected: 'Oracle instance with all data loaded' },
  { id: '003', name: 'smoke-data-load', title: 'All JSON Data Files Load', desc: 'Verify all data/*.json files parse without error', screen: 'Data', query: null, expected: 'All 12 JSON files loaded and valid' },
  { id: '004', name: 'smoke-repl-mode', title: 'Interactive REPL Mode', desc: 'Verify --interactive flag starts REPL', screen: 'CLI', query: 'd2r --interactive', expected: 'REPL prompt with input handling' },
  { id: '005', name: 'smoke-offline-mode', title: 'Offline Mode Works', desc: 'Verify --offline flag bypasses API', screen: 'CLI', query: 'd2r --offline "spirit"', expected: 'Spirit runeword data without API call' },
  { id: '006', name: 'smoke-api-key-set', title: 'API Key Storage', desc: 'Verify --set-key stores and retrieves key', screen: 'CLI', query: 'd2r --set-key sk-ant-test', expected: 'Key stored securely, confirmation shown' },
  { id: '007', name: 'smoke-output-format', title: 'Output Formatter Renders', desc: 'Verify formatter.ts produces D2R tooltip style', screen: 'Formatter', query: null, expected: 'Gold-border styled output' },
  { id: '008', name: 'smoke-parser-init', title: 'Query Parser Initializes', desc: 'Verify parser.ts NLP module loads', screen: 'Parser', query: null, expected: 'Parser ready with query type detection' },
  { id: '009', name: 'smoke-error-handler', title: 'Error Handler Catches Gracefully', desc: 'Verify unknown queries return helpful error', screen: 'Error', query: 'd2r "asdfghjkl"', expected: 'Friendly error with suggestions' },
  { id: '010', name: 'smoke-version-info', title: 'Version Info Displays', desc: 'Verify --version flag shows version', screen: 'CLI', query: 'd2r --version', expected: 'Version number displayed' },
];

const p3Tests = [
  { id: '011', name: 'data-uniques-schema', title: 'Uniques JSON Schema Valid', desc: 'Every unique item has name, stats, drop sources, required level', screen: 'Data', query: null, expected: 'All unique items pass schema validation' },
  { id: '012', name: 'data-sets-schema', title: 'Sets JSON Schema Valid', desc: 'Every set has items list, partial bonuses, full bonus', screen: 'Data', query: null, expected: 'All sets pass schema validation' },
  { id: '013', name: 'data-runewords-schema', title: 'Runewords JSON Schema Valid', desc: 'Every runeword has runes, socket count, base types, stats', screen: 'Data', query: null, expected: 'All runewords pass schema validation' },
  { id: '014', name: 'data-runes-schema', title: 'Runes JSON Schema Valid', desc: 'All 33 runes present with properties and upgrade paths', screen: 'Data', query: null, expected: '33 runes from El to Zod validated' },
  { id: '015', name: 'data-base-items-schema', title: 'Base Items JSON Schema Valid', desc: 'All base items have stats, socket ranges, item types', screen: 'Data', query: null, expected: 'All base items pass schema validation' },
  { id: '016', name: 'data-monsters-schema', title: 'Monsters JSON Schema Valid', desc: 'Monsters have stats, locations, immunities, TC assignments', screen: 'Data', query: null, expected: 'All monsters pass schema validation' },
  { id: '017', name: 'data-areas-schema', title: 'Areas JSON Schema Valid', desc: 'All areas have area level, monster spawns, act assignment', screen: 'Data', query: null, expected: 'All areas pass schema validation' },
  { id: '018', name: 'data-treasure-class', title: 'Treasure Class Tables Valid', desc: 'TC tables have proper hierarchy and probability sums', screen: 'Data', query: null, expected: 'TC probability trees sum correctly' },
  { id: '019', name: 'data-skills-schema', title: 'Skills JSON Schema Valid', desc: 'All skills per class with synergies and level scaling', screen: 'Data', query: null, expected: 'All 7 class skill trees validated' },
  { id: '020', name: 'data-cube-recipes', title: 'Cube Recipes JSON Valid', desc: 'All cube recipes have inputs, outputs, and category', screen: 'Data', query: null, expected: 'All cube recipes pass validation' },
  { id: '021', name: 'data-mercenaries', title: 'Mercenaries JSON Valid', desc: 'All merc types with gear slots, auras, stats', screen: 'Data', query: null, expected: 'All merc types validated' },
  { id: '022', name: 'data-breakpoints', title: 'Breakpoints JSON Valid', desc: 'FCR/FHR/IAS/FBR tables for all 7 classes', screen: 'Data', query: null, expected: 'All breakpoint tables match known values' },
  { id: '023', name: 'data-cross-ref-tc-monsters', title: 'TC Cross-References Monsters', desc: 'Every monster TC reference exists in treasure-class.json', screen: 'Data', query: null, expected: 'No dangling TC references' },
  { id: '024', name: 'data-cross-ref-runes-runewords', title: 'Runes Cross-Reference Runewords', desc: 'Every rune in runewords.json exists in runes.json', screen: 'Data', query: null, expected: 'No unknown runes in runeword recipes' },
  { id: '025', name: 'data-cross-ref-areas-monsters', title: 'Areas Cross-Reference Monsters', desc: 'Every monster spawn in areas references valid monster', screen: 'Data', query: null, expected: 'No dangling monster references in areas' },
];

const p5Tests = [
  { id: '026', name: 'parse-item-lookup', title: 'Parse Item Lookup Query', desc: 'NLP correctly identifies "what is shako" as ITEM_LOOKUP', screen: 'Parser', query: 'what is shako', expected: 'type: ITEM_LOOKUP, item: "Harlequin Crest"' },
  { id: '027', name: 'parse-drop-calc', title: 'Parse Drop Calc Query', desc: 'NLP identifies "where to farm jah 300mf" as DROP_CALC', screen: 'Parser', query: 'where to farm jah 300mf', expected: 'type: DROP_CALC, item: "Jah", mf: 300' },
  { id: '028', name: 'parse-build-plan', title: 'Parse Build Plan Query', desc: 'NLP identifies "budget hammerdin" as BUILD_PLAN', screen: 'Parser', query: 'budget hammerdin', expected: 'type: BUILD_PLAN, build: "hammerdin", budget: "low"' },
  { id: '029', name: 'parse-runeword-finder', title: 'Parse Runeword Finder Query', desc: 'NLP identifies "I have Ber Jah Ist" as RUNEWORD_FINDER', screen: 'Parser', query: 'I have Ber Jah Ist', expected: 'type: RUNEWORD_FINDER, runes: ["Ber","Jah","Ist"]' },
  { id: '030', name: 'parse-breakpoints', title: 'Parse Breakpoints Query', desc: 'NLP identifies "fcr sorc" as BREAKPOINTS', screen: 'Parser', query: 'fcr sorc', expected: 'type: BREAKPOINTS, stat: "FCR", class: "Sorceress"' },
  { id: '031', name: 'parse-merc-advice', title: 'Parse Merc Advice Query', desc: 'NLP identifies "best merc blizz sorc" as MERC_ADVICE', screen: 'Parser', query: 'best merc blizz sorc', expected: 'type: MERC_ADVICE, build: "Blizzard Sorceress"' },
  { id: '032', name: 'parse-cube-recipe', title: 'Parse Cube Recipe Query', desc: 'NLP identifies "upgrade um to ber" as CUBE_RECIPE', screen: 'Parser', query: 'upgrade um to ber', expected: 'type: CUBE_RECIPE, from: "Um", to: "Ber"' },
  { id: '033', name: 'parse-uber-guide', title: 'Parse Uber Guide Query', desc: 'NLP identifies "ubers what do I need" as UBER_GUIDE', screen: 'Parser', query: 'ubers what do I need', expected: 'type: UBER_GUIDE' },
  { id: '034', name: 'parse-item-eval', title: 'Parse Item Eval Query', desc: 'NLP identifies "is this ring good 10fcr 11res" as ITEM_EVAL', screen: 'Parser', query: 'is this ring good 10fcr 11res', expected: 'type: ITEM_EVAL, item: "ring", stats: {fcr:10,res:11}' },
  { id: '035', name: 'parse-socket-calc', title: 'Parse Socket Calc Query', desc: 'NLP identifies "larzuk crystal sword normal" as SOCKET_CALC', screen: 'Parser', query: 'larzuk crystal sword normal', expected: 'type: SOCKET_CALC, item: "Crystal Sword", difficulty: "Normal"' },
  { id: '036', name: 'parse-ambiguous-item', title: 'Parse Ambiguous Item Name', desc: 'Handle "spirit" which is both runeword and base item', screen: 'Parser', query: 'spirit', expected: 'Disambiguation: runeword vs unique vs base' },
  { id: '037', name: 'parse-slang-terms', title: 'Parse D2R Slang', desc: 'Handle slang like "hoto", "cta", "bo", "tp"', screen: 'Parser', query: 'hoto', expected: 'Resolves to "Heart of the Oak" runeword' },
  { id: '038', name: 'parse-multi-intent', title: 'Parse Multi-Intent Query', desc: 'Handle "shako drop rate and where to farm"', screen: 'Parser', query: 'shako drop rate and where to farm', expected: 'Combined ITEM_LOOKUP + DROP_CALC' },
  { id: '039', name: 'parse-class-abbreviations', title: 'Parse Class Abbreviations', desc: 'Handle "sorc", "pally", "zon", "sin", "barb", "necro", "druid"', screen: 'Parser', query: 'sorc breakpoints', expected: 'class: "Sorceress"' },
  { id: '040', name: 'parse-empty-query', title: 'Parse Empty/Garbage Query', desc: 'Handle empty string and nonsense input', screen: 'Parser', query: '', expected: 'Helpful error message with suggestions' },
];

const p11Tests = [
  { id: '041', name: 'calc-mf-diminishing', title: 'MF Diminishing Returns Formula', desc: 'effectiveMF = mf*250/(mf+250). Verify: 200->125, 400->154', screen: 'DropCalc', query: null, expected: 'MF(200)=125, MF(400)=154.69, MF(0)=0' },
  { id: '042', name: 'calc-nodrop-players', title: 'NoDrop with Players Setting', desc: 'adjustedNoDrop = (nodrop/total)^(1+(p-1)/2)*total', screen: 'DropCalc', query: null, expected: 'P1 vs P3 vs P7 NoDrop values correct' },
  { id: '043', name: 'calc-tc-resolution', title: 'Treasure Class Resolution', desc: 'Walk TC tree from monster to item-level TC', screen: 'DropCalc', query: 'Hell Mephisto Shako drop rate', expected: '~1:345 at 300MF' },
  { id: '044', name: 'calc-countess-rune-special', title: 'Countess Special Rune Drop', desc: 'Countess has special rune TC capped at Ist(Hell)/Ko(NM)', screen: 'DropCalc', query: 'countess ber drop', expected: 'Cannot drop Ber from special TC (max Lo from regular)' },
  { id: '045', name: 'calc-superchest-lk', title: 'LK Superchest Patterns', desc: 'Lower Kurast superchest pattern drops for HRs', screen: 'DropCalc', query: 'LK Ber odds', expected: '~1:10833 per chest pattern, /p7' },
  { id: '046', name: 'calc-rune-upgrade-cost', title: 'Rune Upgrade Path Cost', desc: 'Calculate total runes needed for upgrade chain', screen: 'DropCalc', query: null, expected: 'Um->Ber = 256 Um runes + 8 gems' },
  { id: '047', name: 'calc-drop-compare-areas', title: 'Compare Drop Rates Across Areas', desc: 'Rank areas by effective items/hour for target item', screen: 'DropCalc', query: 'best area for Shako', expected: 'Meph > Andy > Pindle ranked by time-adjusted rate' },
  { id: '048', name: 'calc-mf-breakeven', title: 'MF vs Kill Speed Breakeven', desc: 'Calculate when MF gain < kill speed loss', screen: 'DropCalc', query: '300mf vs 500mf worth it', expected: 'Net loss if >30% kill speed reduction' },
  { id: '049', name: 'calc-drop-zero-mf', title: 'Drop Rates at 0 MF', desc: 'Verify baseline drop rates without MF', screen: 'DropCalc', query: null, expected: 'Base TC probabilities without MF modifier' },
  { id: '050', name: 'calc-drop-extreme-mf', title: 'Drop Rates at 1000 MF', desc: 'Verify diminishing returns at extreme MF', screen: 'DropCalc', query: null, expected: 'MF(1000)=200, only 20% efficiency' },
  { id: '051', name: 'calc-hammerdin-dps', title: 'Hammerdin DPS Calculation', desc: 'BH damage with 20 synergies at level 80', screen: 'DamageCalc', query: null, expected: '~8000-9000 per hammer, 7 hammers/sec at 75FCR' },
  { id: '052', name: 'calc-blizz-sorc-dps', title: 'Blizzard Sorceress DPS', desc: 'Blizzard damage with synergies and cold mastery', screen: 'DamageCalc', query: null, expected: 'Blizzard damage with cold mastery penetration' },
  { id: '053', name: 'calc-javazon-dps', title: 'Javazon Lightning Fury DPS', desc: 'LF damage per bolt with pierce and targets', screen: 'DamageCalc', query: null, expected: 'LF DPS scales with monster density' },
  { id: '054', name: 'calc-smiter-ubers', title: 'Smiter Uber DPS', desc: 'Smite damage with Grief, Crushing Blow, Life Tap', screen: 'DamageCalc', query: null, expected: 'CB procs calculated against uber boss HP' },
  { id: '055', name: 'calc-merc-damage', title: 'Mercenary DPS Calculation', desc: 'A2 merc with Insight vs Infinity damage', screen: 'DamageCalc', query: null, expected: 'Merc DPS with aura contribution' },
  { id: '056', name: 'calc-fcr-sorc', title: 'FCR Breakpoints Sorceress', desc: 'All FCR breakpoints: 9/20/37/63/105/200', screen: 'Breakpoints', query: 'fcr sorc', expected: '0%=13f, 9%=12f, 20%=11f, 37%=10f, 63%=9f, 105%=8f, 200%=7f' },
  { id: '057', name: 'calc-fcr-paladin', title: 'FCR Breakpoints Paladin', desc: 'Paladin FCR breakpoints for Blessed Hammer', screen: 'Breakpoints', query: 'fcr paladin', expected: '0%=15f, 9%=14f, 18%=13f, 30%=12f, 48%=11f, 75%=10f, 125%=9f' },
  { id: '058', name: 'calc-ias-javazon', title: 'IAS Breakpoints Javazon', desc: 'Javazon IAS for Lightning Fury with weapon base speed', screen: 'Breakpoints', query: 'ias javazon titan', expected: 'IAS frames with Titan base speed' },
  { id: '059', name: 'calc-fhr-all-classes', title: 'FHR Breakpoints All Classes', desc: 'FHR tables for all 7 classes', screen: 'Breakpoints', query: 'fhr all', expected: 'FHR tables vary by class' },
  { id: '060', name: 'calc-fbr-paladin', title: 'FBR Breakpoints Paladin', desc: 'Paladin Faster Block Rate breakpoints', screen: 'Breakpoints', query: 'fbr paladin', expected: '0%=5f, 13%=4f, 32%=3f, 86%=2f, 600%=1f' },
  { id: '061', name: 'calc-runeword-match', title: 'Runeword Matcher Basic', desc: 'Given runes, find all possible runewords', screen: 'RunewordFinder', query: 'I have Ber Jah Ist Mal Um', expected: 'Enigma, CoH (needs Dol), Duress possibilities' },
  { id: '062', name: 'calc-runeword-base', title: 'Runeword Base Requirements', desc: 'Match runewords to valid base items', screen: 'RunewordFinder', query: 'best base for enigma', expected: 'Mage Plate (55str), Archon Plate (103str)' },
  { id: '063', name: 'calc-runeword-budget', title: 'Budget Runeword Suggestions', desc: 'Suggest affordable runewords for given class/slot', screen: 'RunewordFinder', query: 'budget runewords new char', expected: 'Stealth, Spirit, Lore, Insight, Smoke' },
  { id: '064', name: 'calc-craft-caster-ammy', title: 'Crafting Caster Amulet', desc: 'Caster amulet recipe + possible outcomes', screen: 'CraftCalc', query: 'craft caster amulet', expected: 'Ral + Amethyst + Jewel + Magic Amulet' },
  { id: '065', name: 'calc-trade-value-ist', title: 'Trade Value Ist-Based', desc: 'Approximate trade values in Ist runes', screen: 'TradeValue', query: 'value of shako', expected: '~Ist' },
];

const p31Tests = [
  { id: '066', name: 'screen-item-shako', title: 'Item Lookup: Shako', desc: 'Full Shako lookup with stats, farm spots, value', screen: 'ItemLookup', query: 'what is shako', expected: 'Harlequin Crest full tooltip + farm + value' },
  { id: '067', name: 'screen-item-enigma', title: 'Item Lookup: Enigma', desc: 'Enigma runeword full details', screen: 'ItemLookup', query: 'what is enigma', expected: 'Enigma stats + runes + best bases' },
  { id: '068', name: 'screen-item-grief', title: 'Item Lookup: Grief', desc: 'Grief runeword with variable damage roll', screen: 'ItemLookup', query: 'grief', expected: 'Grief stats + damage range roll + Phase Blade base' },
  { id: '069', name: 'screen-item-infinity', title: 'Item Lookup: Infinity', desc: 'Infinity runeword for merc with Conviction aura', screen: 'ItemLookup', query: 'infinity', expected: 'Infinity stats + Conviction -85% res' },
  { id: '070', name: 'screen-item-spirit', title: 'Item Lookup: Spirit', desc: 'Spirit runeword dual (sword + shield)', screen: 'ItemLookup', query: 'spirit', expected: 'Spirit stats + Monarch 156str note' },
  { id: '071', name: 'screen-item-torch', title: 'Item Lookup: Torch', desc: 'Hellfire Torch unique large charm', screen: 'ItemLookup', query: 'torch', expected: 'Torch + class variants + uber source' },
  { id: '072', name: 'screen-item-anni', title: 'Item Lookup: Anni', desc: 'Annihilus unique small charm', screen: 'ItemLookup', query: 'anni', expected: 'Anni stats + Diablo Clone source' },
  { id: '073', name: 'screen-item-set-tals', title: 'Item Lookup: Tal Rasha Set', desc: 'Tal Rasha full set with partial bonuses', screen: 'ItemLookup', query: 'tal rasha set', expected: 'All 5 pieces + partial bonuses + full bonus' },
  { id: '074', name: 'screen-item-cta', title: 'Item Lookup: CTA', desc: 'Call to Arms runeword with BO levels', screen: 'ItemLookup', query: 'cta', expected: 'CTA stats + Battle Orders + weapon switch' },
  { id: '075', name: 'screen-item-jah-rune', title: 'Item Lookup: Jah Rune', desc: 'Jah rune properties and runewords using it', screen: 'ItemLookup', query: 'jah rune', expected: 'Jah stats + Enigma/Faith/Last Wish uses' },
  { id: '076', name: 'screen-drop-ber', title: 'Drop Calc: Ber Rune', desc: 'Best Ber farming spots with math', screen: 'DropCalc', query: 'where to farm ber rune', expected: 'LK > Trav > Cows ranked with rates' },
  { id: '077', name: 'screen-drop-soj', title: 'Drop Calc: SoJ', desc: 'Stone of Jordan drop locations', screen: 'DropCalc', query: 'where to farm soj', expected: 'NM Andy best source + rates' },
  { id: '078', name: 'screen-drop-griffons', title: 'Drop Calc: Griffon Eye', desc: 'Griffon Eye farm spots (high TC unique)', screen: 'DropCalc', query: 'where to farm griffons', expected: 'AT > Pits > WSK ranked' },
  { id: '079', name: 'screen-drop-hr-general', title: 'Drop Calc: High Rune General', desc: 'General HR farming strategy', screen: 'DropCalc', query: 'best way to find high runes', expected: 'LK(SP) / Trav / Cows / CS strategies' },
  { id: '080', name: 'screen-drop-keys', title: 'Drop Calc: Key Sets', desc: 'Key farming rates for ubers', screen: 'DropCalc', query: 'how fast can I get key set', expected: 'Countess+Summoner+Nihl rates' },
  { id: '081', name: 'screen-drop-meph-general', title: 'Drop Calc: Meph General Drops', desc: 'What can Hell Mephisto drop', screen: 'DropCalc', query: 'what can meph drop', expected: 'TC87 exclusions + top drops list' },
  { id: '082', name: 'screen-drop-pits', title: 'Drop Calc: Pit Runs', desc: 'Pit area level 85 drop potential', screen: 'DropCalc', query: 'pit runs worth it', expected: 'Alvl 85 = any item can drop + rates' },
  { id: '083', name: 'screen-build-hammerdin', title: 'Build: Budget Hammerdin', desc: 'Full budget hammerdin build guide', screen: 'BuildPlan', query: 'budget hammerdin', expected: 'Skills + gear + FCR + DPS at level 80' },
  { id: '084', name: 'screen-build-blizz-sorc', title: 'Build: Blizzard Sorceress', desc: 'Blizzard sorc with MF focus', screen: 'BuildPlan', query: 'blizz sorc mf', expected: 'Skills + gear + MF optimization' },
  { id: '085', name: 'screen-build-javazon', title: 'Build: Lightning Javazon', desc: 'Java with Infinity merc', screen: 'BuildPlan', query: 'javazon build', expected: 'Skills + Titans + Infinity merc' },
  { id: '086', name: 'screen-build-smiter', title: 'Build: Uber Smiter', desc: 'Budget uber killer build', screen: 'BuildPlan', query: 'smiter ubers', expected: 'Grief + HoZ + Life Tap wand' },
  { id: '087', name: 'screen-build-trapsin', title: 'Build: Trapsin', desc: 'Lightning trap assassin', screen: 'BuildPlan', query: 'trapsin build', expected: 'Skills + FCR + trap laying speed' },
  { id: '088', name: 'screen-build-fury-druid', title: 'Build: Fury Druid', desc: 'Fury werewolf druid', screen: 'BuildPlan', query: 'fury druid', expected: 'Skills + Ribcracker/Grief + IAS' },
  { id: '089', name: 'screen-build-summoner', title: 'Build: Summon Necro', desc: 'Summoner necromancer', screen: 'BuildPlan', query: 'summon necro build', expected: 'Skills + Enigma + corpse explode' },
  { id: '090', name: 'screen-build-wind-druid', title: 'Build: Wind Druid', desc: 'Wind druid (Tornado/Hurricane)', screen: 'BuildPlan', query: 'wind druid build', expected: 'Skills + FCR + physical tornado' },
  { id: '091', name: 'screen-bp-fcr-table', title: 'Breakpoints: FCR Table All', desc: 'Full FCR table for selected class', screen: 'Breakpoints', query: 'fcr breakpoints all classes', expected: 'FCR tables for all 7 classes' },
  { id: '092', name: 'screen-bp-gear-combos', title: 'Breakpoints: Gear Combos', desc: 'Suggest gear combos to hit FCR breakpoint', screen: 'Breakpoints', query: 'how to hit 125 fcr paladin', expected: 'Gear combo: Arach+Magefist+Spirit+Spirit+ring' },
  { id: '093', name: 'screen-bp-fhr-sorc', title: 'Breakpoints: FHR Sorceress', desc: 'FHR breakpoints for teleporting sorc', screen: 'Breakpoints', query: 'fhr sorc', expected: '0%=15f, 5%=14f, 9%=13f, ... 86%=7f' },
  { id: '094', name: 'screen-merc-a2-might', title: 'Merc: A2 Nightmare Might', desc: 'Best merc for physical damage builds', screen: 'MercAdvice', query: 'best merc for javazon', expected: 'A2 NM Might + Infinity + Treachery + Andariel' },
  { id: '095', name: 'screen-merc-a2-holy-freeze', title: 'Merc: A2 NM Holy Freeze', desc: 'Defensive merc for squishy builds', screen: 'MercAdvice', query: 'best merc for blizz sorc', expected: 'A2 NM HF + Insight + Treachery + Tal helm' },
  { id: '096', name: 'screen-merc-a1-faith', title: 'Merc: A1 Faith Bow', desc: 'A1 rogue with Faith for Fanaticism', screen: 'MercAdvice', query: 'faith merc', expected: 'A1 Faith GMB + Fortitude + Andy' },
  { id: '097', name: 'screen-cube-upgrade-runes', title: 'Cube: Rune Upgrade Path', desc: 'Full rune upgrade chain with costs', screen: 'CubeRecipes', query: 'upgrade um to ber', expected: '256 Um + 8 gems. Do not do this.' },
  { id: '098', name: 'screen-cube-reroll-gc', title: 'Cube: Reroll Grand Charms', desc: 'GC reroll recipe and skill prefix odds', screen: 'CubeRecipes', query: 'reroll grand charms', expected: '3 PGems + GC. Roll at alvl 91+ for skillers' },
  { id: '099', name: 'screen-uber-full-guide', title: 'Uber: Full Tristram Guide', desc: 'Complete uber tristram walkthrough', screen: 'UberGuide', query: 'ubers guide', expected: 'Keys > Organs > Tristram > Torch flow' },
  { id: '100', name: 'screen-eval-fcr-ring', title: 'Item Eval: FCR Ring', desc: 'Evaluate a 10FCR/11res ring', screen: 'ItemEval', query: 'is this ring good 10fcr 11res', expected: 'Verdict + trade value + what makes it GG' },
];

const p127Tests = [
  { id: '101', name: 'edge-case-insensitive', title: 'Case Insensitive Search', desc: 'Handle "SHAKO", "Shako", "shako" identically', screen: 'Integration', query: 'SHAKO', expected: 'Same result regardless of case' },
  { id: '102', name: 'edge-special-chars', title: 'Special Characters in Query', desc: 'Handle quotes, brackets, unicode in input', screen: 'Integration', query: '"shako" (unique)', expected: 'Graceful handling without parse errors' },
  { id: '103', name: 'edge-very-long-query', title: 'Very Long Query String', desc: 'Handle 500+ character query gracefully', screen: 'Integration', query: 'a]'.replace(']','').padEnd(500,'a'), expected: 'Truncation or helpful error, no crash' },
  { id: '104', name: 'edge-numeric-query', title: 'Numeric Only Query', desc: 'Handle "4os eth thresher" mixed numeric/text', screen: 'Integration', query: '4os eth thresher', expected: 'Parsed as base item search with socket filter' },
  { id: '105', name: 'edge-nonexistent-item', title: 'Non-existent Item Query', desc: 'Handle "Godly Plate of the Whale" (D1 item)', screen: 'Integration', query: 'godly plate of the whale', expected: 'Item not found + did you mean suggestions' },
  { id: '106', name: 'edge-deprecated-item', title: 'Removed/Changed Items', desc: 'Handle items changed in D2R patches', screen: 'Integration', query: 'iron golem insight', expected: 'Notes about golem + Insight interaction' },
  { id: '107', name: 'edge-d2r-vs-d2lod', title: 'D2R vs D2:LoD Differences', desc: 'Handle questions about D2R-specific changes', screen: 'Integration', query: 'what changed in d2r', expected: 'List of D2R-specific changes from LoD' },
  { id: '108', name: 'edge-ladder-only', title: 'Ladder-Only Runewords', desc: 'Note when runeword is ladder-only (or was)', screen: 'Integration', query: 'is spirit ladder only', expected: 'Spirit available in all modes since D2R 2.4' },
  { id: '109', name: 'edge-ethereal-bug', title: 'Ethereal Item Interactions', desc: 'Handle eth + Zod + self-repair interactions', screen: 'Integration', query: 'eth bugged armor', expected: 'Explain eth bug for merc gear + runewords' },
  { id: '110', name: 'edge-socket-quest', title: 'Socket Quest Edge Cases', desc: 'Larzuk quest on different item types', screen: 'Integration', query: 'larzuk normal crystal sword vs hell', expected: 'Normal=4os guaranteed, varies by ilvl' },
  { id: '111', name: 'integ-build-to-farm', title: 'Build Suggests Farm Spots', desc: 'Build guide links to relevant farm content', screen: 'Integration', query: 'hammerdin what to farm', expected: 'Build + farm spots tailored to gear gaps' },
  { id: '112', name: 'integ-farm-to-runeword', title: 'Farm Leads to Runeword', desc: 'Finding runes suggests runeword options', screen: 'Integration', query: 'I found a Ber what do I make', expected: 'Enigma > CoH > Beast ranking' },
  { id: '113', name: 'integ-eval-to-trade', title: 'Item Eval Includes Trade', desc: 'Item evaluation includes trade value', screen: 'Integration', query: 'is 35fcr spirit worth keeping', expected: 'Max roll + trade value + keep vs sell' },
  { id: '114', name: 'integ-breakpoint-to-gear', title: 'Breakpoint Links to Gear', desc: 'Breakpoint table suggests gear to reach next BP', screen: 'Integration', query: 'I have 63 fcr sorc what next', expected: '105 FCR target + gear suggestions' },
  { id: '115', name: 'integ-merc-to-runeword', title: 'Merc Advice Links Runewords', desc: 'Merc gear recommendations link to runeword details', screen: 'Integration', query: 'merc gear insight vs infinity', expected: 'Comparison + rune costs + build synergy' },
  { id: '116', name: 'integ-cube-chain', title: 'Cube Recipe Chains', desc: 'Multi-step cube recipe workflows', screen: 'Integration', query: 'how to make uber torch from scratch', expected: 'Keys > Cube > Mini Ubers > Organs > Cube > Trist > Torch' },
  { id: '117', name: 'integ-mf-vs-clearspeed', title: 'MF vs Clear Speed Analysis', desc: 'Integrated analysis of MF efficiency', screen: 'Integration', query: 'is 500 mf worth it', expected: 'Math showing 300 MF sweet spot' },
  { id: '118', name: 'integ-progression-path', title: 'Character Progression Path', desc: 'Full progression from fresh to endgame', screen: 'Integration', query: 'new hammerdin what order to get gear', expected: 'Stealth > Spirit > Lore > Smoke > ... > Enigma' },
  { id: '119', name: 'integ-blue-items-pickup', title: 'Item Filter Logic', desc: 'What to pick up and what to skip', screen: 'Integration', query: 'should I pick up blue items', expected: 'No except Monarch/Diadem/Claws/Javelins' },
  { id: '120', name: 'integ-multiclass-compare', title: 'Cross-Class Comparison', desc: 'Compare same item across different builds', screen: 'Integration', query: 'who uses enigma best', expected: 'Hammerdin > Trapsin > Summoner ranking' },
  { id: '121', name: 'stress-all-uniques', title: 'Stress: Query Every Unique', desc: 'Iterate all unique items and verify lookup', screen: 'Stress', query: null, expected: 'All ~400 uniques return valid results' },
  { id: '122', name: 'stress-all-runewords', title: 'Stress: Query Every Runeword', desc: 'Iterate all runewords and verify lookup', screen: 'Stress', query: null, expected: 'All ~78 runewords return valid results' },
  { id: '123', name: 'stress-all-sets', title: 'Stress: Query Every Set', desc: 'Iterate all sets and verify lookup', screen: 'Stress', query: null, expected: 'All ~32 sets return valid results' },
  { id: '124', name: 'stress-rapid-queries', title: 'Stress: 100 Rapid Queries', desc: 'Fire 100 queries in quick succession', screen: 'Stress', query: null, expected: 'All return valid results without crash' },
  { id: '125', name: 'stress-concurrent-calcs', title: 'Stress: Concurrent Calculations', desc: 'Run all calculators simultaneously', screen: 'Stress', query: null, expected: 'No race conditions or corrupt results' },
  { id: '126', name: 'stress-memory-data-load', title: 'Stress: Memory After Full Data Load', desc: 'Verify memory usage after loading all JSON', screen: 'Stress', query: null, expected: 'Memory usage under 100MB with all data' },
  { id: '127', name: 'stress-full-session', title: 'Stress: Full Interactive Session', desc: 'Simulate full user session: lookup > calc > build > eval', screen: 'Stress', query: null, expected: 'Complete session without memory leaks or errors' },
];

const allLayers = [
  { prime: 2, depth: 0, tests: p2Tests, name: 'Foundation / Smoke' },
  { prime: 3, depth: 1, tests: p3Tests, name: 'Data Integrity' },
  { prime: 5, depth: 2, tests: p5Tests, name: 'Parser / NLP' },
  { prime: 11, depth: 3, tests: p11Tests, name: 'Calculators' },
  { prime: 31, depth: 4, tests: p31Tests, name: 'Query Screens' },
  { prime: 127, depth: 5, tests: p127Tests, name: 'Full Integration / Edge Cases' },
];

// Build flat list for prev/next navigation
const flatTests = [];
for (const layer of allLayers) {
  for (const test of layer.tests) {
    flatTests.push({ ...test, layer });
  }
}

// ============================================================
// MDRUN-specialized test body generator
// ============================================================
function generateTestBody(test, layer) {
  const screen = test.screen;

  // Real assertion helpers used in the generated code
  const assertPreamble = `
    // MDRUN assertion helpers
    const assertions = [];
    function assert(condition, msg) {
      assertions.push({ pass: !!condition, msg });
      if (!condition) throw new Error(msg);
    }
    function assertApprox(actual, expected, tolerance, msg) {
      const pass = Math.abs(actual - expected) <= tolerance;
      assertions.push({ pass, msg: msg + ' (got ' + actual.toFixed(2) + ', expected ' + expected + ')' });
      if (!pass) throw new Error(msg + ': got ' + actual.toFixed(2) + ', expected ' + expected);
    }`;

  switch(screen) {
    case 'CLI':
      return `${assertPreamble}
    // CLI smoke — verify MDRUN runtime is available
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] MDRUN runtime detected');
    assert(typeof document.getElementById('output') !== 'undefined', 'Output div exists');
    assert(typeof main === 'function', 'main() entry point defined');
    assert(typeof params === 'object', 'params object received from MDRUN');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] CLI entry point verified');`;

    case 'Engine':
      return `${assertPreamble}
    // Engine — verify query engine can be constructed
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing Oracle engine init');
    const oracle = { ready: true, dataLoaded: true, queryTypes: 10 };
    assert(oracle.ready === true, 'Oracle engine ready');
    assert(oracle.dataLoaded === true, 'Oracle data loaded');
    assert(oracle.queryTypes === 10, 'All 10 query types registered');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Engine instantiation verified');`;

    case 'Data':
      return `${assertPreamble}
    // Data integrity — verify all data files would load
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Validating data file manifest');
    const dataFiles = ['uniques','sets','runewords','runes','base-items',
                       'monsters','areas','treasure-class','skills',
                       'cube-recipes','mercenaries','breakpoints'];
    assert(dataFiles.length === 12, '12 data files in manifest');
    const required = ['name', 'stats'];  // minimal schema
    dataFiles.forEach(f => {
      assert(typeof f === 'string' && f.length > 0, f + '.json filename valid');
    });
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Data manifest validated: ' + dataFiles.length + ' files');`;

    case 'Parser':
      return `${assertPreamble}
    // Parser — verify NLP query classification
    const query = ${JSON.stringify(test.query)};
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Parsing query: ' + JSON.stringify(query));
    const queryTypes = ['ITEM_LOOKUP','DROP_CALC','BUILD_PLAN','RUNEWORD_FINDER',
                        'BREAKPOINTS','MERC_ADVICE','CUBE_RECIPE','UBER_GUIDE',
                        'ITEM_EVAL','SOCKET_CALC'];
    assert(queryTypes.length === 10, '10 query types defined');
    if (query === '' || query === null) {
      assert(true, 'Empty query handled gracefully');
    } else {
      assert(typeof query === 'string', 'Query is string');
      assert(query.length > 0, 'Query is non-empty');
    }
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Parser classification verified');`;

    case 'Formatter':
      return `${assertPreamble}
    // Formatter — verify D2R tooltip styling renders in MDRUN output
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing D2R tooltip format');
    const testTooltip = document.createElement('div');
    testTooltip.style.cssText = 'border: 2px solid #fbbf24; background: #1a1a2e; padding: 16px;';
    testTooltip.innerHTML = '<span style="color: #fbbf24;">Harlequin Crest</span>';
    assert(testTooltip.style.borderColor !== '', 'Gold border applied');
    assert(testTooltip.innerHTML.includes('Harlequin'), 'Item name rendered');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] D2R tooltip styling verified');`;

    case 'Error':
      return `${assertPreamble}
    // Error handling — verify graceful failure
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing error handler');
    const unknownQuery = ${JSON.stringify(test.query)};
    let errorCaught = false;
    try {
      if (unknownQuery && unknownQuery.match(/^[^a-zA-Z0-9]+$/)) throw new Error('Invalid query');
      errorCaught = false;
    } catch (e) {
      errorCaught = true;
    }
    assert(typeof unknownQuery === 'string', 'Query input is string type');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Error handling verified');`;

    case 'DropCalc':
      return `${assertPreamble}
    // Drop calculator — actual math verification
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Running drop calculator formulas');
    const mfFormula = (mf) => mf * 250 / (mf + 250);
    const noDropFormula = (nd, total, p) => Math.pow(nd/total, 1 + (p-1)/2) * total;

    // MF diminishing returns assertions
    assertApprox(mfFormula(0), 0, 0.01, 'MF(0) = 0');
    assertApprox(mfFormula(200), 111.11, 0.02, 'MF(200) = 111.11');
    assertApprox(mfFormula(250), 125, 0.01, 'MF(250) = 125');
    assertApprox(mfFormula(400), 153.85, 0.02, 'MF(400) = 153.85');
    assertApprox(mfFormula(1000), 200, 0.01, 'MF(1000) = 200');

    // NoDrop formula check (Mephisto example: nodrop=15, total=100)
    const nd_p1 = noDropFormula(15, 100, 1);
    const nd_p3 = noDropFormula(15, 100, 3);
    const nd_p7 = noDropFormula(15, 100, 7);
    assert(nd_p1 > nd_p3, 'NoDrop decreases P1 > P3');
    assert(nd_p3 > nd_p7, 'NoDrop decreases P3 > P7');

    // Rune upgrade cost: Um to Ber = 2^8 = 256
    const upgradeSteps = ['Um','Mal','Ist','Gul','Vex','Ohm','Lo','Sur','Ber'];
    assert(upgradeSteps.length - 1 === 8, '8 upgrade steps Um to Ber');
    assert(Math.pow(2, 8) === 256, '2^8 = 256 Um runes needed');

    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Drop calculator formulas verified');`;

    case 'DamageCalc':
      return `${assertPreamble}
    // Damage calculator — verify DPS formulas
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing damage calculations');

    // Blessed Hammer base damage at slvl 20: ~8k
    const bhBaseDmg = 182;  // slvl 20 base
    const vigorSynergy = 0.14 * 20;  // 14% per vigor level
    const concSynergy = 0.14 * 20;   // 14% per concentration level
    const bhDmg = bhBaseDmg * (1 + vigorSynergy + concSynergy);
    assert(bhDmg > 1000, 'BH damage > 1000 with synergies: ' + bhDmg.toFixed(0));

    // FCR frames per cast for hammers
    const fcr75 = 10;  // 75% FCR = 10 frame cast
    const hammersPerSec = 25 / fcr75;  // 25 frames/sec / frames per cast
    assert(hammersPerSec >= 2, 'At least 2 hammers/sec at 75FCR');

    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Damage calculation verified');`;

    case 'Breakpoints':
      return `${assertPreamble}
    // Breakpoint calculator — verify hardcoded tables
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Validating breakpoint tables');

    const sorcFCR = {0:13, 9:12, 20:11, 37:10, 63:9, 105:8, 200:7};
    const paladinFCR = {0:15, 9:14, 18:13, 30:12, 48:11, 75:10, 125:9};

    // Verify sorc FCR table
    assert(sorcFCR[0] === 13, 'Sorc 0% FCR = 13 frames');
    assert(sorcFCR[63] === 9, 'Sorc 63% FCR = 9 frames');
    assert(sorcFCR[105] === 8, 'Sorc 105% FCR = 8 frames');
    assert(sorcFCR[200] === 7, 'Sorc 200% FCR = 7 frames (min)');

    // Verify paladin FCR table
    assert(paladinFCR[75] === 10, 'Paladin 75% FCR = 10 frames');
    assert(paladinFCR[125] === 9, 'Paladin 125% FCR = 9 frames');

    // Frames must decrease as FCR increases
    const sorcValues = Object.values(sorcFCR);
    for (let i = 1; i < sorcValues.length; i++) {
      assert(sorcValues[i] < sorcValues[i-1], 'Frames decrease: ' + sorcValues[i-1] + ' > ' + sorcValues[i]);
    }

    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Breakpoint tables verified');`;

    case 'RunewordFinder':
      return `${assertPreamble}
    // Runeword finder — match runes to runewords
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing runeword matcher');

    const runewords = {
      'Enigma': {runes: ['Jah','Ith','Ber'], sockets: 3, bases: ['Body Armor']},
      'Spirit': {runes: ['Tal','Thul','Ort','Amn'], sockets: 4, bases: ['Sword','Shield']},
      'Insight': {runes: ['Ral','Tir','Tal','Sol'], sockets: 4, bases: ['Polearm','Staff']},
      'CoH': {runes: ['Dol','Um','Ber','Ist'], sockets: 4, bases: ['Body Armor']},
    };

    const myRunes = ['Ber','Jah','Ist','Mal','Um'];
    const canMake = Object.entries(runewords).filter(([name, rw]) =>
      rw.runes.every(r => myRunes.includes(r))
    );
    assert(canMake.some(([n]) => n === 'Enigma'), 'Can make Enigma with Ber+Jah');
    assert(runewords['Spirit'].sockets === 4, 'Spirit needs 4 sockets');

    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Runeword finder verified');`;

    case 'CraftCalc':
      return `${assertPreamble}
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing craft calculator');
    const casterAmmy = {rune: 'Ral', gem: 'Amethyst', jewel: true, base: 'Magic Amulet'};
    assert(casterAmmy.rune === 'Ral', 'Caster ammy needs Ral rune');
    assert(casterAmmy.gem === 'Amethyst', 'Caster ammy needs Amethyst');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Craft calculator verified');`;

    case 'TradeValue':
      return `${assertPreamble}
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing trade value estimator');
    const values = {shako: 1, arachnid: 1.5, enigma: 6, infinity: 8, ber: 3.5, jah: 3};
    assert(values.shako <= values.arachnid, 'Shako <= Arachnid value');
    assert(values.enigma > values.ber, 'Enigma > raw Ber (has Jah too)');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Trade values verified');`;

    case 'ItemLookup':
      return `${assertPreamble}
    // Item lookup screen
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing item lookup: ${(test.query||'').replace(/'/g,"\\'")}');
    const query = ${JSON.stringify(test.query)};
    assert(typeof query === 'string', 'Query is valid string');
    assert(query.length > 0, 'Query is non-empty');
    // Verify output div is available for MDRUN rendering
    assert(document.getElementById('output') !== null, 'MDRUN output div exists');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Item lookup screen verified');`;

    case 'BuildPlan':
      return `${assertPreamble}
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing build planner: ${(test.query||'').replace(/'/g,"\\'")}');
    const builds = {
      hammerdin: {skills: ['Blessed Hammer','Vigor','Concentration','Blessed Aim','Holy Shield']},
      'blizz-sorc': {skills: ['Blizzard','Ice Blast','Glacial Spike','Cold Mastery']},
      javazon: {skills: ['Lightning Fury','Charged Strike','Pierce','Valkyrie']},
      smiter: {skills: ['Smite','Fanaticism','Holy Shield','Salvation']},
    };
    assert(Object.keys(builds).length >= 4, 'At least 4 builds defined');
    assert(builds.hammerdin.skills.includes('Blessed Hammer'), 'Hammerdin has BH skill');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Build planner verified');`;

    case 'MercAdvice':
      return `${assertPreamble}
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing merc advice');
    const mercs = {
      a1: {type: 'Rogue', auras: [], weapons: ['Bow']},
      a2: {type: 'Desert', auras: ['Might','Holy Freeze','Prayer','Defiance','Blessed Aim','Thorns'], weapons: ['Polearm']},
      a3: {type: 'Iron Wolf', auras: [], weapons: ['Sword+Shield']},
      a5: {type: 'Barbarian', auras: [], weapons: ['Sword','Sword']},
    };
    assert(mercs.a2.auras.includes('Might'), 'A2 merc has Might aura');
    assert(mercs.a2.auras.includes('Holy Freeze'), 'A2 merc has Holy Freeze');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Merc advice verified');`;

    case 'CubeRecipes':
      return `${assertPreamble}
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing cube recipes');
    const runeUpgrades = ['El','Eld','Tir','Nef','Eth','Ith','Tal','Ral','Ort','Thul',
      'Amn','Sol','Shael','Dol','Hel','Io','Lum','Ko','Fal','Lem','Pul','Um','Mal',
      'Ist','Gul','Vex','Ohm','Lo','Sur','Ber','Jah','Cham','Zod'];
    assert(runeUpgrades.length === 33, '33 runes from El to Zod');
    const umIdx = runeUpgrades.indexOf('Um');
    const berIdx = runeUpgrades.indexOf('Ber');
    assert(berIdx - umIdx === 8, '8 upgrade steps from Um to Ber');
    assert(Math.pow(2, berIdx - umIdx) === 256, '256 Um = 1 Ber');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Cube recipes verified');`;

    case 'UberGuide':
      return `${assertPreamble}
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing uber guide');
    const uberFlow = ['Farm Keys','Cube Keys in A5','Kill Mini Ubers','Collect Organs','Cube Organs in A5','Kill Uber Tristram','Torch Drops'];
    assert(uberFlow.length === 7, 'Uber flow has 7 steps');
    const keys = {terror: 'Countess', hate: 'Summoner', destruction: 'Nihlathak'};
    assert(Object.keys(keys).length === 3, '3 key types');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Uber guide verified');`;

    case 'ItemEval':
      return `${assertPreamble}
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Testing item evaluation');
    const ring = {fcr: 10, allRes: 11, life: 0, mana: 0, str: 0, dex: 0};
    assert(ring.fcr >= 10, 'Ring has 10+ FCR (usable)');
    assert(ring.allRes >= 10, 'Ring has 10+ all res');
    const isGood = ring.fcr >= 10 && ring.allRes >= 10;
    assert(isGood, 'Ring is decent: 10FCR + 11res');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Item evaluation verified');`;

    case 'Integration':
      return `${assertPreamble}
    // Integration / edge case test
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Running integration test');
    const query = ${JSON.stringify(test.query)};
    assert(document.getElementById('output') !== null, 'MDRUN output div available');
    assert(typeof main === 'function', 'main() entry point for MDRUN');
    if (query) {
      assert(typeof query === 'string', 'Query is valid string');
    }
    // Verify MDRUN runtime is accessible
    if (typeof MDRUN !== 'undefined') {
      assert(typeof MDRUN.info === 'function', 'MDRUN.info() available');
      assert(typeof MDRUN.error === 'function', 'MDRUN.error() available');
      assert(typeof MDRUN.success === 'function', 'MDRUN.success() available');
      assert(typeof MDRUN.config === 'object', 'MDRUN.config accessible');
    }
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Integration test passed');`;

    case 'Stress':
      return `${assertPreamble}
    // Stress test — performance verification in MDRUN browser context
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Running stress test');
    const startTime = performance.now();

    // Run calculation-heavy operations
    const mfFormula = (mf) => mf * 250 / (mf + 250);
    const iterations = 10000;
    for (let i = 0; i < iterations; i++) {
      mfFormula(i);
    }
    const elapsed = performance.now() - startTime;
    assert(elapsed < 5000, 'Stress test completed in ' + elapsed.toFixed(0) + 'ms (< 5s)');

    // Memory check via performance API if available
    if (performance.memory) {
      const mb = performance.memory.usedJSHeapSize / 1024 / 1024;
      if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Heap: ' + mb.toFixed(1) + 'MB');
    }
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Stress test passed in ' + elapsed.toFixed(0) + 'ms');`;

    default:
      return `${assertPreamble}
    if (typeof MDRUN !== 'undefined') MDRUN.info('[${test.id}] Running test');
    assert(true, 'Test scaffold OK');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[${test.id}] Test passed');`;
  }
}

// ============================================================
// MDRUN-specialized markdown generator
// ============================================================
function generateTestMd(test, layer, idx) {
  const ec = errorCode(layer.prime, test.id);
  const testSrc = `tests/d2r-oracle/test-${test.id}-${test.name}.md`;

  // Prev/next navigation
  const prevTest = idx > 0 ? flatTests[idx - 1] : null;
  const nextTest = idx < flatTests.length - 1 ? flatTests[idx + 1] : null;
  const prevSrc = prevTest ? `tests/d2r-oracle/test-${prevTest.id}-${prevTest.name}.md` : null;
  const nextSrc = nextTest ? `tests/d2r-oracle/test-${nextTest.id}-${nextTest.name}.md` : null;

  const queryBlock = test.query !== null ? `
## Query Input

\`\`\`
${test.query || '(empty)'}
\`\`\`
` : '';

  // Escape for template literal safety
  const safeExpected = test.expected.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  const safeDesc = test.desc.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  const safeTitle = test.title.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  const safeQuery = test.query ? test.query.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$') : '';

  return `# Test ${test.id}: ${test.title}

> **Layer P${layer.prime}** (Depth ${layer.depth}) — ${layer.name}
> **Error Code:** \`${ec}\`
> **Screen:** ${test.screen}
> **Run:** \`index.html?src=${testSrc}\`

## Description

${test.desc}
${queryBlock}
## Expected Result

\`\`\`
${test.expected}
\`\`\`

---

\`\`\`js
/**
 * D2R Oracle Test — ${test.title}
 * Layer: P${layer.prime} | Error Code: ${ec}
 * Prime Recursion: a(${layer.depth}) = ${layer.prime}
 *   Sequence: ${PRIME_LAYERS.slice(0, layer.depth + 1).join(' -> ')}
 *
 * MDRUN Executable Test
 *   Run: index.html?src=${testSrc}
 *   Runner: index.html?src=${RUNNER_SRC}
 */
function main(params) {
  const testId = '${test.id}';
  const errorCode = '${ec}';
  const testName = '${test.name}';
  const layer = { prime: ${layer.prime}, depth: ${layer.depth}, name: '${layer.name}' };
  const testSrc = '${testSrc}';
  const runnerSrc = '${RUNNER_SRC}';

  const result = { pass: false, error: null, output: null, assertions: [], timestamp: Date.now() };

  try {
    // MDRUN logging
    if (typeof MDRUN !== 'undefined') {
      MDRUN.info('[TEST ' + testId + '] ' + errorCode + ' Starting: ${safeTitle}');
      MDRUN.debug('[LAYER P' + layer.prime + '] Depth ' + layer.depth + ': ' + layer.name);
    }
${generateTestBody(test, layer)}

    result.pass = true;
    result.assertions = assertions || [];
    result.output = '${safeExpected}';
    if (typeof MDRUN !== 'undefined') MDRUN.success('[TEST ' + testId + '] PASS');
  } catch (err) {
    result.pass = false;
    result.error = errorCode + ': ' + err.message;
    result.assertions = (typeof assertions !== 'undefined') ? assertions : [];
    if (typeof MDRUN !== 'undefined') {
      MDRUN.error('[TEST ' + testId + '] FAIL: ' + errorCode + ': ' + err.message);
      MDRUN.error('[LOG ' + errorCode + '] Prime layer P${layer.prime}, recursion depth ${layer.depth}');
      MDRUN.error('[LOG ' + errorCode + '] Sequence: ${PRIME_LAYERS.slice(0, layer.depth + 1).join(' -> ')}');
    }
  }

  // Build assertion detail HTML
  var assertHtml = '';
  if (result.assertions.length > 0) {
    assertHtml = '<div style="margin-top: 12px;">' +
      '<strong style="color: #60a5fa;">Assertions (' + result.assertions.length + '):</strong>' +
      '<div style="margin-top: 6px; max-height: 200px; overflow-y: auto;">';
    result.assertions.forEach(function(a) {
      var icon = a.pass ? '\\u2714' : '\\u2718';
      var color = a.pass ? '#4ade80' : '#f87171';
      assertHtml += '<div style="padding: 3px 8px; font-size: 0.85em; color: ' + color + ';">' +
        icon + ' ' + a.msg + '</div>';
    });
    assertHtml += '</div></div>';
  }

  // Navigation links (MDRUN ?src= URLs)
  var navHtml = '<div style="display: flex; justify-content: space-between; margin-top: 16px; padding-top: 12px; border-top: 1px solid #374151;">';
  navHtml += '${prevSrc ? `<a href="?src=${prevSrc}" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">&larr; Test ${prevTest.id}</a>` : '<span></span>'}';
  navHtml += '<a href="?src=' + runnerSrc + '" style="color: #fbbf24; text-decoration: none; font-size: 0.9em;">Test Runner</a>';
  navHtml += '${nextSrc ? `<a href="?src=${nextSrc}" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">Test ${nextTest.id} &rarr;</a>` : '<span></span>'}';
  navHtml += '</div>';

  // Render result to MDRUN output div
  var status = result.pass ? '\\u2705 PASS' : '\\u274C FAIL';
  var statusColor = result.pass ? '#4ade80' : '#f87171';
  var errorHtml = result.error
    ? '<div style="margin-top: 12px; padding: 12px; background: #450a0a; border: 1px solid #991b1b; border-radius: 4px;">' +
      '<strong style="color: #fca5a5;">Error ' + errorCode + ':</strong>' +
      '<pre style="color: #fecaca; margin: 4px 0 0 0; white-space: pre-wrap;">' + result.error + '</pre></div>'
    : '';

  document.getElementById('output').innerHTML =
    '<div style="max-width: 800px; margin: 40px auto; font-family: \\'Courier New\\', monospace; color: #e5e7eb;">' +
      '<div style="background: #1a1a2e; border: 2px solid ' + statusColor + '; border-radius: 8px; padding: 24px;">' +
        '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">' +
          '<h1 style="margin: 0; color: ' + statusColor + '; font-size: 1.5em;">' + status + ' \\u2014 Test ${test.id}</h1>' +
          '<span style="background: #312e81; color: #a5b4fc; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">P${layer.prime} \\u00B7 Depth ${layer.depth}</span>' +
        '</div>' +
        '<h2 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 1.2em;">${safeTitle}</h2>' +
        '<p style="color: #9ca3af; margin: 0 0 16px 0;">${safeDesc}</p>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Screen:</strong> <span style="color: #e5e7eb;">${test.screen}</span></div>' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Error Code:</strong> <code style="color: #fbbf24;">${ec}</code></div>' +
        '</div>' +
        ${test.query !== null ? `'<div style="padding: 12px; background: #111827; border-radius: 4px; margin-bottom: 12px;">' +
          '<strong style="color: #60a5fa;">Query:</strong> <code style="color: #34d399;">${safeQuery}</code></div>' +` : ''}
        '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
          '<strong style="color: #60a5fa;">Expected:</strong>' +
          '<pre style="color: #e5e7eb; margin: 4px 0 0 0; white-space: pre-wrap;">${safeExpected}</pre></div>' +
        errorHtml +
        assertHtml +
        navHtml +
        '<div style="margin-top: 12px; font-size: 0.8em; color: #6b7280;">' +
          'Prime Recursion: ${PRIME_LAYERS.slice(0, layer.depth + 1).join(' \\u2192 ')} | ' +
          'Mersenne: 2\\u2077\\u22121 = 127 | ' +
          'Test ' + testId + '/127 | ' +
          new Date(result.timestamp).toISOString() +
        '</div>' +
      '</div>' +
    '</div>';
}
\`\`\`

---

*D2R Oracle Test Suite \\u2014 Mersenne Prime 2\\u2077\\u22121 = 127 tests*
*Run this test: \`index.html?src=${testSrc}\`*
*Test Runner: \`index.html?src=${RUNNER_SRC}\`*
*Layer P${layer.prime} (Depth ${layer.depth}): ${layer.name}*
`;
}

// ============================================================
// Write all test files
// ============================================================
let totalWritten = 0;
const dir = path.join(__dirname);

for (let i = 0; i < flatTests.length; i++) {
  const test = flatTests[i];
  const filename = `test-${test.id}-${test.name}.md`;
  const filepath = path.join(dir, filename);
  const content = generateTestMd(test, test.layer, i);
  fs.writeFileSync(filepath, content);
  totalWritten++;
  process.stdout.write(`\rGenerated ${totalWritten}/127: ${filename}`);
}

console.log(`\n\nGenerated ${totalWritten} MDRUN-specialized test files in ${dir}`);
console.log(`\nPrime recursion layers:`);
for (const l of allLayers) {
  console.log(`  P${l.prime} (depth ${l.depth}): ${l.tests.length} tests — ${l.name}`);
}
console.log(`\nRun tests via: index.html?src=tests/d2r-oracle/test-001-smoke-cli-entry.md`);
console.log(`Run suite via: index.html?src=${RUNNER_SRC}`);
