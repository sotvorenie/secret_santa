<script setup lang="ts">
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

import IndexUsers from "@components/index/IndexUsers.vue";
import IndexTextBlock from "@components/index/IndexTextBlock.vue";

import Modal from "@ui/Modal.vue";

import ArrowIcon from "@icons/ArrowIcon.vue";
import UserIcon from "@icons/UserIcon.vue";
import GiftIcon from "@icons/GiftIcon.vue";

import foxHi from "/images/fox/привет.webp";
import foxHmm from "/images/fox/думает.webp";
import foxLove from "/images/fox/обнял.webp";

import useUserStore from "@store/useUserStore.ts";
const userStore = useUserStore();

const router = useRouter()

const usersModalVisible = ref<boolean>(false)

const stepIndex = ref<number>(0)

const steps = [
  {
    text: () => '<span>Привет! Рад видеть тебя) Я <span class="text-blue-500 font-semibold">Снежный Лис</span> :)</span>',
    fox: foxHi,
    btn: {
      text: 'Далее',
      icon: ArrowIcon,
    },
    onClick: () => {
      stepIndex.value++
    },
  },
  {
    text: () => '<span>А вот тебя я не знаю.. Давай знакомиться?!)',
    fox: foxHmm,
    btn: {
      text: 'Выбрать пользователя',
      icon: UserIcon,
    },
    onClick: () => {
      usersModalVisible.value = true
    },
  },
  {
    text: () => `<span>Рад познакомиться, <span class="text-accent font-semibold">${userStore.currentUser?.name}</span>! Погнали выбирать кому будешь дарить Новогодний подарок)</span>`,
    fox: foxLove,
    btn: {
      text: 'Погнали)',
      icon: GiftIcon,
    },
    onClick: () => {
      router.replace('/main')
    },
  },
]

const currentStep = computed(() => steps[stepIndex.value])

const handleDone = () => {
  usersModalVisible.value = false
  stepIndex.value++
}
</script>

<template>

  <div class="hello-page">
    <Transition name="slide-from-left" appear mode="out-in">
      <img :key="currentStep.fox"
           class="absolute w-auto h-80 bottom-0 left-0"
           :src="currentStep.fox"
           height="512"
           width="512"
           alt=""
      />
    </Transition>

    <IndexTextBlock :text="currentStep.text()"
               :btn-content="currentStep.btn"
               @click-btn="currentStep.onClick"
    />

    <Modal v-model="usersModalVisible">
      <template #default>
        <IndexUsers v-model:selected-user="userStore.currentUser"
               @done="handleDone"
        />
      </template>
    </Modal>
  </div>

</template>