import { createApp } from 'vue'
import {createPinia} from "pinia";
import App from '@/App.vue'
import {router} from "@/router.ts";

import '@/assets/styles/tailwind.css'
import '@/assets/styles/main.scss'

import {UserGift} from "@/types/user.ts";

import {UserService} from "@api/users/UserService.ts";

const app = createApp(App)

const check = async () => {
    try {
        const giftFor: UserGift | null = JSON.parse(localStorage.getItem("gift-for") ?? 'null')
        if (!giftFor) {
            await router.replace('/')
            return
        }

        const response = await UserService.checkUser(giftFor.id)
        await router.replace(response[0]?.isChosen ? '/result' : '/')
    } catch {
        localStorage.clear()
        await router.replace('/')
    }
}

app.use(createPinia())
app.use(router)

await check()

await router.isReady()
app.mount('#app')
