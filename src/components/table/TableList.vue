<template>
  <div class="table-list-container p-6 bg-gradient-to-br from-blue-50 via-blue-50 to-[#018ABE]-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl text-[#018ABE]  font-bold text-gray-800 flex items-center">
        
          Danh sách bàn
        </h1>
        
        <div class="flex space-x-4">
          <!-- Filter dropdown -->
          <div class="relative">
            <button @click="showFilter = !showFilter" class="flex text-[#018ABE] items-center px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-all duration-300">
              <i class="fas fa-filter text-[#018ABE]-600 mr-2"></i>
              <span>Lọc</span>
              <i class="fas fa-chevron-down ml-2 text-gray-500 text-xs"></i>
            </button>
            
            <div v-if="showFilter" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 transform origin-top-right transition-all duration-300 ease-out scale-100 opacity-100">
              <div class="p-3">
                <div class="mb-2 text-sm font-medium text-gray-700">Trạng thái</div>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="checkbox" v-model="filters.available" class="form-checkbox h-4 w-4 text-[#018ABE]-600">
                    <span class="ml-2 text-sm text-gray-700">Trống</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" v-model="filters.occupied" class="form-checkbox h-4 w-4 text-[#018ABE]-600">
                    <span class="ml-2 text-sm text-gray-700">Đang sử dụng</span>
                  </label>
 
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
      
      <!-- Status legend -->
      <div class="flex space-x-6 mb-6">
        <div class="flex items-center">
          <div class="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <span class="text-sm text-gray-600">Trống</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <span class="text-sm text-gray-600">Đang sử dụng</span>
        </div>
        
      </div>
      
      <!-- Restaurant layout visualization -->
      <div class="restaurant-layout bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
        <div class="absolute -right-20 -top-20 w-40 h-40 bg-indigo-100 rounded-full opacity-50"></div>
        <div class="absolute -left-20 -bottom-20 w-40 h-40 bg-pink-100 rounded-full opacity-50"></div>
        
        <!-- Restaurant sections -->
        <div class="flex flex-wrap gap-8">
          <!-- VIP Section -->
          <div class="section-container w-full lg:w-[calc(50%-1rem)] border border-dashed border-amber-300 rounded-xl p-4 bg-amber-50/50">
            <h3 class="text-lg font-semibold text-amber-800 mb-4 flex items-center">
              <i class="fas fa-crown text-amber-500 mr-2"></i> Khu vực VIP
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div v-for="table in vipTables" :key="table.id" class="cursor-pointer">
                <TableItem 
                  :table="table" 
                  :selected="selectedTable?.id === table.id"
                  @action="handleTableAction" 
                />
              </div>
            </div>
          </div>
          
          <!-- Regular Section -->
          <div class="section-container w-full lg:w-[calc(50%-1rem)] border border-dashed border-blue-300 rounded-xl p-4 bg-blue-50/50">
            <h3 class="text-lg font-semibold text-[#018ABE] mb-4 flex items-center">
              <i class="fas fa-users text-[#018ABE] mr-2"></i> Khu vực thường
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div v-for="table in regularTables" :key="table.id" class="cursor-pointer">
                <TableItem 
                  :table="table" 
                  :selected="selectedTable?.id === table.id"
                  @action="handleTableAction"
                />
              </div>
            </div>
          </div>
          
          <!-- Outdoor Section -->
          <div class="section-container w-full border border-dashed border-green-300 rounded-xl p-4 bg-green-50/50">
            <h3 class="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <i class="fas fa-tree text-green-500 mr-2"></i> Khu vực ngoài trời
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div v-for="table in outdoorTables" :key="table.id" class="cursor-pointer">
                <TableItem 
                  :table="table" 
                  :selected="selectedTable?.id === table.id"
                  @action="handleTableAction"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  
  
  
  <!-- Import the TableConfirmationModal component -->
  <TableConfirmationModal
    v-model:show="showConfirmationModal"
    :table="selectedTable"
    @confirm="handleConfirmation"
    @cancel="showConfirmationModal = false"
  />
</template>

<script setup>
import { ref, computed, onMounted, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import TableItem from './TableItem.vue';
import TableConfirmationModal from './TableConfirmationModal.vue';
import tableService from '../../api/tableService.js';

const router = useRouter();
const emit = defineEmits(['select-table']);

// State
const tables = ref([]);
const selectedTable = ref(null);
const showFilter = ref(false);
const showConfirmationModal = ref(false);
const tableNote = ref('');
const filters = ref({
  available: true,
  occupied: true
});

// Reservation modal state
const showReservationModal = ref(false);
const reservationData = ref({
  guestCount: 1,
  notes: ''
});

// In TableList.vue
const handleTableAction = (table) => {
  selectedTable.value = table;
  if (table.status === 'available') {
    showConfirmationModal.value = true;
  } else if (table.status === 'occupied') {
    // Emit a different event or open a modal for options
    emit('occupied-table-action', table);
  }
};

// Fetch tables data
onMounted(async () => {
  try {
    tables.value = await tableService.getAllTables();
  } catch (error) {
    console.error('Error fetching tables:', error);
  }
});

// Remove the helper functions as they're now in the service
// const getTableType and getTableSection are now in tableService

// Generate mock data
const generateMockTables = () => {
  const statuses = ['available', 'occupied'];
  const mockTables = [];
  
  // VIP tables
  for (let i = 1; i <= 8; i++) {
    const status = statuses[Math.floor(Math.random() * 3)];
    mockTables.push({
      id: `vip-${i}`,
      number: `V${i}`,
      section: 'Khu vực VIP',
      capacity: 4 + (i % 3) * 2,
      status,
      type: 'vip',
      orderInfo: status === 'occupied' ? {
        startTime: '19:30',
        itemCount: 5 + Math.floor(Math.random() * 5),
        totalAmount: 250000 + Math.floor(Math.random() * 500000)
      } : null
    });
  }
  
  // Regular tables
  for (let i = 1; i <= 12; i++) {
    const status = statuses[Math.floor(Math.random() * 2)];
    mockTables.push({
      id: `regular-${i}`,
      number: `${i}`,
      section: 'Khu vực thường',
      capacity: 2 + (i % 3) * 2,
      status,
      type: 'regular',
      orderInfo: status === 'occupied' ? {
        startTime: '18:45',
        itemCount: 3 + Math.floor(Math.random() * 4),
        totalAmount: 150000 + Math.floor(Math.random() * 300000)
      } : null
    });
  }
  
  // Outdoor tables
  for (let i = 1; i <= 10; i++) {
    const status = statuses[Math.floor(Math.random() * 3)];
    mockTables.push({
      id: `outdoor-${i}`,
      number: `O${i}`,
      section: 'Khu vực ngoài trời',
      capacity: 2 + (i % 4),
      status,
      type: 'outdoor',
      orderInfo: status === 'occupied' ? {
        startTime: '20:15',
        itemCount: 2 + Math.floor(Math.random() * 3),
        totalAmount: 120000 + Math.floor(Math.random() * 200000)
      } : null
    });
  }
  
  return mockTables;
};

// Computed properties for filtered tables
const filteredTables = computed(() => {
  return tables.value.filter(table => {
    if (table.status === 'available' && !filters.value.available) return false;
    if (table.status === 'occupied' && !filters.value.occupied) return false;

    return true;
  });
});

const vipTables = computed(() => {
  return filteredTables.value.filter(table => table.type === 'vip');
});

const regularTables = computed(() => {
  return filteredTables.value.filter(table => table.type === 'regular');
});

const outdoorTables = computed(() => {
  return filteredTables.value.filter(table => table.type === 'outdoor');
});

// Methods
const selectTable = (table) => {
  selectedTable.value = table;
  
  // Thêm nút xác nhận chọn bàn khi bàn trống
  if (table.status === 'available') {
    // Hiển thị nút xác nhận
  }
};

// Open reservation modal
const openReservationModal = () => {
  showReservationModal.value = true;
};

// Close reservation modal
const closeReservationModal = () => {
  showReservationModal.value = false;
};

// Confirm reservation
const confirmReservation = async () => {
  try {
    if (selectedTable.value) {
      await tableService.reserveTable(selectedTable.value.id, reservationData.value);
      // Update the table status after successful reservation
      selectedTable.value.status = 'occupied';
      closeReservationModal();
      // Emit event for parent component
      emit('reserve-table', selectedTable.value);
    }
  } catch (error) {
    console.error('Error confirming reservation:', error);
  }
};

// Thêm phương thức xác nhận chọn bàn
const confirmTableSelection = () => {
  if (selectedTable.value) {
    // Save table info to localStorage
    localStorage.setItem('selectedTable', JSON.stringify(selectedTable.value));
    localStorage.setItem('currentTableNumber', selectedTable.value.number);
    localStorage.setItem('tableNote', tableNote.value);
    
    // Emit event if needed
    emit('select-table', selectedTable.value);
    
    // Navigate to Home
    router.push('/');
    
    // Close modal
    showConfirmationModal.value = false;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'available':
    const getStatusText = (status) => {
        switch (status) {
          case 'available':
            return 'Trống';
          case 'occupied':
            return 'Đang sử dụng';
        }
      };
      
      const getStatusColor = (status) => {
        switch (status) {
          case 'available':
            return 'bg-green-500';
          case 'occupied':
            return 'bg-red-500';
        }
      };
      
      const getStatusTextColor = (status) => {
        switch (status) {
          case 'available':
            return 'text-green-600';
          case 'occupied':
            return 'text-red-600';
        }
      };
      
      // Format currency
      const formatCurrency = (amount) => {
        if (!amount) return '0 ₫';
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
          minimumFractionDigits: 0
        }).format(amount);
      };
      
      // Add table animation effects
      onMounted(() => {
        // Add staggered animation to tables when they appear
        const addTableAnimations = () => {
          const tableItems = document.querySelectorAll('.table-item');
          tableItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px) scale(0.95)';
            
            setTimeout(() => {
              item.style.transition = 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0) scale(1)';
            }, 50 * index);
          });
        };
        
        // Call after tables are loaded
        setTimeout(addTableAnimations, 600);
      });
    }}
      </script>
      
      <style scoped>
      .restaurant-layout {
        background-image: radial-gradient(circle at 10% 20%, rgba(216, 241, 230, 0.46) 0%, rgba(233, 226, 248, 0.46) 90.1%);
      }
      
      .section-container {
        transition: all 0.3s ease;
      }
      
      .section-container:hover {
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.5s ease forwards;
      }
      
      /* List view styles */
      .table-list-view {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      
      .table-list-item {
        display: flex;
        align-items: center;
        padding: 0.75rem;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
      }
      
      .table-list-item:hover {
        background-color: rgba(255, 255, 255, 0.8);
        transform: translateX(5px);
      }
      </style>
