import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './store/auth'
import '@fortawesome/fontawesome-free/css/all.min.css'


const app = createApp(App)
const pinia = createPinia()


app.use(pinia)
app.use(router)

// Khởi tạo store và kiểm tra auth status trước khi mount app
const authStore = useAuthStore()
authStore.checkAuth()

app.mount('#app')