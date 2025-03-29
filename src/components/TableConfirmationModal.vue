<template>
  <div v-if="show" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="modal-container">
      <div class="bg-white rounded-xl p-8 w-full max-w-2xl shadow-2xl relative overflow-hidden">
        <!-- Decorative elements -->
        <div class="absolute -right-16 -top-16 w-32 h-32 bg-blue-100 rounded-full opacity-70"></div>
        <div class="absolute -left-16 -bottom-16 w-32 h-32 bg-indigo-100 rounded-full opacity-70"></div>
        
        <!-- Header with icon -->
        <div class="flex items-center mb-8 relative">
          <div class="bg-[#018ABE]/10 p-3 rounded-full mr-3">
            <i class="fas fa-utensils text-[#018ABE] text-xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-800">Xác nhận chọn bàn</h3>
          <button @click="cancel" class="absolute right-0 top-0 text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <!-- Table info with enhanced styling -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-gray-50 p-5 rounded-lg border-l-4 border-[#018ABE] relative z-10">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-[#018ABE]/10 rounded-full flex items-center justify-center mr-3">
                <i class="fas fa-table text-[#018ABE] text-xl"></i>
              </div>
              <p class="font-bold text-xl text-gray-800">Bàn số: {{ table?.number }}</p>
            </div>
            
            <div class="space-y-3 ml-2">
              <div class="flex items-center">
                <i class="fas fa-map-marker-alt text-[#018ABE] mr-2 w-5"></i>
                <p class="text-gray-600">{{ table?.section }}</p>
              </div>
              <div class="flex items-center">
                <i class="fas fa-users text-[#018ABE] mr-2 w-5"></i>
                <p class="text-gray-600">{{ table?.capacity }} người</p>
              </div>
            </div>
          </div>
          
          <!-- Note input with enhanced styling -->
          <div class="relative z-10">
            <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <i class="fas fa-pencil-alt text-[#018ABE] mr-2"></i>
              Ghi chú
            </label>
            <div class="relative h-full">
              <textarea 
                v-model="note" 
                class="w-full h-[calc(100%-30px)] min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018ABE] focus:border-transparent"
                placeholder="Nhập ghi chú (nếu có)"
              ></textarea>
              <i class="fas fa-sticky-note absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
        </div>
        
        <!-- Action buttons -->
        <div class="flex justify-end space-x-4 relative z-10">
          <button 
            @click="cancel"
            class="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
          >
            <i class="fas fa-times mr-2"></i>
            Hủy
          </button>
          <button 
            @click="confirm"
            class="px-5 py-2.5 bg-[#018ABE] text-white rounded-lg hover:bg-[#5cc6ee] flex items-center shadow-md"
          >
            <i class="fas fa-check mr-2"></i>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  table: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:show', 'confirm', 'cancel']);

const note = ref('');

watch(() => props.show, (newValue) => {
  if (newValue) {
    note.value = '';
  }
});

const confirm = () => {
  // Prepare data to emit
  const tableData = {
    table: props.table,
    note: note.value
  };
  
  // Save table info to localStorage for persistence
  localStorage.setItem('selectedTable', JSON.stringify(props.table));
  localStorage.setItem('tableNote', note.value);
  
  // Emit confirm event with data
  emit('confirm', tableData);
  
  // Close modal
  emit('update:show', false);
  
  // Navigate to Home page with table data
  router.push({
    path: '/',
    query: { tableId: props.table?.id }
  });
};

const cancel = () => {
  emit('update:show', false);
  emit('cancel');
};
</script>