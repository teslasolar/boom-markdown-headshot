# 📝⚡ BOOM MARKDOWN HEADSHOT

**This README is executable. Really.**

Open `index.html?name=YourName` to see this document come alive.

---

## 🎨 Quick Links

- **[Gallery](index.html?src=gallery.md)** - See all examples (3D worlds, particles, terrain!)
- **[Templates Guide](index.html?src=templates.md)** - Copy-paste templates
- **[Quickstart](index.html?src=QUICKSTART.md)** - Get started in 60 seconds
- **[Config](config.md)** - Configure runtime without editing code

---

## What is this?

This is a demonstration of MDRUN - a markdown executable runtime where:

- **Documentation = Code = Application**
- No build step, no dependencies
- Just markdown with code blocks
- Runs directly in browser via URL parameters

**New:** Now with Three.js 3D templates, particle systems, procedural terrain, and more!

---

## Try It

**Local:**
```
file:///path/to/index.html?name=Thomas&color=blue
file:///path/to/index.html?src=particles.md&count=10000
file:///path/to/index.html?src=terrain.md&height=20
```

**GitHub Pages:**
```
https://username.github.io/repo?name=Thomas&color=blue
https://username.github.io/repo?src=gallery.md
```

---

## The Magic

Below is executable JavaScript. When you open this via `index.html`, it runs automatically:

```js
function main(params) {
  // Get parameters from URL
  const name = params.name || 'World'
  const color = params.color || '#58a6ff'

  // Create interactive UI
  const output = document.getElementById('output')

  output.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="font-size: 4em; margin: 0; color: ${color};">
        💥 ${name}
      </h1>
      <p style="font-size: 1.5em; color: #8b949e; margin-top: 20px;">
        This page was generated from <code>README.md</code>
      </p>

      <div style="margin-top: 40px; padding: 20px; background: #161b22; border-radius: 8px;">
        <h2 style="color: #58a6ff;">Parameters Received:</h2>
        <pre style="color: #c9d1d9; overflow-x: auto;">${JSON.stringify(params, null, 2)}</pre>
      </div>

      <div style="margin-top: 40px; padding: 20px; background: #161b22; border-radius: 8px;">
        <h2 style="color: #58a6ff;">Try These URLs:</h2>
        <ul style="line-height: 2; color: #8b949e;">
          <li><a href="?name=Alice&color=hotpink" style="color: #58a6ff;">?name=Alice&color=hotpink</a></li>
          <li><a href="?name=Bob&color=lime" style="color: #58a6ff;">?name=Bob&color=lime</a></li>
          <li><a href="?name=Charlie&color=gold" style="color: #58a6ff;">?name=Charlie&color=gold</a></li>
        </ul>
      </div>

      <div style="margin-top: 40px; padding: 20px; background: #0d419d; border-radius: 8px;">
        <h2 style="margin-top: 0;">🎯 The Point</h2>
        <p style="line-height: 1.8;">
          This entire page was generated from code blocks in <code>README.md</code>.
          No build step. No bundler. No npm install.
          Just markdown → browser → running app.
        </p>
      </div>

      <div style="margin-top: 40px; padding: 20px; border: 2px solid #30363d; border-radius: 8px;">
        <h2 style="color: #58a6ff;">How It Works:</h2>
        <ol style="line-height: 2; color: #8b949e;">
          <li><code>index.html</code> fetches <code>README.md</code></li>
          <li>Extracts code blocks (js, python, html)</li>
          <li>Executes them in order</li>
          <li>Passes URL params to <code>main()</code> function</li>
        </ol>
      </div>

      <div style="margin-top: 60px; text-align: center; color: #484f58;">
        <p>View source: <a href="README.md" style="color: #58a6ff;">README.md</a> | <a href="index.html" style="color: #58a6ff;">index.html</a></p>
        <p style="margin-top: 20px;">MDRUN - Markdown Executable Runtime</p>
      </div>
    </div>
  `

  console.log(`✅ MDRUN executed with params:`, params)
  console.log(`💥 Name: ${name}, Color: ${color}`)
}
```

---

## Advanced: Python Support

MDRUN also supports Python via Pyodide. Here's a Python example:

```python
# This Python code runs in the browser!
def greet(name):
    return f"Hello from Python, {name}!"

if 'name' in params:
    print(greet(params['name']))
    print(f"All params: {params}")
```

---

## Multiple Languages, One Document

Mix and match:

```html
<div style="position: fixed; bottom: 20px; right: 20px; padding: 10px 20px; background: #238636; color: white; border-radius: 6px; font-weight: bold;">
  🚀 MDRUN Active
</div>
```

---

## Use Cases

**1. Living Documentation**
- Docs that demonstrate themselves
- Examples that actually run
- No code drift

**2. Rapid Prototyping**
- Write code in markdown
- Deploy to GitHub Pages
- Share via URL

**3. Education**
- Interactive tutorials
- Executable examples
- Zero setup for learners

**4. Distributed Systems**
- Multi-agent coordination
- Browser-based nodes
- URL-configured instances

---

## Deploy to GitHub Pages

```bash
# 1. Create repo
git init
git add README.md index.html
git commit -m "Initial MDRUN setup"

# 2. Push to GitHub
git remote add origin https://github.com/username/repo.git
git push -u origin main

# 3. Enable GitHub Pages (Settings → Pages → Source: main branch)

# 4. Visit: https://username.github.io/repo?name=World
```

---

## Architecture

**Runtime:** 60 lines of HTML/JS
**Language Support:** JS (native), Python (Pyodide), HTML (injection)
**Parameter Passing:** URL query string → `main(params)`
**Deployment:** Static hosting (GitHub Pages, Netlify, etc.)
**Cost:** $0
**Install Steps:** 0

---

## Philosophy

> "The best documentation is the one that runs."

Every code example in docs should be:
1. **Correct** - it actually runs
2. **Current** - it's the real implementation
3. **Contextual** - it shows real usage

With MDRUN, documentation IS the application.

---

## Limitations

- Client-side only (no server)
- Browser sandbox (no file system)
- Async operations only
- CORS restrictions apply

**But perfect for:**
- SPAs
- Visualizations
- Simulations
- Distributed coordination
- Education

---

## Technical Details

**Code Block Extraction:**
```
/```(\w+)\n([\s\S]*?)```/g
```

**Execution Order:**
1. All code blocks in document order
2. Then `main(params)` if defined

**Parameter Access:**
- JavaScript: `params.key`
- Python: `params['key']`

---

## Examples in the Wild

Once you deploy this, try:

```
?name=Agent1&id=001&mode=active
?name=Agent2&id=002&mode=passive
?name=Coordinator&id=hub&peers=001,002
```

Each URL spawns a different configured instance.

---

## Meta

This README is:
- ✅ Human readable documentation
- ✅ Machine executable code
- ✅ Live demo application
- ✅ Deployment ready
- ✅ Version controlled
- ✅ Zero dependencies

**That's the dream.**

---

## License

MIT

---

## Credits

Inspired by:
- Literate programming (Knuth)
- Observable notebooks
- Jupyter notebooks
- The weird beauty of self-modifying code

**Built with:**
- Vanilla JS
- Pyodide (for Python)
- Markdown (the OG)

---

**README.md = CODE = APP**

🎯 One file to rule them all.

---

