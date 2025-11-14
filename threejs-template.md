# 🎨 Three.js Basic Template

**3D graphics in markdown - just add this template and customize!**

Usage: `index.html?src=threejs-template.md`

---

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
```

## Scene

```js
// Three.js Basic Template - Copy and modify this!

function main(params) {
  // Config from URL params
  const bgColor = params.bg || '#000000'
  const objectColor = params.color || '#00ff00'
  const speed = parseFloat(params.speed) || 0.01

  // Setup container
  const output = document.getElementById('output')
  output.innerHTML = `
    <div id="scene-container" style="width: 100%; height: 100vh; margin: 0; padding: 0;"></div>
    <div style="position: fixed; top: 20px; left: 20px; color: white; font-family: monospace; background: rgba(0,0,0,0.7); padding: 15px; border-radius: 6px;">
      <div style="font-size: 18px; margin-bottom: 10px;">🎨 Three.js Template</div>
      <div style="font-size: 12px; color: #8b949e;">
        Click and drag to rotate<br>
        Scroll to zoom<br>
        <br>
        Params:<br>
        ?color=0xff0000 (hex color)<br>
        ?bg=0x111111 (background)<br>
        ?speed=0.02 (rotation speed)
      </div>
    </div>
  `

  // Three.js setup
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(bgColor)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById('scene-container').appendChild(renderer.domElement)

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  // Your 3D object - CUSTOMIZE THIS!
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshPhongMaterial({
    color: objectColor,
    shininess: 100
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // OrbitControls for interaction
  const controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    // Rotate the object
    cube.rotation.x += speed
    cube.rotation.y += speed

    controls.update()
    renderer.render(scene, camera)
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  // Start animation
  animate()

  console.log('✅ Three.js scene initialized')
}
```

```html
<!-- Load Three.js from CDN -->
```

---

## Customize This Template

**Change the geometry:**
```js
// Sphere
const geometry = new THREE.SphereGeometry(1.5, 32, 32)

// Torus
const geometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100)

// Cone
const geometry = new THREE.ConeGeometry(1, 2, 32)

// Custom shape
const geometry = new THREE.IcosahedronGeometry(1.5, 0)
```

**Change the material:**
```js
// Wireframe
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true
})

// Shiny metal
const material = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  metalness: 0.8,
  roughness: 0.2
})

// Textured
const texture = new THREE.TextureLoader().load('texture.jpg')
const material = new THREE.MeshBasicMaterial({ map: texture })
```

**Add more objects:**
```js
// Create multiple cubes
for (let i = 0; i < 10; i++) {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({
    color: Math.random() * 0xffffff
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  )
  scene.add(mesh)
}
```

---

## URL Parameters

```
?color=0xff0000          # Red cube
?bg=0x111111            # Dark background
?speed=0.05             # Faster rotation
?color=0xff00ff&speed=0.02  # Purple, medium speed
```

---

**Copy this template and build your 3D world!** 🌍

