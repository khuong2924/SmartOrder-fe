<template>
  <div class="kitchen-dashboard">
    <HeaderComponent :has-notifications="hasNotifications" />

    <div class="dashboard-content" :class="{ 'menu-open': activeTab === 'menu' }">
      <SidebarComponent 
        :menu-categories="menuCategories"
        @toggle-item-availability="toggleItemAvailability"
        @change-tab="handleTabChange"
      />

      <main class="main-content">
        <div class="section-header">
          <h2>Active Orders</h2>
          <div class="filters">
            <button 
              class="filter-btn" 
              :class="{ active: activeFilter === 'all' }"
              @click="activeFilter = 'all'"
            >
              <span class="filter-icon">🍽️</span>
              <span class="filter-text">All</span>
              <span class="filter-count">{{ orders.length }}</span>
            </button>
            <button 
              class="filter-btn" 
              :class="{ active: activeFilter === 'PENDING' }"
              @click="activeFilter = 'PENDING'"
            >
              <span class="filter-icon">⏳</span>
              <span class="filter-text">Pending</span>
              <span class="filter-count">{{ pendingOrdersCount }}</span>
            </button>
            <button 
              class="filter-btn" 
              :class="{ active: activeFilter === 'CONFIRMED' }"
              @click="activeFilter = 'CONFIRMED'"
            >
              <span class="filter-icon">✅</span>
              <span class="filter-text">Confirmed</span>
              <span class="filter-count">{{ confirmedOrdersCount }}</span>
            </button>
            <button 
              class="filter-btn" 
              :class="{ active: activeFilter === 'IN_PROGRESS' }"
              @click="activeFilter = 'IN_PROGRESS'"
            >
              <span class="filter-icon">👨‍🍳</span>
              <span class="filter-text">In Progress</span>
              <span class="filter-count">{{ inProgressOrdersCount }}</span>
            </button>
            <button 
              class="filter-btn" 
              :class="{ active: activeFilter === 'READY' }"
              @click="activeFilter = 'READY'"
            >
              <span class="filter-icon">🔔</span>
              <span class="filter-text">Ready</span>
              <span class="filter-count">{{ readyOrdersCount }}</span>
            </button>
          </div>
        </div>

        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>Đang tải đơn hàng...</p>
        </div>

        <div v-else-if="filteredOrders.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <p>Không có đơn hàng nào {{ activeFilter !== 'all' ? `ở trạng thái ${activeFilter}` : '' }}</p>
        </div>

        <div v-else class="orders-grid">
          <TransitionGroup name="order-card">
            <OrderCardComponent
              v-for="order in filteredOrders"
              :key="order.id"
              :order="order"
              @confirm-order="openConfirmModal"
              @reject-order="openRejectModal"
              @start-order="openStartModal"
              @ready-order="openReadyModal"
              @deliver-order="openDeliverModal"
              @complete-item="handleCompleteItem"
            />
          </TransitionGroup>
        </div>
      </main>
    </div>

    <!-- Confirm Modal -->
    <ConfirmModalComponent
      :show="showConfirmModal"
      :title="confirmModalTitle"
      :message="confirmMessage"
      :action="confirmActionType"
      :order="selectedOrder"
      @close="closeModal"
      @confirm="confirmAction"
    />

    <!-- Reject Modal -->
    <RejectModalComponent
      :show="showRejectModal"
      :title="'Từ chối đơn hàng'"
      :order="selectedOrder"
      @close="closeRejectModal"
      @confirm-reject="handleRejectOrder"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import HeaderComponent from '../components/kitchen/HeaderComponent.vue';
import SidebarComponent from '../components/kitchen/SidebarComponent.vue';
import OrderCardComponent from '../components/kitchen/OrderCardComponent.vue';
import ConfirmModalComponent from '../components/kitchen/ConfirmModalComponent.vue';
import RejectModalComponent from '../components/kitchen/RejectModalComponent.vue';
import orderService from '../api/orderService.js';

// Orders data
const orders = ref([]);
const isLoading = ref(true);

// Menu categories and items
const menuCategories = ref([
  {
    id: 1,
    name: 'Appetizers',
    items: [
      { id: 1, name: 'Chả Giò', available: true },
      { id: 2, name: 'Gỏi Cuốn', available: true },
      { id: 3, name: 'Bánh Xèo', available: true }
    ]
  },
  {
    id: 2,
    name: 'Main Courses',
    items: [
      { id: 4, name: 'Phở Bò', available: true },
      { id: 5, name: 'Bún Chả', available: true },
      { id: 6, name: 'Cơm Tấm', available: true },
      { id: 7, name: 'Lẩu Thái', available: false }
    ]
  },
  {
    id: 3,
    name: 'Beverages',
    items: [
      { id: 8, name: 'Cà Phê Sữa Đá', available: true },
      { id: 9, name: 'Trà Đá', available: true },
      { id: 10, name: 'Nước Chanh', available: true }
    ]
  }
]);

// Active tab and filter
const activeTab = ref('orders');
const activeFilter = ref('all');

// Handle tab change
const handleTabChange = (tab) => {
  activeTab.value = tab;
};

// Computed properties for order counts
const pendingOrdersCount = computed(() => 
  orders.value.filter(order => order.status === 'PENDING').length
);

const confirmedOrdersCount = computed(() => 
  orders.value.filter(order => order.status === 'CONFIRMED').length
);

const inProgressOrdersCount = computed(() => 
  orders.value.filter(order => order.status === 'IN_PROGRESS').length
);

const readyOrdersCount = computed(() => 
  orders.value.filter(order => order.status === 'READY').length
);

const hasNotifications = computed(() => pendingOrdersCount.value > 0);

// Filtered orders based on active filter
const filteredOrders = computed(() => {
  if (activeFilter.value === 'all') return orders.value;
  return orders.value.filter(order => order.status === activeFilter.value);
});

// Modal state
const showConfirmModal = ref(false);
const showRejectModal = ref(false);
const confirmModalTitle = ref('');
const confirmMessage = ref('');
const confirmActionType = ref('');
const selectedOrder = ref(null);

// Fetch orders from API
const fetchOrders = async () => {
  try {
    isLoading.value = true;
    
    // Lấy đơn hàng dựa trên filter hiện tại
    let fetchedOrders = [];
    
    if (activeFilter.value === 'PENDING') {
      fetchedOrders = await orderService.getPendingOrders();
    } else if (activeFilter.value === 'CONFIRMED') {
      fetchedOrders = await orderService.getConfirmedOrders();
    } else if (activeFilter.value === 'IN_PROGRESS') {
      fetchedOrders = await orderService.getInProgressOrders();
    } else if (activeFilter.value === 'READY') {
      // Giả sử có API cho đơn hàng sẵn sàng
      fetchedOrders = await orderService.getReadyOrders();
    } else {
      // Nếu filter là 'all', lấy tất cả các loại đơn hàng
      const pendingOrders = await orderService.getPendingOrders();
      const confirmedOrders = await orderService.getConfirmedOrders();
      const inProgressOrders = await orderService.getInProgressOrders();
      const readyOrders = await orderService.getReadyOrders();
      
      fetchedOrders = [
        ...pendingOrders, 
        ...confirmedOrders, 
        ...inProgressOrders, 
        ...readyOrders
      ];
    }
    
    orders.value = fetchedOrders;
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching orders:', error);
    isLoading.value = false;
  }
};

// Modal functions
const openConfirmModal = (order) => {
  selectedOrder.value = order;
  confirmModalTitle.value = 'Xác nhận đơn hàng';
  confirmMessage.value = 'Xác nhận tiếp nhận đơn hàng này?';
  confirmActionType.value = 'confirm';
  showConfirmModal.value = true;
};

const openRejectModal = (order) => {
  selectedOrder.value = order;
  showRejectModal.value = true;
};

const closeRejectModal = () => {
  showRejectModal.value = false;
  selectedOrder.value = null;
};

const openStartModal = (order) => {
  selectedOrder.value = order;
  confirmModalTitle.value = 'Bắt đầu làm đơn hàng';
  confirmMessage.value = 'Xác nhận bắt đầu chuẩn bị đơn hàng này?';
  confirmActionType.value = 'start';
  showConfirmModal.value = true;
};

const openReadyModal = (order) => {
  selectedOrder.value = order;
  confirmModalTitle.value = 'Đơn hàng đã sẵn sàng';
  confirmMessage.value = 'Xác nhận đơn hàng đã được chuẩn bị xong và sẵn sàng để phục vụ?';
  confirmActionType.value = 'ready';
  showConfirmModal.value = true;
};

const openDeliverModal = (order) => {
  selectedOrder.value = order;
  confirmModalTitle.value = 'Giao món';
  confirmMessage.value = 'Xác nhận đơn hàng đã được giao đến khách hàng?';
  confirmActionType.value = 'deliver';
  showConfirmModal.value = true;
};

const closeModal = () => {
  showConfirmModal.value = false;
  selectedOrder.value = null;
};

// API functions to update order status
const confirmAction = async () => {
  if (!selectedOrder.value) return;
  
  try {
    switch (confirmActionType.value) {
      case 'confirm':
        await orderService.confirmOrder(selectedOrder.value.id);
        break;
      case 'start':
        await orderService.startOrder(selectedOrder.value.id);
        break;
      case 'ready':
        await orderService.markOrderReady(selectedOrder.value.id);
        break;
      case 'deliver':
        // Giả sử có API để đánh dấu đơn hàng đã giao
        await orderService.deliverOrder(selectedOrder.value.id);
        break;
    }
    
    // Refresh orders sau khi cập nhật trạng thái
    fetchOrders();
    closeModal();
  } catch (error) {
    console.error(`Error performing action ${confirmActionType.value}:`, error);
  }
};

// Xử lý từ chối đơn hàng
const handleRejectOrder = async (reason) => {
  if (!selectedOrder.value) return;
  
  try {
    await orderService.rejectOrder(selectedOrder.value.id, reason);
    // Refresh orders sau khi từ chối
    fetchOrders();
    closeRejectModal();
  } catch (error) {
    console.error('Error rejecting order:', error);
  }
};

// Xử lý hoàn thành một món trong đơn hàng
const handleCompleteItem = async ({ orderId, orderItemId }) => {
  try {
    await orderService.completeOrderItem(orderItemId);
    // Refresh orders sau khi cập nhật trạng thái món ăn
    fetchOrders();
  } catch (error) {
    console.error('Error completing order item:', error);
  }
};

// Watch activeFilter để fetch orders khi filter thay đổi
watch(activeFilter, () => {
  fetchOrders();
});

// Fetch orders khi component được mount và thiết lập polling
onMounted(() => {
  // Lấy đơn hàng khi component được mount
  fetchOrders();
  
  // Thiết lập interval để refresh đơn hàng mỗi 10 giây
  const intervalId = setInterval(() => {
    fetchOrders();
  }, 10000);
  
  // Cleanup interval khi component unmount
  onUnmounted(() => {
    clearInterval(intervalId);
  });
});
</script>

<style scoped>
/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.kitchen-dashboard {
  font-family: 'Roboto', sans-serif;
  background-color: #f5f7fa;
  min-height: 100vh;
  color: #333;
}

/* Dashboard content layout */
.dashboard-content {
  display: grid;
  grid-template-columns: 80px 1fr;
  min-height: calc(100vh - 70px);
  position: relative;
}

.dashboard-content.menu-open {
  grid-template-columns: 80px 1fr 300px;
}

/* Main content styles */
.main-content {
  padding: 1.5rem;
  overflow-y: auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: white;
  border: none;
  border-radius: 12px;
  padding: 0.6rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.filter-btn::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 0;
  background-color: #018ABE;
  transition: width 0.3s ease;
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.filter-btn:hover::before {
  width: 100%;
}

.filter-btn.active {
  background-color: #018ABE;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(1, 138, 190, 0.3);
}

.filter-btn.active::before {
  width: 100%;
  background-color: white;
}

.filter-icon {
  font-size: 1.1rem;
}

.filter-text {
  font-weight: 500;
}

.filter-count {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 0.15rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.filter-btn.active .filter-count {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Orders grid */
.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #64748b;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Transitions for order cards */
.order-card-enter-active,
.order-card-leave-active {
  transition: all 0.5s ease;
}

.order-card-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.order-card-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .dashboard-content.menu-open {
    grid-template-columns: 80px 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
  
  .orders-grid {
    grid-template-columns: 1fr;
  }
}
</style>