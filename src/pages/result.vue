<script setup lang="ts">
import {ref} from "vue";

import {UserGift} from "@/types/user.ts";

import {formatName} from "@composables/useFormatName.ts";

const giftFor = ref<UserGift | null>(JSON.parse(localStorage.getItem('gift-for') ?? 'null'))
</script>

<template>

  <div class="flex-center flex-col h-full">
    <p class="text-2xl mb-2">Даришь подарок</p>
    <p class="text-3xl font-semibold text-accent">{{formatName(giftFor?.name)}}</p>

    <img class="absolute w-auto h-80 bottom-0 left-0"
         src="/images/fox/целует.webp"
         height="512"
         width="512"
         alt=""
    />
  </div>

</template>