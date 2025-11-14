# 🏔️ Procedural Terrain

**Generate infinite landscapes with Perlin noise**

Usage: `index.html?src=terrain.md`

---

```js
function main(params) {
  const terrainSize = parseInt(params.size) || 50
  const terrainDetail = parseInt(params.detail) || 100
  const elevation = parseFloat(params.height) || 8
  const wireframe = params.wireframe === 'true'

  const output = document.getElementById('output')
  output.innerHTML = `
    <div id="scene-container" style="width: 100%; height: 100vh; margin: 0; padding: 0;"></div>
    <div style="position: fixed; top: 20px; left: 20px; color: white; font-family: monospace; background: rgba(0,0,0,0.8); padding: 15px; border-radius: 6px;">
      <div style="font-size: 20px; margin-bottom: 10px;">🏔️ Procedural Terrain</div>
      <div style="font-size: 12px; color: #8b949e; line-height: 1.6;">
        Size: ${terrainSize} | Detail: ${terrainDetail}<br>
        Height: ${elevation} | Wireframe: ${wireframe}<br>
        <br>
        <span style="opacity: 0.6;">
        ?size=100 (terrain size)<br>
        ?detail=200 (resolution)<br>
        ?height=15 (elevation)<br>
        ?wireframe=true
        </span>
      </div>
    </div>
  `

  // Scene setup
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x87ceeb) // Sky blue
  scene.fog = new THREE.Fog(0x87ceeb, 10, 200)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 20, 30)
  camera.lookAt(0, 0, 0)

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  document.getElementById('scene-container').appendChild(renderer.domElement)

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  const sunLight = new THREE.DirectionalLight(0xffffaa, 0.8)
  sunLight.position.set(50, 100, 50)
  sunLight.castShadow = true
  sunLight.shadow.camera.left = -50
  sunLight.shadow.camera.right = 50
  sunLight.shadow.camera.top = 50
  sunLight.shadow.camera.bottom = -50
  scene.add(sunLight)

  // Simple noise function (poor man's Perlin noise)
  function noise(x, y) {
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255
    const seed = X * 374761393 + Y * 668265263
    return ((seed ^ (seed >> 13)) & 0xffffffff) / 0xffffffff
  }

  function smoothNoise(x, y) {
    const corners = (noise(x-1, y-1) + noise(x+1, y-1) + noise(x-1, y+1) + noise(x+1, y+1)) / 16
    const sides = (noise(x-1, y) + noise(x+1, y) + noise(x, y-1) + noise(x, y+1)) / 8
    const center = noise(x, y) / 4
    return corners + sides + center
  }

  function interpolate(a, b, x) {
    const ft = x * Math.PI
    const f = (1 - Math.cos(ft)) * 0.5
    return a * (1 - f) + b * f
  }

  function perlinNoise(x, y) {
    const intX = Math.floor(x)
    const intY = Math.floor(y)
    const fracX = x - intX
    const fracY = y - intY

    const v1 = smoothNoise(intX, intY)
    const v2 = smoothNoise(intX + 1, intY)
    const v3 = smoothNoise(intX, intY + 1)
    const v4 = smoothNoise(intX + 1, intY + 1)

    const i1 = interpolate(v1, v2, fracX)
    const i2 = interpolate(v3, v4, fracX)

    return interpolate(i1, i2, fracY)
  }

  // Create terrain
  const geometry = new THREE.PlaneGeometry(
    terrainSize,
    terrainSize,
    terrainDetail,
    terrainDetail
  )

  const vertices = geometry.attributes.position.array

  // Apply noise to height
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i] / 10
    const y = vertices[i + 1] / 10

    let height = 0
    let amplitude = 1
    let frequency = 1

    // Octave noise for more detail
    for (let octave = 0; octave < 4; octave++) {
      height += perlinNoise(x * frequency, y * frequency) * amplitude
      amplitude *= 0.5
      frequency *= 2
    }

    vertices[i + 2] = height * elevation
  }

  geometry.computeVertexNormals()

  // Terrain material with vertex colors based on height
  const colors = []
  for (let i = 0; i < vertices.length; i += 3) {
    const height = vertices[i + 2]
    const color = new THREE.Color()

    if (height < elevation * 0.3) {
      color.setHex(0x3a7d44) // Green (grass)
    } else if (height < elevation * 0.6) {
      color.setHex(0x8b7355) // Brown (dirt)
    } else {
      color.setHex(0xffffff) // White (snow)
    }

    colors.push(color.r, color.g, color.b)
  }

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  const material = new THREE.MeshLambertMaterial({
    vertexColors: true,
    wireframe: wireframe,
    side: THREE.DoubleSide
  })

  const terrain = new THREE.Mesh(geometry, material)
  terrain.rotation.x = -Math.PI / 2
  terrain.receiveShadow = true
  scene.add(terrain)

  // Add water plane
  const waterGeometry = new THREE.PlaneGeometry(terrainSize * 2, terrainSize * 2)
  const waterMaterial = new THREE.MeshBasicMaterial({
    color: 0x0077be,
    transparent: true,
    opacity: 0.4
  })
  const water = new THREE.Mesh(waterGeometry, waterMaterial)
  water.rotation.x = -Math.PI / 2
  water.position.y = 0
  scene.add(water)

  // Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.maxPolarAngle = Math.PI / 2 - 0.1

  // Animation
  function animate() {
    requestAnimationFrame(animate)
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

  MDRUN.success('Terrain generated!')
}
```

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
```

---

## URL Examples

```
?wireframe=true                    # See the mesh
?size=100&detail=200              # Larger, more detailed
?height=20                        # More dramatic peaks
?size=80&height=15&detail=150    # Mountainous terrain
```

---

**🏔️ Procedural landscapes in your browser**

