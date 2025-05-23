<template>
    <section id="menu" class="py-20 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl mb-8 md:text-5xl text-center font-svn-avo-bold animate__animated animate__fadeInDown 
                   bg-gradient-to-r from-[#018ABE] via-[#018ABE]-200 to-[#018ABE] bg-clip-text text-transparent
                   drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] tracking-tight" data-aos="fade-up">MENU</h2>
        
        <!-- Loading indicator -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#018ABE]"></div>
        </div>
        
        <div v-else>
          <!-- Menu Categories -->
          <div class="mb-12" data-aos="fade-up" data-aos-delay="200">
            <div class="relative max-w-4xl mx-auto">
              <!-- Decorative background elements -->
              <div class="absolute inset-0 rounded-2xl transform -rotate-1"></div>
              <div class="absolute -left-4 -right-4 -top-4 -bottom-4 rounded-3xl transform rotate-1 blur-lg"></div>
              
              <!-- Interactive categories container -->
              <div class="relative flex flex-nowrap overflow-x-auto py-6 px-4 md:px-8 md:flex-wrap md:justify-center md:overflow-x-visible scrollbar-hide">
                <button v-for="category in categories" 
                        :key="category"
                        @click="selectCategory(category)"
                        class="group relative px-8 py-3.5 mx-2 mb-2 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-sm"
                        :class="{
                          'bg-[#018ABE] text-white shadow-md': selectedCategory === category,
                          'bg-white hover:bg-gray-50 text-gray-700': selectedCategory !== category
                        }">
                
                <!-- Category icon with animation -->
                <span class="absolute text-[#018ABE] left-3 top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:scale-125">
                  <i :class="[
                      {
                        'fas fa-utensils': category === 'Món chính',
                        'fas fa-coffee': category === 'Đồ uống',
                        'fas fa-leaf': category === 'Khai vị',
                        'fas fa-ice-cream': category === 'Tráng miệng'
                      }, 
                      selectedCategory === category ? 'text-white' : 'text-[#018ABE]',
                      'text-sm'
                    ]"></i>
                </span>
                
                <!-- Category name with transition effects -->
                <span class="font-svn-avo-bold transition-all duration-300 relative">
                  {{ category }}
                  <!-- Underline animation for selected category -->
                  <span v-if="selectedCategory === category" 
                        class="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/70 transform origin-left scale-x-100 transition-transform"></span>
                </span>
                
              </button>
            </div>
            
            <!-- Enhanced scroll indicators with gradients (only on mobile) -->
            <div class="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent md:hidden pointer-events-none"></div>
            <div class="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent md:hidden pointer-events-none"></div>
            
            <!-- Optional: Animation hint for mobile users -->
            <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 md:hidden">
              <span class="text-xs text-gray-400 flex items-center gap-1">
                <i class="fas fa-arrows-left-right text-gray-300 animate-pulse"></i>
                Vuốt để xem thêm
              </span>
            </div>
          </div>
        </div>
  
        <!-- Menu Items -->
        <MenuItems 
          :dishes="filteredDishes" 
          @open-add-to-cart-modal="openAddToCartModal" 
        />
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import MenuItems from '@/components/home/MenuItems.vue';
  
  // Props
  const props = defineProps({
    categories: {
      type: Array,
      required: true
    },
    selectedCategory: {
      type: String,
      required: true
    },
    dishes: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  });
  
  // Emits
  const emit = defineEmits(['update:selectedCategory', 'open-add-to-cart-modal']);
  
  // Computed properties
  const filteredDishes = computed(() => {
    return props.dishes.filter(dish => dish.category === props.selectedCategory);
  });
  
  // Methods
  const selectCategory = (category) => {
    emit('update:selectedCategory', category);
  };
  
  const openAddToCartModal = (dish) => {
    emit('open-add-to-cart-modal', dish);
  };
  </script>
  
  <style scoped>
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
  </style>