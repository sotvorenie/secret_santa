<script setup lang="ts">
import {onMounted, ref} from "vue";

const isLandscape = ref(false)

onMounted(() => {
  const mql = window.matchMedia('(orientation: landscape)')

  isLandscape.value = mql.matches
  mql.addEventListener('change', (e: MediaQueryListEvent) => {
    isLandscape.value = e.matches
  })
})
</script>

<template>
  <div v-if="isLandscape"
       class="flex-center fixed inset-0 bg-dark-alt z-[1001]"
  >
    <div class="text-2xl text-center px-4">
      Пожалуйста, держите телефон вертикально 📱
    </div>
  </div>
</template>
