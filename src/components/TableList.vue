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
              <div v-for="table in vipTables" :key="table.id" @click="selectTable(table)" class="cursor-pointer">
                <TableItem :table="table" :selected="selectedTable?.id === table.id" />
              </div>
            </div>
          </div>
          
          <!-- Regular Section -->
          <div class="section-container w-full lg:w-[calc(50%-1rem)] border border-dashed border-blue-300 rounded-xl p-4 bg-blue-50/50">
            <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <i class="fas fa-users text-blue-500 mr-2"></i> Khu vực thường
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div v-for="table in regularTables" :key="table.id" @click="selectTable(table)" class="cursor-pointer">
                <TableItem :table="table" :selected="selectedTable?.id === table.id" />
              </div>
            </div>
          </div>
          
          <!-- Outdoor Section -->
          <div class="section-container w-full border border-dashed border-green-300 rounded-xl p-4 bg-green-50/50">
            <h3 class="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <i class="fas fa-tree text-green-500 mr-2"></i> Khu vực ngoài trời
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div v-for="table in outdoorTables" :key="table.id" @click="selectTable(table)" class="cursor-pointer">
                <TableItem :table="table" :selected="selectedTable?.id === table.id" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Selected table details -->
      <div v-if="selectedTable" class="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-500 animate-fadeIn">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-2xl font-bold text-gray-800">Bàn #{{ selectedTable.number }}</h3>
            <p class="text-gray-600 mt-1">{{ selectedTable.section }} • {{ selectedTable.capacity }} người</p>
            
            <div class="mt-4 flex items-center">
              <div class="w-3 h-3 rounded-full mr-2" :class="getStatusColor(selectedTable.status)"></div>
              <span class="font-medium" :class="getStatusTextColor(selectedTable.status)">
                {{ getStatusText(selectedTable.status) }}
              </span>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <button 
              v-if="selectedTable.status === 'available'"
              @click="confirmTableSelection"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center"
            >
              <i class="fas fa-check-circle mr-2"></i>
              Chọn bàn này
            </button>
            
            <button 
              v-if="selectedTable.status === 'available'"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center"
            >
              <i class="fas fa-utensils mr-2"></i>
              Đặt bàn
            </button>
            
            <button 
              v-if="selectedTable.status === 'occupied'"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center"
            >
              <i class="fas fa-receipt mr-2"></i>
              Thanh toán
            </button>
            
           
          </div>
        </div>
        
        <div v-if="selectedTable.status === 'occupied'" class="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 class="font-medium text-gray-700 mb-2">Thông tin đơn hàng</h4>
          <div class="flex justify-between text-sm text-gray-600 mb-1">
            <span>Thời gian bắt đầu:</span>
            <span>{{ selectedTable.orderInfo?.startTime }}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600 mb-1">
            <span>Số món:</span>
            <span>{{ selectedTable.orderInfo?.itemCount }} món</span>
          </div>
          <div class="flex justify-between text-sm font-medium text-gray-800">
            <span>Tổng tiền:</span>
            <span>{{ formatCurrency(selectedTable.orderInfo?.totalAmount) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineEmits } from 'vue';
import TableItem from './TableItem.vue';

// Define emits
const emit = defineEmits(['select-table']);

// State
const tables = ref([]);
const selectedTable = ref(null);
const showFilter = ref(false);
const viewMode = ref('grid');
const filters = ref({
  available: true,
  occupied: true
});

// Fetch tables data
onMounted(async () => {
  try {
    // Simulate API call
    // In a real app, you would fetch from your backend
    // const response = await axios.get('http://localhost:8081/api/tables');
    // tables.value = response.data;
    
    // Mock data for demonstration
    setTimeout(() => {
      tables.value = generateMockTables();
    }, 500);
  } catch (error) {
    console.error('Error fetching tables:', error);
  }
});

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

// Thêm phương thức xác nhận chọn bàn
const confirmTableSelection = () => {
  if (selectedTable.value) {
    emit('select-table', selectedTable.value);
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