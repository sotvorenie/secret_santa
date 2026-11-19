<script setup lang="ts">
import {onBeforeMount, ref} from "vue";

import {User} from "@/types/user.ts";

import {UserService} from "@api/users/UserService.ts";

import Modal from "@ui/Modal.vue";
import ButtonUi from "@ui/ButtonUi.vue";
import Loading from "@ui/Loading.vue";

const selectedUser = defineModel<User | null>('selectedUser')

const emits = defineEmits<{
  done: []
  close: []
}>()

const confirmModalVisible = ref(false)

const users = ref<User[]>([])

const isLoading = ref<boolean>(true)
const isError = ref<boolean>(false)

const getUsers = async () => {
  try {
    isLoading.value = true

    users.value = await UserService.getUsers()
  } catch {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

const handleUser = (user: User) => {
  selectedUser.value = selectedUser.value?.id === user.id ? null : user
}

const handleDone = () => {
  confirmModalVisible.value = false
  emits('done')
}
onBeforeMount(getUsers)
</script>

<template>
  <div>
    <template v-if="!isLoading">
      <template v-if="!isError">
        <p class="text-center mb-4">Выберите себя из списка</p>

        <ul class="mb-4 flex flex-col gap-2">
          <li v-for="(user, index) in users"
              :key="user.id"
              :style="{'animation-delay': `${index * 0.05}s`}"
          >
            <button :class="[
                      'border rounded-regular w-full p-2',
                      selectedUser?.name === user.name ? 'bg-accent border-accent' : 'border-light',
                  ]"
                    :disabled="user.isChose"
                    @click="handleUser(user)"
            >
              {{user.name}}
            </button>
          </li>
        </ul>

        <Modal v-model="confirmModalVisible">
          <template #activator="{open}">
            <ButtonUi class="w-full"
                      :disabled="!selectedUser?.id"
                      @click="open"
            >
              Подтвердить
            </ButtonUi>
          </template>

          <template #default="{close}">
            <div>
              <p class="text-center mb-3">Вы уверены?</p>

              <div class="users__btn-bar grid grid-cols-2 gap-3">
                <ButtonUi variant="muted" @click="close">
                  Нет
                </ButtonUi>

                <ButtonUi @click="handleDone">
                  Да
                </ButtonUi>
              </div>
            </div>
          </template>
        </Modal>
      </template>

      <div v-else>
        <p class="mb-3 text-center">Что-то пошло не так..</p>
        <ButtonUi class="w-full"
                  @click="emits('close')"
        >
          ок
        </ButtonUi>
      </div>
    </template>

    <Loading v-else/>
  </div>
</template>