<script setup lang="ts">
import Icon from "@ui/Icon.vue";
import ButtonUi from "@ui/ButtonUi.vue";

import CrossIcon from "@icons/CrossIcon.vue";

const visible = defineModel({type: Boolean, default: false})

const emits = defineEmits(['close']);

const open = () => {
  visible.value = true
}

const close = () => {
  emits('close')
  visible.value = false
}
</script>

<template>

  <slot name="activator" :open="open" :close="close" />

  <Teleport to="body">
    <Transition name="fade">
      <div class="absolute z-[1000] flex-center inset-0 bg-dark/75 backdrop-blur-[3px]" v-if="visible" @click="close">
        <div class="relative w-[85%] bg-dark-alt p-4 rounded-regular border border-light" @click.stop>
          <ButtonUi class="absolute -top-3 -right-3"
                    is-rounded
                    @click="close"
          >
            <Icon :name="CrossIcon" :size="10"/>
          </ButtonUi>

          <slot :close="close" />
        </div>
      </div>
    </Transition>
  </Teleport>

</template>