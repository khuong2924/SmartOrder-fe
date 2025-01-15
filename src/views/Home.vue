<template>
  <div>
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md transition-all duration-300" 
            :class="{'bg-opacity-100': scrolled}">
      <nav class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <a href="#" class="text-2xl font-bold text-indigo-600">Nhà hàng Ngon</a>
          <div class="hidden md:flex space-x-4">
            <a v-for="item in menuItems" 
               :key="item.href"
               :href="item.href" 
               class="text-gray-700 hover:text-indigo-600 transition duration-300">
              {{ item.text }}
            </a>
          </div>
          <div class="flex items-center">
            <button @click="isCartOpen = !isCartOpen" 
                    class="relative p-2 text-gray-700 hover:text-indigo-600 transition duration-300 cart-bubble">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span v-if="cartItemCount > 0" 
                    class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
                {{ cartItemCount }}
              </span>
            </button>
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="ml-4 md:hidden">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
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
    <section id="hero" class="hero-image h-screen flex items-center justify-center text-white relative">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative z-10 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-4 animate__animated animate__fadeInDown">Nhà hàng Ngon</h1>
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
              <div class="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <div class="relative overflow-hidden group">
                  <img :src="dish.image" 
                       :alt="dish.name" 
                       class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110">
                  <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <button @click="openAddToCartModal(dish)" 
                            class="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 transition duration-300 transform hover:scale-105">
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
        <div class="mb-12" data-aos="fade-up" data-aos-delay="200">
          <div class="flex flex-nowrap overflow-x-auto pb-4 md:flex-wrap md:justify-center md:overflow-x-visible scrollbar-hide">
            <button v-for="category in categories" 
                    :key="category"
                    @click="selectedCategory = category"
                    :class="{
                      'bg-indigo-600 text-white': selectedCategory === category,
                      'bg-white text-indigo-600': selectedCategory !== category,
                      'mr-2 mb-2 md:mr-4': true
                    }"
                    class="px-6 py-2 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 whitespace-nowrap">
              {{ category }}
            </button>
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
                        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">
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
              <div v-for="item in cart" :key="item.id" class="flex items-center space-x-4">
                <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                  <h4 class="font-bold">{{ item.name }}</h4>
                  <div class="flex items-center space-x-2">
                    <button @click="decreaseQuantity(item)" class="text-gray-500 hover:text-indigo-600">-</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="increaseQuantity(item)" class="text-gray-500 hover:text-indigo-600">+</button>
                  </div>
                  <div class="text-indigo-600">{{ formatPrice(item.price * item.quantity) }}</div>
                </div>
                <button @click="removeFromCart(item)" class="text-red-500 hover:text-red-700">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
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
          <div class="fixed inset-0 bg-black opacity-50"></div>
          <div class="relative bg-white rounded-lg max-w-md w-full p-6">
            <div class="text-center">
              <h3 class="text-lg font-bold mb-4">Thêm vào giỏ hàng</h3>
              <div v-if="selectedDish" class="mb-4">
                <img :src="selectedDish.image" :alt="selectedDish.name" class="w-full h-48 object-cover rounded mb-4">
                <h4 class="font-bold">{{ selectedDish.name }}</h4>
                <p class="text-gray-600">{{ selectedDish.description }}</p>
                <div class="text-indigo-600 font-bold mt-2">{{ formatPrice(selectedDish.price) }}</div>
              </div>
              <div class="flex justify-end space-x-4">
                <button @click="closeAddToCartModal" 
                        class="px-4 py-2 border rounded hover:bg-gray-100 transition duration-300">
                  Hủy
                </button>
                <button @click="confirmAddToCart" 
                        class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300">
                  Thêm vào giỏ
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
import { ref, onMounted, computed } from 'vue'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'

// State
const scrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isCartOpen = ref(false)
const isAddToCartModalOpen = ref(false)
const selectedCategory = ref('Khai vị')
const selectedDish = ref(null)
const cart = ref([])

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
  isAddToCartModalOpen.value = true
}

const closeAddToCartModal = () => {
  selectedDish.value = null
  isAddToCartModalOpen.value = false
}

const confirmAddToCart = () => {
  if (selectedDish.value) {
    addToCart(selectedDish.value)
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
onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true
  })
  
  new Swiper('.swiper-container', {
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
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

h1, h2, h3 {
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
</style>
