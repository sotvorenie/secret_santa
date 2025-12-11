import { createApp } from 'vue'
import {createPinia} from "pinia";
import App from './App.vue'
import {soundDirective} from "./directioves/sound.js";

const app = createApp(App)

app.use(createPinia())
app.directive('sound', soundDirective)
app.mount('#app')
