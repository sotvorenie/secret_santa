<script setup lang="ts">
import {ref, watch} from "vue";

import ButtonUi from "@ui/ButtonUi.vue";
import Icon from "@ui/Icon.vue";

const props = defineProps({
  text: String,
  btnContent: Object
})

const emits = defineEmits<{
  clickBtn: [],
}>()

const btnVisible = ref(false)

const onTextAnimationEnd = () => {
  btnVisible.value = true
}

watch(
    () => props.text,
    () => btnVisible.value = false
)
</script>


<template>
  <div class="absolute left-[2.5%] bottom-90 min-h-30 w-[95%] max-w-200 bg-light rounded-regular text-dark p-4 delay-100">
    <div
        class="absolute -bottom-6 left-5 w-0 h-0
               border-t-28 border-t-light
               border-l-28 border-l-transparent"
        aria-hidden="true"
    />

    <Transition name="slide-from-bottom"
                mode="out-in"
                appear
                @after-enter="onTextAnimationEnd"
    >
      <p :key="text" v-html="text"/>
    </Transition>

    <Transition name="fade-scale">
      <ButtonUi v-if="btnVisible"
                class="absolute right-4 -bottom-5"
                @click="emits('clickBtn')"
      >
        {{btnContent?.text}}

        <Icon :name="btnContent?.icon" :size="17"/>
      </ButtonUi>
    </Transition>
  </div>
</template>