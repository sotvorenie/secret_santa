<script setup>
import {onMounted, ref} from "vue";

import light1 from "../../assets/images/гирлянда 2.gif"
import light2 from "../../assets/images/гирлянда.webp"

const isActive = ref(false)

const btnVisible = ref(false)

const handleButton = () => {
  isActive.value = !isActive.value
}

onMounted(() => {
  setTimeout(() => {
    btnVisible.value = true
  }, 100)
})
</script>

<template>

  <div class="lights position-absolute" :class="{'is-active': isActive}">
    <img class="lights__one position-absolute" :src="light1" height="410" width="439" alt=""/>

    <img class="lights__two position-absolute" :src="light2" height="300" width="1366" alt=""/>

    <Transition name="fade-scale">
      <button class="lights__btn button rounded position-absolute"
              :class="{'is-active': isActive}"
              type="button"
              @click="handleButton"
              v-if="btnVisible"
      >
        {{isActive ? 'on' : 'off'}}
      </button>
    </Transition>
  </div>

</template>