<template>
  <div>
    <!-- Header -->
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
            @click="isCartOpen = !isCartOpen"
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
            @click="isMobileMenuOpen = !isMobileMenuOpen"
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
        <section id="hero" class="hero-image h-screen flex items-center justify-center text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
          <div id="tsparticles" class="absolute inset-0"></div>
          
          <!-- Enhanced Hero Content -->
          <div class="relative z-10 text-center max-w-4xl px-6">
            <!-- Decorative elements -->
            <div class="absolute -top-20 -left-20 w-40 h-40 bg-[#018ABE]-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute -bottom-20 -right-20 w-40 h-40 bg-[#018ABE]-300-20 rounded-full blur-3xl animate-pulse"></div>
            
            <!-- Restaurant logo icon with animation -->
            <div class="inline-block mb-6 p-4 rounded-full bg-white/10 backdrop-blur-md animate__animated animate__fadeInDown">
              <i class="fas fa-utensils text-4xl text-white"></i>
            </div>
            
            <!-- Main heading with enhanced styling -->
            <h1 class="text-6xl mb-6 md:text-7xl font-svn-avo-bold animate__animated animate__fadeInDown 
                       bg-gradient-to-r from-white via-[#018ABE]-200 to-[#018ABE] bg-clip-text text-transparent
                       drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] tracking-tight">
              Nhà hàng Ngon
            </h1>
            
            <!-- Tagline with decorative elements -->
            <div class="relative mb-10">
              <div class="h-px w-20 bg-gradient-to-r from-transparent via-white/60 to-transparent absolute -left-24 top-1/2 hidden md:block"></div>
              <p class="text-xl md:text-2xl animate__animated animate__fadeInUp animate__delay-1s
                        font-light tracking-wide">
                Hương vị truyền thống - Không gian hiện đại
              </p>
              <div class="h-px w-20 bg-gradient-to-r from-transparent via-white/60 to-transparent absolute -right-24 top-1/2 hidden md:block"></div>
            </div>
            
            <!-- Call to action buttons with enhanced styling -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center animate__animated animate__fadeInUp animate__delay-2s">
              <a href="#menu" 
                 class="px-8 py-4 rounded-full bg-[#018ABE] text-white 
                        hover:from-i[#018ABE] hover:to-[#018ABE]-700 transform hover:scale-105 transition-all duration-300
                        shadow-[#018ABE] flex items-center justify-center gap-2">
                <i class="fas fa-utensils"></i>
                Xem Thực đơn
              </a>
              <a href="#featured" 
                 class="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20
                        hover:bg-white/20 transform hover:scale-105 transition-all duration-300
                        flex items-center justify-center gap-2">
                <i class="fas fa-star"></i>
                Món nổi bật
              </a>
            </div>
            
            <!-- Scroll indicator -->
            <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
              <a href="#featured" class="text-white/70 hover:text-white transition-colors">
                <i class="fas fa-chevron-down"></i>
              </a>
            </div>
          </div>
        </section>

    <!-- Featured Dishes Section -->
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
                      <button @click="openAddToCartModal(dish)"
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
          <div class="swiper-button-next after:text-[#018ABE]"></div>
          <div class="swiper-button-prev after:text-[#018ABE]"></div>
          <!-- Swiper Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </section>

    <!-- Menu Section -->
    <section id="menu" class="py-20 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-5xl text-[#018ABE] font-bold text-center mb-12" data-aos="fade-up">Thực đơn</h2>
        <!-- Menu Categories -->
          <div class="mb-12" data-aos="fade-up" data-aos-delay="200">
            <div class="relative max-w-4xl mx-auto">
              <!-- Decorative background elements -->
              <div class="absolute inset-0 rounded-2xl transform -rotate-1"></div>
              <div class="absolute -left-4 -right-4 -top-4 -bottom-4  rounded-3xl transform rotate-1 blur-lg"></div>
              
              <!-- Interactive categories container -->
              <div class="relative flex flex-nowrap overflow-x-auto py-6 px-4 md:px-8 md:flex-wrap md:justify-center md:overflow-x-visible scrollbar-hide">
                <button v-for="category in categories" 
                        :key="category"
                        @click="selectedCategory = category"
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
                        selectedCategory === category ? 'text-white' : 'text-blue-500',
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
                  
                  <!-- Decorative particles for selected category -->
                  <span v-if="selectedCategory === category" 
                        class="absolute -right-1 -top-1 w-3 h-3 bg-white rounded-full opacity-70 animate-ping"></span>
                        
                  <!-- Active indicator with pulse animation -->
                  <span v-if="selectedCategory === category" 
                        class="absolute -bottom-1 left-1/2 w-12 h-1 bg-white rounded-full transform -translate-x-1/2
                              shadow-lg animate-pulse"></span>
                              
                  <!-- Badge counter (optional - you can add dish counts per category) -->
                  <span v-if="selectedCategory === category" 
                        class="absolute -top-2 -right-2 bg-white text-[#018ABE] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
                    {{ filteredDishes.length }}
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="dish in filteredDishes" 
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
import { ref, onMounted, computed } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import AOS from 'aos'
import { tsParticles } from "tsparticles-engine"
import axios from 'axios'
import { useRouter } from 'vue-router'

import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/store/auth'

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
  { href: '#featured', text: 'Món Nổi bật' },
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
