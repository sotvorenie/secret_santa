<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

import {User} from "@/types/user.ts";

import {formatName} from "@composables/useFormatName.ts";

import ButtonUi from "@ui/ButtonUi.vue";
import Modal from "@ui/Modal.vue";

import useUserStore from "@store/useUserStore.ts";
const userStore = useUserStore();

defineProps<{
  randomUser: User | null
  errorText: string
}>()

const router = useRouter()

const errorModalVisible = defineModel('errorModalVisible', {type: Boolean})

const isFlipped = ref<boolean>(false)

const resultModalVisible = ref<boolean>(false)

const handleCard = () => {
  isFlipped.value = true

  setTimeout(() => {
    resultModalVisible.value = true
  }, 500)
}

const handleCloseErrorModal = () => {
  userStore.clear()
  router.replace("/")
}
</script>

<template>

  <div class="flex-center h-full">
    <div class="w-full px-4">
      <p class="text-2xl text-center mb-4">
        <span class="text-accent">{{userStore.currentUser?.name}}</span>, открой карточку)
      </p>

      <div class="aspect-square" @click="handleCard">
        <div :class="[
                'w-full h-full relative [transform-style:preserve-3d] transition-transform duration-300',
                isFlipped && '[transform:rotateY(180deg)]',
              ]"
        >
          <div class="flex-center absolute w-full h-full backface-hidden text-[8rem] rounded-medium text-dark-alt bg-light">
            ?
          </div>
          <div class="flex-center absolute w-full h-full backface-hidden text-[3rem] rounded-medium [transform:rotateY(180deg)] bg-accent text-light">
            {{randomUser?.name}}
          </div>
        </div>
      </div>
    </div>

    <Modal v-model="resultModalVisible" @close="$router.replace('/result')">
      <template #default="{close}">
        <div class="text-center">
          <p class="text-xl mb-1">Даришь подарок</p>
          <p class="text-accent font-semibold text-2xl mb-4">{{formatName(randomUser?.name)}}</p>

          <ButtonUi class="w-full" @click="close">
            Супер)
          </ButtonUi>
        </div>
      </template>
    </Modal>

    <Modal v-model="errorModalVisible" @close="handleCloseErrorModal">
      <template #default="{close}">
        <div class="text-center">
          <p class="text-xl mb-3">Ошибка...</p>
          <p class="text-lg mb-4">{{errorText}}</p>

          <ButtonUi class="w-full" @click="close">
            ок
          </ButtonUi>
        </div>
      </template>
    </Modal>
  </div>

</template>