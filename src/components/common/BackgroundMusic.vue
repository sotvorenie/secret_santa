<script setup>
import {onMounted, ref} from "vue";
import SoundOnIcon from "../../assets/images/icons/SoundOnIcon.vue";
import SoundOffIcon from "../../assets/images/icons/SoungOffIcon.vue";

const blockVisible = ref(false);

const audioRef = ref(null)
const isPlaying = ref(false)

const togglePlay = () => {
  if (!audioRef.value) return

  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

onMounted(() => {
  setTimeout(() => {
    blockVisible.value = true
  }, 100)
})

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = 0.3
    audioRef.value.loop = true

    const audio = audioRef.value
    audio.volume = 0.3
    audio.loop = false  // ручной цикл

    audio.addEventListener('ended', () => {
      audio.currentTime = 0
      audio.play()
    })
  }
})
</script>

<template>

  <Transition name="fade-scale">
    <div v-if="blockVisible" class="background-music position-absolute">
      <audio ref="audioRef">
        <source src="../../assets/sounds/Jingle-Bells.mp3" type="audio/mpeg">
      </audio>

      <button :class="{
                'button rounded recolor-svg': true,
                'is-active': isPlaying,
              }"
              type="button"
              @click="togglePlay"
      >
        <SoundOnIcon v-if="isPlaying"/>
        <SoundOffIcon v-else/>
      </button>
    </div>
  </Transition>

</template>