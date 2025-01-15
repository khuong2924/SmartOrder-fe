<template>
  <header class="bg-white/90 backdrop-blur-md shadow-lg fixed w-full z-50 transition-all duration-500 hover:shadow-2xl h-20 flex items-center justify-between px-4">
    <!-- Logo -->
    <div class="logo d-flex align-items-center me-auto flex-shrink-0 flex items-center transform hover:scale-110 transition-transform px-2 md:px-8 duration-500">
      <img src="src/assets/logo-ngang-khong-nen.png" alt="Wanderlust Logo" class="logo d-flex align-items-center me-auto w-auto max-h-40 hover:scale-105 transition-transform duration-500 object-contain">
    </div>

    <!-- Navigation -->
    <div class="flex px-2 md:px-8 items-center space-x-2 md:space-x-6">
      <a href="#" class="hidden md:block text-blue-600 hover:text-blue-800 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-blue-100 hover:scale-105 transform">Trang chủ</a>
      <a href="#" class="hidden md:block text-blue-600 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-blue-100 hover:scale-105 transform">Du lịch</a>
      <button @click="$emit('open-schedule')" 
          class="hidden md:flex bg-transparent text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-blue-100 hover:scale-105 transform items-center border border-custom-gradient">
          <i class="fas fa-calendar-alt mr-2"></i>
          <span>Lịch khởi hành</span>
      </button>
      
      <!-- Desktop version -->
      <a href="#" 
         class="hidden md:inline-flex items-center px-4 py-2 border-2 border-blue-500 text-lg font-medium rounded-full text-white bg-custom-gradient hover:bg-blue-700 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50"
         data-aos-delay="300" 
         data-aos="zoom-in">
        Đi ngay
        <svg class="ml-2 -mr-1 w-6 h-6 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </a>

      <!-- Mobile version -->
      <a href="#" 
         class="md:hidden inline-flex items-center justify-center p-1.5 border-2 border-custom-gradient text-sm font-medium rounded-full text-white bg-custom-gradient hover:bg-custom-gradient-hover transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 w-8 h-8"
         data-aos-delay="300" 
         data-aos="zoom-in">
        <svg class="w-4 h-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </a>

      <!-- Mobile Menu Button -->
      <button class="md:hidden p-2 rounded-lg hover:bg-gray-100">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  emits: ['open-schedule']
}
</script> 