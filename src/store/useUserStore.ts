import {defineStore} from "pinia";
import {ref} from "vue";

import {User} from "@/types/user.ts";

const useUserStore = defineStore('userStore', () => {
    const currentUser = ref<User | null>(null)

    const clear = () => {
        currentUser.value = null
    }

    return {
        currentUser,

        clear,
    }
})

export default useUserStore;