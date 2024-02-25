import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { mockServer } from './mock/server'

const server = mockServer({ environment: 'development' });

await server.start();

const app = createApp(App)

app.use(router)

app.mount('#app')
