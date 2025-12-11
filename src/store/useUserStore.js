import {defineStore} from "pinia";
import {ref} from "vue";

const useUserStore = defineStore('userStore', () => {
    const userName = ref('')

    return {
        userName,
    }
})

export default useUserStore;