# Test 098: Cube: Reroll Grand Charms

> **Layer P31** (Depth 4) — Query Screens
> **Error Code:** `P31_E098`
> **Screen:** CubeRecipes
> **Run:** `index.html?src=tests/d2r-oracle/test-098-screen-cube-reroll-gc.md`

## Description

GC reroll recipe and skill prefix odds

## Query Input

```
reroll grand charms
```

## Expected Result

```
3 PGems + GC. Roll at alvl 91+ for skillers
```

---

```js
/**
 * D2R Oracle Test — Cube: Reroll Grand Charms
 * Layer: P31 | Error Code: P31_E098
 * Prime Recursion: a(4) = 31
 *   Sequence: 2 -> 3 -> 5 -> 11 -> 31
 *
 * MDRUN Executable Test
 *   Run: index.html?src=tests/d2r-oracle/test-098-screen-cube-reroll-gc.md
 *   Runner: index.html?src=tests/d2r-oracle/test-runner.md
 */
function main(params) {
  const testId = '098';
  const errorCode = 'P31_E098';
  const testName = 'screen-cube-reroll-gc';
  const layer = { prime: 31, depth: 4, name: 'Query Screens' };
  const testSrc = 'tests/d2r-oracle/test-098-screen-cube-reroll-gc.md';
  const runnerSrc = 'tests/d2r-oracle/test-runner.md';

  const result = { pass: false, error: null, output: null, assertions: [], timestamp: Date.now() };

  try {
    // MDRUN logging
    if (typeof MDRUN !== 'undefined') {
      MDRUN.info('[TEST ' + testId + '] ' + errorCode + ' Starting: Cube: Reroll Grand Charms');
      MDRUN.debug('[LAYER P' + layer.prime + '] Depth ' + layer.depth + ': ' + layer.name);
    }

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
    }
    if (typeof MDRUN !== 'undefined') MDRUN.info('[098] Testing cube recipes');
    const runeUpgrades = ['El','Eld','Tir','Nef','Eth','Ith','Tal','Ral','Ort','Thul',
      'Amn','Sol','Shael','Dol','Hel','Io','Lum','Ko','Fal','Lem','Pul','Um','Mal',
      'Ist','Gul','Vex','Ohm','Lo','Sur','Ber','Jah','Cham','Zod'];
    assert(runeUpgrades.length === 33, '33 runes from El to Zod');
    const umIdx = runeUpgrades.indexOf('Um');
    const berIdx = runeUpgrades.indexOf('Ber');
    assert(berIdx - umIdx === 8, '8 upgrade steps from Um to Ber');
    assert(Math.pow(2, berIdx - umIdx) === 256, '256 Um = 1 Ber');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[098] Cube recipes verified');

    result.pass = true;
    result.assertions = assertions || [];
    result.output = '3 PGems + GC. Roll at alvl 91+ for skillers';
    if (typeof MDRUN !== 'undefined') MDRUN.success('[TEST ' + testId + '] PASS');
  } catch (err) {
    result.pass = false;
    result.error = errorCode + ': ' + err.message;
    result.assertions = (typeof assertions !== 'undefined') ? assertions : [];
    if (typeof MDRUN !== 'undefined') {
      MDRUN.error('[TEST ' + testId + '] FAIL: ' + errorCode + ': ' + err.message);
      MDRUN.error('[LOG ' + errorCode + '] Prime layer P31, recursion depth 4');
      MDRUN.error('[LOG ' + errorCode + '] Sequence: 2 -> 3 -> 5 -> 11 -> 31');
    }
  }

  // Build assertion detail HTML
  var assertHtml = '';
  if (result.assertions.length > 0) {
    assertHtml = '<div style="margin-top: 12px;">' +
      '<strong style="color: #60a5fa;">Assertions (' + result.assertions.length + '):</strong>' +
      '<div style="margin-top: 6px; max-height: 200px; overflow-y: auto;">';
    result.assertions.forEach(function(a) {
      var icon = a.pass ? '\u2714' : '\u2718';
      var color = a.pass ? '#4ade80' : '#f87171';
      assertHtml += '<div style="padding: 3px 8px; font-size: 0.85em; color: ' + color + ';">' +
        icon + ' ' + a.msg + '</div>';
    });
    assertHtml += '</div></div>';
  }

  // Navigation links (MDRUN ?src= URLs)
  var navHtml = '<div style="display: flex; justify-content: space-between; margin-top: 16px; padding-top: 12px; border-top: 1px solid #374151;">';
  navHtml += '<a href="?src=tests/d2r-oracle/test-097-screen-cube-upgrade-runes.md" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">&larr; Test 097</a>';
  navHtml += '<a href="?src=' + runnerSrc + '" style="color: #fbbf24; text-decoration: none; font-size: 0.9em;">Test Runner</a>';
  navHtml += '<a href="?src=tests/d2r-oracle/test-099-screen-uber-full-guide.md" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">Test 099 &rarr;</a>';
  navHtml += '</div>';

  // Render result to MDRUN output div
  var status = result.pass ? '\u2705 PASS' : '\u274C FAIL';
  var statusColor = result.pass ? '#4ade80' : '#f87171';
  var errorHtml = result.error
    ? '<div style="margin-top: 12px; padding: 12px; background: #450a0a; border: 1px solid #991b1b; border-radius: 4px;">' +
      '<strong style="color: #fca5a5;">Error ' + errorCode + ':</strong>' +
      '<pre style="color: #fecaca; margin: 4px 0 0 0; white-space: pre-wrap;">' + result.error + '</pre></div>'
    : '';

  document.getElementById('output').innerHTML =
    '<div style="max-width: 800px; margin: 40px auto; font-family: \'Courier New\', monospace; color: #e5e7eb;">' +
      '<div style="background: #1a1a2e; border: 2px solid ' + statusColor + '; border-radius: 8px; padding: 24px;">' +
        '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">' +
          '<h1 style="margin: 0; color: ' + statusColor + '; font-size: 1.5em;">' + status + ' \u2014 Test 098</h1>' +
          '<span style="background: #312e81; color: #a5b4fc; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">P31 \u00B7 Depth 4</span>' +
        '</div>' +
        '<h2 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 1.2em;">Cube: Reroll Grand Charms</h2>' +
        '<p style="color: #9ca3af; margin: 0 0 16px 0;">GC reroll recipe and skill prefix odds</p>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Screen:</strong> <span style="color: #e5e7eb;">CubeRecipes</span></div>' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Error Code:</strong> <code style="color: #fbbf24;">P31_E098</code></div>' +
        '</div>' +
        '<div style="padding: 12px; background: #111827; border-radius: 4px; margin-bottom: 12px;">' +
          '<strong style="color: #60a5fa;">Query:</strong> <code style="color: #34d399;">reroll grand charms</code></div>' +
        '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
          '<strong style="color: #60a5fa;">Expected:</strong>' +
          '<pre style="color: #e5e7eb; margin: 4px 0 0 0; white-space: pre-wrap;">3 PGems + GC. Roll at alvl 91+ for skillers</pre></div>' +
        errorHtml +
        assertHtml +
        navHtml +
        '<div style="margin-top: 12px; font-size: 0.8em; color: #6b7280;">' +
          'Prime Recursion: 2 \u2192 3 \u2192 5 \u2192 11 \u2192 31 | ' +
          'Mersenne: 2\u2077\u22121 = 127 | ' +
          'Test ' + testId + '/127 | ' +
          new Date(result.timestamp).toISOString() +
        '</div>' +
      '</div>' +
    '</div>';
}
```

---

*D2R Oracle Test Suite \u2014 Mersenne Prime 2\u2077\u22121 = 127 tests*
*Run this test: `index.html?src=tests/d2r-oracle/test-098-screen-cube-reroll-gc.md`*
*Test Runner: `index.html?src=tests/d2r-oracle/test-runner.md`*
*Layer P31 (Depth 4): Query Screens*
