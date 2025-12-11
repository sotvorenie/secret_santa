<script setup>
import {ref} from "vue";

import light1 from "../../assets/images/гирлянда 2.gif"
import light2 from "../../assets/images/гирлянда.webp"

const isActive = ref(false)

const handleButton = () => {
  isActive.value = !isActive.value
}

</script>

<template>

  <div class="lights position-absolute" :class="{'is-active': isActive}">
    <img class="lights__one position-absolute" :src="light1" height="410" width="439" alt=""/>

    <img class="lights__two position-absolute" :src="light2" height="300" width="1366" alt=""/>

    <button class="lights__btn button rounded position-absolute"
            :class="{'is-active': isActive}"
            type="button"
            @click="handleButton"
    >
      {{isActive ? 'on' : 'off'}}
    </button>
  </div>

</template>