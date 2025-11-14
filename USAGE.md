# 🚀 How to Use MDRUN

## What You Should See

When you open `index.html`, here's what happens:

1. **Status Bar** appears (blue text): "⚡ MDRUN initializing..."
2. **Python loads** (takes ~5-10 seconds first time): "⚡ MDRUN loading Python runtime..."
3. **Markdown fetches**: "⚡ MDRUN fetching README.md..."
4. **Execution**: "⚡ MDRUN executing main()"
5. **Complete**: "⚡ MDRUN execution complete"
6. **Result**: You see the app UI rendered on the page

## Quick Test

**1. Open with logs visible:**
```
file:///path/to/index.html?logs=true
```

You'll see:
- Blue status bar at top
- Log panel at bottom right
- Page content in the middle

**2. Try the minimal example:**
```
file:///path/to/index.html?src=hello.md&name=YourName
```

Should show: Big wave emoji + "Hello, YourName!"

**3. Enable debug mode:**
```
file:///path/to/index.html?debug=true
```

Shows all execution details in the log panel.

## Troubleshooting

### "I see a blank page"

**Possible causes:**

1. **Python is still loading** (first load is slow)
   - Wait 10 seconds
   - Check browser console (F12) for progress

2. **The markdown has no UI code**
   - Make sure your .md file has a `main()` function that creates HTML
   - Try: `?src=hello.md` (minimal working example)

3. **JavaScript error**
   - Press F12 to open DevTools
   - Check Console tab for errors
   - Enable logs: `?logs=true` or `?debug=true`

4. **File not found**
   - Check that README.md exists
   - Try `?src=hello.md` instead

### "It loads forever"

- First Pyodide load takes time (~5-10 seconds)
- Check console for progress
- Disable Python for faster load: Edit `config.md`:
  ```json
  {"loadPython": false}
  ```

### "I don't see logs"

Press **Ctrl+L** (or **Cmd+L** on Mac) to toggle log panel

Or add to URL: `?logs=true`

## What to Check

**Browser Console (F12):**
```
⚡ MDRUN Runtime Loaded
Access runtime via window.MDRUN
Commands: MDRUN.showLogs(), MDRUN.hideLogs(), MDRUN.config
[MDRUN INFO] MDRUN v1.0.0 initializing...
[MDRUN INFO] Loading Pyodide...
[MDRUN SUCCESS] Pyodide loaded successfully
[MDRUN INFO] Fetching markdown source: README.md
[MDRUN INFO] Found X code blocks
[MDRUN SUCCESS] main() executed successfully
[MDRUN SUCCESS] MDRUN execution complete!
```

**Log Panel (Ctrl+L or ?logs=true):**
- Shows timestamped events
- Color-coded by level (blue=info, green=success, red=error)
- Last 50 entries visible

## Expected Behavior by File

**index.html (default, loads README.md):**
- Shows interactive demo UI
- Parameter form
- Activity log
- Links to other examples
- Takes ~10s to load (Pyodide)

**?src=hello.md:**
- Simple "Hello World"
- Shows big wave emoji + greeting
- Parameter display
- Loads fast (~2s)

**?src=substrate-agent.md:**
- Multi-agent UI
- Colored agent card
- Activity log
- Peer information
- Takes ~10s to load (Pyodide)

## Debug Commands

**In browser console:**

```js
// View all logs
MDRUN.logs

// Show log panel
MDRUN.showLogs()

// Check config
MDRUN.config

// Manual test
MDRUN.info('Test message')

// Check if main exists
typeof main

// View params
// (only works after execution)
```

## Common Workflows

### Development

```
1. Edit your .md file
2. Reload browser (Cmd+R / Ctrl+R)
3. Check logs (Ctrl+L)
4. Debug in console (F12)
```

### Testing

```
?debug=true              - See everything
?logs=true              - Show log panel
?src=yourfile.md        - Test specific file
?debug=true&src=test.md - Debug specific file
```

### Production

Edit `config.md`:
```json
{
  "logLevel": "error",
  "showLogs": false,
  "loadPython": false
}
```

## Visual Guide

```
┌─────────────────────────────────────┐
│ ⚡ MDRUN execution complete         │ ← Status bar (auto-hides)
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│                                     │
│     Your App Content Here           │ ← #output div
│     (Created by main() function)    │
│                                     │
└─────────────────────────────────────┘

                        ┌──────────────┐
                        │ ⚡ MDRUN Logs│ ← Log panel (Ctrl+L)
                        │ [INFO] ...   │   (bottom right)
                        │ [SUCCESS] ...│
                        └──────────────┘
```

## Next Steps

1. **Open index.html** - See the full demo
2. **Try ?src=hello.md** - Minimal example
3. **Enable ?debug=true** - See what's happening
4. **Edit config.md** - Customize behavior
5. **Create your own .md** - Write your app!

---

**Still having issues?**

1. Check browser console (F12)
2. Enable debug mode (?debug=true)
3. Try hello.md first (?src=hello.md)
4. Verify files exist (README.md, hello.md)

---

**Everything working?**

🎉 Start building! Create `myapp.md` and open with `?src=myapp.md`

