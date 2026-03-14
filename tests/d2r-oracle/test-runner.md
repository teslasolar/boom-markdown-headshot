# D2R Oracle — Test Suite Runner

> **Mersenne Prime:** 2^7 - 1 = **127** tests
> **Prime Recursion:** a(n+1) = prime(a(n)) -> 2 -> 3 -> 5 -> 11 -> 31 -> 127
> **Run this:** `index.html?src=tests/d2r-oracle/test-runner.md`

---

```js
/**
 * D2R Oracle Test Suite Runner — MDRUN Executable
 * Run via: index.html?src=tests/d2r-oracle/test-runner.md
 *
 * URL params:
 *   ?layer=2    — filter by prime layer (2,3,5,11,31,127)
 *   ?test=42    — jump to single test
 *   ?run=all    — run all tests inline (fetch + eval each .md)
 *
 * Mersenne Prime: 2^7 - 1 = 127 tests
 * Prime Recursion: a(n+1) = prime(a(n))
 */
function main(params) {
  if (typeof MDRUN !== 'undefined') {
    MDRUN.info('D2R Oracle Test Runner initialized');
    MDRUN.debug('Params: ' + JSON.stringify(params));
  }

  var PRIME_LAYERS = [
    { prime: 2,   depth: 0, name: 'Foundation / Smoke',            range: [1, 10],   count: 10 },
    { prime: 3,   depth: 1, name: 'Data Integrity',                range: [11, 25],  count: 15 },
    { prime: 5,   depth: 2, name: 'Parser / NLP',                  range: [26, 40],  count: 15 },
    { prime: 11,  depth: 3, name: 'Calculators',                   range: [41, 65],  count: 25 },
    { prime: 31,  depth: 4, name: 'Query Screens',                 range: [66, 100], count: 35 },
    { prime: 127, depth: 5, name: 'Full Integration / Edge Cases', range: [101, 127], count: 27 },
  ];

  // Test file manifest — exact filenames for MDRUN ?src= links
  var TEST_FILES = [
    'test-001-smoke-cli-entry','test-002-smoke-oracle-engine','test-003-smoke-data-load',
    'test-004-smoke-repl-mode','test-005-smoke-offline-mode','test-006-smoke-api-key-set',
    'test-007-smoke-output-format','test-008-smoke-parser-init','test-009-smoke-error-handler',
    'test-010-smoke-version-info',
    'test-011-data-uniques-schema','test-012-data-sets-schema','test-013-data-runewords-schema',
    'test-014-data-runes-schema','test-015-data-base-items-schema','test-016-data-monsters-schema',
    'test-017-data-areas-schema','test-018-data-treasure-class','test-019-data-skills-schema',
    'test-020-data-cube-recipes','test-021-data-mercenaries','test-022-data-breakpoints',
    'test-023-data-cross-ref-tc-monsters','test-024-data-cross-ref-runes-runewords',
    'test-025-data-cross-ref-areas-monsters',
    'test-026-parse-item-lookup','test-027-parse-drop-calc','test-028-parse-build-plan',
    'test-029-parse-runeword-finder','test-030-parse-breakpoints','test-031-parse-merc-advice',
    'test-032-parse-cube-recipe','test-033-parse-uber-guide','test-034-parse-item-eval',
    'test-035-parse-socket-calc','test-036-parse-ambiguous-item','test-037-parse-slang-terms',
    'test-038-parse-multi-intent','test-039-parse-class-abbreviations','test-040-parse-empty-query',
    'test-041-calc-mf-diminishing','test-042-calc-nodrop-players','test-043-calc-tc-resolution',
    'test-044-calc-countess-rune-special','test-045-calc-superchest-lk','test-046-calc-rune-upgrade-cost',
    'test-047-calc-drop-compare-areas','test-048-calc-mf-breakeven','test-049-calc-drop-zero-mf',
    'test-050-calc-drop-extreme-mf','test-051-calc-hammerdin-dps','test-052-calc-blizz-sorc-dps',
    'test-053-calc-javazon-dps','test-054-calc-smiter-ubers','test-055-calc-merc-damage',
    'test-056-calc-fcr-sorc','test-057-calc-fcr-paladin','test-058-calc-ias-javazon',
    'test-059-calc-fhr-all-classes','test-060-calc-fbr-paladin','test-061-calc-runeword-match',
    'test-062-calc-runeword-base','test-063-calc-runeword-budget','test-064-calc-craft-caster-ammy',
    'test-065-calc-trade-value-ist',
    'test-066-screen-item-shako','test-067-screen-item-enigma','test-068-screen-item-grief',
    'test-069-screen-item-infinity','test-070-screen-item-spirit','test-071-screen-item-torch',
    'test-072-screen-item-anni','test-073-screen-item-set-tals','test-074-screen-item-cta',
    'test-075-screen-item-jah-rune','test-076-screen-drop-ber','test-077-screen-drop-soj',
    'test-078-screen-drop-griffons','test-079-screen-drop-hr-general','test-080-screen-drop-keys',
    'test-081-screen-drop-meph-general','test-082-screen-drop-pits',
    'test-083-screen-build-hammerdin','test-084-screen-build-blizz-sorc','test-085-screen-build-javazon',
    'test-086-screen-build-smiter','test-087-screen-build-trapsin','test-088-screen-build-fury-druid',
    'test-089-screen-build-summoner','test-090-screen-build-wind-druid',
    'test-091-screen-bp-fcr-table','test-092-screen-bp-gear-combos','test-093-screen-bp-fhr-sorc',
    'test-094-screen-merc-a2-might','test-095-screen-merc-a2-holy-freeze','test-096-screen-merc-a1-faith',
    'test-097-screen-cube-upgrade-runes','test-098-screen-cube-reroll-gc',
    'test-099-screen-uber-full-guide','test-100-screen-eval-fcr-ring',
    'test-101-edge-case-insensitive','test-102-edge-special-chars','test-103-edge-very-long-query',
    'test-104-edge-numeric-query','test-105-edge-nonexistent-item','test-106-edge-deprecated-item',
    'test-107-edge-d2r-vs-d2lod','test-108-edge-ladder-only','test-109-edge-ethereal-bug',
    'test-110-edge-socket-quest',
    'test-111-integ-build-to-farm','test-112-integ-farm-to-runeword','test-113-integ-eval-to-trade',
    'test-114-integ-breakpoint-to-gear','test-115-integ-merc-to-runeword','test-116-integ-cube-chain',
    'test-117-integ-mf-vs-clearspeed','test-118-integ-progression-path','test-119-integ-blue-items-pickup',
    'test-120-integ-multiclass-compare',
    'test-121-stress-all-uniques','test-122-stress-all-runewords','test-123-stress-all-sets',
    'test-124-stress-rapid-queries','test-125-stress-concurrent-calcs','test-126-stress-memory-data-load',
    'test-127-stress-full-session'
  ];

  var filter = params.layer ? parseInt(params.layer) : null;
  var runTest = params.test ? parseInt(params.test) : null;
  var runAll = params.run === 'all';

  // Build test objects with MDRUN src paths
  var tests = [];
  for (var i = 0; i < TEST_FILES.length; i++) {
    var id = String(i + 1).padStart(3, '0');
    var layer = null;
    for (var j = 0; j < PRIME_LAYERS.length; j++) {
      if (i + 1 >= PRIME_LAYERS[j].range[0] && i + 1 <= PRIME_LAYERS[j].range[1]) {
        layer = PRIME_LAYERS[j];
        break;
      }
    }
    tests.push({
      id: id,
      num: i + 1,
      filename: TEST_FILES[i],
      src: 'tests/d2r-oracle/' + TEST_FILES[i] + '.md',
      layer: layer,
      errorCode: 'P' + layer.prime + '_E' + id,
    });
  }

  // Filter
  var filtered = tests;
  if (filter) {
    filtered = tests.filter(function(t) { return t.layer.prime === filter; });
  }
  if (runTest) {
    filtered = tests.filter(function(t) { return t.num === runTest; });
  }

  // Handle ?test=N — redirect to individual test
  if (runTest && filtered.length === 1) {
    window.location.search = '?src=' + filtered[0].src;
    return;
  }

  // Layer cards
  var layerRows = PRIME_LAYERS.map(function(l) {
    var active = filter === null || filter === l.prime;
    var opacity = active ? '1' : '0.4';
    var border = active ? '#4f46e5' : '#1f2937';
    return '<div style="display: flex; align-items: center; gap: 12px; padding: 12px; ' +
      'background: #111827; border-radius: 6px; opacity: ' + opacity + '; ' +
      'cursor: pointer; border: 1px solid ' + border + ';" ' +
      'onclick="window.location.search=\'?src=tests/d2r-oracle/test-runner.md&layer=' + l.prime + '\'">' +
      '<div style="width: 48px; height: 48px; background: #312e81; border-radius: 50%; ' +
        'display: flex; align-items: center; justify-content: center; ' +
        'font-size: 1.4em; font-weight: bold; color: #a5b4fc;">P' + l.prime + '</div>' +
      '<div style="flex: 1;">' +
        '<div style="color: #e5e7eb; font-weight: 600;">' + l.name + '</div>' +
        '<div style="color: #6b7280; font-size: 0.85em;">' +
          'Tests ' + String(l.range[0]).padStart(3,'0') + '\u2013' + String(l.range[1]).padStart(3,'0') +
          ' \u00B7 ' + l.count + ' tests \u00B7 Depth ' + l.depth + '</div>' +
      '</div>' +
      '<div style="color: #fbbf24; font-family: monospace; font-size: 0.9em;">a(' + l.depth + ') = ' + l.prime + '</div>' +
    '</div>';
  }).join('');

  // Test list with proper MDRUN ?src= links
  var testListHtml = filtered.map(function(t) {
    return '<a href="?src=' + t.src + '" ' +
      'style="display: block; padding: 6px 12px; color: #60a5fa; text-decoration: none; ' +
      'font-family: monospace; font-size: 0.85em; border-bottom: 1px solid #1f2937;">' +
      t.errorCode + ' \u2014 ' + t.filename.replace('test-','').replace(/-/g,' ') + '</a>';
  }).join('');

  // Show all / filter link
  var filterNote = filter
    ? '<a href="?src=tests/d2r-oracle/test-runner.md" style="color: #fbbf24; text-decoration: none;">Show all 127 tests</a>'
    : '';

  document.getElementById('output').innerHTML =
    '<div style="max-width: 900px; margin: 30px auto; font-family: \'Courier New\', monospace; color: #e5e7eb;">' +
      '<div style="text-align: center; margin-bottom: 30px;">' +
        '<h1 style="color: #fbbf24; font-size: 2em; margin: 0;">D2R ORACLE \u2014 TEST SUITE</h1>' +
        '<p style="color: #6b7280; margin: 8px 0;">2\u2077 \u2212 1 = 127 Mersenne Prime Tests \u00B7 Prime Recursion a(n+1) = prime(a(n))</p>' +
        '<div style="color: #a5b4fc; font-size: 0.9em;">2 \u2192 3 \u2192 5 \u2192 11 \u2192 31 \u2192 127</div>' +
        '<div style="margin-top: 8px; font-size: 0.85em;">' + filterNote + '</div>' +
      '</div>' +
      '<div style="display: grid; gap: 8px; margin-bottom: 30px;">' + layerRows + '</div>' +
      '<div style="background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 16px;">' +
        '<h3 style="color: #58a6ff; margin: 0 0 12px 0;">' +
          (filter ? 'Layer P' + filter + ' Tests' : 'All 127 Tests') +
          ' <span style="color: #6b7280; font-weight: normal;">(' + filtered.length + ' tests)</span></h3>' +
        '<div style="max-height: 400px; overflow-y: auto;">' + testListHtml + '</div>' +
      '</div>' +
      '<div style="margin-top: 20px; text-align: center; color: #4b5563; font-size: 0.8em;">' +
        '<p>Click any test to run it in MDRUN \u00B7 Each test has \u2190\u2192 navigation</p>' +
        '<p>The oracle knows every drop table, every breakpoint, every runeword.</p>' +
        '<p style="color: #fbbf24;">510,510 blessed hammers per hour</p>' +
      '</div>' +
    '</div>';

  if (typeof MDRUN !== 'undefined') {
    MDRUN.success('Test runner loaded: ' + filtered.length + ' tests' + (filter ? ' (layer P' + filter + ')' : ''));
  }
}
```

---

## How to Use

Each test runs as a standalone MDRUN page:

```
index.html?src=tests/d2r-oracle/test-001-smoke-cli-entry.md
index.html?src=tests/d2r-oracle/test-runner.md
index.html?src=tests/d2r-oracle/test-runner.md&layer=11
```

## Prime Recursion

```
a(0) = 2                    (1st prime)
a(1) = prime(2)  = 3        (2nd prime)
a(2) = prime(3)  = 5        (3rd prime)
a(3) = prime(5)  = 11       (5th prime)
a(4) = prime(11) = 31       (11th prime)
a(5) = prime(31) = 127      (31st prime = 2^7-1 Mersenne prime)
```

Error codes: `P{prime}_E{testId}` — every error uniquely traceable to recursion depth.

---

*Stay a while and ask me anything.*
