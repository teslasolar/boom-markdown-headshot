# 🤖 Substrate Agent - MDRUN Edition

**Multi-agent coordination in browser tabs.**

Run this with: `index.html?src=substrate-agent.md&id=agent1&port=5001`

---

## Agent Implementation

This is a simplified browser-based agent that demonstrates distributed coordination:

```js
class SubstrateAgent {
  constructor(id, port) {
    this.id = id
    this.port = port
    this.peers = []
    this.state = {
      status: 'initializing',
      messages: [],
      connections: 0
    }
    this.color = this.randomColor()
  }

  randomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  addPeer(peerInfo) {
    this.peers.push(peerInfo)
    this.state.connections = this.peers.length
    this.log(`Added peer: ${peerInfo}`)
  }

  log(message) {
    const timestamp = new Date().toLocaleTimeString()
    this.state.messages.push({
      time: timestamp,
      text: message
    })
    this.render()
  }

  broadcast(message) {
    this.log(`Broadcasting: ${message}`)
    // In a real implementation, this would use WebRTC or WebSocket
    // For demo purposes, we'll use localStorage for inter-tab communication
    const event = {
      from: this.id,
      port: this.port,
      message: message,
      timestamp: Date.now()
    }
    localStorage.setItem(`agent_broadcast_${Date.now()}`, JSON.stringify(event))
  }

  startListening() {
    this.state.status = 'active'
    this.log(`Agent ${this.id} listening on port ${this.port}`)

    // Listen for localStorage changes (messages from other tabs)
    window.addEventListener('storage', (e) => {
      if (e.key && e.key.startsWith('agent_broadcast_')) {
        const event = JSON.parse(e.newValue)
        if (event.from !== this.id) {
          this.log(`Received from ${event.from}: ${event.message}`)
        }
      }
    })

    // Send periodic heartbeats
    setInterval(() => {
      this.broadcast(`Heartbeat from ${this.id}`)
    }, 5000)

    this.render()
  }

  render() {
    const output = document.getElementById('output')
    output.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, ${this.color}22 0%, ${this.color}44 100%); padding: 30px; border-radius: 12px; border: 2px solid ${this.color};">
          <h1 style="margin: 0; color: ${this.color}; font-size: 2.5em;">
            🤖 Agent ${this.id}
          </h1>
          <p style="color: #8b949e; margin-top: 10px; font-size: 1.2em;">
            Port: ${this.port} | Status: ${this.state.status} | Connections: ${this.state.connections}
          </p>
        </div>

        <div style="margin-top: 30px; padding: 20px; background: #161b22; border-radius: 8px;">
          <h2 style="color: #58a6ff; margin-top: 0;">Peers</h2>
          ${this.peers.length > 0
            ? `<ul style="color: #8b949e; line-height: 2;">${this.peers.map(p => `<li>${p}</li>`).join('')}</ul>`
            : '<p style="color: #484f58;">No peers configured</p>'
          }
        </div>

        <div style="margin-top: 30px; padding: 20px; background: #161b22; border-radius: 8px;">
          <h2 style="color: #58a6ff; margin-top: 0;">Activity Log</h2>
          <div style="max-height: 400px; overflow-y: auto; font-family: 'Courier New', monospace; font-size: 14px;">
            ${this.state.messages.slice(-20).reverse().map(m => `
              <div style="padding: 8px; border-bottom: 1px solid #21262d; color: #c9d1d9;">
                <span style="color: #484f58;">[${m.time}]</span> ${m.text}
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top: 30px; padding: 20px; background: #0d419d; border-radius: 8px;">
          <h2 style="margin-top: 0;">🚀 Launch More Agents</h2>
          <p style="line-height: 1.6;">
            Open these URLs in new tabs to create a multi-agent network:
          </p>
          <ul style="line-height: 2; font-family: monospace;">
            <li><a href="?src=substrate-agent.md&id=agent2&port=5002&peers=agent1:5001" style="color: #58a6ff;">Agent 2</a></li>
            <li><a href="?src=substrate-agent.md&id=agent3&port=5003&peers=agent1:5001,agent2:5002" style="color: #58a6ff;">Agent 3</a></li>
            <li><a href="?src=substrate-agent.md&id=coordinator&port=5000&peers=agent1:5001,agent2:5002,agent3:5003" style="color: #58a6ff;">Coordinator</a></li>
          </ul>
        </div>

        <div style="margin-top: 30px; padding: 20px; border: 2px solid #30363d; border-radius: 8px;">
          <h3 style="color: #58a6ff; margin-top: 0;">How This Works</h3>
          <ol style="line-height: 2; color: #8b949e;">
            <li>Each browser tab runs an independent agent instance</li>
            <li>Agents communicate via localStorage events (simulating network)</li>
            <li>URL parameters configure agent ID, port, and peers</li>
            <li>All code lives in this markdown file</li>
          </ol>
          <p style="color: #484f58; margin-top: 20px; font-style: italic;">
            In production, replace localStorage with WebRTC, WebSocket, or HTTP for real networking.
          </p>
        </div>

        <div style="margin-top: 40px; text-align: center; color: #484f58;">
          <p>Powered by MDRUN - Markdown Executable Runtime</p>
        </div>
      </div>
    `
  }
}

function main(params) {
  console.log('Substrate Agent starting with params:', params)

  const agent = new SubstrateAgent(
    params.id || 'agent0',
    params.port || '5000'
  )

  // Add peers if specified
  if (params.peers) {
    const peerList = params.peers.split(',')
    peerList.forEach(peer => agent.addPeer(peer.trim()))
  }

  // Start the agent
  agent.startListening()

  // Make agent accessible globally for debugging
  window.agent = agent

  console.log(`✅ Agent ${agent.id} initialized on port ${agent.port}`)
  console.log(`🔗 Connected to ${agent.peers.length} peers`)
}
```

---

## Usage Examples

**Single Agent:**
```
index.html?src=substrate-agent.md&id=alpha&port=5001
```

**Agent Network:**
```bash
# Open each URL in a new tab
index.html?src=substrate-agent.md&id=agent1&port=5001
index.html?src=substrate-agent.md&id=agent2&port=5002&peers=agent1:5001
index.html?src=substrate-agent.md&id=agent3&port=5003&peers=agent1:5001,agent2:5002
```

---

## Features

- ✅ **Multi-instance**: Each tab = independent agent
- ✅ **Parameter-driven**: Configure via URL
- ✅ **Inter-tab communication**: localStorage events
- ✅ **Visual feedback**: Real-time UI updates
- ✅ **Zero install**: Just open the URL

---

## Scaling Up

Want 10 agents?

```bash
for i in {1..10}; do
  open "index.html?src=substrate-agent.md&id=agent$i&port=500$i"
done
```

**Result:** 10 browser tabs, 10 coordinating agents, 0 infrastructure.

---

## Real-World Networking

To make this production-ready, replace the localStorage communication with:

1. **WebRTC** - Peer-to-peer data channels
2. **WebSocket** - Centralized message broker
3. **HTTP/SSE** - Polling or server-sent events
4. **libp2p** - Full p2p networking stack

The agent structure remains the same - just swap the transport layer.

---

## Why This Matters

**Traditional multi-agent setup:**
1. Install Python/Node
2. Install dependencies
3. Write agent code
4. Configure networking
5. Deploy infrastructure
6. Run agents

**MDRUN setup:**
1. Open URL

**That's it.**

---

**SUBSTRATE ∩ MDRUN = DISTRIBUTED COMPUTING IN MARKDOWN**

🤖 + 📝 = 🚀

