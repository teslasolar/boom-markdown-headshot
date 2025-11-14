# 🎛️ State Machine

**Visual interactive state machine with transitions and controls**

Usage: `index.html?src=state-machine.md`

---

```js
// State Machine Implementation
class StateMachine {
  constructor(config) {
    this.states = config.states || {}
    this.transitions = config.transitions || []
    this.currentState = config.initial || Object.keys(this.states)[0]
    this.history = []
    this.onStateChange = config.onStateChange || (() => {})
  }

  can(event) {
    return this.transitions.some(t =>
      t.from === this.currentState &&
      t.event === event &&
      (!t.guard || t.guard())
    )
  }

  transition(event, data = {}) {
    const trans = this.transitions.find(t =>
      t.from === this.currentState &&
      t.event === event &&
      (!t.guard || t.guard())
    )

    if (!trans) {
      console.warn(`No transition for event "${event}" from state "${this.currentState}"`)
      return false
    }

    const oldState = this.currentState
    const newState = trans.to

    // Exit action
    const currentStateConfig = this.states[oldState]
    if (currentStateConfig && currentStateConfig.onExit) {
      currentStateConfig.onExit(data)
    }

    // Transition action
    if (trans.action) {
      trans.action(data)
    }

    // Change state
    this.currentState = newState
    this.history.push({ from: oldState, to: newState, event, timestamp: Date.now() })

    // Entry action
    const newStateConfig = this.states[newState]
    if (newStateConfig && newStateConfig.onEnter) {
      newStateConfig.onEnter(data)
    }

    // Notify listeners
    this.onStateChange(oldState, newState, event, data)

    return true
  }

  getState() {
    return this.currentState
  }

  getHistory() {
    return this.history
  }

  reset() {
    this.currentState = Object.keys(this.states)[0]
    this.history = []
  }
}

function main(params) {
  const output = document.getElementById('output')

  // Example: Traffic Light State Machine
  const trafficLight = new StateMachine({
    initial: 'red',
    states: {
      red: {
        color: '#ff4444',
        description: 'Stop',
        onEnter: () => MDRUN.info('Traffic light: RED - Stop'),
        onExit: () => MDRUN.debug('Leaving RED state')
      },
      yellow: {
        color: '#ffaa00',
        description: 'Caution',
        onEnter: () => MDRUN.info('Traffic light: YELLOW - Caution'),
        onExit: () => MDRUN.debug('Leaving YELLOW state')
      },
      green: {
        color: '#44ff44',
        description: 'Go',
        onEnter: () => MDRUN.info('Traffic light: GREEN - Go'),
        onExit: () => MDRUN.debug('Leaving GREEN state')
      }
    },
    transitions: [
      { from: 'red', to: 'green', event: 'next' },
      { from: 'green', to: 'yellow', event: 'next' },
      { from: 'yellow', to: 'red', event: 'next' },
      { from: 'red', to: 'yellow', event: 'emergency' },
      { from: 'yellow', to: 'red', event: 'emergency' },
      { from: 'green', to: 'red', event: 'emergency' }
    ],
    onStateChange: (from, to, event) => {
      render()
      addHistoryEntry(from, to, event)
    }
  })

  // Example: Door State Machine with Guards
  const door = new StateMachine({
    initial: 'closed',
    states: {
      closed: {
        color: '#555',
        description: 'Door is closed and locked',
        onEnter: () => MDRUN.info('Door: CLOSED')
      },
      open: {
        color: '#4a90e2',
        description: 'Door is open',
        onEnter: () => MDRUN.info('Door: OPEN')
      },
      locked: {
        color: '#aa0000',
        description: 'Door is locked',
        onEnter: () => MDRUN.warn('Door: LOCKED')
      }
    },
    transitions: [
      { from: 'closed', to: 'open', event: 'open' },
      { from: 'open', to: 'closed', event: 'close' },
      { from: 'closed', to: 'locked', event: 'lock' },
      {
        from: 'locked',
        to: 'closed',
        event: 'unlock',
        guard: () => {
          // Simulate checking if user has key
          const hasKey = Math.random() > 0.3
          if (!hasKey) MDRUN.warn('No key! Cannot unlock')
          return hasKey
        }
      }
    ],
    onStateChange: (from, to, event) => {
      render()
    }
  })

  function render() {
    const trafficState = trafficLight.getState()
    const doorState = door.getState()

    const html = `
      <div style="min-height: 100vh; background: #0d1117; padding: 40px 20px; color: #c9d1d9;">
        <div style="max-width: 1400px; margin: 0 auto;">

          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 3em; margin: 0; color: #58a6ff;">🎛️ State Machine Demo</h1>
            <p style="color: #8b949e; font-size: 1.2em;">Interactive state management with transitions</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px;">

            <!-- Traffic Light -->
            <div style="background: #161b22; padding: 30px; border-radius: 12px; border: 1px solid #30363d;">
              <h2 style="margin-top: 0; color: #58a6ff;">🚦 Traffic Light</h2>

              <div style="text-align: center; margin: 30px 0;">
                <div style="width: 150px; height: 150px; margin: 0 auto; background: ${trafficLight.states[trafficState].color}; border-radius: 50%; box-shadow: 0 0 40px ${trafficLight.states[trafficState].color}66, inset 0 -20px 40px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 3em;">
                  ${trafficState === 'red' ? '🛑' : trafficState === 'yellow' ? '⚠️' : '✅'}
                </div>
                <div style="margin-top: 20px; font-size: 1.5em; color: ${trafficLight.states[trafficState].color}; font-weight: bold; text-transform: uppercase;">
                  ${trafficState}
                </div>
                <div style="color: #8b949e; margin-top: 10px;">
                  ${trafficLight.states[trafficState].description}
                </div>
              </div>

              <div style="display: grid; gap: 10px;">
                <button onclick="window.trafficLight.transition('next')" style="padding: 15px; background: #238636; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold;">
                  Next State
                </button>
                <button onclick="window.trafficLight.transition('emergency')" style="padding: 15px; background: #da3633; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold;">
                  Emergency Stop
                </button>
              </div>

              <!-- State Diagram -->
              <div style="margin-top: 30px; padding: 20px; background: #0d1117; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #8b949e; font-size: 14px;">STATE TRANSITIONS</h3>
                <div style="font-family: monospace; font-size: 12px; color: #8b949e; line-height: 2;">
                  RED → [next] → GREEN<br>
                  GREEN → [next] → YELLOW<br>
                  YELLOW → [next] → RED<br>
                  * → [emergency] → RED
                </div>
              </div>
            </div>

            <!-- Door State Machine -->
            <div style="background: #161b22; padding: 30px; border-radius: 12px; border: 1px solid #30363d;">
              <h2 style="margin-top: 0; color: #58a6ff;">🚪 Door Controller</h2>

              <div style="text-align: center; margin: 30px 0;">
                <div style="width: 150px; height: 200px; margin: 0 auto; background: linear-gradient(135deg, ${door.states[doorState].color} 0%, ${door.states[doorState].color}88 100%); border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 4em; border: 4px solid ${door.states[doorState].color};">
                  ${doorState === 'locked' ? '🔒' : doorState === 'open' ? '🚪' : '🚫'}
                </div>
                <div style="margin-top: 20px; font-size: 1.5em; color: ${door.states[doorState].color}; font-weight: bold; text-transform: uppercase;">
                  ${doorState}
                </div>
                <div style="color: #8b949e; margin-top: 10px;">
                  ${door.states[doorState].description}
                </div>
              </div>

              <div style="display: grid; gap: 10px;">
                <button onclick="window.door.transition('open')" ${!door.can('open') ? 'disabled' : ''} style="padding: 15px; background: ${door.can('open') ? '#238636' : '#30363d'}; color: white; border: none; border-radius: 6px; cursor: ${door.can('open') ? 'pointer' : 'not-allowed'}; font-size: 16px;">
                  Open Door
                </button>
                <button onclick="window.door.transition('close')" ${!door.can('close') ? 'disabled' : ''} style="padding: 15px; background: ${door.can('close') ? '#238636' : '#30363d'}; color: white; border: none; border-radius: 6px; cursor: ${door.can('close') ? 'pointer' : 'not-allowed'}; font-size: 16px;">
                  Close Door
                </button>
                <button onclick="window.door.transition('lock')" ${!door.can('lock') ? 'disabled' : ''} style="padding: 15px; background: ${door.can('lock') ? '#da3633' : '#30363d'}; color: white; border: none; border-radius: 6px; cursor: ${door.can('lock') ? 'pointer' : 'not-allowed'}; font-size: 16px;">
                  Lock Door
                </button>
                <button onclick="window.door.transition('unlock')" ${!door.can('unlock') ? 'disabled' : ''} style="padding: 15px; background: ${door.can('unlock') ? '#1f6feb' : '#30363d'}; color: white; border: none; border-radius: 6px; cursor: ${door.can('unlock') ? 'pointer' : 'not-allowed'}; font-size: 16px;">
                  Unlock (needs key 🔑)
                </button>
              </div>

              <div style="margin-top: 30px; padding: 20px; background: #0d1117; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #8b949e; font-size: 14px;">STATE TRANSITIONS</h3>
                <div style="font-family: monospace; font-size: 12px; color: #8b949e; line-height: 2;">
                  CLOSED → [open] → OPEN<br>
                  OPEN → [close] → CLOSED<br>
                  CLOSED → [lock] → LOCKED<br>
                  LOCKED → [unlock] → CLOSED *<br>
                  <span style="color: #d29922;">* requires guard check</span>
                </div>
              </div>
            </div>
          </div>

          <!-- History Log -->
          <div style="background: #161b22; padding: 30px; border-radius: 12px; border: 1px solid #30363d;">
            <h2 style="margin-top: 0; color: #58a6ff;">📜 Transition History</h2>
            <div id="history-log" style="max-height: 200px; overflow-y: auto; font-family: monospace; font-size: 13px;"></div>
          </div>

          <!-- Info -->
          <div style="margin-top: 30px; padding: 20px; background: #0d419d22; border: 1px solid #0d419d; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #58a6ff;">💡 Features</h3>
            <ul style="line-height: 2; color: #8b949e;">
              <li><strong>States:</strong> Named states with metadata (color, description)</li>
              <li><strong>Transitions:</strong> Event-driven state changes</li>
              <li><strong>Guards:</strong> Conditional transitions (see unlock button)</li>
              <li><strong>Actions:</strong> onEnter / onExit hooks</li>
              <li><strong>History:</strong> Complete audit trail of transitions</li>
              <li><strong>Validation:</strong> Buttons disabled when transitions aren't available</li>
            </ul>
          </div>

        </div>
      </div>
    `

    output.innerHTML = html
  }

  function addHistoryEntry(from, to, event) {
    const historyLog = document.getElementById('history-log')
    if (!historyLog) return

    const time = new Date().toLocaleTimeString()
    const entry = document.createElement('div')
    entry.style.cssText = 'padding: 8px; border-bottom: 1px solid #21262d; color: #c9d1d9;'
    entry.innerHTML = `
      <span style="color: #484f58;">[${time}]</span>
      <span style="color: #f85149;">${from}</span>
      <span style="color: #8b949e;">→ [${event}] →</span>
      <span style="color: #3fb950;">${to}</span>
    `
    historyLog.insertBefore(entry, historyLog.firstChild)
  }

  // Expose to window for button onclick
  window.trafficLight = trafficLight
  window.door = door

  // Initial render
  render()

  MDRUN.success('State machine demo loaded')
}
```

---

## Features

- **State Management**: Define states with metadata
- **Event-Driven**: Transitions triggered by events
- **Guards**: Conditional transitions (see unlock with key)
- **Action Hooks**: onEnter / onExit callbacks
- **History**: Complete audit trail
- **Validation**: Buttons auto-disable for invalid transitions

---

## Use Cases

```
Traffic control systems
Door/lock controllers
Workflow engines
Game AI
UI navigation
Form wizards
Order processing
```

---

## URL Parameters

```
?debug=true           # See detailed state logs
?logs=true           # Show log panel
```

---

## API Example

```js
const fsm = new StateMachine({
  initial: 'idle',
  states: {
    idle: { onEnter: () => console.log('Ready') },
    working: { onEnter: () => console.log('Working...') },
    done: { onEnter: () => console.log('Complete!') }
  },
  transitions: [
    { from: 'idle', to: 'working', event: 'start' },
    {
      from: 'working',
      to: 'done',
      event: 'finish',
      guard: () => checkIfValid()
    }
  ]
})

fsm.transition('start')  // idle → working
```

---

**🎛️ State machines made visual and interactive**

