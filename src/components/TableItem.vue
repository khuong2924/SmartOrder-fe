<template>
  <div 
    class="table-item relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105"
    :class="[
      selected ? 'ring-2 ring-offset-2 ring-indigo-500 shadow-lg' : 'shadow',
      getStatusClass(table.status)
    ]"
  >
    <!-- Table visualization with improved design -->
    <div class="p-4 flex flex-col items-center">
      <!-- Table shape based on capacity with 3D effect -->
      <div 
        class="table-shape relative mb-3"
        :class="[
          table.capacity <= 2 ? 'w-16 h-16 rounded-full' : 
          table.capacity <= 4 ? 'w-16 h-16 rounded-lg' : 
          'w-20 h-16 rounded-lg'
        ]"
      >
        <!-- Table number with improved typography -->
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-lg font-bold table-number">{{ table.number }}</span>
        </div>
        
        <!-- Enhanced status indicator with pulse effect -->
        <div 
          class="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white status-indicator"
          :class="getStatusIndicatorClass(table.status)"
        ></div>
        
        <!-- Chair indicators with improved styling -->
        
      </div>
      
      <!-- Table info with improved typography -->
      <div class="text-center">
        <p class="font-medium text-sm">{{ table.capacity }} người</p>
        <p class="text-xs status-text" :class="getStatusTextColor(table.status)">
          {{ getStatusText(table.status) }}
        </p>
      </div>
    </div>
    
    <!-- Improved quick action overlay with blur effect -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
      <button 
        class="px-4 py-2 bg-white rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors shadow-lg transform hover:scale-105 transition-transform duration-300"
      >
        <i class="fas mr-2" :class="getActionIcon(table.status)"></i>
        {{ getActionText(table.status) }}
      </button>
    </div>
    
    <!-- Enhanced animation effect for occupied tables -->
    <div 
      v-if="table.status === 'occupied'"
      class="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent animate-pulse-slow"
    ></div>
    
    <!-- Enhanced animation effect for reserved tables -->
    <div 
      v-if="table.status === 'reserved'"
      class="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent animate-pulse-slow"
    ></div>
    
    <!-- Decorative elements -->
    <div v-if="table.type === 'vip'" class="absolute top-1 left-1">
      <i class="fas fa-crown text-amber-400 text-xs animate-bounce-slow"></i>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  table: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
});

// Methods for table styling
const getStatusClass = (status) => {
  switch (status) {
    case 'available':
      return 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200';
    case 'occupied':
      return 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200';
    case 'reserved':
      return 'bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200';
    default:
      return 'bg-white border border-gray-200';
  }
};

const getStatusIndicatorClass = (status) => {
  switch (status) {
    case 'available':
      return 'bg-green-500 animate-pulse';
    case 'occupied':
      return 'bg-red-500';
    case 'reserved':
      return 'bg-yellow-500 animate-pulse';
    default:
      return 'hidden'; // Thêm case mặc định để ẩn indicator
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'available':
      return 'Trống';
    case 'occupied':
      return 'Đang sử dụng';
    case 'reserved':
      return 'Đã đặt trước';
    default:
      return 'Không xác định';
  }
};

const getStatusTextColor = (status) => {
  switch (status) {
    case 'available':
      return 'text-green-600 font-medium';
    case 'occupied':
      return 'text-red-600 font-medium';
    case 'reserved':
      return 'text-yellow-600 font-medium';
    default:
      return 'text-gray-600';
  }
};

const getActionText = (status) => {
  switch (status) {
    case 'available':
      return 'Đặt bàn';
    case 'occupied':
      return 'Xem chi tiết';
    case 'reserved':
      return 'Xác nhận';
    default:
      return 'Chọn';
  }
};

const getActionIcon = (status) => {
  switch (status) {
    case 'available':
      return 'fa-utensils';
    case 'occupied':
      return 'fa-info-circle';
    case 'reserved':
      return 'fa-check-circle';
    default:
      return 'fa-hand-pointer';
  }
};

// Generate chair positions around the table
const getChairPositions = (capacity) => {
  const positions = [];
  
  if (capacity <= 2) {
    // For small round tables (2 chairs)
    positions.push({ position: 'top', style: 'top: -8px; left: 50%; transform: translateX(-50%);' });
    positions.push({ position: 'bottom', style: 'bottom: -8px; left: 50%; transform: translateX(-50%);' });
  } else if (capacity <= 4) {
    // For square tables (4 chairs)
    positions.push({ position: 'top', style: 'top: -8px; left: 50%; transform: translateX(-50%);' });
    positions.push({ position: 'right', style: 'right: -8px; top: 50%; transform: translateY(-50%);' });
    positions.push({ position: 'bottom', style: 'bottom: -8px; left: 50%; transform: translateX(-50%);' });
    positions.push({ position: 'left', style: 'left: -8px; top: 50%; transform: translateY(-50%);' });
  } else {
    // For rectangular tables (6+ chairs)
    positions.push({ position: 'top-left', style: 'top: -8px; left: 25%; transform: translateX(-50%);' });
    positions.push({ position: 'top-right', style: 'top: -8px; left: 75%; transform: translateX(-50%);' });
    positions.push({ position: 'right', style: 'right: -8px; top: 50%; transform: translateY(-50%);' });
    positions.push({ position: 'bottom-left', style: 'bottom: -8px; left: 25%; transform: translateX(-50%);' });
    positions.push({ position: 'bottom-right', style: 'bottom: -8px; left: 75%; transform: translateX(-50%);' });
    positions.push({ position: 'left', style: 'left: -8px; top: 50%; transform: translateY(-50%);' });
  }
  
  return positions;
};
</script>

<style scoped>
.table-shape {
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), 
              -5px -5px 10px rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.table-item:hover .table-shape {
  transform: translateY(-2px);
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.1), 
              -8px -8px 15px rgba(255, 255, 255, 0.8);
}

.table-number {
  background: linear-gradient(to right, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.chair {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chair-occupied {
  background-color: #4b5563;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.chair-available {
  background-color: #9ca3af;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-indicator {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
}

.status-text {
  letter-spacing: 0.5px;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.1;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

/* Thêm hiệu ứng hover cho table item */
.table-item {
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.table-item:hover {
  transform: translateY(-5px) scale(1.03);
}

/* Thêm hiệu ứng đổ bóng khi hover */
.table-item {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-item:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>