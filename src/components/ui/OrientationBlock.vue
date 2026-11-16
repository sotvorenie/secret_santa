<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";

const isLandscape = ref(false)

const checkOrientation = () => {
  isLandscape.value = window.matchMedia("(orientation: landscape)").matches
}

onMounted(() => {
  checkOrientation()
  window.addEventListener("orientationchange", checkOrientation)
})

onBeforeUnmount(() => {
  window.removeEventListener("orientationchange", checkOrientation)
})
</script>

<template>
  <div v-if="isLandscape"
       class="orientation-blocker flex-center"
  >
    <div class="orientation-message">
      Пожалуйста, держите телефон вертикально 📱
    </div>
  </div>
</template>

<style scoped>
.orientation-blocker {
  position: fixed;
  inset: 0;
  background: #5f6d78;
  color: #ebeced;
  z-index: 999999;
}

.orientation-message {
  font-size: 24px;
  text-align: center;
  padding: 20px;
  line-height: 1.4;
}
</style>
