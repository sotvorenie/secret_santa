<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'

const SNOW_CONFIG = {
  COUNT: 100,           // Количество снежинок
  SPEED: 0.5,          // Медленная скорость
  COLOR: '#ffffff',    // Белый цвет
  SIZE: 2,             // Размер снежинок
  OPACITY: 0.7,        // Прозрачность
  WIND: 0.1            // Легкий ветерок
}

const canvasRef = ref(null)
const ctx = ref(null)
const animationId = ref(null)
const snowflakes = ref([])

const createSnowflake = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    size: SNOW_CONFIG.SIZE,
    speed: Math.random() * SNOW_CONFIG.SPEED + 0.3,
    wind: (Math.random() - 0.5) * SNOW_CONFIG.WIND,
    opacity: Math.random() * 0.3 + SNOW_CONFIG.OPACITY
  }
}

const initializeSnowflakes = () => {
  snowflakes.value = []
  for (let i = 0; i < SNOW_CONFIG.COUNT; i++) {
    snowflakes.value.push(createSnowflake())
  }
}

const setupCanvas = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight

  ctx.value = canvas.getContext('2d')
  initializeSnowflakes()
}

const drawSnowflake = (flake) => {
  if (!ctx.value) return

  ctx.value.beginPath()
  ctx.value.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2)
  ctx.value.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
  ctx.value.fill()
}

const updateSnowflakes = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value

  snowflakes.value.forEach(flake => {
    flake.y += flake.speed
    flake.x += flake.wind
    if (flake.y > canvas.height) {
      flake.y = -10
      flake.x = Math.random() * canvas.width
    }
    if (flake.x > canvas.width + 10) flake.x = -10
    if (flake.x < -10) flake.x = canvas.width + 10
  })
}
const drawFrame = () => {
  if (!ctx.value || !canvasRef.value) return
  const canvas = canvasRef.value
  ctx.value.clearRect(0, 0, canvas.width, canvas.height)
  snowflakes.value.forEach(drawSnowflake)
  updateSnowflakes()
}

const animate = () => {
  drawFrame()
  animationId.value = requestAnimationFrame(animate)
}

const handleResize = () => {
  setupCanvas()
}

onMounted(() => {
  setupCanvas()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (animationId.value) cancelAnimationFrame(animationId.value)
})
</script>

<template>
  <canvas ref="canvasRef" class="snow-canvas"></canvas>
</template>

<style scoped>
.snow-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;
}
</style>