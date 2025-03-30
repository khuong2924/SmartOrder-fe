<template>
    <div v-if="show" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-btn" @click="$emit('close')">
            <X />
          </button>
        </div>
        <div class="modal-content">
          <div class="modal-order-info">
            <div class="modal-table-info">
              <Coffee class="table-icon" />
              <h4>Table {{ order?.tableNumber }}</h4>
            </div>
            <div class="modal-time-info">
              <Clock class="time-icon" />
              <span>{{ order ? formatTime(order.orderTime) : '' }}</span>
            </div>
          </div>
          
          <div class="modal-items">
            <h4>Order Items:</h4>
            <div v-for="item in order?.items" :key="item.id" class="modal-item">
              <div class="item-details">
                <span class="item-quantity">{{ item.quantity }}x</span>
                <span class="item-name">{{ item.name }}</span>
              </div>
              <div v-if="item.notes" class="item-notes">
                <AlertCircle class="note-icon" />
                <span>{{ item.notes }}</span>
              </div>
            </div>
          </div>
          
          <div class="modal-message">
            <AlertTriangle v-if="action === 'start'" class="modal-action-icon start" />
            <CheckCircle v-if="action === 'complete'" class="modal-action-icon complete" />
            <Send v-if="action === 'deliver'" class="modal-action-icon deliver" />
            <p>{{ message }}</p>
          </div>
        </div>
        <div class="modal-actions">
          <button class="modal-btn cancel-btn" @click="$emit('close')">
            Cancel
          </button>
          <button class="modal-btn confirm-btn" @click="$emit('confirm')">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { X, Coffee, Clock, AlertCircle, AlertTriangle, CheckCircle, Send } from 'lucide-vue-next';
  
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    },
    order: {
      type: Object,
      default: null
    }
  });
  
  defineEmits(['close', 'confirm']);
  
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
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }
  
  .modal-container {
    background-color: white;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.3s ease;
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
    transition: color 0.2s ease;
  }
  
  .close-btn:hover {
    color: #EF476F;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .modal-order-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f1f5f9;
  }
  
  .modal-table-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .table-icon, .time-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #64748b;
  }
  
  .modal-time-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #64748b;
  }
  
  .modal-items {
    margin-bottom: 1.5rem;
  }
  
  .modal-items h4 {
    margin-bottom: 1rem;
    color: #64748b;
  }
  
  .modal-item {
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px dashed #f1f5f9;
  }
  
  .modal-item:last-child {
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
  
  .modal-message {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #f8fafc;
    border-radius: 8px;
    margin-top: 1rem;
  }
  
  .modal-action-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .modal-action-icon.start {
    color: #018ABE;
  }
  
  .modal-action-icon.complete {
    color: #06D6A0;
  }
  
  .modal-action-icon.deliver {
    color: #64748b;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem;
    border-top: 1px solid #e2e8f0;
  }
  
  .modal-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }
  
  .cancel-btn {
    background-color: #f1f5f9;
    color: #64748b;
  }
  
  .cancel-btn:hover {
    background-color: #e2e8f0;
  }
  
  .confirm-btn {
    background-color: #018ABE;
    color: white;
  }
  
  .confirm-btn:hover {
    background-color: #0179a5;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  </style>