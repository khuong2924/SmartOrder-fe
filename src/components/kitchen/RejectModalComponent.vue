<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-btn" @click="$emit('close')">
            <X />
          </button>
        </div>
        
        <div class="modal-body">
          <div class="order-info">
            <p><strong>Bàn:</strong> {{ order?.tableNumber }}</p>
            <p><strong>Thời gian:</strong> {{ formatTime(new Date(order?.createdAt)) }}</p>
          </div>
          
          <div class="order-items">
            <h4>Các món:</h4>
            <ul>
              <li v-for="item in order?.items" :key="item.id">
                {{ item.quantity }}x {{ item.menuItemName }}
                <span v-if="item.specialInstructions" class="item-note">
                  ({{ item.specialInstructions }})
                </span>
              </li>
            </ul>
          </div>
          
          <div class="reject-reason">
            <label for="reason">Lý do từ chối:</label>
            <textarea 
              id="reason" 
              v-model="reason" 
              placeholder="Nhập lý do từ chối đơn hàng..."
              rows="3"
            ></textarea>
            <p v-if="reasonError" class="error-message">{{ reasonError }}</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="cancel-btn" @click="$emit('close')">Hủy</button>
          <button class="confirm-btn" @click="confirmReject">Xác nhận từ chối</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import { X } from 'lucide-vue-next';

const props = defineProps({
  show: Boolean,
  title: String,
  order: Object
});

const emit = defineEmits(['close', 'confirm-reject']);

const reason = ref('');
const reasonError = ref('');

const confirmReject = () => {
  if (!reason.value.trim()) {
    reasonError.value = 'Vui lòng nhập lý do từ chối';
    return;
  }
  
  reasonError.value = '';
  emit('confirm-reject', reason.value);
  reason.value = ''; // Reset reason after submit
};

// Format time to display how long ago the order was placed
const formatTime = (time) => {
  const now = new Date();
  const orderTime = new Date(time);
  const diffInMinutes = Math.floor((now - orderTime) / 60000);
  
  if (diffInMinutes < 1) return 'Vừa xong';
  if (diffInMinutes === 1) return '1 phút trước';
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  
  const hours = Math.floor(diffInMinutes / 60);
  if (hours === 1) return '1 giờ trước';
  return `${hours} giờ trước`;
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
}

.modal-body {
  padding: 1rem;
}

.order-info {
  margin-bottom: 1rem;
}

.order-items {
  margin-bottom: 1.5rem;
}

.order-items ul {
  list-style: none;
  padding-left: 0.5rem;
}

.order-items li {
  margin-bottom: 0.5rem;
}

.item-note {
  font-style: italic;
  color: #64748b;
  font-size: 0.9em;
}

.reject-reason {
  margin-bottom: 1rem;
}

.reject-reason label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.reject-reason textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  resize: vertical;
}

.error-message {
  color: #EF476F;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
}

.cancel-btn, .confirm-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.cancel-btn {
  background-color: #e2e8f0;
  border: none;
  color: #1e293b;
}

.confirm-btn {
  background-color: #EF476F;
  border: none;
  color: white;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>