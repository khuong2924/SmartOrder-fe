<template>
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
</template>

<script setup>
import { onMounted } from 'vue';
import { tsParticles } from "tsparticles-engine";

// Particles setup
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
};

onMounted(async () => {
  // Initialize particles
  await tsParticles.load("tsparticles", particlesOptions);
});
</script>

<style scoped>
.hero-image {
  background-image: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
}

@media (max-width: 640px) {
  .hero-image {
    background-position: center 25%;
  }
}
</style>