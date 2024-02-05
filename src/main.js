import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// // 导入pinia持久化插件
// import persist from 'pinia-plugin-persistedstate'
import pinia from './stores/index'
import '@/assets/main.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(createPinia().use(persist))
app.use(pinia) // pinia独立维护
app.use(router)
app.mount('#app')
