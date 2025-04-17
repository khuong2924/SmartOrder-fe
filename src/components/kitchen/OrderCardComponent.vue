<template>
  <div 
    class="order-card"
    :class="{ 
      'pending-order': order.status === 'PENDING',
      'confirmed-order': order.status === 'CONFIRMED',
      'in-progress': order.status === 'IN_PROGRESS',
      'ready': order.status === 'READY'
    }"
  >
    <div class="order-header">
      <div class="table-info">
        <CookingPot class="table-icon" />
        <h3>Bàn số: {{ order.tableNumber }}</h3>
      </div>
      <div class="order-time">
        <Clock class="time-icon" />
        <span>{{ formatTime(new Date(order.createdAt || order.orderTime)) }}</span>
      </div>
    </div>
    
    <div class="order-items">
      <TransitionGroup name="list">
        <div v-for="item in order.items" :key="item.id" class="order-item">
          <div class="item-details">
            <span class="item-quantity">{{ item.quantity }}x</span>
            <span class="item-name">{{ item.menuItemName || item.name }}</span>
          </div>
          <div v-if="item.specialInstructions || item.notes" class="item-notes">
            <AlertCircle class="note-icon" />
            <span>Ghi chú: {{ item.specialInstructions || item.notes }}</span>
          </div>
          
          <!-- Nút hoàn thành cho từng món ăn trong trạng thái IN_PROGRESS -->
          <button 
            v-if="order.status === 'IN_PROGRESS' && item.status !== 'COMPLETED'" 
            class="item-complete-btn"
            @click="$emit('complete-item', { orderId: order.id, orderItemId: item.id })"
          >
            <Check class="item-action-icon" />
            Hoàn thành
          </button>
          
          <!-- Hiển thị trạng thái đã hoàn thành -->
          <div v-if="item.status === 'COMPLETED'" class="item-completed">
            <CheckCircle class="completed-icon" />
            Đã hoàn thành
          </div>
        </div>
      </TransitionGroup>
    </div>
    
    <div class="order-actions">

      <div v-if="order.status === 'PENDING'" class="action-buttons">
        <button 
          class="action-btn reject-btn"
          @click="$emit('reject-order', order)"
        >
          <X class="action-icon" />
          
        </button>
        <button 
          class="action-btn confirm-btn"
          @click="$emit('confirm-order', order)"
        >
          <Check class="action-icon" />
          
        </button>
      </div>
      
      <!-- Nút cho đơn hàng CONFIRMED -->
      <button 
        v-if="order.status === 'CONFIRMED'" 
        class="action-btn start-btn"
        @click="$emit('start-order', order)"
      >
        <Play class="action-icon" />
        Bắt đầu làm
      </button>
      
      <!-- Nút cho đơn hàng IN_PROGRESS -->
      <button 
        v-if="order.status === 'IN_PROGRESS' && allItemsCompleted" 
        class="action-btn ready-btn"
        @click="$emit('ready-order', order)"
      >
        <CheckCircle class="action-icon" />
        Đánh dấu sẵn sàng
      </button>
      
      <!-- Nút cho đơn hàng READY -->
      <button 
        v-if="order.status === 'READY'" 
        class="action-btn deliver-btn"
        @click="$emit('deliver-order', order)"
      >
        <Send class="action-icon" />
        Giao món
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Coffee, CookingPot, Clock, AlertCircle, Play, Check, CheckCircle, Send, X } from 'lucide-vue-next';

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
});

defineEmits([
  'confirm-order', 
  'reject-order', 
  'start-order', 
  'ready-order', 
  'deliver-order',
  'complete-item'
]);

// Kiểm tra xem tất cả các món trong đơn hàng đã hoàn thành chưa
const allItemsCompleted = computed(() => {
  if (!props.order.items || props.order.items.length === 0) return false;
  return props.order.items.every(item => item.status === 'COMPLETED');
});

// Format time to display how long ago the order was placed
const formatTime = (time) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now - time) / 60000);
  
  if (diffInMinutes < 1) return 'Vừa xong';
  if (diffInMinutes === 1) return '1 phút trước';
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  
  const hours = Math.floor(diffInMinutes / 60);
  if (hours === 1) return '1 giờ trước';
  return `${hours} giờ trước`;
};
</script>

<style scoped>
.order-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.order-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

/* Status-specific styles */
.order-card.pending-order {
  border-left: 5px solid #EF476F;
  background: linear-gradient(to right, rgba(239, 71, 111, 0.05), white 50%);
}

.order-card.confirmed-order {
  border-left: 5px solid #FFD166;
  background: linear-gradient(to right, rgba(255, 209, 102, 0.05), white 50%);
}

.order-card.in-progress {
  border-left: 5px solid #06D6A0;
  background: linear-gradient(to right, rgba(6, 214, 160, 0.05), white 50%);
}

.order-card.ready {
  border-left: 5px solid #118AB2;
  background: linear-gradient(to right, rgba(17, 138, 178, 0.05), white 50%);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid #f1f5f9;
}

.table-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.table-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.table-icon, .time-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #64748b;
}

.order-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
  background-color: #f8fafc;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
}

.order-items {
  padding: 1.25rem;
  max-height: 250px;
  overflow-y: auto;
  flex-grow: 1;
}

.order-item {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: #f8fafc;
  transition: all 0.2s ease;
}

.order-item:hover {
  background-color: #f1f5f9;
}

.item-details {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.item-quantity {
  font-weight: 600;
  color: #018ABE;
  background-color: rgba(1, 138, 190, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.item-name {
  font-weight: 500;
  color: #334155;
}

.item-notes {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #64748b;
  background-color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px dashed #e2e8f0;
}

.note-icon {
  width: 1rem;
  height: 1rem;
  color: #EF476F;
}

/* Action Buttons */
.order-actions {
  padding: 1.25rem;
  border-top: 1px solid #f1f5f9;
  background-color: #ffffff;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Button Variants */
.reject-btn {
  background-color: #FFF1F2;
  color: #EF476F;
  flex: 1;
}

.reject-btn:hover {
  background-color: #EF476F;
  color: white;
  transform: translateY(-2px);
}

.confirm-btn {
  background-color: #ECFDF5;
  color: #06D6A0;
  flex: 1;
}

.confirm-btn:hover {
  background-color: #06D6A0;
  color: white;
  transform: translateY(-2px);
}

.start-btn {
  background-color: #018ABE;
  color: white;
  width: 100%;
  box-shadow: 0 4px 12px rgba(1, 138, 190, 0.2);
}

.start-btn:hover {
  background-color: #0179a5;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(1, 138, 190, 0.3);
}

.ready-btn {
  background-color: #118AB2;
  color: white;
  width: 100%;
  box-shadow: 0 4px 12px rgba(17, 138, 178, 0.2);
}

.ready-btn:hover {
  background-color: #0e7a9e;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(17, 138, 178, 0.3);
}

.deliver-btn {
  background-color: #073B4C;
  color: white;
  width: 100%;
  box-shadow: 0 4px 12px rgba(7, 59, 76, 0.2);
}

.deliver-btn:hover {
  background-color: #052a36;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(7, 59, 76, 0.3);
}

/* Item Complete Button */
.item-complete-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  margin-top: 0.75rem;
  border-radius: 6px;
  background-color: #ECFDF5;
  color: #06D6A0;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.item-complete-btn:hover {
  background-color: #06D6A0;
  color: white;
  transform: translateY(-2px);
}

.item-completed {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  color: #06D6A0;
  font-size: 0.85rem;
  font-weight: 600;
}

.completed-icon {
  width: 1rem;
  height: 1rem;
}

/* Custom Scrollbar */
.order-items::-webkit-scrollbar {
  width: 6px;
}

.order-items::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.order-items::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.order-items::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>