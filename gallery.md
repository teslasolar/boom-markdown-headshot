# 🎨 MDRUN Gallery

**All examples and templates in one place**

---

## 🚀 Quick Examples

Click any link to run:

### Basic Examples

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">

  <a href="?src=hello.md&name=Visitor" style="display: block; padding: 20px; background: #161b22; border: 1px solid #30363d; border-radius: 8px; text-decoration: none; color: inherit; transition: all 0.3s;">
    <div style="font-size: 2em; margin-bottom: 10px;">👋</div>
    <h3 style="margin: 0 0 10px 0; color: #58a6ff;">Hello World</h3>
    <p style="color: #8b949e; font-size: 14px; margin: 0;">Minimal MDRUN example</p>
  </a>

  <a href="?name=Demo&color=hotpink" style="display: block; padding: 20px; background: #161b22; border: 1px solid #30363d; border-radius: 8px; text-decoration: none; color: inherit; transition: all 0.3s;">
    <div style="font-size: 2em; margin-bottom: 10px;">💥</div>
    <h3 style="margin: 0 0 10px 0; color: #58a6ff;">Main Demo</h3>
    <p style="color: #8b949e; font-size: 14px; margin: 0;">Full featured showcase (README.md)</p>
  </a>

  <a href="?src=substrate-agent.md&id=agent1&port=5001" style="display: block; padding: 20px; background: #161b22; border: 1px solid #30363d; border-radius: 8px; text-decoration: none; color: inherit; transition: all 0.3s;">
    <div style="font-size: 2em; margin-bottom: 10px;">🤖</div>
    <h3 style="margin: 0 0 10px 0; color: #58a6ff;">Multi-Agent</h3>
    <p style="color: #8b949e; font-size: 14px; margin: 0;">Browser-based agent coordination</p>
  </a>

</div>

---

## 🎨 Three.js 3D Examples

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">

  <a href="?src=threejs-template.md&color=0xff0000" style="display: block; padding: 20px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border: 1px solid #30363d; border-radius: 8px; text-decoration: none; color: inherit;">
    <div style="font-size: 2em; margin-bottom: 10px;">🎨</div>
    <h3 style="margin: 0 0 10px 0; color: #58a6ff;">Three.js Template</h3>
    <p style="color: #8b949e; font-size: 14px; margin: 0;">Basic 3D scene template - copy and customize!</p>
    <div style="margin-top: 10px; font-size: 11px; color: #484f58;">
      Customizable geometry, materials, lighting
    </div>
  </a>

  <a href="?src=particles.md&count=10000" style="display: block; padding: 20px; background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%); border: 1px solid #30363d; border-radius: 8px; text-decoration: none; color: inherit;">
    <div style="font-size: 2em; margin-bottom: 10px;">🌌</div>
    <h3 style="margin: 0 0 10px 0; color: #58a6ff;">Particle Galaxy</h3>
    <p style="color: #8b949e; font-size: 14px; margin: 0;">10,000 particles in a spiral galaxy</p>
    <div style="margin-top: 10px; font-size: 11px; color: #484f58;">
      Configurable colors, count, rotation speed
    </div>
  </a>

  <a href="?src=terrain.md&height=15" style="display: block; padding: 20px; background: linear-gradient(135deg, #134e5e 0%, #71b280 100%); border: 1px solid #30363d; border-radius: 8px; text-decoration: none; color: inherit;">
    <div style="font-size: 2em; margin-bottom: 10px;">🏔️</div>
    <h3 style="margin: 0 0 10px 0; color: #58a6ff;">Procedural Terrain</h3>
    <p style="color: #8b949e; font-size: 14px; margin: 0;">Generated landscapes with noise</p>
    <div style="margin-top: 10px; font-size: 11px; color: #484f58;">
      Perlin noise, vertex colors, dynamic mesh
    </div>
  </a>

  <a href="?src=solar-system.md&planets=8" style="display: block; padding: 20px; background: linear-gradient(135deg, #000000 0%, #0f0c29 50%, #302b63 100%); border: 1px solid #30363d; border-radius: 8px; text-decoration: none; color: inherit;">
    <div style="font-size: 2em; margin-bottom: 10px;">🌍</div>
    <h3 style="margin: 0 0 10px 0; color: #58a6ff;">Solar System</h3>
    <p style="color: #8b949e; font-size: 14px; margin: 0;">Orbiting planets with moons</p>
    <div style="margin-top: 10px; font-size: 11px; color: #484f58;">
      Physics simulation, lighting, star field
    </div>
  </a>

</div>

---

## 📚 Templates & Tools

<div style="margin: 20px 0; padding: 20px; background: #161b22; border-radius: 8px;">

### 🎨 Three.js Template
Use `threejs-template.md` as a starting point for your 3D projects.

**Quick start:**
```markdown
Copy threejs-template.md → myproject.md
Edit the geometry and materials
Run with: ?src=myproject.md
```

### ⚙️ Configuration
Edit `config.md` to change runtime behavior:
- Default source file
- Log levels
- Python support
- UI preferences

### 📖 Documentation
- `QUICKSTART.md` - Get started in 60 seconds
- `USAGE.md` - Troubleshooting and tips
- `README.md` - Full documentation

</div>

---

## 🎮 Try Different Parameters

Each example supports URL parameters:

### Particle Galaxy
```
?src=particles.md&count=20000&speed=0.001
?src=particles.md&color1=0xff0000&color2=0xffff00
```

### Terrain
```
?src=terrain.md&size=100&detail=200
?src=terrain.md&height=20&wireframe=true
```

### Solar System
```
?src=solar-system.md&planets=12&speed=2
?src=solar-system.md&orbits=false&speed=0.5
```

### Three.js Template
```
?src=threejs-template.md&color=0xff00ff&speed=0.05
?src=threejs-template.md&bg=0x111111&color=0x00ffff
```

---

## 🔧 Debug Mode

Add `?debug=true` to any example to see detailed logs:

```
?src=particles.md&debug=true
?src=terrain.md&debug=true&logs=true
```

**Keyboard shortcuts:**
- `Ctrl+L` (or `Cmd+L`) - Toggle log panel

---

## 📝 Create Your Own

**1. Create a new markdown file:**
```bash
touch my-app.md
```

**2. Add code blocks:**
````markdown
# My App

```js
function main(params) {
  document.getElementById('output').innerHTML = `
    <h1>Hello ${params.name}!</h1>
  `
}
```
````

**3. Run it:**
```
index.html?src=my-app.md&name=World
```

---

## 🌟 Advanced: Combining Examples

Open multiple tabs for multi-instance demos:

**Multi-Agent Network:**
```bash
# Open each in a new tab
index.html?src=substrate-agent.md&id=agent1&port=5001
index.html?src=substrate-agent.md&id=agent2&port=5002
index.html?src=substrate-agent.md&id=agent3&port=5003
```

**Side-by-side 3D Worlds:**
```bash
# Compare different terrains
index.html?src=terrain.md&height=10
index.html?src=terrain.md&height=20&wireframe=true
```

---

## 📊 Performance Tips

**For faster loading:**

1. **Disable Python** (if not needed):
   ```json
   // In config.md
   {"loadPython": false}
   ```

2. **Reduce particle count:**
   ```
   ?src=particles.md&count=2000
   ```

3. **Lower terrain detail:**
   ```
   ?src=terrain.md&detail=50
   ```

---

## 🎯 What Makes This Cool?

- ✅ **No install** - Just open the URL
- ✅ **No build** - Markdown → Running app
- ✅ **Version controlled** - Git tracks everything
- ✅ **URL configurable** - Parameters = instant variations
- ✅ **Multi-language** - JS + Python + HTML
- ✅ **3D graphics** - Three.js from CDN
- ✅ **Zero cost** - Host on GitHub Pages free

---

## 🚀 Deploy to GitHub Pages

```bash
git push origin main

# Enable Pages in repo settings
# Visit: https://username.github.io/repo
```

Then share URLs like:
```
https://username.github.io/repo?src=particles.md&count=20000
```

---

**MDRUN Gallery - Where Documentation Meets Execution** 🎨⚡

```js
function main(params) {
  const output = document.getElementById('output')
  // The above content is already rendered as HTML blocks!
  console.log('Gallery loaded! Pick an example above.')

  // Add some interactivity
  const links = document.querySelectorAll('a[href^="?"]')
  links.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)'
      this.style.boxShadow = '0 4px 12px rgba(88, 166, 255, 0.3)'
    })
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)'
      this.style.boxShadow = 'none'
    })
  })
}
```

