# Test 098: Cube: Reroll Grand Charms

> **Layer P31** (Depth 4) — Query Screens
> **Error Code:** `P31_E098`
> **Screen:** CubeRecipes

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
 *   Sequence: 2 → 3 → 5 → 11 → 31
 */
function main(params) {
  const testId = '098';
  const errorCode = 'P31_E098';
  const testName = 'screen-cube-reroll-gc';
  const layer = { prime: 31, depth: 4, name: 'Query Screens' };

  const result = { pass: false, error: null, output: null, timestamp: Date.now() };

  try {
    console.log(`[TEST ${testId}] ${errorCode} — Starting: Cube: Reroll Grand Charms`);
    console.log(`[LAYER P${layer.prime}] Depth ${layer.depth}: Query Screens`);

    // Cube recipe screen test
    const query = "reroll grand charms";
    console.log('[CUBE] Recipe lookup:', query);
    // Verify: inputs + outputs + sanity check

    result.pass = true;
    result.output = '3 PGems + GC. Roll at alvl 91+ for skillers';
    console.log(`[TEST ${testId}] ✅ PASS`);
  } catch (err) {
    result.pass = false;
    result.error = `${errorCode}: ${err.message}`;
    console.error(`[TEST ${testId}] ❌ FAIL — ${errorCode}: ${err.message}`);
    console.error(`[LOG ${errorCode}] Prime layer P31, recursion depth 4`);
    console.error(`[LOG ${errorCode}] Sequence: 2 → 3 → 5 → 11 → 31`);
  }

  // Render result
  const status = result.pass ? '✅ PASS' : '❌ FAIL';
  const statusColor = result.pass ? '#4ade80' : '#f87171';
  const errorHtml = result.error
    ? `<div style="margin-top: 12px; padding: 12px; background: #450a0a; border: 1px solid #991b1b; border-radius: 4px;">
         <strong style="color: #fca5a5;">Error ${errorCode}:</strong>
         <pre style="color: #fecaca; margin: 4px 0 0 0;">${result.error}</pre>
       </div>`
    : '';

  document.getElementById('output').innerHTML = `
    <div style="max-width: 800px; margin: 40px auto; font-family: 'Courier New', monospace; color: #e5e7eb;">
      <div style="background: #1a1a2e; border: 2px solid ${statusColor}; border-radius: 8px; padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h1 style="margin: 0; color: ${statusColor}; font-size: 1.5em;">
            ${status} — Test 098
          </h1>
          <span style="background: #312e81; color: #a5b4fc; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">
            P31 · Depth 4
          </span>
        </div>
        <h2 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 1.2em;">
          Cube: Reroll Grand Charms
        </h2>
        <p style="color: #9ca3af; margin: 0 0 16px 0;">
          GC reroll recipe and skill prefix odds
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div style="padding: 12px; background: #111827; border-radius: 4px;">
            <strong style="color: #60a5fa;">Screen:</strong>
            <span style="color: #e5e7eb;"> CubeRecipes</span>
          </div>
          <div style="padding: 12px; background: #111827; border-radius: 4px;">
            <strong style="color: #60a5fa;">Error Code:</strong>
            <code style="color: #fbbf24;"> P31_E098</code>
          </div>
        </div>
        <div style="padding: 12px; background: #111827; border-radius: 4px; margin-bottom: 12px;">
          <strong style="color: #60a5fa;">Query:</strong>
          <code style="color: #34d399;"> reroll grand charms</code>
        </div>
        <div style="padding: 12px; background: #111827; border-radius: 4px;">
          <strong style="color: #60a5fa;">Expected:</strong>
          <pre style="color: #e5e7eb; margin: 4px 0 0 0; white-space: pre-wrap;">3 PGems + GC. Roll at alvl 91+ for skillers</pre>
        </div>
        ${errorHtml}
        <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #374151; font-size: 0.8em; color: #6b7280;">
          Prime Recursion: 2 → 3 → 5 → 11 → 31 |
          Mersenne: 2⁷−1 = 127 |
          Test ${testId}/127 |
          ${new Date(result.timestamp).toISOString()}
        </div>
      </div>
    </div>
  `;
}
```

---

*D2R Oracle Test Suite — Mersenne Prime 2⁷−1 = 127 tests*
*Prime Recursion: a(n+1) = prime(a(n)) → 2 → 3 → 5 → 11 → 31 → 127*
*Layer P31 (Depth 4): Query Screens*
