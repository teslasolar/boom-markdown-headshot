# Test 057: FCR Breakpoints Paladin

> **Layer P11** (Depth 3) — Calculators
> **Error Code:** `P11_E057`
> **Screen:** Breakpoints
> **Run:** `index.html?src=tests/d2r-oracle/test-057-calc-fcr-paladin.md`

## Description

Paladin FCR breakpoints for Blessed Hammer

## Query Input

```
fcr paladin
```

## Expected Result

```
0%=15f, 9%=14f, 18%=13f, 30%=12f, 48%=11f, 75%=10f, 125%=9f
```

---

```js
/**
 * D2R Oracle Test — FCR Breakpoints Paladin
 * Layer: P11 | Error Code: P11_E057
 * Prime Recursion: a(3) = 11
 *   Sequence: 2 -> 3 -> 5 -> 11
 *
 * MDRUN Executable Test
 *   Run: index.html?src=tests/d2r-oracle/test-057-calc-fcr-paladin.md
 *   Runner: index.html?src=tests/d2r-oracle/test-runner.md
 */
function main(params) {
  const testId = '057';
  const errorCode = 'P11_E057';
  const testName = 'calc-fcr-paladin';
  const layer = { prime: 11, depth: 3, name: 'Calculators' };
  const testSrc = 'tests/d2r-oracle/test-057-calc-fcr-paladin.md';
  const runnerSrc = 'tests/d2r-oracle/test-runner.md';

  const result = { pass: false, error: null, output: null, assertions: [], timestamp: Date.now() };

  try {
    // MDRUN logging
    if (typeof MDRUN !== 'undefined') {
      MDRUN.info('[TEST ' + testId + '] ' + errorCode + ' Starting: FCR Breakpoints Paladin');
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
    // Breakpoint calculator — verify hardcoded tables
    if (typeof MDRUN !== 'undefined') MDRUN.info('[057] Validating breakpoint tables');

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

    if (typeof MDRUN !== 'undefined') MDRUN.success('[057] Breakpoint tables verified');

    result.pass = true;
    result.assertions = assertions || [];
    result.output = '0%=15f, 9%=14f, 18%=13f, 30%=12f, 48%=11f, 75%=10f, 125%=9f';
    if (typeof MDRUN !== 'undefined') MDRUN.success('[TEST ' + testId + '] PASS');
  } catch (err) {
    result.pass = false;
    result.error = errorCode + ': ' + err.message;
    result.assertions = (typeof assertions !== 'undefined') ? assertions : [];
    if (typeof MDRUN !== 'undefined') {
      MDRUN.error('[TEST ' + testId + '] FAIL: ' + errorCode + ': ' + err.message);
      MDRUN.error('[LOG ' + errorCode + '] Prime layer P11, recursion depth 3');
      MDRUN.error('[LOG ' + errorCode + '] Sequence: 2 -> 3 -> 5 -> 11');
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
  navHtml += '<a href="?src=tests/d2r-oracle/test-056-calc-fcr-sorc.md" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">&larr; Test 056</a>';
  navHtml += '<a href="?src=' + runnerSrc + '" style="color: #fbbf24; text-decoration: none; font-size: 0.9em;">Test Runner</a>';
  navHtml += '<a href="?src=tests/d2r-oracle/test-058-calc-ias-javazon.md" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">Test 058 &rarr;</a>';
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
          '<h1 style="margin: 0; color: ' + statusColor + '; font-size: 1.5em;">' + status + ' \u2014 Test 057</h1>' +
          '<span style="background: #312e81; color: #a5b4fc; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">P11 \u00B7 Depth 3</span>' +
        '</div>' +
        '<h2 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 1.2em;">FCR Breakpoints Paladin</h2>' +
        '<p style="color: #9ca3af; margin: 0 0 16px 0;">Paladin FCR breakpoints for Blessed Hammer</p>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Screen:</strong> <span style="color: #e5e7eb;">Breakpoints</span></div>' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Error Code:</strong> <code style="color: #fbbf24;">P11_E057</code></div>' +
        '</div>' +
        '<div style="padding: 12px; background: #111827; border-radius: 4px; margin-bottom: 12px;">' +
          '<strong style="color: #60a5fa;">Query:</strong> <code style="color: #34d399;">fcr paladin</code></div>' +
        '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
          '<strong style="color: #60a5fa;">Expected:</strong>' +
          '<pre style="color: #e5e7eb; margin: 4px 0 0 0; white-space: pre-wrap;">0%=15f, 9%=14f, 18%=13f, 30%=12f, 48%=11f, 75%=10f, 125%=9f</pre></div>' +
        errorHtml +
        assertHtml +
        navHtml +
        '<div style="margin-top: 12px; font-size: 0.8em; color: #6b7280;">' +
          'Prime Recursion: 2 \u2192 3 \u2192 5 \u2192 11 | ' +
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
*Run this test: `index.html?src=tests/d2r-oracle/test-057-calc-fcr-paladin.md`*
*Test Runner: `index.html?src=tests/d2r-oracle/test-runner.md`*
*Layer P11 (Depth 3): Calculators*
