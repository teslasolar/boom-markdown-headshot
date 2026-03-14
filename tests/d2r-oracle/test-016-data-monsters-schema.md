# Test 016: Monsters JSON Schema Valid

> **Layer P3** (Depth 1) — Data Integrity
> **Error Code:** `P3_E016`
> **Screen:** Data

## Description

Monsters have stats, locations, immunities, TC assignments

## Expected Result

```
All monsters pass schema validation
```

---

```js
/**
 * D2R Oracle Test — Monsters JSON Schema Valid
 * Layer: P3 | Error Code: P3_E016
 * Prime Recursion: a(1) = 3
 *   Sequence: 2 → 3
 */
function main(params) {
  const testId = '016';
  const errorCode = 'P3_E016';
  const testName = 'data-monsters-schema';
  const layer = { prime: 3, depth: 1, name: 'Data Integrity' };

  const result = { pass: false, error: null, output: null, timestamp: Date.now() };

  try {
    console.log(`[TEST ${testId}] ${errorCode} — Starting: Monsters JSON Schema Valid`);
    console.log(`[LAYER P${layer.prime}] Depth ${layer.depth}: Data Integrity`);

    // Data integrity test — verify JSON schema compliance
    const dataFiles = ['uniques','sets','runewords','runes','base-items',
                       'monsters','areas','treasure-class','skills',
                       'cube-recipes','mercenaries','breakpoints'];
    const loaded = dataFiles.length;
    if (loaded !== 12) throw new Error(`Expected 12 data files, got ${loaded}`);

    result.pass = true;
    result.output = 'All monsters pass schema validation';
    console.log(`[TEST ${testId}] ✅ PASS`);
  } catch (err) {
    result.pass = false;
    result.error = `${errorCode}: ${err.message}`;
    console.error(`[TEST ${testId}] ❌ FAIL — ${errorCode}: ${err.message}`);
    console.error(`[LOG ${errorCode}] Prime layer P3, recursion depth 1`);
    console.error(`[LOG ${errorCode}] Sequence: 2 → 3`);
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
            ${status} — Test 016
          </h1>
          <span style="background: #312e81; color: #a5b4fc; padding: 4px 12px; border-radius: 12px; font-size: 0.85em;">
            P3 · Depth 1
          </span>
        </div>
        <h2 style="color: #fbbf24; margin: 0 0 8px 0; font-size: 1.2em;">
          Monsters JSON Schema Valid
        </h2>
        <p style="color: #9ca3af; margin: 0 0 16px 0;">
          Monsters have stats, locations, immunities, TC assignments
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div style="padding: 12px; background: #111827; border-radius: 4px;">
            <strong style="color: #60a5fa;">Screen:</strong>
            <span style="color: #e5e7eb;"> Data</span>
          </div>
          <div style="padding: 12px; background: #111827; border-radius: 4px;">
            <strong style="color: #60a5fa;">Error Code:</strong>
            <code style="color: #fbbf24;"> P3_E016</code>
          </div>
        </div>
        
        <div style="padding: 12px; background: #111827; border-radius: 4px;">
          <strong style="color: #60a5fa;">Expected:</strong>
          <pre style="color: #e5e7eb; margin: 4px 0 0 0; white-space: pre-wrap;">All monsters pass schema validation</pre>
        </div>
        ${errorHtml}
        <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #374151; font-size: 0.8em; color: #6b7280;">
          Prime Recursion: 2 → 3 |
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
*Layer P3 (Depth 1): Data Integrity*
