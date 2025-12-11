<script setup>
import {onBeforeMount, onMounted, ref} from "vue";

import {apiGetCards} from "./api/cards.js";

import HelloPage from "./pages/HelloPage.vue";
import MainPage from "./pages/MainPage.vue";
import EndPage from "./pages/EndPage.vue";
import Skeleton from "./components/ui/Skeleton.vue";
import SnowFall from "./components/ui/SnowFall.vue";
import BackgroundMusic from "./components/common/BackgroundMusic.vue";
import Lights from "./components/ui/Lights.vue";

import light1 from "./assets/images/гирлянда.webp"
import light2 from "./assets/images/гирлянда 2.gif"
import foxHi from "./assets/images/fox/привет.webp";
import foxHmm from "./assets/images/fox/думает.webp";
import foxLove from "./assets/images/fox/обнял.webp";
import foxSad from "./assets/images/fox/грустит.webp"
import foxLick from "./assets/images/fox/облизывает.webp"
import foxKiss from "./assets/images/fox/целует.webp"
import clickSnd from './assets/sounds/click.mp3'
import clickSndTwo from './assets/sounds/click2.mp3'
import cardSnd from './assets/sounds/card.mp3'
import closeSnd from './assets/sounds/close.mp3'
import applePay from './assets/sounds/apple-pay.mp3'

import usePagesStore from "./store/usePagesStore.js";
const pagesStore = usePagesStore();
import useCardsStore from "./store/useCardsStore.js";
import OrientationBlock from "./components/ui/OrientationBlock.vue";
const cardsStore = useCardsStore();

const pages = [HelloPage, MainPage, EndPage]

const isLoading = ref(true)
const isError = ref(false)

const preloadAssets = () => {
  const images = [foxHi, foxHmm, foxLove, foxSad, foxLick, foxKiss, light1, light2]

  const sounds = [clickSnd, clickSndTwo, cardSnd, closeSnd, applePay]

  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  sounds.forEach(src => {
    const audio = new Audio();
    audio.src = src;
    audio.load();
  });

  console.log('Предзагружено:', images.length + sounds.length, 'ресурсов');
};

const getCards = async () => {
  try {
    isError.value = false

    const data = await apiGetCards()

    if (data) {
      cardsStore.cards = data
    } else {
      isError.value = true
    }
  } catch (err) {
    isError.value = true
  }
}

onBeforeMount(() => {
  const page = localStorage.getItem('page')

  const pageMap = {
    hello: 0,
    main: 1,
    end: 2
  }

  if (pageMap[page] !== undefined) {
    pagesStore.activePageIndex = pageMap[page]
  }
})

onMounted(async () => {
  if (pagesStore.activePageIndex !== 2) {
    try {
      preloadAssets();

      await getCards();
    } catch (err) {
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  } else {
    isLoading.value = false
  }
})
</script>

<template>

  <div class="content" style="height: 100%; overflow: hidden" v-if="!isLoading && !isError">
    <SnowFall/>

    <BackgroundMusic/>

    <Lights/>

    <OrientationBlock/>

    <KeepAlive>
      <Component :is="pages[pagesStore.activePageIndex]"/>
    </KeepAlive>
  </div>

  <Skeleton v-else-if="isLoading && !isError"/>

  <div class="flex-center" style="height: 100%" v-if="!isLoading && isError">Что-то пошло не так..</div>

</template>
