# 📋 MDRUN Templates Guide

**Reusable patterns and templates for quick starts**

---

## 📝 Basic Template Structure

Every MDRUN markdown file follows this pattern:

```markdown
# Your App Title

Description here

## Code

​```js
function main(params) {
  const output = document.getElementById('output')
  output.innerHTML = `<h1>Your UI here</h1>`
}
​```

## Optional: Load Libraries

​```html
<script src="https://cdn.example.com/library.js"></script>
​```
```

---

## 🎨 Template Categories

### 1. **Minimal Template** (copy-paste ready)

```markdown
# My App

​```js
function main(params) {
  document.getElementById('output').innerHTML = `
    <div style="padding: 40px; text-align: center;">
      <h1>${params.title || 'Hello MDRUN'}</h1>
      <p>${params.message || 'Start building!'}</p>
    </div>
  `
}
​```
```

**Use:** Create as `myapp.md`, run with `?src=myapp.md&title=Test`

---

### 2. **Three.js 3D Template**

See `threejs-template.md` - includes:
- Scene, camera, renderer setup
- Lighting (ambient + directional)
- OrbitControls for interaction
- Animation loop
- Resize handling
- URL parameter support

**Pattern:**
1. Copy `threejs-template.md` → `mynew3d.md`
2. Modify the geometry/material section
3. Customize colors and behavior
4. Run with `?src=mynew3d.md`

---

### 3. **Data Visualization Template**

```markdown
# Data Viz

​```js
function main(params) {
  const data = params.data ? JSON.parse(params.data) : [1,2,3,4,5]

  const output = document.getElementById('output')
  const html = data.map((value, i) => `
    <div style="
      width: ${value * 50}px;
      height: 30px;
      background: linear-gradient(90deg, #4a90e2, #7b68ee);
      margin: 5px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      color: white;
    ">
      ${value}
    </div>
  `).join('')

  output.innerHTML = `
    <div style="padding: 40px;">
      <h2>Data Visualization</h2>
      ${html}
    </div>
  `
}
​```
```

**Use:** `?src=dataviz.md&data=[10,25,15,30,20]`

---

### 4. **Interactive Form Template**

```markdown
# Interactive Form

​```js
function main(params) {
  const output = document.getElementById('output')

  output.innerHTML = `
    <div style="max-width: 600px; margin: 50px auto; padding: 40px; background: #161b22; border-radius: 12px;">
      <h1 style="color: #58a6ff;">Interactive Form</h1>

      <input
        type="text"
        id="userInput"
        placeholder="Type something..."
        style="width: 100%; padding: 12px; font-size: 16px; border: 1px solid #30363d; background: #0d1117; color: #c9d1d9; border-radius: 6px; margin: 20px 0;"
      />

      <button
        onclick="handleSubmit()"
        style="width: 100%; padding: 12px; font-size: 16px; background: #238636; color: white; border: none; border-radius: 6px; cursor: pointer;"
      >
        Submit
      </button>

      <div id="result" style="margin-top: 20px; padding: 20px; background: #0d1117; border-radius: 6px; color: #8b949e;"></div>
    </div>
  `

  window.handleSubmit = function() {
    const input = document.getElementById('userInput').value
    const result = document.getElementById('result')
    result.innerHTML = `<strong style="color: #3fb950;">You entered:</strong> ${input}`
  }
}
​```
```

---

### 5. **Python + JavaScript Template**

```markdown
# Python Example

​```python
# Python code runs first
result = sum([1, 2, 3, 4, 5])
print(f"Sum is {result}")

# Access URL params
if 'name' in params:
    print(f"Hello {params['name']}")
​```

​```js
function main(params) {
  document.getElementById('output').innerHTML = `
    <div style="padding: 40px;">
      <h1>Check console for Python output</h1>
      <p>Open DevTools (F12) to see Python print statements</p>
    </div>
  `
}
​```
```

**Note:** Python requires `loadPython: true` in config.md

---

## 🎯 Template Best Practices

### 1. **Use URL Parameters for Configuration**

```js
function main(params) {
  // Good: Configurable via URL
  const color = params.color || '#58a6ff'
  const size = parseInt(params.size) || 100
  const enabled = params.feature === 'true'

  // Bad: Hardcoded values
  const color = '#58a6ff'
}
```

### 2. **Include Usage Documentation**

```markdown
# My Template

Usage: `?src=mytemplate.md&param=value`

## Parameters

- `color` - Hex color (default: #58a6ff)
- `size` - Number (default: 100)
- `mode` - String: light|dark (default: dark)
```

### 3. **Provide Visual Feedback**

```js
function main(params) {
  // Show parameters received
  output.innerHTML = `
    <div style="position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.8); padding: 15px; border-radius: 6px; color: white; font-family: monospace; font-size: 12px;">
      <strong>Config:</strong><br>
      ${JSON.stringify(params, null, 2)}
    </div>
    <!-- Your main content -->
  `
}
```

### 4. **Handle Errors Gracefully**

```js
function main(params) {
  try {
    // Your code
  } catch (error) {
    MDRUN.error('Something went wrong', error)
    document.getElementById('output').innerHTML = `
      <div style="padding: 40px; color: #f85149;">
        <h2>Error</h2>
        <pre>${error.message}</pre>
      </div>
    `
  }
}
```

### 5. **Use MDRUN Logging**

```js
function main(params) {
  MDRUN.info('App starting...', params)
  MDRUN.success('App initialized!')

  // Debug info
  MDRUN.debug('Internal state', { someData: 'value' })
}
```

---

## 📦 External Libraries

Load from CDN in HTML blocks:

### Chart.js
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

### D3.js
```html
<script src="https://d3js.org/d3.v7.min.js"></script>
```

### Three.js
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
```

### Tailwind CSS
```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Alpine.js
```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

---

## 🔧 Common Patterns

### Responsive Layout
```js
output.innerHTML = `
  <div style="
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  ">
    <!-- Content -->
  </div>
`
```

### Dark Theme
```js
output.innerHTML = `
  <div style="
    background: #0d1117;
    color: #c9d1d9;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  ">
    <!-- Content -->
  </div>
`
```

### Loading State
```js
function main(params) {
  const output = document.getElementById('output')

  // Show loading
  output.innerHTML = '<div style="text-align: center; padding: 100px;">Loading...</div>'

  // Simulate async operation
  setTimeout(() => {
    output.innerHTML = '<h1>Loaded!</h1>'
  }, 1000)
}
```

### Animation Loop
```js
function main(params) {
  let frame = 0

  function animate() {
    frame++
    // Update UI
    document.getElementById('counter').textContent = frame
    requestAnimationFrame(animate)
  }

  output.innerHTML = '<div id="counter">0</div>'
  animate()
}
```

---

## 📁 Template Organization

Suggested file structure:

```
templates/
  basic.md           - Minimal template
  threejs.md         - 3D graphics base
  form.md            - Interactive form
  dataviz.md         - Data visualization

examples/
  particles.md       - Particle system
  terrain.md         - Procedural terrain
  solar-system.md    - Physics sim
  wave-grid.md       - Wave animation

docs/
  README.md          - Main docs
  QUICKSTART.md      - Getting started
  USAGE.md           - Troubleshooting
  gallery.md         - Example showcase
```

**In this repo:** All files are in root for simplicity.

---

## 🚀 Quick Start Recipes

### 1. **Create a New 3D App**

```bash
# Copy template
cp threejs-template.md my3d.md

# Edit my3d.md and change:
# - Geometry (line ~90)
# - Colors (line ~95)
# - Animation (line ~120)

# Run
open index.html?src=my3d.md
```

### 2. **Create a Data Dashboard**

```bash
# Create file
touch dashboard.md

# Add template (copy Basic Template above)
# Customize with your data logic
# Run with data parameter
open index.html?src=dashboard.md&data=...
```

### 3. **Create Multi-Page App**

```markdown
# Menu

​```js
function main(params) {
  output.innerHTML = `
    <h1>Menu</h1>
    <a href="?src=page1.md">Page 1</a>
    <a href="?src=page2.md">Page 2</a>
  `
}
​```
```

---

## 💡 Tips

1. **Start with existing examples** - Copy and modify
2. **Use `?debug=true`** - See what's happening
3. **Check console logs** - MDRUN auto-logs everything
4. **Test incrementally** - Build feature by feature
5. **Use URL params** - Make everything configurable
6. **Document parameters** - Help future you

---

## 📚 Learn More

- See `gallery.md` for live examples
- Check `threejs-template.md` for 3D starter
- Read `USAGE.md` for troubleshooting
- Explore existing `.md` files in this repo

---

**📋 Templates = Speed. Copy, customize, ship!**

