<script setup lang="ts">
import type {Component} from "vue";

defineProps<{
  name: Component
  size: number
  recolor?: boolean
}>()
</script>

<template>

  <i :class="[
        'flex-center icon-box',
        recolor && 'recolor-svg'
     ]"
  >
    <Component :is="name" :style="{
      '--size': `${size / 16}rem`,
    }"/>
  </i>

</template>

<style scoped>
.icon-box svg {
  --size: 20px;

  width: var(--size) !important;
  min-width: var(--size) !important;
  height: var(--size) !important;
  min-height: var(--size) !important;
}
</style>