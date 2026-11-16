<script setup lang="ts">
import {ref} from "vue";

import {User} from "@/types/user.ts";

import {UserService} from "@api/users/UserService.ts";

import MainContent from "@components/main/MainContent.vue";

import useUserStore from "@store/useUserStore.ts";
const userStore = useUserStore();

const users = ref<User[]>([])
const randomUser = ref<User | null>(null)

const errorModalVisible = ref<boolean>(false)

const errorText = ref<string>('')

const showErrorModal = (text: string = 'Что-то пошло не так..') => {
  errorText.value = text
  errorModalVisible.value = true
}

const getUsers = async () => {
  users.value = await UserService.getUsers()
}

const checkUser = () => {
  const check = users.value.some(user => user.id === userStore.currentUser?.id && user.isChose)

  if (check) showErrorModal('От вашего лица уже выбрали кому дарить подарок')

  return !check
}

const getRandomUser = () => {
  const arr = users.value.filter(user => user.id !== userStore.currentUser?.id && !user.isChosen)
  randomUser.value = arr[Math.floor(Math.random() * arr.length)]
}

const updateUsers = async () => {
  if (!randomUser.value || !userStore.currentUser) return

  const dataForGiftUser: User = {
    ...randomUser.value,
    isChosen: true,
  }

  const dataForMe: User = {
    ...userStore.currentUser,
    isChose: true,
  }

  await Promise.all([
    UserService.updateUser(dataForGiftUser),
    UserService.updateUser(dataForMe),
  ])
}

const onLoad = async () => {
  try {
    await getUsers()

    const check = checkUser()
    if (!check) return

    getRandomUser()

    if (!randomUser.value) {
      showErrorModal()
      return
    }

    await updateUsers()

    const giftFor = {
      id: randomUser.value.id,
      name: randomUser.value.name,
    }

    localStorage.setItem('gift-for', JSON.stringify(giftFor))
  } catch {
    showErrorModal()
  }
}

await onLoad()
</script>

<template>

  <MainContent v-model:error-modal-visible="errorModalVisible"
               :random-user="randomUser"
               :error-text="errorText"
  />

</template>