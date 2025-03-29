<template>
  <section id="featured" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-svn-avo-bold text-center mb-12" data-aos="fade-up">Món nổi bật</h2>
      <div class="swiper-container" data-aos="fade-up" data-aos-delay="200">
        <div class="swiper-wrapper">
          <div v-for="dish in featuredDishes" 
               :key="dish.id" 
               class="swiper-slide p-4">
            <div class="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl 
                        transform hover:-translate-y-2 transition-all duration-500">
              <!-- Image Container -->
              <div class="relative h-72 overflow-hidden">
                <img :src="dish.image" 
                     :alt="dish.name" 
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                
                <!-- Featured Badge -->
                <div class="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 
                            text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                  Nổi bật
                </div>
                
                <!-- Price Badge -->
                <div class="absolute top-4 right-4 bg-white/95 text-[#018ABE] px-4 py-2 
                            rounded-full font-bold shadow-lg backdrop-blur-sm">
                  {{ formatPrice(dish.price) }}
                </div>
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <!-- Bottom Content -->
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <h3 class="text-2xl font-svn-avo-bold text-white mb-2">{{ dish.name }}</h3>
                  <p class="text-white/90 text-sm mb-4 line-clamp-2">{{ dish.description }}</p>
                  
                  <!-- Action Buttons -->
                  <div class="flex gap-3">
                    <button @click="$emit('open-add-to-cart-modal', dish)"
                            class="flex-1 bg-white/90 text-[#018ABE] px-6 py-3 rounded-xl 
                                   hover:bg-[#018ABE] hover:text-white transition-all duration-300
                                   transform hover:scale-105 flex items-center justify-center gap-2">
                      <i class="fas fa-cart-plus"></i>
                      Thêm vào giỏ
                    </button>
                    <button class="w-12 h-12 bg-white/20 text-white rounded-xl hover:bg-white/30
                                   flex items-center justify-center backdrop-blur-sm">
                      <i class="fas fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Additional Info -->
              <div class="p-6 bg-white">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="flex items-center gap-1">
                      <i class="fas fa-star text-yellow-400"></i>
                      <span class="font-medium">4.8</span>
                    </div>
                    <span class="text-gray-300">|</span>
                    <div class="flex items-center gap-1 text-gray-600">
                      <i class="fas fa-clock"></i>
                      <span>15-20 phút</span>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <span v-if="dish.spicy" 
                          class="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                      <i class="fas fa-pepper-hot"></i>
                    </span>
                    <span v-if="dish.vegetarian" 
                          class="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                      <i class="fas fa-leaf"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Swiper Navigation -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <!-- Swiper Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Props
const props = defineProps({
  featuredDishes: {
    type: Array,
    required: true
  }
});

// Emits
const emit = defineEmits(['open-add-to-cart-modal']);

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(price);
};

onMounted(() => {
  new Swiper('.swiper-container', {
    loop: props.featuredDishes.length > 3,
    slidesPerView: 1,
    slidesPerGroup: 1,
    modules: [Navigation, Pagination, Autoplay],
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
  });
});
</script>

<style scoped>
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
</style>