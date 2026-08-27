import { createApp } from "vue"
import App from "./App.vue"
import "./style.css"
import PrimeVue from "primevue/config"
import Tooltip from "primevue/tooltip"
import { createPinia } from "pinia"
import ConfirmationService from "primevue/confirmationservice"
import "primevue/resources/themes/lara-light-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

const pinia = createPinia()
const app = createApp(App)

app.use(PrimeVue)
app.use(pinia)
app.use(ConfirmationService)
app.directive("tooltip", Tooltip)
app.mount("#app")
