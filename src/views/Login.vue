<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Decorative circles -->
    <div class="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 opacity-50 blur-3xl"></div>
    <div class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-pink-200 to-indigo-200 opacity-50 blur-3xl"></div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <div class="flex justify-center">
        <div class="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
          <i class="fas fa-utensils text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"></i>
        </div>
      </div>
      
      <h2 class="mt-6 text-center text-3xl font-utm-avo-bold text-gray-900">
        Login
      </h2>
      
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white/80 py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 transform transition-all duration-300">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- Username field -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <div class="mt-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-400"></i>
              </div>
              <input 
                id="username" 
                v-model="loginForm.username"
                type="text" 
                required
                class="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                :class="{'border-red-500 ring-red-500': loginErrors.username}"
                placeholder="Nhập tên đăng nhập"
              >
              <p v-if="loginErrors.username" class="mt-2 text-sm text-red-600 flex items-center">
                <i class="fas fa-exclamation-circle mr-1"></i>
                {{ loginErrors.username }}
              </p>
            </div>
          </div>

          <!-- Password field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <div class="mt-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input 
                id="password" 
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                :class="{'border-red-500 ring-red-500': loginErrors.password}"
                placeholder="Nhập mật khẩu"
              >
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <i 
                  class="fas text-gray-400 hover:text-gray-600" 
                  :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                ></i>
              </button>
              <p v-if="loginErrors.password" class="mt-2 text-sm text-red-600 flex items-center">
                <i class="fas fa-exclamation-circle mr-1"></i>
                {{ loginErrors.password }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input 
                id="remember-me" 
                type="checkbox"
                v-model="loginForm.remember"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Quên mật khẩu?
              </a>
            </div>
          </div>

          <div>
            <button 
              type="submit"
              class="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-[1.02] transition-all duration-300"
            >
              <i class="fas fa-sign-in-alt mr-2"></i>
              Đăng nhập
            </button>
          </div>
        </form>


        <!-- Register Link -->
        <!-- <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Chưa có tài khoản? 
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              Đăng ký ngay
            </a>
          </p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const loginForm = ref({
  username: '',
  password: '',
  remember: false
})

const loginErrors = ref({
  username: '',
  password: ''
})

const showPassword = ref(false)

// Kiểm tra đăng nhập khi component được mount
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    router.push('/')
  }
})

const validateLoginForm = () => {
  const errors = { username: '', password: '' }
  
  if (!loginForm.value.username) {
    errors.username = 'Tên đăng nhập là bắt buộc'
  }

  if (!loginForm.value.password) {
    errors.password = 'Mật khẩu là bắt buộc'
  } else if (loginForm.value.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
  }

  loginErrors.value = errors
  return !errors.username && !errors.password
}

const handleLogin = async () => {
  if (validateLoginForm()) {
    try {
      const response = await axios.post('http://localhost:8081/auth/signin', {
        username: loginForm.value.username,
        password: loginForm.value.password
      })
      
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
      
      // Chuyển hướng đến trang danh sách bàn sau khi đăng nhập thành công
      router.push('/tables')
      
    } catch (error) {
      if (error.response) {
        loginErrors.value.username = error.response.data.message || 'Đăng nhập thất bại. Vui lòng thử lại!'
      } else {
        loginErrors.value.username = 'Không thể kết nối đến server. Vui lòng thử lại sau!'
      }
    }
  }
}
</script>

<style scoped>
/* Add smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Add animation for form inputs */
input, button {
  transition: all 0.3s ease;
}

/* Add hover effect for social buttons */
.social-button {
  transition: transform 0.3s ease;
}

.social-button:hover {
  transform: translateY(-2px);
}

/* Add custom box shadow for form container */
.form-container {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
</style>