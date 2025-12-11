<script setup>
import {onActivated, ref} from "vue";

import {apiGetCards, apiSetCard} from "../api/cards.js";

import {useSound} from "../composables/useSound.js";
import ArrowIcon from "../assets/images/icons/ArrowIcon.vue";

import Modal from "../components/common/Modal.vue";

import foxSad from "../assets/images/fox/грустит.webp"
import foxLick from "../assets/images/fox/облизывает.webp"

import usePagesStore from "../store/usePagesStore.js";
import useUserStore from "../store/useUserStore.js";
import useCardsStore from "../store/useCardsStore.js";
import {formatName} from "../composables/useNameFormat.js";
import Loading from "../components/ui/Loading.vue";

const {play} = useSound()

const pagesStore = usePagesStore();
const userStore = useUserStore();
const cardsStore = useCardsStore();

//=========================================================//

//=========================================================//
//-- асинхронные функции --//
// видимость анимации загрузки
const isLoading = ref(false)


// отправка данных об обновлении карты в апи
const setCard = async () => {
  try {
    const newData = {
      id: randomCard.value.id,
      name: randomCard.value.name,
      isChosen: true,
      whoChoise: userStore.userName
    }

    await apiSetCard(newData)
  } catch (_) {
    throw new Error('send')
  }
}

// получение карт
const getCards = async () => {
  try {
    const data = await apiGetCards()

    if (data) {
      cardsStore.cards = data

      return data
    }
  } catch (err) {
    throw new Error('get')
  }
}
//=========================================================//


//=========================================================//
//-- навигация --//
// видимость кнопки "Назад"
const backVisible = ref(false)


// клик по кнопке "Назад"
const handleBack = () => {
  pagesStore.activePageIndex = 0
}
//=========================================================//


//=========================================================//
//-- список карт --//
// список карт
const cards = ref([])

// случайный пользователь
const randomCard = ref()

// перевернута карта или нет
const isFlipped = ref(false)


// клик по карте
const handleCard = async () => {
  try {
    isLoading.value = true

    isFlipped.value = true

    play('card')

    const newCards = await getCards()
    const ourCard = newCards.find(card => card.id === randomCard.value.id)

    const check = checkUser()

    if (check) return

    const check2 = checkForWhom(ourCard.id)

    if (check2) return

    await setCard()

    localStorage.setItem('giftFor', randomCard.value.name)

    cardsStore.cards = cardsStore.cards.map(card => {
      if (card.name === randomCard.value.name) {
        return {
          ...card,
          isChosen: true,
        }
      }

      return card
    })

    setTimeout(() => {
      play('applePay')
      modalVisible.value = true
    }, 1000)
  } catch (err) {
    if (err.name === 'send' || err.name === 'get') {
      errorModalInfo.value = {
        text1: 'Что-то пошло не так..',
        text2: 'Перезагрузите страницу и попробуйте позже!!',
        type: 'response',
      }
      errorModalVisible.value = true
    }
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
}

// выбор случайного пользователя кому буду дарить подарок
const getRandomCard = () => {
  const arr = cards.value.filter(card => card.name !== userStore.userName && !card?.isChosen)
  randomCard.value = arr[Math.floor(Math.random() * arr.length)]
}

// проверка, что данный пользователь еще не делал выбор (при монтировании страницы вызываем эту функцию)
const checkUser = () => {
  const check = cardsStore.disabledUsers.some(card => card === userStore.userName)

  if (check) {
    errorModalInfo.value = {
      text1: 'Данный пользователь неактивен!!',
      text2: 'От вашего лица уже выбрали кому дарить подарок',
      type: 'user'
    }

    errorModalVisible.value = true
  }

  return check
}

// проверка, что данный пользователь еще никем не выбран
const checkForWhom = (id) => {
  console.log(id)
  const check = cards.value.find(card => card?.id === id)?.isChosen ?? true

  if (check) {
    errorModalInfo.value = {
      text1: 'Пользователь занят!!',
      text2: 'Откройте карточку еще раз',
      type: 'no_user',
    }

    errorModalVisible.value = true
  }

  return check
}
//=========================================================//


//=========================================================//
//-- модальные окна --//
// видимость модального окна "Кто кому дарит подарок"
const modalVisible = ref(false)
// видимость модального окна ошибки
const errorModalVisible = ref(false)

// текст в модальном окне ошибки
const errorModalInfo = ref({
  text1: 'Данный пользователь неактивен!!',
  text2: 'От вашего лица уже выбрали кому дарить подарок',
  type: 'user'
})


// закрытие модального окна информации о подарке
const closeModal = () => {
  pagesStore.activePageIndex = 2
}

// закрытие модального окна ошибки
const closeErrorModal = () => {
  if (errorModalInfo.value.type === 'user') {
    pagesStore.activePageIndex = 0
  }
  if (errorModalInfo.value.type === 'no_user') {
    isFlipped.value = false
    getRandomCard()
  }
}
//=========================================================//


//=========================================================//
//-- хуки --//
onActivated(() => {
  if (!userStore.userName) {
    userStore.userName = localStorage.getItem('userName')
  }

  cards.value = cardsStore.cards.filter(card => card.name !== userStore.userName)

  localStorage.setItem('page', 'main')

  const check = checkUser()
  if (check) return

  getRandomCard()

  setTimeout(() => {
    backVisible.value = true
  }, 500)
})
//=========================================================//
</script>

<template>

  <div class="main-page flex-center">

    <Transition name="fade-scale">
      <button class="main-page__back button position-absolute recolor-svg flex flex-align-center"
              type="button"
              @click="handleBack"
              v-sound="'click'"
              v-if="!isFlipped && backVisible"
      >
        <ArrowIcon/>
        Назад
      </button>
    </Transition>

    <div class="main-page__content">
      <p class="main-page__title h2 text-center"><span class="orange">{{userStore?.userName}}</span>, открой карточку)</p>

      <div class="main-page__card card" @click="handleCard">
        <div class="card__inner" :class="{ flipped: isFlipped }">
          <div class="card__front">
            <p>?</p>
          </div>
          <div class="card__back">
            <p>{{randomCard?.name}}</p>
          </div>
        </div>
      </div>
    </div>

    <Modal v-model="modalVisible" @close="closeModal">
      <template #default="{close}">
        <div class="main-page__user text-center">
          <p class="main-page__user-title h2">Даришь подарок</p>
          <p class="main-page__user-name h2">{{formatName(randomCard?.name)}}</p>

          <button class="main-page__btn button"
                  type="button"
                  @click="close"
          >
            Супер)
          </button>
        </div>
      </template>
      <template #fox>
        <img class="modal__fox"
             :src="foxLick"
             height="512"
             width="512"
             alt=""
        />
      </template>
    </Modal>

    <Modal v-model="errorModalVisible" @close="closeErrorModal">
      <template #default="{close}">
        <div class="main-page__error text-center">

          <p class="text-w600">{{errorModalInfo.text1}}</p>
          <p class="text-w600">{{errorModalInfo.text2}}</p>

          <button class="main-page__btn button" @click="close">Понятно</button>
        </div>
      </template>

      <template #fox>
        <img class="modal__fox"
             :src="foxSad"
             height="512"
             width="512"
             alt=""
        />
      </template>
    </Modal>

    <Transition name="fade-scale">
      <Loading v-if="isLoading"/>
    </Transition>

  </div>

</template>