# 🌍 Mini Solar System

**Orbiting planets with realistic(ish) physics**

Usage: `index.html?src=solar-system.md`

---

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
```

```js
function main(params) {
  const planetCount = parseInt(params.planets) || 5
  const speed = parseFloat(params.speed) || 1
  const showOrbits = params.orbits !== 'false'

  const output = document.getElementById('output')
  output.innerHTML = `
    <div id="scene-container" style="width: 100%; height: 100vh; margin: 0; padding: 0;"></div>
    <div style="position: fixed; top: 20px; left: 20px; color: white; font-family: monospace; background: rgba(0,0,0,0.9); padding: 15px; border-radius: 6px;">
      <div style="font-size: 20px; margin-bottom: 10px;">🌍 Mini Solar System</div>
      <div style="font-size: 12px; color: #8b949e; line-height: 1.6;">
        Planets: ${planetCount}<br>
        Speed: ${speed}x<br>
        Orbits: ${showOrbits ? 'Visible' : 'Hidden'}<br>
        <br>
        <span style="opacity: 0.6;">
        ?planets=8<br>
        ?speed=2<br>
        ?orbits=false
        </span>
      </div>
    </div>
  `

  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 30, 50)
  camera.lookAt(0, 0, 0)

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById('scene-container').appendChild(renderer.domElement)

  // Sun
  const sunGeometry = new THREE.SphereGeometry(3, 32, 32)
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    emissive: 0xffff00
  })
  const sun = new THREE.Mesh(sunGeometry, sunMaterial)
  scene.add(sun)

  // Sun light
  const sunLight = new THREE.PointLight(0xffffff, 2, 100)
  sunLight.position.set(0, 0, 0)
  scene.add(sunLight)

  const ambientLight = new THREE.AmbientLight(0x333333)
  scene.add(ambientLight)

  // Planet colors
  const planetColors = [
    0x8b7355, // Mercury (brown)
    0xffd700, // Venus (gold)
    0x0077be, // Earth (blue)
    0xff4500, // Mars (red)
    0xdaa520, // Jupiter (orange)
    0xf4a460, // Saturn (sandy)
    0x87ceeb, // Uranus (light blue)
    0x4169e1  // Neptune (royal blue)
  ]

  // Create planets
  const planets = []
  for (let i = 0; i < planetCount; i++) {
    const distance = 8 + i * 5
    const size = 0.5 + Math.random() * 1.5
    const speed = (1 / (i + 1)) * 0.01

    // Planet
    const geometry = new THREE.SphereGeometry(size, 32, 32)
    const material = new THREE.MeshPhongMaterial({
      color: planetColors[i % planetColors.length],
      shininess: 30
    })
    const planet = new THREE.Mesh(geometry, material)
    scene.add(planet)

    // Orbit ring
    if (showOrbits) {
      const orbitGeometry = new THREE.RingGeometry(distance - 0.1, distance + 0.1, 64)
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x444444,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
      })
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial)
      orbit.rotation.x = Math.PI / 2
      scene.add(orbit)
    }

    // Moon for some planets
    let moon = null
    if (i > 1 && Math.random() > 0.5) {
      const moonGeometry = new THREE.SphereGeometry(size * 0.3, 16, 16)
      const moonMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc })
      moon = new THREE.Mesh(moonGeometry, moonMaterial)
    }

    planets.push({
      mesh: planet,
      moon: moon,
      distance: distance,
      speed: speed,
      angle: Math.random() * Math.PI * 2,
      moonAngle: 0,
      moonDistance: size * 2
    })
  }

  // Star field background
  const starGeometry = new THREE.BufferGeometry()
  const starPositions = []
  for (let i = 0; i < 2000; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos((Math.random() * 2) - 1)
    const r = 150 + Math.random() * 100

    starPositions.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    )
  }
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3))
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 })
  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)

  // Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // Animation
  let time = 0
  function animate() {
    requestAnimationFrame(animate)
    time += 0.01 * speed

    // Update planets
    planets.forEach((planet, index) => {
      planet.angle += planet.speed * speed

      // Position planet in orbit
      planet.mesh.position.x = Math.cos(planet.angle) * planet.distance
      planet.mesh.position.z = Math.sin(planet.angle) * planet.distance

      // Rotate planet
      planet.mesh.rotation.y += 0.01

      // Update moon if exists
      if (planet.moon) {
        planet.moonAngle += 0.05 * speed
        planet.moon.position.x = planet.mesh.position.x + Math.cos(planet.moonAngle) * planet.moonDistance
        planet.moon.position.z = planet.mesh.position.z + Math.sin(planet.moonAngle) * planet.moonDistance
        scene.add(planet.moon)
      }
    })

    // Slowly rotate sun
    sun.rotation.y += 0.001

    controls.update()
    renderer.render(scene, camera)
  }

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  animate()

  MDRUN.success(`Solar system with ${planetCount} planets created!`)
}
```

```html
```

---

## URL Examples

```
?planets=8              # Full solar system
?speed=3                # Fast motion
?planets=3&speed=0.5    # Slow, simple system
?orbits=false           # Hide orbit rings
```

---

**🌍 Your own solar system, URL-configurable**

