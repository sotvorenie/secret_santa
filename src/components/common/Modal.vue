<script setup lang="ts">
import {useSound} from "../../composables/useSound.js";
const {play} = useSound()

import CrossIcon from "../../assets/images/icons/CrossIcon.vue";

const visible = defineModel({default: false});

const props = defineProps({
  closeVisible: {
    type: Boolean,
    default: true
  },
  // чтобы запретить закрытие модального окна, пока не закончатся асинхронные запросы
  closeActive: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['close']);

const open = () => {
  visible.value = true;
}

const close = () => {
  if (!props.closeActive) return

  play('close')
  emits('close');
  visible.value = false;
}

</script>

<template>

  <slot name="activator" :open="open" :close="close" />

  <Teleport to="body">
    <Transition name="fade">
      <div class="modal position-absolute z-10000 flex-center" v-if="visible" @click="close">
        <div class="modal__content position-relative" @click.stop>
          <button class="modal__close position-absolute recolor-svg flex-center"
                  @click="close"
                  type="button"
                  title="Закрыть"
                  aria-label="Закрыть"
                  v-if="closeVisible && closeActive"
          >
            <CrossIcon/>
          </button>

          <slot :close="close" />
        </div>

        <slot name="fox"/>
      </div>
    </Transition>
  </Teleport>

</template>