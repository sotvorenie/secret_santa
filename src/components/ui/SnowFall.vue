<template>
  <canvas ref="canvasRef" class="snow-canvas"></canvas>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'

// Настройки снега
const SNOW_CONFIG = {
  COUNT: 100,           // Количество снежинок
  SPEED: 0.5,          // Медленная скорость
  COLOR: '#ffffff',    // Белый цвет
  SIZE: 2,             // Размер снежинок
  OPACITY: 0.7,        // Прозрачность
  WIND: 0.1            // Легкий ветерок
}

// Ссылки
const canvasRef = ref(null)
const ctx = ref(null)
const animationId = ref(null)
const snowflakes = ref([])

// Создание снежинки
const createSnowflake = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height, // Начинаем выше экрана
    size: SNOW_CONFIG.SIZE,
    speed: Math.random() * SNOW_CONFIG.SPEED + 0.3,
    wind: (Math.random() - 0.5) * SNOW_CONFIG.WIND,
    opacity: Math.random() * 0.3 + SNOW_CONFIG.OPACITY
  }
}

// Инициализация снежинок
const initializeSnowflakes = () => {
  snowflakes.value = []
  for (let i = 0; i < SNOW_CONFIG.COUNT; i++) {
    snowflakes.value.push(createSnowflake())
  }
}

// Настройка canvas
const setupCanvas = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight

  ctx.value = canvas.getContext('2d')
  initializeSnowflakes()
}

// Отрисовка снежинки
const drawSnowflake = (flake) => {
  if (!ctx.value) return

  ctx.value.beginPath()
  ctx.value.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2)
  ctx.value.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
  ctx.value.fill()
}

// Обновление позиций
const updateSnowflakes = () => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value

  snowflakes.value.forEach(flake => {
    // Движение вниз
    flake.y += flake.speed

    // Легкое движение в сторону
    flake.x += flake.wind

    // Если упали за нижнюю границу - возвращаем наверх
    if (flake.y > canvas.height) {
      flake.y = -10
      flake.x = Math.random() * canvas.width
    }

    // Если ушли за боковые границы
    if (flake.x > canvas.width + 10) flake.x = -10
    if (flake.x < -10) flake.x = canvas.width + 10
  })
}

// Отрисовка кадра
const drawFrame = () => {
  if (!ctx.value || !canvasRef.value) return

  // Полностью очищаем canvas каждый кадр
  const canvas = canvasRef.value
  ctx.value.clearRect(0, 0, canvas.width, canvas.height)

  // Рисуем снежинки
  snowflakes.value.forEach(drawSnowflake)

  // Обновляем позиции
  updateSnowflakes()
}

// Анимация
const animate = () => {
  drawFrame()
  animationId.value = requestAnimationFrame(animate)
}

// Ресайз
const handleResize = () => {
  setupCanvas()
}

// Жизненный цикл
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

<style scoped>
.snow-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1; /* На заднем плане */
}
</style>