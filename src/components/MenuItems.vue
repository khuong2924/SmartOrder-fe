<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div v-for="dish in dishes" 
         :key="dish.id"
         class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
         data-aos="fade-up">
      <!-- Image Container -->
      <div class="relative h-64 overflow-hidden">
        <img :src="dish.image" 
             :alt="dish.name" 
             class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
        
        <!-- Price Badge - Always visible -->
        <div class="absolute top-4 right-4 bg-white/95 text-[#018ABE] px-4 py-2 rounded-full 
                    font-bold shadow-lg backdrop-blur-sm transform group-hover:scale-110 transition-all duration-300">
          {{ formatPrice(dish.price) }}
        </div>
        
        <!-- Overlay with Quick Actions -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    flex flex-col justify-end p-6">
          <button @click="openAddToCartModal(dish)"
                  class="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white 
                         px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-700 
                         transform hover:scale-105 transition-all duration-300
                         flex items-center justify-center gap-2 shadow-lg">
            <i class="fas fa-cart-plus"></i>
            Thêm vào giỏ
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6">
        <!-- Title & Description -->
        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xl font-svn-avo-bold group-hover:text-[#018ABE] transition-colors line-clamp-1">
              {{ dish.name }}
            </h3>
            <div class="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <i class="fas fa-star text-yellow-400"></i>
              <span class="text-sm font-medium text-yellow-700">4.8</span>
            </div>
          </div>
          <p class="text-gray-600 text-sm line-clamp-2">{{ dish.description }}</p>
        </div>

        <!-- Tags/Attributes -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-3 py-1 bg-blue-100 text-[#018ABE] rounded-full text-xs font-medium">
            {{ dish.category }}
          </span>
          <span v-if="dish.spicy" 
                class="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
            <i class="fas fa-pepper-hot mr-1"></i> Cay
          </span>
          <span v-if="dish.vegetarian" 
                class="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
            <i class="fas fa-leaf mr-1"></i> Chay
          </span>
        </div>

        <!-- Bottom Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <span class="text-gray-600 text-sm flex items-center gap-2">
            <i class="fas fa-clock text-[#018ABE]"></i>
            15-20 phút
          </span>
          <button @click="openAddToCartModal(dish)"
                  class="bg-[#018ABE] text-white px-4 py-2 rounded-full hover:bg-blue-700
                         transform hover:scale-105 transition-all duration-300
                         flex items-center gap-2">
            <i class="fas fa-cart-plus"></i>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  dishes: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['open-add-to-cart-modal']);

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(price);
};

const openAddToCartModal = (dish) => {
  emit('open-add-to-cart-modal', dish);
};
</script>