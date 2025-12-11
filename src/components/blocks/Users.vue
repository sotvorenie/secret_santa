<script setup>
import {ref} from "vue";

import {useSound} from "../../composables/useSound.js";
const {play} = useSound()

import useUserStore from "../../store/useUserStore.js";
const userStore = useUserStore();
import useCardsStore from "../../store/useCardsStore.js";
const cardsStore = useCardsStore();

const emits = defineEmits(['done']);

import Modal from "../common/Modal.vue";

const activeUser = ref({})

const handleUser = (userCard) => {
  play('click2')

  if (activeUser.value.id === userCard.id) {
    activeUser.value = {}
    userStore.userName = ''

    return
  }

  activeUser.value = userCard
  userStore.userName = activeUser.value.name
}

const modalVisible = ref(false)

const handleDone = () => {
  modalVisible.value = false

  localStorage.setItem('userName', activeUser.value.name)

  emits('done')
}

const checkDisable = (name) => {
  return cardsStore.disabledUsers.some(user => user === name)
}
</script>

<template>
  <div class="users">
    <ul class="users__list">
      <li v-for="(card, index) in cardsStore?.cards"
          :key="card.id"
          :class="{
            'users__item list-item': true,
            'is-active': activeUser?.id === card?.id,
            'disabled': checkDisable(card?.name)
          }"
          :style="{'animation-delay': `${index * 0.05}s`}"
      >
        <button type="button" @click="handleUser(card)">
          {{card?.name}}
        </button>
      </li>
    </ul>

    <Transition name="fade-scale">
      <Modal v-model="modalVisible">
        <template #activator="{open}">
          <button class="users__btn button m-auto"
                  type="button"
                  v-sound="'click'"
                  @click="open"
                  :disabled="!activeUser.id"
          >
            Подтвердить
          </button>
        </template>

        <template #default="{close}">
          <div class="users__accept">
            <p class="users__title text-center">Вы уверены?</p>

            <div class="users__btn-bar flex">
              <button class="users__btn button"
                      type="button"
                      v-sound="'click'"
                      @click="handleDone"
              >
                Да
              </button>
              <button class="users__btn button"
                      type="button"
                      @click="close"
              >
                Нет
              </button>
            </div>
          </div>
        </template>
      </Modal>
    </Transition>
  </div>
</template>