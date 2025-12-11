import {defineStore} from "pinia";
import {ref} from "vue";

const usePagesStore = defineStore('pagesStore', () => {
    const activePageIndex = ref(0)

    return {
        activePageIndex
    }
})

export default usePagesStore