<template>
  <transition name="modal-fade">
    <div v-if="show" class="success-modal-overlay" @click.self="$emit('close')">
      <div class="success-modal-container" :class="{ 'animate__animated animate__bounceIn': show }">
        <div class="success-modal-header">
          <button class="close-btn" @click="$emit('close')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="success-modal-content">
          <div class="success-icon-container">
            <div class="success-icon-circle">
              <i class="fas fa-check success-icon"></i>
            </div>
          </div>
          
          <h2 class="success-title font-svn-avo-bold">Đặt hàng thành công!</h2>
          
          <div class="success-message">
            <p>Đơn hàng của bạn đã được gửi đến nhà bếp.</p>
            <p>Món ăn sẽ được chuẩn bị trong thời gian sớm nhất.</p>
          </div>
          
          <div class="order-details">
            <div class="order-detail-item">
              <i class="fas fa-utensils"></i>
              <span>Bàn số: <strong>{{ tableNumber }}</strong></span>
            </div>
            <div class="order-detail-item">
              <i class="fas fa-clipboard-list"></i>
              <span>Số món: <strong>{{ itemCount }}</strong></span>
            </div>
          </div>
          
          <button class="continue-btn" @click="$emit('close')">
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  tableNumber: {
    type: String,
    default: ''
  },
  itemCount: {
    type: Number,
    default: 0
  }
});

defineEmits(['close']);
</script>

<style scoped>
.success-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.success-modal-container {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  position: relative;
}

.success-modal-header {
  display: flex;
  justify-content: flex-end;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  font-size: 1.25rem;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #018ABE;
}

.success-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.success-icon-container {
  margin-bottom: 1.5rem;
}

.success-icon-circle {
  width: 80px;
  height: 80px;
  background-color: #06D6A0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 10px 15px -3px rgba(6, 214, 160, 0.4);
  animation: pulse 2s infinite;
}

.success-icon {
  color: white;
  font-size: 2.5rem;
}

.success-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #018ABE;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
}

.success-message {
  margin-bottom: 1.5rem;
  color: #4b5563;
  line-height: 1.6;
}

.order-details {
  background-color: rgba(1, 138, 190, 0.1);
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
}

.order-detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  color: #4b5563;
}

.order-detail-item:last-child {
  margin-bottom: 0;
}

.order-detail-item i {
  color: #018ABE;
}

.continue-btn {
  background-color: #018ABE;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(1, 138, 190, 0.4);
}

.continue-btn:hover {
  background-color: #0179a5;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(1, 138, 190, 0.4);
}

.continue-btn:active {
  transform: translateY(0);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(6, 214, 160, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(6, 214, 160, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(6, 214, 160, 0);
  }
}

/* Modal transition animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>