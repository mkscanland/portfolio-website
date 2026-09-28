import './assets/css/site.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { createApp } from 'vue'
import App from './App/App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
