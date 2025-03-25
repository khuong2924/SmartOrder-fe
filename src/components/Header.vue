<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="{
      'bg-primary/95 shadow-lg': scrolled,
      'bg-transparent': !scrolled
    }"
  >
    <div class="absolute inset-0 overflow-hidden" v-if="scrolled">
      <div class="absolute inset-0 bg-primary/90 backdrop-blur-md"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary-dark/90"></div>
    </div>
    
    <nav class="container mx-auto px-6 py-3 relative">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <a href="#" class="flex text-[#018ABE] items-center space-x-3 group">
          <div class="flex flex-col">
            <span class="text-3xl font-bold tracking-wider text-white">
              Smart Order
            </span>
          </div>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex font-medium items-center space-x-6">
          <!-- Menu Items -->
          <a 
            v-for="item in menuItems" 
            :key="item.href" 
            :href="item.href"
            class="relative py-2 px-1 text-white/90 hover:text-[#018ABE] transition-colors duration-300 group"
          >
            <span class="relative z-10">{{ item.text }}</span>
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-white/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </a>
        </div>

        <!-- Right Section: Table Number, Cart & Mobile Menu -->
        <div class="flex items-center space-x-4">
          <!-- Table Number Badge -->
          <div 
            v-if="currentTableNumber" 
            class="bg-white/15 backdrop-blur-md px-4 py-2 rounded-full flex items-center shadow-lg"
          >
            <i class="fas fa-table text-white/90 mr-2"></i>
            <span class="text-white font-medium">
              Bàn {{ currentTableNumber }}
            </span>
          </div>

          <!-- Auth Button -->
          <button 
            @click="logout"
            class="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 bg-white/10 hover:bg-white/20 group"
          >
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-primary-light to-primary flex items-center justify-center">
              <i class="fas fa-sign-out-alt text-white"></i>
            </div>
            <span class="text-white/90 group-hover:text-white">Đăng xuất</span>
          </button>

          <!-- Cart Button -->
          <button 
            @click="toggleCart"
            class="relative group p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
          >
            <svg 
              class="w-6 h-6 text-white"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span 
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full transform scale-100 transition-transform duration-300 animate-pulse"
            >
              {{ cartItemCount }}
            </span>
          </button>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
          >
            <svg 
              class="w-6 h-6 text-white"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                v-if="!isMobileMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu (Slide Down) -->
      <div 
        v-if="isMobileMenuOpen"
        class="md:hidden absolute left-0 right-0 top-full bg-primary/95 backdrop-blur-md shadow-lg rounded-b-xl overflow-hidden transition-all duration-300 transform origin-top"
        :class="{'scale-y-100 opacity-100': isMobileMenuOpen, 'scale-y-0 opacity-0': !isMobileMenuOpen}"
      >
        <div class="px-6 py-4 space-y-3">
          <a 
            v-for="item in menuItems" 
            :key="item.href" 
            :href="item.href"
            class="block py-2 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            {{ item.text }}
          </a>
          <button 
            @click="logout"
            class="w-full flex items-center space-x-2 p-4 rounded-lg transition-all duration-200 bg-white/10 hover:bg-white/20"
          >
            <i class="fas fa-sign-out-alt text-white/90"></i>
            <span class="text-white/90">Đăng xuất</span>
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
         class="fixed inset-0 z-50 overflow-y-auto bg-[#018ABE] md:hidden mobile-menu">
      <!-- Mobile menu content -->
      <div class="flex flex-col h-full">
        <div class="flex justify-between items-center p-4 border-b border-[#018ABE]">
          <h2 class="text-2xl font-svn-avo-bold text-white">Menu</h2>
          <button @click="toggleMobileMenu" class="text-white hover:text-[#018ABE]">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <nav class="flex-1 px-4 py-6">
          <a v-for="item in menuItems" 
             :key="item.href"
             :href="item.href"
             @click="toggleMobileMenu"
             class="block py-2 text-lg text-white hover:text-[#018ABE] transition duration-300">
            {{ item.text }}
          </a>
        </nav>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';

// Props
const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  },
  cartItemCount: {
    type: Number,
    default: 0
  },
  currentTableNumber: {
    type: [String, Number],
    default: null
  }
});

// Emits
const emit = defineEmits(['logout', 'toggle-cart']);

// State
const scrolled = ref(false);
const isMobileMenuOpen = ref(false);
const authStore = useAuthStore();

// Methods
const logout = () => {
  emit('logout');
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleCart = () => {
  emit('toggle-cart');
};

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.pageYOffset > 20;
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (isMobileMenuOpen.value && 
        !e.target.closest('.mobile-menu') && 
        !e.target.closest('button')) {
      isMobileMenuOpen.value = false;
    }
  });
});
</script>

<style scoped>
/* Glass Morphism */
.backdrop-blur-md {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Any additional styles specific to header */
</style>