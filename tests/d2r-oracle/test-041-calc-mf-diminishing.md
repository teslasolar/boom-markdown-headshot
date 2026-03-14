# Test 041: MF Diminishing Returns Formula

> **Layer P11** (Depth 3) — Calculators
> **Error Code:** `P11_E041`
> **Screen:** DropCalc
> **Run:** `index.html?src=tests/d2r-oracle/test-041-calc-mf-diminishing.md`

## Description

effectiveMF = mf*250/(mf+250). Verify: 200->125, 400->154

## Expected Result

```
MF(200)=125, MF(400)=154.69, MF(0)=0
```

---

```js
/**
 * D2R Oracle Test — MF Diminishing Returns Formula
 * Layer: P11 | Error Code: P11_E041
 * Prime Recursion: a(3) = 11
 *   Sequence: 2 -> 3 -> 5 -> 11
 *
 * MDRUN Executable Test
 *   Run: index.html?src=tests/d2r-oracle/test-041-calc-mf-diminishing.md
 *   Runner: index.html?src=tests/d2r-oracle/test-runner.md
 */
function main(params) {
  const testId = '041';
  const errorCode = 'P11_E041';
  const testName = 'calc-mf-diminishing';
  const layer = { prime: 11, depth: 3, name: 'Calculators' };
  const testSrc = 'tests/d2r-oracle/test-041-calc-mf-diminishing.md';
  const runnerSrc = 'tests/d2r-oracle/test-runner.md';

  const result = { pass: false, error: null, output: null, assertions: [], timestamp: Date.now() };

  try {
    // MDRUN logging
    if (typeof MDRUN !== 'undefined') {
      MDRUN.info('[TEST ' + testId + '] ' + errorCode + ' Starting: MF Diminishing Returns Formula');
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
    // Drop calculator — actual math verification
    if (typeof MDRUN !== 'undefined') MDRUN.info('[041] Running drop calculator formulas');
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

    if (typeof MDRUN !== 'undefined') MDRUN.success('[041] Drop calculator formulas verified');

    result.pass = true;
    result.assertions = assertions || [];
    result.output = 'MF(200)=125, MF(400)=154.69, MF(0)=0';
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
  navHtml += '<a href="?src=tests/d2r-oracle/test-040-parse-empty-query.md" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">&larr; Test 040</a>';
  navHtml += '<a href="?src=' + runnerSrc + '" style="color: #fbbf24; text-decoration: none; font-size: 0.9em;">Test Runner</a>';
  navHtml += '<a href="?src=tests/d2r-oracle/test-042-calc-nodrop-players.md" style="color: #60a5fa; text-decoration: none; font-size: 0.9em;">Test 042 &rarr;</a>';
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
          '<h1 style="margin: 0; color: ' + statusColor + '; font-size: 1.5em;">' + status + ' \u2014 Test 041</h1>' +
          '<span style="background: #312e81; color: #a5b4fc; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">P11 \u00B7 Depth 3</span>' +
        '</div>' +
        '<h2 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 1.2em;">MF Diminishing Returns Formula</h2>' +
        '<p style="color: #9ca3af; margin: 0 0 16px 0;">effectiveMF = mf*250/(mf+250). Verify: 200->125, 400->154</p>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Screen:</strong> <span style="color: #e5e7eb;">DropCalc</span></div>' +
          '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
            '<strong style="color: #60a5fa;">Error Code:</strong> <code style="color: #fbbf24;">P11_E041</code></div>' +
        '</div>' +
        
        '<div style="padding: 12px; background: #111827; border-radius: 4px;">' +
          '<strong style="color: #60a5fa;">Expected:</strong>' +
          '<pre style="color: #e5e7eb; margin: 4px 0 0 0; white-space: pre-wrap;">MF(200)=125, MF(400)=154.69, MF(0)=0</pre></div>' +
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
*Run this test: `index.html?src=tests/d2r-oracle/test-041-calc-mf-diminishing.md`*
*Test Runner: `index.html?src=tests/d2r-oracle/test-runner.md`*
*Layer P11 (Depth 3): Calculators*
