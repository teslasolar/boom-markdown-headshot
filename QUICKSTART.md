# ⚡ MDRUN Quickstart

Get started in 60 seconds.

---

## What You Get

- `index.html` - The MDRUN runtime (60 lines)
- `README.md` - Executable demo + documentation
- `hello.md` - Minimal example
- `substrate-agent.md` - Multi-agent demo

---

## Local Usage

**1. Open in browser:**
```
file:///path/to/boom-markdown-headshot/index.html
```

**2. With parameters:**
```
file:///path/to/boom-markdown-headshot/index.html?name=Alice&color=hotpink
```

**3. Different source:**
```
file:///path/to/boom-markdown-headshot/index.html?src=hello.md&name=Bob
```

---

## Deploy to GitHub Pages

**1. Push to GitHub:**
```bash
git add .
git commit -m "Add MDRUN"
git push origin main
```

**2. Enable GitHub Pages:**
- Go to repo Settings
- Click Pages
- Source: Deploy from branch
- Branch: main / root
- Click Save

**3. Visit your app:**
```
https://username.github.io/repo-name
https://username.github.io/repo-name?name=World
https://username.github.io/repo-name?src=hello.md
```

---

## Create Your Own

**1. Create a new markdown file:**
```bash
touch my-app.md
```

**2. Add executable code:**
````markdown
# My App

```js
function main(params) {
  document.getElementById('output').innerHTML = `
    <h1>Hello ${params.name || 'World'}</h1>
  `
}
```
````

**3. Run it:**
```
index.html?src=my-app.md&name=YourName
```

---

## Examples

**Hello World:**
```
index.html?src=hello.md&name=Alice
```

**Full Demo:**
```
index.html?name=Bob&color=lime
```

**Multi-Agent:**
```
index.html?src=substrate-agent.md&id=agent1&port=5001
index.html?src=substrate-agent.md&id=agent2&port=5002&peers=agent1:5001
```

---

## Key Concepts

**1. URL = Configuration**
```
?key=value&another=foo → {key: 'value', another: 'foo'}
```

**2. Code Blocks = Executable**
```markdown
​```js
function main(params) {
  console.log(params)
}
​```
```

**3. main() = Entry Point**
```js
function main(params) {
  // Your app starts here
  // params contains URL query parameters
}
```

---

## Supported Languages

**JavaScript (native):**
````markdown
```js
console.log('Hello')
```
````

**Python (via Pyodide):**
````markdown
```python
print('Hello from Python')
```
````

**HTML:**
````markdown
```html
<h1>Direct HTML injection</h1>
```
````

---

## File Structure

```
boom-markdown-headshot/
├── index.html           # MDRUN runtime
├── README.md            # Main demo (default)
├── hello.md             # Minimal example
├── substrate-agent.md   # Multi-agent demo
├── QUICKSTART.md        # This file
└── .gitignore
```

---

## Tips

**1. Check the console**
- Open browser DevTools (F12)
- Check Console for execution logs
- Look for MDRUN status messages

**2. Parameters are strings**
```js
params.count // "5" (string)
parseInt(params.count) // 5 (number)
```

**3. Debug mode**
- Set `?debug=true` for verbose logging
- Check execution order in console

**4. Multiple files**
- Create separate .md files for different apps
- Use `?src=filename.md` to switch between them

---

## Common Issues

**Blank page?**
- Check browser console for errors
- Verify markdown file exists
- Check code block syntax (triple backticks)

**Parameters not working?**
- Use `console.log(params)` to debug
- Check URL encoding
- Remember: all values are strings

**Pyodide slow?**
- First load takes ~10s (downloads Python runtime)
- Subsequent loads are cached
- Consider using JS for faster startup

---

## Next Steps

**Learn by example:**
1. Open `index.html` (runs README.md by default)
2. Try `?src=hello.md` for minimal example
3. Explore `substrate-agent.md` for multi-instance demo
4. Create your own .md file!

**Deploy:**
1. Push to GitHub
2. Enable Pages
3. Share your URL

**Advanced:**
- Add CSS frameworks (Tailwind CDN)
- Use external libraries via CDN
- Build interactive visualizations
- Create multi-agent simulations

---

## Resources

- **MDRUN Docs**: See README.md for full documentation
- **Examples**: All .md files in this repo are runnable
- **Python Docs**: https://pyodide.org/en/stable/
- **Deploy Guide**: https://pages.github.com/

---

**Questions?**

Check the console. Check the source. It's all there.

---

**MDRUN - Because documentation should run.**

⚡📝

