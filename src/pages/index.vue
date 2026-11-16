<script setup lang="ts">
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

import {Step} from "@/types/step.ts";

import IndexUsers from "@components/index/IndexUsers.vue";
import IndexTextBlock from "@components/index/IndexTextBlock.vue";

import Modal from "@ui/Modal.vue";

import ArrowIcon from "@icons/ArrowIcon.vue";
import UserIcon from "@icons/UserIcon.vue";
import GiftIcon from "@icons/GiftIcon.vue";

import useUserStore from "@store/useUserStore.ts";
const userStore = useUserStore();

const router = useRouter()

const usersModalVisible = ref<boolean>(false)

const stepIndex = ref<number>(0)

const steps: Step[] = [
  {
    id: 1,
    text: () => '<span>Привет! Рад видеть тебя) Я <span class="text-blue-500 font-semibold">Снежный Лис</span> :)</span>',
    fox: '/images/fox/привет.webp',
    btn: {
      text: 'Далее',
      icon: ArrowIcon,
      iconSize: 17,
    },
    onClick: () => {
      stepIndex.value++
    },
  },
  {
    id: 2,
    text: () => '<span>А вот тебя я не знаю.. Давай познакомимся)',
    fox: '/images/fox/думает.webp',
    btn: {
      text: 'Выбрать пользователя',
      icon: UserIcon,
      iconSize: 23,
    },
    onClick: () => {
      usersModalVisible.value = true
    },
  },
  {
    id: 3,
    text: () => `<span>Рад познакомиться, <span class="text-accent font-semibold">${userStore.currentUser?.name}</span>! Погнали выбирать кому будешь дарить Новогодний подарок)</span>`,
    fox: '/images/fox/обнял.webp',
    btn: {
      text: 'Погнали)',
      icon: GiftIcon,
      iconSize: 17,
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

    <IndexTextBlock :step="currentStep"/>

    <Modal v-model="usersModalVisible">
      <template #default>
        <IndexUsers v-model:selected-user="userStore.currentUser"
                    @done="handleDone"
        />
      </template>
    </Modal>
  </div>

</template>