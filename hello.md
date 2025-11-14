# 👋 Hello MDRUN

**The simplest possible example.**

Open with: `index.html?src=hello.md&name=World`

---

## Code

```js
function main(params) {
  const name = params.name || 'World'

  document.getElementById('output').innerHTML = `
    <div style="max-width: 600px; margin: 100px auto; text-align: center;">
      <h1 style="font-size: 5em; margin: 0; color: #58a6ff;">
        👋
      </h1>
      <h2 style="font-size: 3em; margin: 20px 0; color: #c9d1d9;">
        Hello, ${name}!
      </h2>
      <p style="font-size: 1.2em; color: #8b949e;">
        This page was generated from <code>hello.md</code>
      </p>
      <div style="margin-top: 40px; padding: 20px; background: #161b22; border-radius: 8px; text-align: left;">
        <h3 style="color: #58a6ff;">Parameters:</h3>
        <pre style="color: #c9d1d9;">${JSON.stringify(params, null, 2)}</pre>
      </div>
    </div>
  `

  console.log('Hello from MDRUN!', params)
}
```

---

## That's it!

- 10 lines of code
- 0 dependencies
- 0 build steps
- ∞ possibilities

---
