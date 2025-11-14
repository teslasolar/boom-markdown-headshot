# ⚙️ MDRUN Configuration

**This file configures the MDRUN runtime without editing `index.html`.**

Place your configuration in a JSON code block below:

```json
{
  "defaultSource": "README.md",
  "logLevel": "info",
  "showLogs": true,
  "autoHideLogs": true,
  "logToConsole": true,
  "loadPython": true,
  "statusDuration": 2000,
  "theme": "dark"
}
```

---

## Configuration Options

### `defaultSource` (string)
- **Default:** `"README.md"`
- The markdown file to load by default if no `?src=` parameter is provided
- Example: `"hello.md"`, `"app.md"`

### `logLevel` (string)
- **Default:** `"info"`
- Minimum log level to display
- Options: `"debug"`, `"info"`, `"warn"`, `"error"`
- `"debug"` shows everything, `"error"` shows only errors

### `showLogs` (boolean)
- **Default:** `false`
- Show the log panel on startup
- Override with URL param: `?logs=true`

### `autoHideLogs` (boolean)
- **Default:** `true`
- Automatically hide the status bar after execution
- Set to `false` to keep status visible

### `logToConsole` (boolean)
- **Default:** `true`
- Log all MDRUN events to browser console (F12)
- Useful for debugging

### `loadPython` (boolean)
- **Default:** `true`
- Load Pyodide for Python support
- Set to `false` to skip Python and load faster (JS/HTML only)

### `statusDuration` (number)
- **Default:** `2000` (milliseconds)
- How long to show the status bar before hiding
- Only applies if `autoHideLogs` is `true`

### `theme` (string)
- **Default:** `"dark"`
- UI theme (currently only dark supported)
- Future: `"light"`, `"auto"`

---

## Usage Examples

**Debug Mode (Show All Logs):**
```json
{
  "logLevel": "debug",
  "showLogs": true,
  "logToConsole": true
}
```

**Fast Mode (No Python):**
```json
{
  "loadPython": false,
  "statusDuration": 1000
}
```

**Production Mode (Minimal Logging):**
```json
{
  "logLevel": "error",
  "showLogs": false,
  "logToConsole": false
}
```

**Custom Default:**
```json
{
  "defaultSource": "app.md",
  "showLogs": false
}
```

---

## URL Parameter Overrides

URL parameters always override config settings:

- `?debug=true` - Force debug mode + show logs
- `?logs=true` - Show log panel
- `?src=file.md` - Override default source

**Example:**
```
index.html?debug=true&src=substrate-agent.md
```

---

## Runtime Access

Access config programmatically:

```js
// In browser console or your markdown code blocks:

// View current config
console.log(MDRUN.config)

// Modify config at runtime
MDRUN.config.logLevel = 'debug'

// Toggle log panel
MDRUN.showLogs()
MDRUN.hideLogs()
MDRUN.toggleLogs()

// Manual logging
MDRUN.debug('Debug message', {some: 'data'})
MDRUN.info('Info message')
MDRUN.warn('Warning message')
MDRUN.error('Error message')
MDRUN.success('Success message')
```

---

## Keyboard Shortcuts

- **Ctrl+L** (or **Cmd+L** on Mac) - Toggle log panel

---

## Tips

1. **Start with debug mode** when developing:
   ```json
   {"logLevel": "debug", "showLogs": true}
   ```

2. **Disable Python for faster load** if you only use JavaScript:
   ```json
   {"loadPython": false}
   ```

3. **Check console logs** - MDRUN automatically logs to browser console

4. **Use URL params for quick testing**:
   - `?debug=true` - Quick debug mode
   - `?logs=true` - Show logs

---

**This file is read on every page load. No restart needed!**

⚙️ Configure. Save. Reload. Done.

