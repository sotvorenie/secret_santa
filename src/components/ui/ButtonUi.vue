<script setup lang="ts">
withDefaults(
    defineProps<{
      isDisabled?: boolean
      type?: 'button' | 'submit'
      isRounded?: boolean
      variant?: 'accent' | 'muted'
    }>(), {
      isDisabled: false,
      type: 'button',
      variant: 'accent',
    }
)
</script>

<template>

  <button :class="[
              'recolor-svg gap-1 flex-center text-light leading-none text-center',
              isRounded ? 'square-7 flex-center border-light rounded-full' : 'rounded-regular p-3',
              variant === 'accent' && 'bg-accent',
              variant === 'muted' && 'bg-light/25',
          ]"
          :disabled="isDisabled"
          :type="type"
  >
    <slot/>
  </button>

</template>