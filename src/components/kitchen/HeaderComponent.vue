<template>
    <header class="header">
      <div class="logo-container">
        <div class="logo">
          <UtensilsCrossed class="logo-icon" />
          <h1>Kitchen Dashboard</h1>
        </div>
        <span class="date-time">{{ currentDateTime }}</span>
      </div>
      <div class="user-info">
        <Bell class="notification-icon" :class="{ 'has-notifications': hasNotifications }" />
        <div class="avatar">
          <img src="https://static.vecteezy.com/system/resources/previews/035/316/062/non_2x/chef-in-a-cooking-hat-outline-logo-kitchen-simple-icon-vector.jpg" alt="Chef avatar" />
        </div>
        <span>Chef Minh</span>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { UtensilsCrossed, Bell } from 'lucide-vue-next';
  
  const props = defineProps({
    hasNotifications: {
      type: Boolean,
      default: false
    }
  });
  
  // Current date and time
  const currentDateTime = ref(new Date().toLocaleString('vi-VN'));
  
  onMounted(() => {
    setInterval(() => {
      currentDateTime.value = new Date().toLocaleString('vi-VN');
    }, 60000);
  });
  </script>
  
  <style scoped>
  /* Header styles */
  .header {
    background-color: #018ABE;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .logo-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .date-time {
    font-size: 0.9rem;
    opacity: 0.9;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .notification-icon {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .notification-icon.has-notifications {
    color: #FFD166;
    animation: pulse 1.5s infinite;
  }
  
  .avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid white;
  }
  
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .logo-container {
      width: auto;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
  </style>