<template>
  <div>
    <Header 
      :menu-items="menuItems"
      :cart-item-count="cartItemCount"
      :current-table-number="currentTableNumber"
      @logout="logout"
      @toggle-cart="isCartOpen = !isCartOpen"
    />

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 transform -translate-x-full"
      enter-to-class="opacity-100 transform translate-x-0"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100 transform translate-x-0"
      leave-to-class="opacity-0 transform -translate-x-full"
    >
      <div v-if="isMobileMenuOpen" 
           class="fixed inset-0 z-50 overflow-y-auto bg-[#018ABE] md:hidden mobile-menu">
        <!-- Mobile menu content -->
        <div class="flex flex-col h-full">
          <div class="flex justify-between items-center p-4 border-b border-[#018ABE]">
            <h2 class="text-2xl font-svn-avo-bold text-white">Menu</h2>
            <button @click="isMobileMenuOpen = false" class="text-white hover:text-[#018ABE]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <nav class="flex-1 px-4 py-6">
            <a v-for="item in menuItems" 
               :key="item.href"
               :href="item.href"
               @click="isMobileMenuOpen = false"
               class="block py-2 text-lg text-white hover:text-[#018ABE] transition duration-300">
              {{ item.text }}
            </a>
          </nav>
        </div>
      </div>
    </Transition>

    <!-- Hero Section -->
    <HeroSection />

    <!-- Featured Dishes Section -->
    <FeaturedDishes 
      :featured-dishes="featuredDishes" 
      @open-add-to-cart-modal="openAddToCartModal" 
    />

    <!-- Menu Section - Now using component -->
    <MenuSection
      :categories="categories"
      v-model:selectedCategory="selectedCategory"
      :dishes="dishes"
      @open-add-to-cart-modal="openAddToCartModal"
    />

    <!-- Cart Sidebar -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 transform translate-x-full"
      enter-to-class="opacity-100 transform translate-x-0"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100 transform translate-x-0"
      leave-to-class="opacity-0 transform translate-x-full"
    >
      <div v-if="isCartOpen" 
           class="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-lg z-50">
        <div class="flex flex-col h-full">
          <div class="flex justify-between items-center p-4 border-b">
            <h3 class="text-lg font-svn-avo-bold">Giỏ hàng</h3>
            <button @click="isCartOpen = false" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-4">
            <div v-if="cart.length === 0" class="text-center text-gray-500 py-8">
              Giỏ hàng trống
            </div>
            <div v-else class="space-y-4">
              <div v-for="item in cart" :key="item.id" class="flex flex-col space-y-2">
                <div class="flex items-center space-x-4">
                  <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded">
                  <div class="flex-1">
                    <h4 class="font-svn-avo-bold">{{ item.name }}</h4>
                    <div class="flex items-center space-x-2">
                      <button @click="decreaseQuantity(item)" class="text-gray-500 hover:text-[#018ABE]">-</button>
                      <span>{{ item.quantity }}</span>
                      <button @click="increaseQuantity(item)" class="text-gray-500 hover:text-[#018ABE]">+</button>
                    </div>
                    <div class="text-[#018ABE]">{{ formatPrice(item.price * item.quantity) }}</div>
                    <div v-if="item.note" class="text-sm text-gray-500 mt-1">
                      Ghi chú: {{ item.note }}
                    </div>
                  </div>
                  <button @click="removeFromCart(item)" class="text-red-500 hover:text-red-700">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="border-t p-4">
            <div class="flex justify-between items-center mb-4">
              <span class="font-svn-avo-bold">Tổng cộng:</span>
              <span class="text-xl font-bold text-[#018ABE]">{{ formatPrice(total) }}</span>
            </div>
            <button @click="placeOrder" 
                    :disabled="cart.length === 0"
                    class="w-full bg-[#018ABE] text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-[#018ABE] transition duration-300">
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Add to Cart Modal -->
    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isAddToCartModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4">
          <!-- Backdrop with blur effect -->
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
          
          <!-- Modal Content -->
          <div class="relative bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl transform transition-all">
            <!-- Header Image -->
            <div v-if="selectedDish" class="relative h-48">
              <img :src="selectedDish.image" 
                   :alt="selectedDish.name" 
                   class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <!-- Close Button -->
              <button @click="closeAddToCartModal" 
                      class="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              
              <!-- Dish Name & Price -->
              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-xl font-svn-avo-bold text-white mb-1">{{ selectedDish.name }}</h3>
                <div class="text-white/90 text-sm">{{ selectedDish.description }}</div>
              </div>
            </div>

            <!-- Modal Body -->
            <div class="p-6 space-y-6">
              <!-- Price -->
              <div class="text-center">
                <span class="text-2xl font-svn-avo-bold text-[#018ABE]">
                  {{ formatPrice(selectedDish?.price || 0) }}
                </span>
              </div>

              <!-- Quantity Selector -->
              <div class="flex items-center justify-center">
                <div class="flex items-center space-x-4 bg-gray-50 px-4 py-2 rounded-full">
                  <button @click="orderQuantity > 1 && orderQuantity--"
                          class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                    <i class="fas fa-minus text-sm"></i>
                  </button>
                  <span class="w-8 text-center font-svn-avo-bold">{{ orderQuantity }}</span>
                  <button @click="orderQuantity++"
                          class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                    <i class="fas fa-plus text-sm"></i>
                  </button>
                </div>
              </div>

              <!-- Special Notes -->
              <div class="space-y-2">
                <label class="block text-sm font-svn-avo-bold text-gray-700">
                  Ghi chú đặc biệt
                </label>
                <div class="relative">
                  <textarea 
                    v-model="orderNote"
                    rows="2"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#018ABE] focus:border-transparent resize-none text-sm"
                    placeholder="VD: Không hành, ít cay..."
                  ></textarea>
                  <div class="absolute bottom-3 right-3 text-xs text-gray-400">
                    {{ orderNote.length }}/100
                  </div>
                </div>
              </div>

              <!-- Total Price -->
              <div class="flex justify-between items-center py-3 border-t border-gray-100">
                <span class="text-gray-600">Tổng cộng</span>
                <span class="text-xl font-svn-avo-bold text-[#018ABE]">
                  {{ formatPrice((selectedDish?.price || 0) * orderQuantity) }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <button @click="closeAddToCartModal"
                        class="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                  Hủy
                </button>
                <button @click="confirmAddToCart"
                        class="flex-1 px-4 py-3 bg-[#018ABE] text-white rounded-xl hover:bg-[#018ABE] transition-colors
                               flex items-center justify-center gap-2">
                  <i class="fas fa-cart-plus"></i>
                  <span>Thêm vào giỏ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import AOS from 'aos';
import { tsParticles } from "tsparticles-engine";
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
import { useAuthStore } from '@/store/auth';
import Header from '@/components/Header.vue'; 
import HeroSection from '@/components/HeroSection.vue';
import FeaturedDishes from '@/components/FeaturedDishes.vue';
import MenuSection from '@/components/MenuSection.vue';

// Auth State
const isAuthMenuOpen = ref(false)
const isLoggedIn = ref(false)
const user = ref(null)
const showPassword = ref(false)

const loginForm = ref({
  username: '',
  password: '',
  remember: false
})

const loginErrors = ref({
  1: '',
  password: ''
})

const authMenuRef = ref(null)
onClickOutside(authMenuRef, () => {
  isAuthMenuOpen.value = false
})

// Auth Methods
const closeLoginModal = () => {
  isLoginModalOpen.value = false
}

const validateLoginForm = () => {
  const errors = { email: '', password: '' }
  
  if (!loginForm.value.password) {
    errors.password = 'Mật khẩu là bắt buộc'
  } else if (loginForm.value.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
  }

  loginErrors.value = errors
  return !errors.email && !errors.password
}

const authStore = useAuthStore()

const logout = () => {
  authStore.logout() // Sẽ tự động chuyển hướng về trang login (đã setup trong auth store)
}

// Existing state
const scrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isCartOpen = ref(false)
const isAddToCartModalOpen = ref(false)
const selectedCategory = ref('Khai vị')
const selectedDish = ref(null)
const cart = ref([])
const orderNote = ref('')
const orderQuantity = ref(1)

// Menu items
const menuItems = [
  { href: '#hero', text: 'Trang chủ' },
  { href: '#featured-dishes', text: 'Món Nổi bật' },
  { href: '#menu', text: 'Thực đơn' },

]

// Data
const categories = ['Khai vị', 'Món chính', 'Tráng miệng', 'Đồ uống']
const dishes = [
  {
    id: 1,
    name: 'Phở Bò Đặc Biệt',
    description: 'Phở bò truyền thống với các loại thịt bò chọn lọc',
    price: 89000,
    category: 'Món chính',
    image: '/images/pho-bo.jpg'
  },
  {
    id: 2,
    name: 'Gỏi Cuốn Tôm Thịt',
    description: 'Gỏi cuốn tươi với tôm, thịt và rau herbs',
    price: 55000,
    category: 'Khai vị',
    image: '/images/goi-cuon.jpg'
  },
  {
    id: 3,
    name: 'Chè Trôi Nước',
    description: 'Chè trôi nước truyền thống với nhân đậu xanh',
    price: 35000,
    category: 'Tráng miệng',
    image: '/images/che-troi-nuoc.jpg'
  },
  // Thêm nhiều món ăn khác...
]
const featuredDishes = dishes.slice(0, 6) // Lấy 6 món đầu tiên làm món nổi bật

// Computed
const cartItemCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0)
})

const filteredDishes = computed(() => {
  return dishes.filter(dish => dish.category === selectedCategory.value)
})

const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(price)
}

const addToCart = (dish) => {
  const existingItem = cart.value.find(item => item.id === dish.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({ ...dish, quantity: 1 })
  }
}

// Additional state
const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

// Additional methods
const openAddToCartModal = (dish) => {
  selectedDish.value = dish
  orderNote.value = ''
  orderQuantity.value = 1
  isAddToCartModalOpen.value = true
}

const closeAddToCartModal = () => {
  selectedDish.value = null
  orderNote.value = ''
  orderQuantity.value = 1
  isAddToCartModalOpen.value = false
}

const confirmAddToCart = () => {
  if (selectedDish.value) {
    const item = {
      ...selectedDish.value,
      quantity: orderQuantity.value,
      note: orderNote.value.trim()
    }
    
    const existingItem = cart.value.find(i => 
      i.id === item.id && i.note === item.note
    )
    
    if (existingItem) {
      existingItem.quantity += orderQuantity.value
    } else {
      cart.value.push(item)
    }
    
    closeAddToCartModal()
  }
}

const increaseQuantity = (item) => {
  item.quantity++
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  } else {
    removeFromCart(item)
  }
}

const removeFromCart = (item) => {
  const index = cart.value.findIndex(cartItem => cartItem.id === item.id)
  if (index !== -1) {
    cart.value.splice(index, 1)
  }
}

const placeOrder = async () => {
  try {
    // Implement your order API call here
    await submitOrder(cart.value)
    cart.value = []
    isCartOpen.value = false
    alert('Đặt hàng thành công!')
  } catch (error) {
    alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!')
  }
}

const submitContact = async () => {
  try {
    // Implement your contact form API call here
    await sendContactForm(contactForm.value)
    contactForm.value = { name: '', email: '', message: '' }
    alert('Gửi tin nhắn thành công!')
  } catch (error) {
    alert('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại!')
  }
}

// Mock API functions (replace with real API calls)
const submitOrder = async (orderItems) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000)
  })
}

const sendContactForm = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000)
  })
}

// Initialize AOS and Swiper on component mount
const router = useRouter()

onMounted(async () => {
  // const token = localStorage.getItem('token')
  // if (!token) {
  //   router.push('/login')
  // }

  AOS.init({
    duration: 1000,
    once: true
  })
  
  new Swiper('.swiper-container', {
    loop: featuredDishes.length > 3, // Only enable loop if enough slides
    slidesPerView: 1,
    slidesPerGroup: 1,
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  })

  // Scroll handler
  window.addEventListener('scroll', () => {
    scrolled.value = window.pageYOffset > 20
  })

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (isMobileMenuOpen.value && 
        !e.target.closest('.mobile-menu') && 
        !e.target.closest('button')) {
      isMobileMenuOpen.value = false
    }
  })

  // Initialize particles
  await tsParticles.load("tsparticles", particlesOptions)

  // Check if table is already opened (you can get this from your store or API)
  const existingTableNumber = localStorage.getItem('currentTableNumber')
  if (existingTableNumber) {
    currentTableNumber.value = existingTableNumber
    showNewOrderModal.value = false
  }
})

// Particles setup
const particlesInit = async (engine) => {
  const { loadFull } = await import("tsparticles")
  await loadFull(engine)
}

const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container)
}

const particlesOptions = {
  fullScreen: {
    enable: false
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
    links: {
      enable: true,
      color: "#ffffff",
      distance: 150
    },
    move: {
      enable: true,
      speed: 2
    }
  }
}

const closeAuthMenu = () => {
  isAuthMenuOpen.value = false
}

// Modify existing methods
const openLoginModal = () => {
  isAuthMenuOpen.value = false
  isLoginModalOpen.value = true
  loginForm.value = { username: '', password: '', remember: false }
  loginErrors.value = { username: '', password: '' }
}

const openRegisterModal = () => {
  isAuthMenuOpen.value = false
  // Implement register modal logic
}

const switchToRegister = () => {
  closeLoginModal()
  // Implement register modal logic here  
}

// Thêm các ref mới
const showNewOrderModal = ref(true) // Hiển thị modal khi vào trang
const currentTableNumber = ref(null)
const newOrder = ref({
  tableNumber: '',
  guestCount: ''
})

// Thêm các methods mới
const closeNewOrderModal = () => {
  showNewOrderModal.value = false
}

const handleCreateOrder = () => {
  // Validate input
  if (!newOrder.value.tableNumber || !newOrder.value.guestCount) {
    return
  }

  // Set current table number
  currentTableNumber.value = newOrder.value.tableNumber

  // Create new order logic here
  // You can call your API or store the order data

  // Reset form and close modal
  newOrder.value = {
    tableNumber: '',
    guestCount: ''
  }
  showNewOrderModal.value = false
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap');



.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.font-playfair {
  font-family: 'Playfair Display', serif;
}

.hero-image {
  background-image: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.menu-item-image {
  transition: transform 0.3s ease-in-out;
}

.menu-item:hover .menu-item-image {
  transform: scale(1.05);
}

/* Add responsive styles */
@media (max-width: 640px) {
  .hero-image {
    background-position: center 25%;
  }
}

/* Gradient Animations */
.gradient-text {
  background: linear-gradient(90deg, #018ABE, #72a8c5, #52b3d6);
  background-size: 200% auto;
  animation: gradient 3s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Card Hover Effects */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #018ABE;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #018ABE;
}
</style>


<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

:root {
  --color-primary: #018ABE;
  --color-primary-light: #02A1DB;
  --color-primary-dark: #016D94;
}


.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

textarea {
  min-height: 60px;
  max-height: 120px;
}

textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #0018AB;
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 1.2rem;
}

:deep(.swiper-pagination-bullet) {
  background: theme('colors.blue.400');
}

:deep(.swiper-pagination-bullet-active) {
  background: theme('colors.blue.400');
}

/* Glass Morphism */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
