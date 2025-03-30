<template>
    <div 
      class="order-card"
      :class="{ 
        'new-order': order.status === 'new',
        'in-progress': order.status === 'in-progress',
        'ready': order.status === 'ready'
      }"
    >
      <div class="order-header">
        <div class="table-info">
          <CookingPot class="table-icon" />
          <h3>Table {{ order.tableNumber }}</h3>
        </div>
        <div class="order-time">
          <Clock class="time-icon" />
          <span>{{ formatTime(order.orderTime) }}</span>
        </div>
      </div>
      
      <div class="order-items">
        <TransitionGroup name="list">
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <div class="item-details">
              <span class="item-quantity">{{ item.quantity }}x</span>
              <span class="item-name">{{ item.name }}</span>
            </div>
            <div v-if="item.notes" class="item-notes">
              <AlertCircle class="note-icon" />
              <span>{{ item.notes }}</span>
            </div>
          </div>
        </TransitionGroup>
      </div>
      
      <div class="order-actions">
        <button 
          v-if="order.status === 'new'" 
          class="action-btn start-btn"
          @click="$emit('start-order', order)"
        >
          <Play class="action-icon" />
          Tiếp nhận đơn
        </button>
        <button 
          v-if="order.status === 'in-progress'" 
          class="action-btn complete-btn"
          @click="$emit('complete-order', order)"
        >
          <Check class="action-icon" />
          Chuẩn bị món
        </button>
        <button 
          v-if="order.status === 'ready'" 
          class="action-btn delivered-btn"
          @click="$emit('deliver-order', order)"
        >
          <Send class="action-icon" />
          Hoàn thành
        </button>
      </div>
    </div>
  </template>
  
  <script setup>

  import { Coffee, CookingPot, Clock, AlertCircle, Play, Check, Send } from 'lucide-vue-next';

  const props = defineProps({
    order: {
      type: Object,
      required: true
    }
  });
  
  defineEmits(['start-order', 'complete-order', 'deliver-order']);
  
  // Format time to display how long ago the order was placed
  const formatTime = (time) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - time) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const hours = Math.floor(diffInMinutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };
  </script>
  
  <style scoped>
  .order-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .order-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .order-card.new-order {
    border-top: 4px solid #EF476F;
  }
  
  .order-card.in-progress {
    border-top: 4px solid #FFD166;
  }
  
  .order-card.ready {
    border-top: 4px solid #06D6A0;
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #f1f5f9;
  }
  
  .table-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .table-icon, .time-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #64748b;
  }
  
  .order-time {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #64748b;
  }
  
  .order-items {
    padding: 1rem;
    max-height: 200px;
    overflow-y: auto;
    flex-grow: 1;
  }
  
  .order-item {
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px dashed #f1f5f9;
  }
  
  .order-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .item-details {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }
  
  .item-quantity {
    font-weight: bold;
    color: #018ABE;
  }
  
  .item-notes {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: #64748b;
    margin-left: 1.5rem;
    padding: 0.25rem 0.5rem;
    background-color: #f8fafc;
    border-radius: 4px;
  }
  
  .note-icon {
    width: 0.875rem;
    height: 0.875rem;
    color: #EF476F;
  }
  
  .order-actions {
    padding: 1rem;
    border-top: 1px solid #f1f5f9;
    display: flex;
    justify-content: center;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    width: 100%;
  }
  
  .action-icon {
    width: 1rem;
    height: 1rem;
  }
  
  .start-btn {
    background-color: #018ABE;
    color: white;
  }
  
  .start-btn:hover {
    background-color: #0179a5;
  }
  
  .complete-btn {
    background-color: #06D6A0;
    color: white;
  }
  
  .complete-btn:hover {
    background-color: #05c090;
  }
  
  .delivered-btn {
    background-color: #64748b;
    color: white;
  }
  
  .delivered-btn:hover {
    background-color: #556577;
  }
  
  /* Transitions for list items */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
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