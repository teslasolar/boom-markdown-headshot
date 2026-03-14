# D2R Oracle — Test Suite Runner

> **Mersenne Prime:** 2⁷ − 1 = **127** tests
> **Prime Recursion:** a(n+1) = prime(a(n)) → 2 → 3 → 5 → 11 → 31 → 127
> **Error Coding:** P{layer}_E{test} for unique log trace

## Test Layers

| Layer | Prime | Depth | Tests     | Category                      |
|-------|-------|-------|-----------|-------------------------------|
| P2    | 2     | 0     | 001–010   | Foundation / Smoke            |
| P3    | 3     | 1     | 011–025   | Data Integrity                |
| P5    | 5     | 2     | 026–040   | Parser / NLP                  |
| P11   | 11    | 3     | 041–065   | Calculators                   |
| P31   | 31    | 4     | 066–100   | Query Screens                 |
| P127  | 127   | 5     | 101–127   | Full Integration / Edge Cases |

## Screens Under Test

1. **CLI** — Entry point, REPL, offline mode, API key, version
2. **Data** — All 12 JSON data files schema + cross-references
3. **Parser** — NLP query classification for all 10 query types
4. **DropCalc** — MF formula, NoDrop, TC resolution, area comparison
5. **DamageCalc** — Per-build DPS with skills, gear, synergies
6. **Breakpoints** — FCR/FHR/IAS/FBR tables, gear combo suggestions
7. **RunewordFinder** — Rune matching, base requirements, budget options
8. **CraftCalc** — Crafting recipes and outcome probabilities
9. **TradeValue** — Ist-based approximate valuations
10. **ItemLookup** — Full item tooltips with farm spots and values
11. **BuildPlan** — Complete build guides with progression
12. **MercAdvice** — Merc type + gear + aura recommendations
13. **CubeRecipes** — Recipe lookup with sanity checks
14. **UberGuide** — Full uber tristram walkthrough
15. **ItemEval** — Ring/amulet/charm evaluation with verdicts
16. **Integration** — Cross-feature, edge case, boundary tests
17. **Stress** — Performance, memory, concurrency tests

---

```js
/**
 * D2R Oracle Test Suite Runner
 * Mersenne Prime: 2^7 - 1 = 127 tests
 * Prime Recursion: a(n+1) = prime(a(n))
 *   a(0)=2, a(1)=3, a(2)=5, a(3)=11, a(4)=31, a(5)=127
 */
function main(params) {
  const PRIME_LAYERS = [
    { prime: 2,   depth: 0, name: 'Foundation / Smoke',            range: [1, 10],   count: 10 },
    { prime: 3,   depth: 1, name: 'Data Integrity',                range: [11, 25],  count: 15 },
    { prime: 5,   depth: 2, name: 'Parser / NLP',                  range: [26, 40],  count: 15 },
    { prime: 11,  depth: 3, name: 'Calculators',                   range: [41, 65],  count: 25 },
    { prime: 31,  depth: 4, name: 'Query Screens',                 range: [66, 100], count: 35 },
    { prime: 127, depth: 5, name: 'Full Integration / Edge Cases', range: [101, 127], count: 27 },
  ];

  const filter = params.layer ? parseInt(params.layer) : null;
  const runTest = params.test ? parseInt(params.test) : null;

  // Build test manifest
  const tests = [];
  for (let i = 1; i <= 127; i++) {
    const layer = PRIME_LAYERS.find(l => i >= l.range[0] && i <= l.range[1]);
    const id = String(i).padStart(3, '0');
    tests.push({
      id,
      layer,
      errorCode: `P${layer.prime}_E${id}`,
    });
  }

  // Filter
  let filtered = tests;
  if (filter) {
    filtered = tests.filter(t => t.layer.prime === filter);
  }
  if (runTest) {
    filtered = tests.filter(t => parseInt(t.id) === runTest);
  }

  // Render dashboard
  const layerRows = PRIME_LAYERS.map(l => {
    const layerTests = tests.filter(t => t.layer.prime === l.prime);
    const active = filter === null || filter === l.prime;
    const opacity = active ? '1' : '0.4';
    return `
      <div style="display: flex; align-items: center; gap: 12px; padding: 12px;
                  background: #111827; border-radius: 6px; opacity: ${opacity};
                  cursor: pointer; border: 1px solid ${active ? '#4f46e5' : '#1f2937'};"
           onclick="window.location.search='?layer=${l.prime}'">
        <div style="width: 48px; height: 48px; background: #312e81; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.4em; font-weight: bold; color: #a5b4fc;">
          P${l.prime}
        </div>
        <div style="flex: 1;">
          <div style="color: #e5e7eb; font-weight: 600;">${l.name}</div>
          <div style="color: #6b7280; font-size: 0.85em;">
            Tests ${String(l.range[0]).padStart(3,'0')}–${String(l.range[1]).padStart(3,'0')} · ${l.count} tests · Depth ${l.depth}
          </div>
        </div>
        <div style="color: #fbbf24; font-family: monospace; font-size: 0.9em;">
          a(${l.depth}) = ${l.prime}
        </div>
      </div>`;
  }).join('');

  const testListHtml = filtered.map(t => `
    <a href="index.html?src=tests/d2r-oracle/test-${t.id}-*.md"
       style="display: block; padding: 6px 12px; color: #60a5fa; text-decoration: none;
              font-family: monospace; font-size: 0.85em; border-bottom: 1px solid #1f2937;">
      ${t.errorCode} — Test ${t.id}
    </a>
  `).join('');

  document.getElementById('output').innerHTML = `
    <div style="max-width: 900px; margin: 30px auto; font-family: 'Courier New', monospace; color: #e5e7eb;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #fbbf24; font-size: 2em; margin: 0;">
          D2R ORACLE — TEST SUITE
        </h1>
        <p style="color: #6b7280; margin: 8px 0;">
          2⁷ − 1 = 127 Mersenne Prime Tests · Prime Recursion a(n+1) = prime(a(n))
        </p>
        <div style="color: #a5b4fc; font-size: 0.9em;">
          2 → 3 → 5 → 11 → 31 → 127
        </div>
      </div>

      <div style="display: grid; gap: 8px; margin-bottom: 30px;">
        ${layerRows}
      </div>

      <div style="background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 16px;">
        <h3 style="color: #58a6ff; margin: 0 0 12px 0;">
          ${filter ? `Layer P${filter} Tests` : 'All 127 Tests'}
          <span style="color: #6b7280; font-weight: normal;"> (${filtered.length} tests)</span>
        </h3>
        <div style="max-height: 400px; overflow-y: auto;">
          ${testListHtml}
        </div>
      </div>

      <div style="margin-top: 20px; text-align: center; color: #4b5563; font-size: 0.8em;">
        <p>Usage: ?layer=2 (filter by prime layer) · ?test=42 (run single test)</p>
        <p>The oracle knows every drop table, every breakpoint, every runeword.</p>
        <p style="color: #fbbf24;">510,510 blessed hammers per hour</p>
      </div>
    </div>
  `;
}
```

---

## Prime Recursion Explained

The test suite is organized by the **prime-indexed prime** recursion:

```
a(0) = 2                    (2nd number = 1st prime)
a(1) = prime(2)  = 3        (2nd prime)
a(2) = prime(3)  = 5        (3rd prime)
a(3) = prime(5)  = 11       (5th prime)
a(4) = prime(11) = 31       (11th prime)
a(5) = prime(31) = 127      (31st prime = 2⁷−1 Mersenne prime)
```

Each layer's error codes use the prime value as prefix: `P2_E001`, `P3_E015`, `P127_E127`.
This ensures **every error is uniquely traceable** to its recursion depth and test ID.

---

*Stay a while and ask me anything.*
