import {defineStore} from "pinia";
import {computed, ref} from "vue";

const useCardsStore = defineStore("cardsStore", () => {

    const cards = ref([])

    const disabledUsers = computed(() => {
        return cards.value.filter(card => card?.whoChoise)?.map(el => el.whoChoise)
    })

    return {
        cards,

        disabledUsers,
    }
})

export default useCardsStore;