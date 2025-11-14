# 🌊 Wave Grid

**Interactive 3D wave animation**

Usage: `index.html?src=wave-grid.md`

---

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
```

```js
function main(params) {
  const gridSize = parseInt(params.size) || 20
  const waveSpeed = parseFloat(params.speed) || 1
  const waveHeight = parseFloat(params.height) || 2
  const colorMode = params.color || 'rainbow'

  const output = document.getElementById('output')
  output.innerHTML = `
    <div id="scene-container" style="width: 100%; height: 100vh; margin: 0; padding: 0;"></div>
    <div style="position: fixed; top: 20px; left: 20px; color: white; font-family: monospace; background: rgba(0,0,0,0.8); padding: 15px; border-radius: 6px; backdrop-filter: blur(10px);">
      <div style="font-size: 20px; margin-bottom: 10px;">🌊 Wave Grid</div>
      <div style="font-size: 12px; color: #8b949e; line-height: 1.6;">
        Grid: ${gridSize}x${gridSize} (${gridSize * gridSize} cubes)<br>
        Speed: ${waveSpeed}x | Height: ${waveHeight}<br>
        Color: ${colorMode}<br>
        <br>
        <span style="opacity: 0.6;">
        ?size=30 (grid size)<br>
        ?speed=2 (wave speed)<br>
        ?height=3 (amplitude)<br>
        ?color=rainbow|heat|cool|mono
        </span>
      </div>
    </div>
  `

  // Scene setup
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0a0a)
  scene.fog = new THREE.Fog(0x0a0a0a, 10, 100)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(gridSize * 0.8, gridSize * 0.6, gridSize * 0.8)
  camera.lookAt(0, 0, 0)

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  document.getElementById('scene-container').appendChild(renderer.domElement)

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)

  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.position.set(gridSize / 2, gridSize * 2, gridSize / 2)
  spotLight.castShadow = true
  scene.add(spotLight)

  // Create grid of cubes
  const cubes = []
  const cubeSize = 0.8
  const spacing = 1

  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 100,
        specular: 0x444444
      })

      const cube = new THREE.Mesh(geometry, material)
      cube.position.x = (x - gridSize / 2) * spacing
      cube.position.z = (z - gridSize / 2) * spacing
      cube.castShadow = true

      scene.add(cube)

      cubes.push({
        mesh: cube,
        gridX: x,
        gridZ: z,
        baseY: 0
      })
    }
  }

  // Ground plane
  const groundGeometry = new THREE.PlaneGeometry(gridSize * 2, gridSize * 2)
  const groundMaterial = new THREE.MeshPhongMaterial({
    color: 0x111111,
    shininess: 10
  })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -waveHeight - 2
  ground.receiveShadow = true
  scene.add(ground)

  // Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // Color schemes
  function getColor(value, mode) {
    const hue = value * 360

    switch(mode) {
      case 'rainbow':
        return new THREE.Color().setHSL(value, 1, 0.5)
      case 'heat':
        return new THREE.Color().setHSL(value * 0.15, 1, 0.5) // Red to yellow
      case 'cool':
        return new THREE.Color().setHSL(0.5 + value * 0.2, 1, 0.5) // Blue to cyan
      case 'mono':
        return new THREE.Color().setHSL(0.6, 0.3, 0.3 + value * 0.4) // Blue shades
      default:
        return new THREE.Color().setHSL(value, 1, 0.5)
    }
  }

  // Animation
  let time = 0
  function animate() {
    requestAnimationFrame(animate)

    time += 0.02 * waveSpeed

    cubes.forEach(cube => {
      // Wave equation using grid position
      const distance = Math.sqrt(
        Math.pow(cube.gridX - gridSize / 2, 2) +
        Math.pow(cube.gridZ - gridSize / 2, 2)
      )

      // Multiple wave sources
      const wave1 = Math.sin(distance * 0.3 - time) * waveHeight
      const wave2 = Math.sin(cube.gridX * 0.2 + time * 0.5) * (waveHeight * 0.5)
      const wave3 = Math.sin(cube.gridZ * 0.2 - time * 0.7) * (waveHeight * 0.5)

      const y = wave1 + wave2 + wave3

      // Smooth animation
      cube.mesh.position.y += (y - cube.mesh.position.y) * 0.1

      // Color based on height
      const normalizedHeight = (cube.mesh.position.y + waveHeight * 2) / (waveHeight * 4)
      const clampedHeight = Math.max(0, Math.min(1, normalizedHeight))

      cube.mesh.material.color = getColor(clampedHeight, colorMode)

      // Subtle rotation
      cube.mesh.rotation.x = cube.mesh.position.y * 0.1
      cube.mesh.rotation.z = cube.mesh.position.y * 0.1
    })

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

  MDRUN.success(`Wave grid created: ${gridSize}x${gridSize} = ${cubes.length} cubes`)
}
```

```html
```

---

## URL Examples

```
?size=30                      # Bigger grid
?speed=3&height=4            # Fast, dramatic waves
?color=heat                  # Red-yellow gradient
?color=cool                  # Blue-cyan gradient
?size=15&color=rainbow       # Small rainbow wave
```

---

## Color Modes

- `rainbow` - Full spectrum
- `heat` - Red to yellow (fire effect)
- `cool` - Blue to cyan (water effect)
- `mono` - Blue monochrome

---

**🌊 Mesmerizing wave patterns in real-time**

