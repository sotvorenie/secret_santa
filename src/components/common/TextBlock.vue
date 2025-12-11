<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  text: String,
  btnContent: Object
})

const emits = defineEmits(['clickBtn'])

const btnVisible = ref(false)
const blockVisible = ref(false)
const displayText = ref('')
const displayHTML = ref('')
const isTyping = ref(false)
const hasTypedInitial = ref(false) // флаг первой анимации

const extractTextFromHTML = (html) => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  return tempDiv.textContent || tempDiv.innerText || ''
}

const typeText = async (html) => {
  if (!html) return

  isTyping.value = true
  displayText.value = ''
  displayHTML.value = ''

  const plainText = extractTextFromHTML(html)

  for (let i = 0; i < plainText.length; i++) {
    displayText.value += plainText[i]
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  displayHTML.value = html
  isTyping.value = false
  btnVisible.value = true
}

const startAnimation = async () => {
  if (!props.text) return
  await typeText(props.text)
}

onMounted(async () => {
  setTimeout(() => {
    blockVisible.value = true
  }, 100)

  if (props.text && !hasTypedInitial.value) {
    await nextTick()
    await startAnimation()
    hasTypedInitial.value = true
  }
})

watch(
    () => props.text,
    async (newText) => {
      if (!newText) return
      if (!hasTypedInitial.value) return

      btnVisible.value = false
      await nextTick()
      await startAnimation()
    }
)
</script>


<template>
  <Transition name="fade-scale">
    <div class="text-block" v-if="blockVisible">
      <p v-if="!isTyping && displayHTML" v-html="displayHTML"></p>
      <p v-else>{{ displayText }}</p>

      <Transition name="fade-scale">
        <button class="text-block__btn button button-width-svg recolor-svg flex flex-align-center"
                type="button"
                @click="emits('clickBtn')"
                v-if="btnVisible"
                v-sound="'click'"
        >
          {{btnContent?.text}}
          <component :is="btnContent?.icon"/>
        </button>
      </Transition>
    </div>
  </Transition>
</template>