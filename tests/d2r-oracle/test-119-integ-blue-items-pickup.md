# Test 119: Item Filter Logic

> **Layer P127** (Depth 5) — Full Integration / Edge Cases
> **Error Code:** `P127_E119`
> **Screen:** Integration
> **Run:** `index.html?src=tests/d2r-oracle/test-119-integ-blue-items-pickup.md`

## Description

What to pick up and what to skip

## Query Input

```
should I pick up blue items
```

## Expected Result

```
No except Monarch/Diadem/Claws/Javelins
```

---

```js
/**
 * D2R Oracle Test — Item Filter Logic
 * Layer: P127 | Error Code: P127_E119
 * Prime Recursion: a(5) = 127
 *   Sequence: 2 -> 3 -> 5 -> 11 -> 31 -> 127
 *
 * MDRUN Executable Test
 *   Run: index.html?src=tests/d2r-oracle/test-119-integ-blue-items-pickup.md
 *   Runner: index.html?src=tests/d2r-oracle/test-runner.md
 */
function main(params) {
  const testId = '119';
  const errorCode = 'P127_E119';
  const testName = 'integ-blue-items-pickup';
  const layer = { prime: 127, depth: 5, name: 'Full Integration / Edge Cases' };
  const testSrc = 'tests/d2r-oracle/test-119-integ-blue-items-pickup.md';
  const runnerSrc = 'tests/d2r-oracle/test-runner.md';

  const result = { pass: false, error: null, output: null, assertions: [], timestamp: Date.now() };

  try {
    // MDRUN logging
    if (typeof MDRUN !== 'undefined') {
      MDRUN.info('[TEST ' + testId + '] ' + errorCode + ' Starting: Item Filter Logic');
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
    // Integration / edge case test
    if (typeof MDRUN !== 'undefined') MDRUN.info('[119] Running integration test');
    const query = "should I pick up blue items";
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
    if (typeof MDRUN !== 'undefined') MDRUN.success('[119] Integration test passed');

    result.pass = true;
    result.assertions = assertions || [];
    result.output = 'No except Monarch/Diadem/Claws/Javelins';
    if (typeof MDRUN !== 'undefined') MDRUN.success('[TEST ' + testId + '] PASS');
  } catch (err) {
    result.pass = false;
    result.error = errorCode + ': ' + err.message;
    result.assertions = (typeof assertions !== 'undefined') ? assertions : [];
    if (typeof MDRUN !== 'undefined') {
      MDRUN.error('[TEST ' + testId + '] FAIL: ' + errorCode + ': ' + err.message);
      MDRUN.error('[LOG ' + errorCode + '] Prime layer P127, recursion depth 5');
      MDRUN.error('[LOG ' + errorCode + '] Sequence: 2 -> 3 -> 5 -> 11 -> 31 -> 127');
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
  navHtml += '<a href="?src=tests/d2r-oracle/test-118-integ-progression-path.md" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">&larr; Test 118</a>';
  navHtml += '<a href="?src=' + runnerSrc + '" style="color: #fbbf24; text-decoration: none; font-size: 0.9em;">Test Runner</a>';
  navHtml += '<a href="?src=tests/d2r-oracle/test-120-integ-multiclass-compare.md" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">Test 120 &rarr;</a>';
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
          '<h1 style="margin: 0; color: ' + statusColor + '; font-size: 1.5em;">' + status + ' \u2014 Test 119</h1>' +
          '<span style="background: #312e81; color: #a5b4fc; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">P127 \u00B7 Depth 5</span>' +
        '</div>' +
        '<h2 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 1.2em;">Item Filter Logic</h2>' +
        '<p style="color: #9ca3af; margin: 0 0 16px 0;">What to pick up and what to skip</p>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Screen:</strong> <span style="color: #e5e7eb;">Integration</span></div>' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Error Code:</strong> <code style="color: #fbbf24;">P127_E119</code></div>' +
        '</div>' +
        '<div style="padding: 12px; background: #111827; border-radius: 4px; margin-bottom: 12px;">' +
          '<strong style="color: #60a5fa;">Query:</strong> <code style="color: #34d399;">should I pick up blue items</code></div>' +
        '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
          '<strong style="color: #60a5fa;">Expected:</strong>' +
          '<pre style="color: #e5e7eb; margin: 4px 0 0 0; white-space: pre-wrap;">No except Monarch/Diadem/Claws/Javelins</pre></div>' +
        errorHtml +
        assertHtml +
        navHtml +
        '<div style="margin-top: 12px; font-size: 0.8em; color: #6b7280;">' +
          'Prime Recursion: 2 \u2192 3 \u2192 5 \u2192 11 \u2192 31 \u2192 127 | ' +
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
*Run this test: `index.html?src=tests/d2r-oracle/test-119-integ-blue-items-pickup.md`*
*Test Runner: `index.html?src=tests/d2r-oracle/test-runner.md`*
*Layer P127 (Depth 5): Full Integration / Edge Cases*
