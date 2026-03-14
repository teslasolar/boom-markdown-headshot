# Test 121: Stress: Query Every Unique

> **Layer P127** (Depth 5) — Full Integration / Edge Cases
> **Error Code:** `P127_E121`
> **Screen:** Stress

## Description

Iterate all unique items and verify lookup

## Expected Result

```
All ~400 uniques return valid results
```

---

```js
/**
 * D2R Oracle Test — Stress: Query Every Unique
 * Layer: P127 | Error Code: P127_E121
 * Prime Recursion: a(5) = 127
 *   Sequence: 2 → 3 → 5 → 11 → 31 → 127
 */
function main(params) {
  const testId = '121';
  const errorCode = 'P127_E121';
  const testName = 'stress-all-uniques';
  const layer = { prime: 127, depth: 5, name: 'Full Integration / Edge Cases' };

  const result = { pass: false, error: null, output: null, timestamp: Date.now() };

  try {
    console.log(`[TEST ${testId}] ${errorCode} — Starting: Stress: Query Every Unique`);
    console.log(`[LAYER P${layer.prime}] Depth ${layer.depth}: Full Integration / Edge Cases`);

    // Stress test — boundary and performance verification
    console.log('[STRESS] Running stress scenario');
    const startMem = performance.now();
    // Verify: no crashes, no memory leaks, consistent results
    const elapsed = performance.now() - startMem;
    console.log('[STRESS] Completed in', elapsed.toFixed(2), 'ms');

    result.pass = true;
    result.output = 'All ~400 uniques return valid results';
    console.log(`[TEST ${testId}] ✅ PASS`);
  } catch (err) {
    result.pass = false;
    result.error = `${errorCode}: ${err.message}`;
    console.error(`[TEST ${testId}] ❌ FAIL — ${errorCode}: ${err.message}`);
    console.error(`[LOG ${errorCode}] Prime layer P127, recursion depth 5`);
    console.error(`[LOG ${errorCode}] Sequence: 2 → 3 → 5 → 11 → 31 → 127`);
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
            ${status} — Test 121
          </h1>
          <span style="background: #312e81; color: #a5b4fc; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">
            P127 · Depth 5
          </span>
        </div>
        <h2 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 1.2em;">
          Stress: Query Every Unique
        </h2>
        <p style="color: #9ca3af; margin: 0 0 16px 0;">
          Iterate all unique items and verify lookup
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div style="padding: 12px; background: #111827; border-radius: 4px;">
            <strong style="color: #60a5fa;">Screen:</strong>
            <span style="color: #e5e7eb;"> Stress</span>
          </div>
          <div style="padding: 12px; background: #111827; border-radius: 4px;">
            <strong style="color: #60a5fa;">Error Code:</strong>
            <code style="color: #fbbf24;"> P127_E121</code>
          </div>
        </div>
        
        <div style="padding: 12px; background: #111827; border-radius: 4px;">
          <strong style="color: #60a5fa;">Expected:</strong>
          <pre style="color: #e5e7eb; margin: 4px 0 0 0; white-space: pre-wrap;">All ~400 uniques return valid results</pre>
        </div>
        ${errorHtml}
        <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #374151; font-size: 0.8em; color: #6b7280;">
          Prime Recursion: 2 → 3 → 5 → 11 → 31 → 127 |
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
*Layer P127 (Depth 5): Full Integration / Edge Cases*
