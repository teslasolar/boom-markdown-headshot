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
  const name = params.name || 'World'
  const color = params.color || '#58a6ff'

  const output = document.getElementById('output')

  // Navigation examples database
  const examples = [
    {
      emoji: '🎨',
      title: 'Gallery',
      desc: 'Visual showcase of all examples',
      url: '?src=gallery.md',
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      emoji: '👋',
      title: 'Hello World',
      desc: 'Minimal example',
      url: '?src=hello.md&name=Visitor',
      bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      emoji: '🤖',
      title: 'Multi-Agent',
      desc: 'Browser-based coordination',
      url: '?src=substrate-agent.md&id=agent1&port=5001',
      bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      emoji: '🌌',
      title: 'Particle Galaxy',
      desc: '10K particles in 3D space',
      url: '?src=particles.md&count=10000',
      bg: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'
    },
    {
      emoji: '🏔️',
      title: 'Procedural Terrain',
      desc: 'Generated landscapes',
      url: '?src=terrain.md&height=15',
      bg: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)'
    },
    {
      emoji: '🌍',
      title: 'Solar System',
      desc: 'Orbiting planets',
      url: '?src=solar-system.md&planets=8',
      bg: 'linear-gradient(135deg, #000000 0%, #0f0c29 50%, #302b63 100%)'
    },
    {
      emoji: '🌊',
      title: 'Wave Grid',
      desc: 'Animated wave patterns',
      url: '?src=wave-grid.md&size=20&color=rainbow',
      bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      emoji: '🎛️',
      title: 'State Machine',
      desc: 'Interactive state transitions',
      url: '?src=state-machine.md',
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      emoji: '📋',
      title: 'Templates',
      desc: 'Copy-paste templates',
      url: '?src=templates.md',
      bg: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
    }
  ]

  const docs = [
    { title: 'Quickstart', url: '?src=QUICKSTART.md', icon: '🚀' },
    { title: 'Usage Guide', url: '?src=USAGE.md', icon: '📖' },
    { title: 'Configuration', url: 'config.md', icon: '⚙️' }
  ]

  // Build examples HTML
  let examplesHTML = ''
  examples.forEach(ex => {
    examplesHTML += '<a href="' + ex.url + '" class="example-card" style="display: block; padding: 30px; background: ' + ex.bg + '; border-radius: 12px; text-decoration: none; color: white; transition: transform 0.2s; border: 2px solid rgba(255,255,255,0.1);">'
    examplesHTML += '<div style="font-size: 3em; margin-bottom: 15px;">' + ex.emoji + '</div>'
    examplesHTML += '<h3 style="margin: 0 0 10px 0; font-size: 1.4em;">' + ex.title + '</h3>'
    examplesHTML += '<p style="margin: 0; opacity: 0.9; font-size: 14px;">' + ex.desc + '</p>'
    examplesHTML += '</a>'
  })

  // Build docs HTML
  let docsHTML = ''
  docs.forEach(doc => {
    docsHTML += '<a href="' + doc.url + '" style="display: block; padding: 20px; background: #161b22; border: 1px solid #30363d; border-radius: 8px; text-decoration: none; color: #c9d1d9;">'
    docsHTML += '<span style="font-size: 1.5em; margin-right: 10px;">' + doc.icon + '</span>'
    docsHTML += '<span style="color: #58a6ff;">' + doc.title + '</span>'
    docsHTML += '</a>'
  })

  output.innerHTML = '<div style="min-height: 100vh; background: #0d1117; color: #c9d1d9;"><div style="max-width: 1200px; margin: 0 auto; padding: 60px 20px 40px;"><div style="text-align: center; margin-bottom: 60px;"><h1 style="font-size: 4em; margin: 0; background: linear-gradient(135deg, ' + color + ' 0%, #7b68ee 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">💥 MDRUN</h1><p style="font-size: 1.8em; color: #8b949e; margin: 20px 0 10px 0;">Markdown Executable Runtime</p><p style="font-size: 1.2em; color: #484f58; max-width: 600px; margin: 0 auto;">Where documentation becomes the application</p></div><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; max-width: 800px; margin: 0 auto 60px;"><div style="text-align: center; padding: 20px; background: #161b22; border-radius: 8px; border: 1px solid #30363d;"><div style="font-size: 2em;">📝</div><div style="color: #8b949e; font-size: 14px; margin-top: 8px;">Zero Install</div></div><div style="text-align: center; padding: 20px; background: #161b22; border-radius: 8px; border: 1px solid #30363d;"><div style="font-size: 2em;">⚡</div><div style="color: #8b949e; font-size: 14px; margin-top: 8px;">No Build</div></div><div style="text-align: center; padding: 20px; background: #161b22; border-radius: 8px; border: 1px solid #30363d;"><div style="font-size: 2em;">🎨</div><div style="color: #8b949e; font-size: 14px; margin-top: 8px;">3D Graphics</div></div><div style="text-align: center; padding: 20px; background: #161b22; border-radius: 8px; border: 1px solid #30363d;"><div style="font-size: 2em;">🔧</div><div style="color: #8b949e; font-size: 14px; margin-top: 8px;">URL Config</div></div></div><h2 style="font-size: 2em; margin: 0 0 30px 0; color: #58a6ff;">✨ Examples & Templates</h2><div id="examples-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-bottom: 60px;">' + examplesHTML + '</div><h2 style="font-size: 2em; margin: 0 0 20px 0; color: #58a6ff;">📚 Documentation</h2><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 60px;">' + docsHTML + '</div><div style="background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 40px; margin-bottom: 40px;"><h2 style="margin: 0 0 20px 0; color: #58a6ff;">🚀 Quick Actions</h2><div style="display: grid; gap: 15px;"><div style="padding: 15px; background: #0d1117; border-radius: 6px; font-family: monospace; font-size: 14px; color: #8b949e;"><strong style="color: #3fb950;">Launch:</strong> ?name=' + name + '&color=' + color.replace('#', '0x') + '</div><div style="padding: 15px; background: #0d1117; border-radius: 6px; font-family: monospace; font-size: 14px; color: #8b949e;"><strong style="color: #3fb950;">Debug:</strong> ?debug=true&logs=true</div><div style="padding: 15px; background: #0d1117; border-radius: 6px; font-family: monospace; font-size: 14px; color: #8b949e;"><strong style="color: #3fb950;">Keyboard:</strong> Ctrl+L for logs</div></div></div><div style="text-align: center; padding: 40px 0; color: #484f58; border-top: 1px solid #21262d;"><p style="margin: 0 0 10px 0;">MDRUN v' + MDRUN.version + ' | <a href="README.md" style="color: #58a6ff;">Source</a> | <a href="?debug=true" style="color: #58a6ff;">Debug</a></p><p style="margin: 10px 0 0 0;">📝 = 💻 = 🚀</p></div></div></div>'

  // Add hover effects
  document.querySelectorAll('.example-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)'
      this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)'
    })
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)'
      this.style.boxShadow = 'none'
    })
  })

  MDRUN.success('Navigation UI loaded with ' + examples.length + ' examples')
  console.log(`✅ MDRUN landing page ready`)
  console.log(`💥 ${examples.length} examples available`)
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

