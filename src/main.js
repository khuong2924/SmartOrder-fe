import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './store/auth'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'aos/dist/aos.css'
import 'animate.css'


const app = createApp(App)
const pinia = createPinia()


app.use(pinia)
app.use(router)

// Khởi tạo store và kiểm tra auth status trước khi mount app
const authStore = useAuthStore()
authStore.checkAuth()

app.mount('#app')