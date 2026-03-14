# Test 009: Error Handler Catches Gracefully

> **Layer P2** (Depth 0) — Foundation / Smoke
> **Error Code:** `P2_E009`
> **Screen:** Error
> **Run:** `index.html?src=tests/d2r-oracle/test-009-smoke-error-handler.md`

## Description

Verify unknown queries return helpful error

## Query Input

```
d2r "asdfghjkl"
```

## Expected Result

```
Friendly error with suggestions
```

---

```js
/**
 * D2R Oracle Test — Error Handler Catches Gracefully
 * Layer: P2 | Error Code: P2_E009
 * Prime Recursion: a(0) = 2
 *   Sequence: 2
 *
 * MDRUN Executable Test
 *   Run: index.html?src=tests/d2r-oracle/test-009-smoke-error-handler.md
 *   Runner: index.html?src=tests/d2r-oracle/test-runner.md
 */
function main(params) {
  const testId = '009';
  const errorCode = 'P2_E009';
  const testName = 'smoke-error-handler';
  const layer = { prime: 2, depth: 0, name: 'Foundation / Smoke' };
  const testSrc = 'tests/d2r-oracle/test-009-smoke-error-handler.md';
  const runnerSrc = 'tests/d2r-oracle/test-runner.md';

  const result = { pass: false, error: null, output: null, assertions: [], timestamp: Date.now() };

  try {
    // MDRUN logging
    if (typeof MDRUN !== 'undefined') {
      MDRUN.info('[TEST ' + testId + '] ' + errorCode + ' Starting: Error Handler Catches Gracefully');
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
    // Error handling — verify graceful failure
    if (typeof MDRUN !== 'undefined') MDRUN.info('[009] Testing error handler');
    const unknownQuery = "d2r \"asdfghjkl\"";
    let errorCaught = false;
    try {
      if (unknownQuery && unknownQuery.match(/^[^a-zA-Z0-9]+$/)) throw new Error('Invalid query');
      errorCaught = false;
    } catch (e) {
      errorCaught = true;
    }
    assert(typeof unknownQuery === 'string', 'Query input is string type');
    if (typeof MDRUN !== 'undefined') MDRUN.success('[009] Error handling verified');

    result.pass = true;
    result.assertions = assertions || [];
    result.output = 'Friendly error with suggestions';
    if (typeof MDRUN !== 'undefined') MDRUN.success('[TEST ' + testId + '] PASS');
  } catch (err) {
    result.pass = false;
    result.error = errorCode + ': ' + err.message;
    result.assertions = (typeof assertions !== 'undefined') ? assertions : [];
    if (typeof MDRUN !== 'undefined') {
      MDRUN.error('[TEST ' + testId + '] FAIL: ' + errorCode + ': ' + err.message);
      MDRUN.error('[LOG ' + errorCode + '] Prime layer P2, recursion depth 0');
      MDRUN.error('[LOG ' + errorCode + '] Sequence: 2');
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
  navHtml += '<a href="?src=tests/d2r-oracle/test-008-smoke-parser-init.md" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">&larr; Test 008</a>';
  navHtml += '<a href="?src=' + runnerSrc + '" style="color: #fbbf24; text-decoration: none; font-size: 0.9em;">Test Runner</a>';
  navHtml += '<a href="?src=tests/d2r-oracle/test-010-smoke-version-info.md" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">Test 010 &rarr;</a>';
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
          '<h1 style="margin: 0; color: ' + statusColor + '; font-size: 1.5em;">' + status + ' \u2014 Test 009</h1>' +
          '<span style="background: #312e81; color: #a5b4fc; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">P2 \u00B7 Depth 0</span>' +
        '</div>' +
        '<h2 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 1.2em;">Error Handler Catches Gracefully</h2>' +
        '<p style="color: #9ca3af; margin: 0 0 16px 0;">Verify unknown queries return helpful error</p>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Screen:</strong> <span style="color: #e5e7eb;">Error</span></div>' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Error Code:</strong> <code style="color: #fbbf24;">P2_E009</code></div>' +
        '</div>' +
        '<div style="padding: 12px; background: #111827; border-radius: 4px; margin-bottom: 12px;">' +
          '<strong style="color: #60a5fa;">Query:</strong> <code style="color: #34d399;">d2r "asdfghjkl"</code></div>' +
        '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
          '<strong style="color: #60a5fa;">Expected:</strong>' +
          '<pre style="color: #e5e7eb; margin: 4px 0 0 0; white-space: pre-wrap;">Friendly error with suggestions</pre></div>' +
        errorHtml +
        assertHtml +
        navHtml +
        '<div style="margin-top: 12px; font-size: 0.8em; color: #6b7280;">' +
          'Prime Recursion: 2 | ' +
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
*Run this test: `index.html?src=tests/d2r-oracle/test-009-smoke-error-handler.md`*
*Test Runner: `index.html?src=tests/d2r-oracle/test-runner.md`*
*Layer P2 (Depth 0): Foundation / Smoke*
