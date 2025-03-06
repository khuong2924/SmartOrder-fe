<template>
  <div 
    class="table-item relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105"
    :class="[
      selected ? 'ring-2 ring-offset-2 ring-indigo-500 shadow-lg' : 'shadow',
      getStatusClass(table.status)
    ]"
  >
    <!-- Table visualization -->
    <div class="p-4 flex flex-col items-center">
      <!-- Table shape based on capacity -->
      <div 
        class="table-shape relative mb-3"
        :class="[
          table.capacity <= 2 ? 'w-16 h-16 rounded-full' : 
          table.capacity <= 4 ? 'w-16 h-16 rounded-lg' : 
          'w-20 h-16 rounded-lg'
        ]"
      >
        <!-- Table number -->
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-lg font-bold">{{ table.number }}</span>
        </div>
        
        <!-- Status indicator -->
        <div 
          class="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
          :class="getStatusIndicatorClass(table.status)"
        ></div>
        
        <!-- Chair indicators -->
        <div class="chairs-container absolute">
          <div 
            v-for="i in getChairPositions(table.capacity)" 
            :key="i.position"
            class="chair absolute w-3 h-3 rounded-full bg-gray-400"
            :class="{'bg-gray-600': table.status === 'occupied'}"
            :style="i.style"
          ></div>
        </div>
      </div>
      
      <!-- Table info -->
      <div class="text-center">
        <p class="font-medium text-sm">{{ table.capacity }} người</p>
        <p class="text-xs text-gray-500">{{ getStatusText(table.status) }}</p>
      </div>
    </div>
    
    <!-- Quick action overlay (appears on hover) -->
    <div class="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <button 
        class="px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
      >
        {{ getActionText(table.status) }}
      </button>
    </div>
    
    <!-- Animation effect for occupied tables -->
    <div 
      v-if="table.status === 'occupied'"
      class="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent animate-pulse-slow"
    ></div>
    
    <!-- Animation effect for reserved tables -->
    <div 
      v-if="table.status === 'reserved'"
      class="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent animate-pulse-slow"
    ></div>
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
      return 'bg-green-500';
    case 'occupied':
      return 'bg-red-500';
    case 'reserved':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
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
  background: linear-gradient(to bottom right, #ffffff, #f3f4f6);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.table-item:hover .table-shape {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
</style>