<template>
  <div
    ref="mountRef"
    class="theme000"
  />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

const mountRef = ref<HTMLDivElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let animationId: number

onMounted(() => {
  const mount = mountRef.value
  if (!mount) return

  // Limpiar hijos previos
  while (mount.firstChild) {
    mount.removeChild(mount.firstChild)
  }

  const width = mount.clientWidth || window.innerWidth
  const height = mount.clientHeight || window.innerHeight

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(0, 0, 10)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  mount.appendChild(renderer.domElement)

  // Hexágono
  const radius = 1.5
  const shape = new THREE.Shape()

  for (let i = 0; i <= 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 6
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    if (i === 0) shape.moveTo(x, y)
    else shape.lineTo(x, y)
  }

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.3,
    bevelEnabled: false
  })

  const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.09,
    shininess: 100,
    side: THREE.DoubleSide
  })

  const hexCount = 30
  const spreadFactor = 15
  const depthRange = 10

  const hexagons: {
    mesh: THREE.Mesh
    targetScale: number
    scaleSpeed: number
    originalScale: number
  }[] = []

  for (let i = 0; i < hexCount; i++) {
    const hex = new THREE.Mesh(geometry, material)

    const x = (Math.random() - 0.5) * spreadFactor
    const y = (Math.random() - 0.5) * spreadFactor
    const z = (Math.random() - 0.5) * depthRange

    const originalScale = 0.8 + Math.random() * 0.4

    hex.position.set(x, y, z)
    hex.scale.set(originalScale, originalScale, originalScale)
    hex.rotation.z = Math.random() * Math.PI * 2

    scene.add(hex)

    hexagons.push({
      mesh: hex,
      targetScale: originalScale,
      scaleSpeed: 0.005 + Math.random() * 0.1,
      originalScale
    })
  }

  // Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)

  scene.add(ambientLight, directionalLight)

  // Animación scaling
  const animateScaling = () => {
    hexagons.forEach(hexagon => {
      if (Math.random() < 0.003) {
        const scaleVariation = 0.9 + Math.random() * 0.2
        hexagon.targetScale = hexagon.originalScale * scaleVariation
      }

      const currentScale = hexagon.mesh.scale.x
      const newScale =
        currentScale +
        (hexagon.targetScale - currentScale) * hexagon.scaleSpeed

      hexagon.mesh.scale.set(newScale, newScale, newScale)
    })
  }

  const animate = () => {
    animationId = requestAnimationFrame(animate)

    scene.rotation.x += 0.0005
    scene.rotation.z += 0.0005

    animateScaling()
    renderer?.render(scene, camera)
  }

  animate()
})

onBeforeUnmount(() => {
  if (!renderer || !mountRef.value) return

  cancelAnimationFrame(animationId)

  if (mountRef.value.contains(renderer.domElement)) {
    mountRef.value.removeChild(renderer.domElement)
  }

  renderer.dispose()
})
</script>

<style scoped>
.theme000 {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(96, 179, 189, 1) 49%,
    rgba(207, 248, 255, 1) 100%
  );
}
</style>