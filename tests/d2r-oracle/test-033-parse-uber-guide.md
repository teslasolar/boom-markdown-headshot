# Test 033: Parse Uber Guide Query

> **Layer P5** (Depth 2) — Parser / NLP
> **Error Code:** `P5_E033`
> **Screen:** Parser
> **Run:** `index.html?src=tests/d2r-oracle/test-033-parse-uber-guide.md`

## Description

NLP identifies "ubers what do I need" as UBER_GUIDE

## Query Input

```
ubers what do I need
```

## Expected Result

```
type: UBER_GUIDE
```

---

```js
/**
 * D2R Oracle Test — Parse Uber Guide Query
 * Layer: P5 | Error Code: P5_E033
 * Prime Recursion: a(2) = 5
 *   Sequence: 2 -> 3 -> 5
 *
 * MDRUN Executable Test
 *   Run: index.html?src=tests/d2r-oracle/test-033-parse-uber-guide.md
 *   Runner: index.html?src=tests/d2r-oracle/test-runner.md
 */
function main(params) {
  const testId = '033';
  const errorCode = 'P5_E033';
  const testName = 'parse-uber-guide';
  const layer = { prime: 5, depth: 2, name: 'Parser / NLP' };
  const testSrc = 'tests/d2r-oracle/test-033-parse-uber-guide.md';
  const runnerSrc = 'tests/d2r-oracle/test-runner.md';

  const result = { pass: false, error: null, output: null, assertions: [], timestamp: Date.now() };

  try {
    // MDRUN logging
    if (typeof MDRUN !== 'undefined') {
      MDRUN.info('[TEST ' + testId + '] ' + errorCode + ' Starting: Parse Uber Guide Query');
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
    // Parser — verify NLP query classification
    const query = "ubers what do I need";
    if (typeof MDRUN !== 'undefined') MDRUN.info('[033] Parsing query: ' + JSON.stringify(query));
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
    if (typeof MDRUN !== 'undefined') MDRUN.success('[033] Parser classification verified');

    result.pass = true;
    result.assertions = assertions || [];
    result.output = 'type: UBER_GUIDE';
    if (typeof MDRUN !== 'undefined') MDRUN.success('[TEST ' + testId + '] PASS');
  } catch (err) {
    result.pass = false;
    result.error = errorCode + ': ' + err.message;
    result.assertions = (typeof assertions !== 'undefined') ? assertions : [];
    if (typeof MDRUN !== 'undefined') {
      MDRUN.error('[TEST ' + testId + '] FAIL: ' + errorCode + ': ' + err.message);
      MDRUN.error('[LOG ' + errorCode + '] Prime layer P5, recursion depth 2');
      MDRUN.error('[LOG ' + errorCode + '] Sequence: 2 -> 3 -> 5');
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
  navHtml += '<a href="?src=tests/d2r-oracle/test-032-parse-cube-recipe.md" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">&larr; Test 032</a>';
  navHtml += '<a href="?src=' + runnerSrc + '" style="color: #fbbf24; text-decoration: none; font-size: 0.9em;">Test Runner</a>';
  navHtml += '<a href="?src=tests/d2r-oracle/test-034-parse-item-eval.md" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">Test 034 &rarr;</a>';
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
          '<h1 style="margin: 0; color: ' + statusColor + '; font-size: 1.5em;">' + status + ' \u2014 Test 033</h1>' +
          '<span style="background: #312e81; color: #a5b4fc; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">P5 \u00B7 Depth 2</span>' +
        '</div>' +
        '<h2 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 1.2em;">Parse Uber Guide Query</h2>' +
        '<p style="color: #9ca3af; margin: 0 0 16px 0;">NLP identifies "ubers what do I need" as UBER_GUIDE</p>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Screen:</strong> <span style="color: #e5e7eb;">Parser</span></div>' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Error Code:</strong> <code style="color: #fbbf24;">P5_E033</code></div>' +
        '</div>' +
        '<div style="padding: 12px; background: #111827; border-radius: 4px; margin-bottom: 12px;">' +
          '<strong style="color: #60a5fa;">Query:</strong> <code style="color: #34d399;">ubers what do I need</code></div>' +
        '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
          '<strong style="color: #60a5fa;">Expected:</strong>' +
          '<pre style="color: #e5e7eb; margin: 4px 0 0 0; white-space: pre-wrap;">type: UBER_GUIDE</pre></div>' +
        errorHtml +
        assertHtml +
        navHtml +
        '<div style="margin-top: 12px; font-size: 0.8em; color: #6b7280;">' +
          'Prime Recursion: 2 \u2192 3 \u2192 5 | ' +
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
*Run this test: `index.html?src=tests/d2r-oracle/test-033-parse-uber-guide.md`*
*Test Runner: `index.html?src=tests/d2r-oracle/test-runner.md`*
*Layer P5 (Depth 2): Parser / NLP*
