import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { LibConfig } from 'tsv2-library'

const app = createApp(App)

app.use(router)
app.use(LibConfig)

app.mount('#app')
