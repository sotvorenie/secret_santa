<script setup>
import {onActivated, ref} from "vue";

import {formatName} from "../composables/useNameFormat.js";

import foxKiss from "../assets/images/fox/целует.webp"

import useUserStore from "../store/useUserStore.js";
const userStore = useUserStore();

const name = ref('')
const giftFor = ref('')

onActivated(() => {
  localStorage.setItem('page', 'end')

  name.value = userStore.userName.length ? userStore.userName : localStorage.getItem('userName')

  giftFor.value = localStorage.getItem('giftFor')
})
</script>

<template>

  <div class="end-page flex-center flex-column">
    <p class="name text-w700">{{name}}</p>
    <p class="text-w600">дарит подарок</p>
    <p class="name text-w700">{{formatName(giftFor)}}</p>

    <img class="end-page__fox position-absolute"
         :src="foxKiss"
         height="512"
         width="512"
         alt=""
    />
  </div>

</template>