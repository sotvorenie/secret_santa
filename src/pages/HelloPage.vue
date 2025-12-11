<script setup>
import {onActivated, ref, watch} from "vue";

import TextBlock from "../components/common/TextBlock.vue";
import ArrowIcon from "../assets/images/icons/ArrowIcon.vue";
import UserIcon from "../assets/images/icons/UserIcon.vue";
import GiftIcon from "../assets/images/icons/GiftIcon.vue";

import foxHi from "../assets/images/fox/привет.webp";
import foxHmm from "../assets/images/fox/думает.webp";
import foxLove from "../assets/images/fox/обнял.webp";
import Modal from "../components/common/Modal.vue";
import Users from "../components/blocks/Users.vue";

import usePagesStore from "../store/usePagesStore.js";
const pagesStore = usePagesStore();
import useUserStore from "../store/useUserStore.js";
const userStore = useUserStore();

const btnContent = ref({
  text: 'Далее',
  icon: ArrowIcon,
})

const foxImages = [foxHi, foxHmm, foxLove]
const showFox = ref(false)

const textList = [
  '<span>Привет! Рад видеть тебя) Я <span class="blue">Снежный Лис</span> :)</span>',
  '<span>А вот тебя я не знаю.. Давай познакомимся?!)',
]
const activeTextIndex = ref(0)

const text = ref(textList[activeTextIndex.value])

const modalVisible = ref(false)

const handleBtn = () => {
  if (activeTextIndex.value === 0) {
    showFox.value = false
    activeTextIndex.value = 1

    btnContent.value = {
      text: 'Выбрать пользователя',
      icon: UserIcon,
    }

    setTimeout(() => {
      showFox.value = true
    }, 100)
  } else if (activeTextIndex.value === 1) {
    modalVisible.value = true
  } else if (activeTextIndex.value === 2) {
    pagesStore.activePageIndex = 1
  }
}

const handleDone = () => {
  modalVisible.value = false

  textList[2] = `<span>Рад познакомиться, <span class="orange">${userStore.userName}</span>! Погнали выбирать кому будешь дарить Новогодний подарок?!)</span>`

  showFox.value = false
  setTimeout(() => {
    showFox.value = true
  }, 100)

  activeTextIndex.value = 2

  btnContent.value = {
    text: 'Погнали)',
    icon: GiftIcon,
  }
}

onActivated(() => {
  localStorage.clear()

  userStore.userName = ''

  localStorage.setItem('page', 'hello')

  setTimeout(() => {
    showFox.value = true
  }, 100)
})

watch(activeTextIndex, (newIndex) => {
  text.value = textList[newIndex]
})
</script>

<template>

  <div class="hello-page">
    <Transition name="slide-from-left" appear>
      <img v-if="showFox"
           class="hello-page__fox-hi"
           :src="foxImages[activeTextIndex]"
           height="512"
           width="512"
           alt=""
      />
    </Transition>

    <TextBlock class="hello-page__text-block"
               :text="text"
               :btn-content="btnContent"
               @click-btn="handleBtn"
    >
      <p v-html="text"></p>
    </TextBlock>

    <Modal v-model="modalVisible">
      <template #default>
        <Users @done="handleDone"/>
      </template>
    </Modal>
  </div>

</template>