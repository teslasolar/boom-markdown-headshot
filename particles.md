# 🌌 Particle Galaxy

**3D particle system with thousands of stars**

Usage: `index.html?src=particles.md`

---

```js
function main(params) {
  const particleCount = parseInt(params.count) || 5000
  const color1 = params.color1 || '#4a90e2'
  const color2 = params.color2 || '#f39c12'
  const speed = parseFloat(params.speed) || 0.0005

  const output = document.getElementById('output')
  output.innerHTML = `
    <div id="scene-container" style="width: 100%; height: 100vh; margin: 0; padding: 0;"></div>
    <div style="position: fixed; top: 20px; left: 20px; color: white; font-family: monospace; background: rgba(0,0,0,0.8); padding: 15px; border-radius: 6px; backdrop-filter: blur(10px);">
      <div style="font-size: 20px; margin-bottom: 10px;">🌌 Particle Galaxy</div>
      <div style="font-size: 12px; color: #8b949e; line-height: 1.6;">
        Particles: <span style="color: ${color1}">${particleCount.toLocaleString()}</span><br>
        Drag to rotate | Scroll to zoom<br>
        <br>
        <div style="opacity: 0.6;">
        ?count=10000<br>
        ?color1=0xff0000<br>
        ?color2=0x00ff00<br>
        ?speed=0.001
        </div>
      </div>
    </div>
  `

  // Scene setup
  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.0008)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 100

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  document.getElementById('scene-container').appendChild(renderer.domElement)

  // Create particle system
  const geometry = new THREE.BufferGeometry()
  const positions = []
  const colors = []
  const sizes = []

  const color1Three = new THREE.Color(color1)
  const color2Three = new THREE.Color(color2)

  for (let i = 0; i < particleCount; i++) {
    // Position particles in a galaxy spiral
    const radius = Math.random() * 100
    const angle = Math.random() * Math.PI * 2
    const height = (Math.random() - 0.5) * 20

    const x = Math.cos(angle) * radius
    const y = height
    const z = Math.sin(angle) * radius

    positions.push(x, y, z)

    // Gradient colors
    const mixRatio = radius / 100
    const color = color1Three.clone().lerp(color2Three, mixRatio)
    colors.push(color.r, color.g, color.b)

    // Random sizes
    sizes.push(Math.random() * 2 + 0.5)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))

  // Particle material
  const material = new THREE.PointsMaterial({
    size: 1.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending
  })

  const particles = new THREE.Points(geometry, material)
  scene.add(particles)

  // Add some ambient stars
  const starGeometry = new THREE.BufferGeometry()
  const starPositions = []
  for (let i = 0; i < 1000; i++) {
    starPositions.push(
      (Math.random() - 0.5) * 500,
      (Math.random() - 0.5) * 500,
      (Math.random() - 0.5) * 500
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
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.5

  // Animation
  function animate() {
    requestAnimationFrame(animate)

    // Rotate galaxy
    particles.rotation.y += speed
    particles.rotation.x += speed * 0.3

    // Slow star rotation
    stars.rotation.y += speed * 0.1

    controls.update()
    renderer.render(scene, camera)
  }

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  animate()

  MDRUN.success(`Galaxy created with ${particleCount.toLocaleString()} particles`)
}
```

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
```

---

## Try These URLs

```
?count=10000                           # More particles
?count=2000&speed=0.002               # Fewer, faster
?color1=0xff0000&color2=0xffff00     # Red to yellow
?color1=0x00ffff&color2=0xff00ff     # Cyan to magenta
?count=20000&speed=0.0001            # Massive slow galaxy
```

---

**🌌 A galaxy in markdown. Beautiful.**

