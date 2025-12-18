<script setup>
import {onMounted, ref} from "vue";

import {formatName} from "../composables/useNameFormat.js";

import foxKiss from "../assets/images/fox/целует.webp"
import foxSad from "../assets/images/fox/грустит.webp"

import Modal from "../components/common/Modal.vue";

import useUserStore from "../store/useUserStore.js";
const userStore = useUserStore();
import useCardsStore from "../store/useCardsStore.js";
const cardsStore = useCardsStore();
import usePagesStore from "../store/usePagesStore.js";
const pagesStore = usePagesStore();

const name = ref('')
const giftFor = ref('')

const modalVisible = ref(false)

const closeModal = () => {
  modalVisible.value = false
  pagesStore.activePageIndex = 0
}

const check = () => {
  const card = cardsStore.cards?.find(card => card.name === giftFor.value)

  if (!card.isChosen) return false

  return card.whoChoise === name.value
}

onMounted(async () => {
  localStorage.setItem('page', 'end')

  name.value = userStore.userName.length ? userStore.userName : localStorage.getItem('userName')

  giftFor.value = localStorage.getItem('giftFor')

  if (!check()) modalVisible.value = true
})
</script>

<template>

  <div class="end-page flex-column">
    <p class="name text-w700">{{name}}</p>
    <p class="text-w600">дарит подарок</p>
    <p class="name text-w700">{{formatName(giftFor)}}</p>

    <img class="end-page__fox position-absolute"
         :src="foxKiss"
         height="512"
         width="512"
         alt=""
    />

    <Modal v-model="modalVisible" @close="closeModal">
      <template #default="{close}">
        <div class="main-page__error text-center">

          <p class="text-w600">Данный пользователь обновлен</p>
          <p class="text-w600">Необходимо провести выбор заново!!</p>

          <button class="main-page__btn button" @click="close">Погнали!</button>
        </div>
      </template>

      <template #fox>
        <img class="modal__fox"
             :src="foxSad"
             height="512"
             width="512"
             alt=""
        />
      </template>
    </Modal>
  </div>

</template>