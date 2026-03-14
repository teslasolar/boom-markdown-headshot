# D2R Oracle — Claude Code Bloom Prompt

> "Stay a while and ask me anything"

## WHAT THIS BUILDS

A local D2R companion: Node.js CLI + optional VS Code extension. ALL game data embedded as JSON. Ask anything, get math not opinions. No alt-tabbing. Claude API for NLP, offline for pure lookup.

## ARCHITECTURE

```
d2r-oracle/
  src/
    index.ts              # CLI entry
    oracle.ts             # Query engine
    data/                 # ALL D2R game data as JSON
      uniques.json        # Every unique + stats + drop sources
      sets.json           # Every set + partial bonuses
      runewords.json      # Every runeword + runes + requirements
      runes.json          # Rune list + properties + upgrade paths
      base-items.json     # All bases + stats + socket ranges
      monsters.json       # Stats + locations + immunities
      areas.json          # Area levels + monster spawns
      treasure-class.json # Full TC drop tables
      skills.json         # All skills + synergies per class
      cube-recipes.json   # Every cube recipe
      mercenaries.json    # Merc types + gear + auras
      breakpoints.json    # FCR/FHR/IAS/FBR per class (hardcoded)
    calc/
      drop-calc.ts        # TC resolution + NoDrop + MF formula
      damage-calc.ts      # DPS with skills + gear + auras
      breakpoint-calc.ts  # Frame calculator
      runeword-finder.ts  # "I have these runes, what can I make"
      craft-calc.ts       # Crafting outcomes
      trade-value.ts      # Ist-based approximate values
    builds/               # Template builds as JSON
      hammerdin.json, blizz-sorc.json, javazon.json,
      fury-druid.json, trapsin.json, smiter.json
    query/
      parser.ts           # NLP to structured query
      formatter.ts        # D2R tooltip style output
```

## DATA SOURCES

- `github.com/blizzhackers/d2data` — D2R 3.0 JSON from CASC extraction
- `locbones.github.io/D2R_DataGuide` — field documentation
- Silospen dropcalc formulas — implement locally
- Maxroll breakpoint tables — hardcode (static)
- `diablo2.io` price tiers — approximate Ist-based (hardcode)

## 10 QUERY TYPES

| # | Type            | Example                          | Output                              |
|---|-----------------|----------------------------------|-------------------------------------|
| 1 | ITEM_LOOKUP     | "what is shako"                  | stats + farm spot + drop rate       |
| 2 | DROP_CALC       | "where to farm jah 300mf"       | ranked spots with math              |
| 3 | BUILD_PLAN      | "budget hammerdin"               | skills/gear/breakpoints/upgrades    |
| 4 | RUNEWORD_FINDER | "I have Ber Jah Ist"            | ranked options                      |
| 5 | BREAKPOINTS     | "fcr sorc"                       | table + gear combos                 |
| 6 | MERC_ADVICE     | "best merc blizz sorc"          | gear + reasoning                    |
| 7 | CUBE_RECIPE     | "upgrade um to ber"             | path + why it's stupid (256 Um)     |
| 8 | UBER_GUIDE      | "ubers what do I need"          | keys + organs + smiter + life tap   |
| 9 | ITEM_EVAL       | "is this ring good 10fcr 11res" | verdict + trade value               |
| 10| SOCKET_CALC     | "larzuk crystal sword normal"   | guaranteed outcome                  |

## KEY FORMULAS

```js
// MF diminishing returns for uniques
effectiveMF = mf * 250 / (mf + 250)
// 200 MF -> 125 effective | 400 MF -> 154 effective | sweet spot: 250-350

// NoDrop with /players
adjustedNoDrop = (nodrop/total)^(1 + (players-1)/2) * total

// Rune upgrade: always 2 runes + 1 flawed gem = next rune
// Um to Ber = 2^8 = 256 Um runes. Don't do this.
```

## TEST SUITE STRUCTURE

**Mersenne Prime:** 2⁷ − 1 = **127** total tests
**Prime Recursion:** a(n+1) = prime(a(n))

```
a(0) = 2    → Layer P2:   Foundation / Smoke         (tests 001-010)
a(1) = 3    → Layer P3:   Data Integrity             (tests 011-025)
a(2) = 5    → Layer P5:   Parser / NLP               (tests 026-040)
a(3) = 11   → Layer P11:  Calculators                (tests 041-065)
a(4) = 31   → Layer P31:  Query Screens              (tests 066-100)
a(5) = 127  → Layer P127: Full Integration / Edge    (tests 101-127)
```

**Error Codes:** `P{prime}_E{testId}` — every error uniquely traceable to recursion depth.

## CLI USAGE

```bash
npm install -g d2r-oracle
d2r "what is shako"
d2r "where to farm ber"
d2r "I have 4os eth thresher"
d2r "plan budget javazon"
d2r --interactive         # REPL mode
d2r --set-key sk-ant-xxx  # Claude NLP mode
d2r --offline "spirit"    # pure lookup, no API
```

## THE HONEST ANSWERS

- **500 MF worth it?** At 500 MF, effective = 167 (33% efficiency). Sweet spot: 250-350.
- **Pick up blue items?** No. Exception: Monarch, Diadems, Claws, Javelins.
- **Upgrade Um to Ber?** 256 Um runes + 8 gems. Farm LK instead.
- **Countess drop Ber?** No. Max Lo from regular TC, Ist from special.

---

*The oracle knows every drop table, every breakpoint, every runeword, every cube recipe, and whether that rare ring is good or if you're just hoping.*

*Stay a while and ask me anything.*

*510,510 blessed hammers per hour*
