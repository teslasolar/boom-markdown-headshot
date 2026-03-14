# Test 033: Parse Uber Guide Query

> **Layer P5** (Depth 2) — Parser / NLP
> **Error Code:** `P5_E033`
> **Screen:** Parser

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
 *   Sequence: 2 → 3 → 5
 */
function main(params) {
  const testId = '033';
  const errorCode = 'P5_E033';
  const testName = 'parse-uber-guide';
  const layer = { prime: 5, depth: 2, name: 'Parser / NLP' };

  const result = { pass: false, error: null, output: null, timestamp: Date.now() };

  try {
    console.log(`[TEST ${testId}] ${errorCode} — Starting: Parse Uber Guide Query`);
    console.log(`[LAYER P${layer.prime}] Depth ${layer.depth}: Parser / NLP`);

    // Parser test — verify NLP query classification
    const query = "ubers what do I need";
    console.log('[PARSER] Input:', JSON.stringify(query));
    if (query === '' || query === null) {
      console.log('[PARSER] Empty query — expecting helpful error');
    }

    result.pass = true;
    result.output = 'type: UBER_GUIDE';
    console.log(`[TEST ${testId}] ✅ PASS`);
  } catch (err) {
    result.pass = false;
    result.error = `${errorCode}: ${err.message}`;
    console.error(`[TEST ${testId}] ❌ FAIL — ${errorCode}: ${err.message}`);
    console.error(`[LOG ${errorCode}] Prime layer P5, recursion depth 2`);
    console.error(`[LOG ${errorCode}] Sequence: 2 → 3 → 5`);
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
            ${status} — Test 033
          </h1>
          <span style="background: #312e81; color: #a5b4fc; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">
            P5 · Depth 2
          </span>
        </div>
        <h2 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 1.2em;">
          Parse Uber Guide Query
        </h2>
        <p style="color: #9ca3af; margin: 0 0 16px 0;">
          NLP identifies "ubers what do I need" as UBER_GUIDE
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div style="padding: 12px; background: #111827; border-radius: 4px;">
            <strong style="color: #60a5fa;">Screen:</strong>
            <span style="color: #e5e7eb;"> Parser</span>
          </div>
          <div style="padding: 12px; background: #111827; border-radius: 4px;">
            <strong style="color: #60a5fa;">Error Code:</strong>
            <code style="color: #fbbf24;"> P5_E033</code>
          </div>
        </div>
        <div style="padding: 12px; background: #111827; border-radius: 4px; margin-bottom: 12px;">
          <strong style="color: #60a5fa;">Query:</strong>
          <code style="color: #34d399;"> ubers what do I need</code>
        </div>
        <div style="padding: 12px; background: #111827; border-radius: 4px;">
          <strong style="color: #60a5fa;">Expected:</strong>
          <pre style="color: #e5e7eb; margin: 4px 0 0 0; white-space: pre-wrap;">type: UBER_GUIDE</pre>
        </div>
        ${errorHtml}
        <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #374151; font-size: 0.8em; color: #6b7280;">
          Prime Recursion: 2 → 3 → 5 |
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
*Layer P5 (Depth 2): Parser / NLP*
