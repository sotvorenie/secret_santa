<script setup lang="ts">
import {ref, watch} from "vue";

import {Step} from "@/types/step.ts";

import ButtonUi from "@ui/ButtonUi.vue";
import Icon from "@ui/Icon.vue";

const props = defineProps<{
  step: Step
}>()

const btnVisible = ref(false)

const onTextAnimationEnd = () => {
  btnVisible.value = true
}

watch(
    () => props.step.id,
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
      <p :key="step?.id" v-html="step?.text()"/>
    </Transition>

    <Transition name="fade-scale">
      <ButtonUi v-if="btnVisible"
                class="absolute right-4 -bottom-5"
                @click="step?.onClick"
      >
        {{step?.btn?.text}}

        <Icon :name="step?.btn?.icon" :size="step?.btn?.iconSize"/>
      </ButtonUi>
    </Transition>
  </div>
</template>