<template>
  <div>
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            :class="{'bg-gradient-to-r from-indigo-900/95 to-purple-900/95 shadow-lg': scrolled,
                    'bg-transparent': !scrolled}">
      <nav class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <a href="#" class="flex items-center space-x-3 group">
            <i class="fas fa-utensils text-2xl transition-all duration-300"
               :class="{'text-white transform rotate-12': scrolled, 
                       'text-white/90 group-hover:text-white': !scrolled}"></i>
            <span class="text-2xl font-bold font-playfair tracking-wider transition-all duration-300"
                  :class="{'text-white': scrolled,
                          'text-white/90 group-hover:text-white': !scrolled}">
              Nhà hàng Ngon
            </span>
          </a>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-8">
            <a v-for="item in menuItems"
               :key="item.href"
               :href="item.href"
               class="relative overflow-hidden group py-2"
               :class="{'text-white/80 hover:text-white': scrolled,
                       'text-white/70 hover:text-white': !scrolled}">
              <span class="relative z-10">{{ item.text }}</span>
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
          </div>

          <!-- Cart & Mobile Menu Buttons -->
          <div class="flex items-center space-x-6">
            <button @click="isCartOpen = !isCartOpen"
                    class="relative group">
              <svg class="w-6 h-6 transition-all duration-300"
                   :class="{'text-white/80 group-hover:text-white': scrolled,
                           'text-white/70 group-hover:text-white': !scrolled}"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span v-if="cartItemCount > 0"
                    class="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full transform scale-100 transition-transform duration-300">
                {{ cartItemCount }}
              </span>
            </button>

            <button @click="isMobileMenuOpen = !isMobileMenuOpen"
                    class="md:hidden group">
              <svg class="w-6 h-6 transition-all duration-300"
                   :class="{'text-white/80 group-hover:text-white': scrolled,
                           'text-white/70 group-hover:text-white': !scrolled}"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>

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
           class="fixed inset-0 z-50 overflow-y-auto bg-indigo-600 md:hidden mobile-menu">
        <!-- Mobile menu content -->
        <div class="flex flex-col h-full">
          <div class="flex justify-between items-center p-4 border-b border-indigo-500">
            <h2 class="text-2xl font-bold text-white">Menu</h2>
            <button @click="isMobileMenuOpen = false" class="text-white hover:text-indigo-200">
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
               class="block py-2 text-lg text-white hover:text-indigo-200 transition duration-300">
              {{ item.text }}
            </a>
          </nav>
        </div>
      </div>
    </Transition>

    <!-- Hero Section -->
    <section id="hero" class="hero-image h-screen flex items-center justify-center text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      <div id="tsparticles" class="absolute inset-0"></div>
      <div class="relative z-10 text-center">
        <h1 class="text-6xl md:text-7xl font-bold mb-4 animate__animated animate__fadeInDown 
                   bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
          Nhà hàng Ngon
        </h1>
        <p class="text-xl md:text-2xl mb-8 animate__animated animate__fadeInUp animate__delay-1s">
          Hương vị truyền thống - Không gian hiện đại
        </p>
        <a href="#menu" 
           class="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition duration-300 animate__animated animate__fadeInUp animate__delay-2s">
          Xem Thực đơn
        </a>
      </div>
    </section>

    <!-- Featured Dishes Section -->
    <section id="featured" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12" data-aos="fade-up">Món Nổi bật</h2>
        <div class="swiper-container" data-aos="fade-up" data-aos-delay="200">
          <div class="swiper-wrapper">
            <div v-for="dish in featuredDishes" 
                 :key="dish.id" 
                 class="swiper-slide">
              <div class="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div class="relative overflow-hidden group">
                  <img :src="dish.image" 
                       :alt="dish.name" 
                       class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-all duration-300 
                              flex items-center justify-center">
                    <button @click="openAddToCartModal(dish)" 
                            class="bg-white/90 text-indigo-600 px-6 py-3 rounded-full 
                                   hover:bg-indigo-600 hover:text-white transition duration-300 
                                   transform hover:scale-105 flex items-center gap-2">
                      <i class="fas fa-cart-plus"></i>
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="text-2xl font-bold mb-2">{{ dish.name }}</h3>
                  <p class="text-gray-600 mb-4">{{ dish.description }}</p>
                  <div class="flex justify-between items-center">
                    <span class="text-indigo-600 font-bold text-xl">{{ formatPrice(dish.price) }}</span>
                    <button @click="openAddToCartModal(dish)" 
                            class="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>
    </section>

    <!-- Menu Section -->
    <section id="menu" class="py-20 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12" data-aos="fade-up">Thực đơn</h2>
        <!-- Menu Categories -->
        <div class="mb-12" data-aos="fade-up" data-aos-delay="200">
          <div class="relative max-w-4xl mx-auto">
            <!-- Background decoration -->
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded-2xl transform -rotate-1"></div>
            
            <!-- Categories container -->
            <div class="relative flex flex-nowrap overflow-x-auto py-6 px-4 md:px-8 md:flex-wrap md:justify-center md:overflow-x-visible scrollbar-hide">
              <button v-for="category in categories" 
                      :key="category"
                      @click="selectedCategory = category"
                      class="group relative px-8 py-3 mx-2 mb-2 rounded-xl transition-all duration-300 transform hover:scale-105"
                      :class="{
                        'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg': selectedCategory === category,
                        'bg-white hover:bg-gray-50 text-gray-700': selectedCategory !== category
                      }">
                <!-- Icon (you can add different icons for each category) -->
                <span class="absolute left-3 top-1/2 -translate-y-1/2">
                  <i :class="{
                    'fas fa-utensils': category === 'Món chính',
                    'fas fa-coffee': category === 'Đồ uống',
                    'fas fa-leaf': category === 'Khai vị',
                    'fas fa-ice-cream': category === 'Tráng miệng'
                  }" class="text-sm"></i>
                </span>
                
                <!-- Category name -->
                <span class="font-medium">{{ category }}</span>
                
                <!-- Active indicator -->
                <span v-if="selectedCategory === category" 
                      class="absolute -bottom-1 left-1/2 w-12 h-1 bg-white rounded-full transform -translate-x-1/2
                             shadow-lg animate-pulse"></span>
              </button>
            </div>
            
            <!-- Scroll indicators (only on mobile) -->
            <div class="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent md:hidden"></div>
            <div class="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent md:hidden"></div>
          </div>
          
          <!-- Category description -->
          <div class="text-center mt-6 text-gray-600 animate__animated animate__fadeIn">
            <p v-if="selectedCategory === 'Món chính'">
              Các món ăn chính đặc trưng của nhà hàng
            </p>
            <p v-else-if="selectedCategory === 'Khai vị'">
              Khai vị đa dạng để mở đầu bữa ăn
            </p>
            <p v-else-if="selectedCategory === 'Tráng miệng'">
              Tráng miệng ngọt ngào để kết thúc hoàn hảo
            </p>
            <p v-else-if="selectedCategory === 'Đồ uống'">
              Đồ uống phong phú và độc đáo
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="dish in filteredDishes" 
               :key="dish.id"
               class="bg-white rounded-lg shadow-lg overflow-hidden"
               data-aos="fade-up">
            <img :src="dish.image" :alt="dish.name" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ dish.name }}</h3>
              <p class="text-gray-600 mb-4">{{ dish.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-indigo-600 font-bold">{{ formatPrice(dish.price) }}</span>
                <button @click="openAddToCartModal(dish)" 
                        class="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12" data-aos="fade-up">Liên Hệ</h2>
        <div class="max-w-3xl mx-auto">
          <form @submit.prevent="submitContact" class="space-y-6" data-aos="fade-up">
            <div>
              <label class="block text-gray-700 mb-2">Họ và tên</label>
              <input v-model="contactForm.name" type="text" required
                     class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-gray-700 mb-2">Email</label>
              <input v-model="contactForm.email" type="email" required
                     class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
            </div>
            <div>
              <label class="block text-gray-700 mb-2">Tin nhắn</label>
              <textarea v-model="contactForm.message" required rows="4"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>
            <button type="submit" 
                    class="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </section>

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
            <h3 class="text-lg font-bold">Giỏ hàng</h3>
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
                    <h4 class="font-bold">{{ item.name }}</h4>
                    <div class="flex items-center space-x-2">
                      <button @click="decreaseQuantity(item)" class="text-gray-500 hover:text-indigo-600">-</button>
                      <span>{{ item.quantity }}</span>
                      <button @click="increaseQuantity(item)" class="text-gray-500 hover:text-indigo-600">+</button>
                    </div>
                    <div class="text-indigo-600">{{ formatPrice(item.price * item.quantity) }}</div>
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
              <span class="font-bold">Tổng cộng:</span>
              <span class="text-xl font-bold text-indigo-600">{{ formatPrice(total) }}</span>
            </div>
            <button @click="placeOrder" 
                    :disabled="cart.length === 0"
                    class="w-full bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-indigo-700 transition duration-300">
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
                <h3 class="text-xl font-bold text-white mb-1">{{ selectedDish.name }}</h3>
                <div class="text-white/90 text-sm">{{ selectedDish.description }}</div>
              </div>
            </div>

            <!-- Modal Body -->
            <div class="p-6 space-y-6">
              <!-- Price -->
              <div class="text-center">
                <span class="text-2xl font-bold text-indigo-600">
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
                  <span class="w-8 text-center font-medium">{{ orderQuantity }}</span>
                  <button @click="orderQuantity++"
                          class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                    <i class="fas fa-plus text-sm"></i>
                  </button>
                </div>
              </div>

              <!-- Special Notes -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  Ghi chú đặc biệt
                </label>
                <div class="relative">
                  <textarea 
                    v-model="orderNote"
                    rows="2"
                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
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
                <span class="text-xl font-bold text-indigo-600">
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
                        class="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors
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
import { ref, onMounted, computed, defineComponent } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'
import { tsParticles } from "tsparticles-engine"

// State
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
  { href: '#featured', text: 'Món Nổi bật' },
  { href: '#menu', text: 'Thực đơn' },
  { href: '#contact', text: 'Liên hệ' }
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
onMounted(async () => {
  AOS.init({
    duration: 1000,
    once: true
  })
  
  new Swiper('.swiper-container', {
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
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

h1, h2, h3 {
  font-family: 'Playfair Display', serif;
}

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
  background: linear-gradient(90deg, #4f46e5, #7c3aed, #4f46e5);
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
  background: #4f46e5;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4338ca;
}
</style>


<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
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
</style>
