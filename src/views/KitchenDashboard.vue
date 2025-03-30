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
              All ({{ orders.length }})
            </button>
            <button 
              class="filter-btn" 
              :class="{ active: activeFilter === 'new' }"
              @click="activeFilter = 'new'"
            >
              New ({{ newOrdersCount }})
            </button>
            <button 
              class="filter-btn" 
              :class="{ active: activeFilter === 'in-progress' }"
              @click="activeFilter = 'in-progress'"
            >
              In Progress ({{ inProgressOrdersCount }})
            </button>
            <button 
              class="filter-btn" 
              :class="{ active: activeFilter === 'ready' }"
              @click="activeFilter = 'ready'"
            >
              Ready ({{ readyOrdersCount }})
            </button>
          </div>
        </div>

        <div class="orders-grid">
          <TransitionGroup name="order-card">
            <OrderCardComponent
              v-for="order in filteredOrders"
              :key="order.id"
              :order="order"
              @start-order="openStartModal"
              @complete-order="openCompleteModal"
              @deliver-order="openDeliverModal"
            />
          </TransitionGroup>
        </div>
      </main>
    </div>

    <ConfirmModalComponent
      :show="showConfirmModal"
      :title="confirmModalTitle"
      :message="confirmMessage"
      :action="confirmAction"
      :order="selectedOrder"
      @close="closeModal"
      @confirm="confirmAction === 'start' ? confirmStartOrder() : confirmAction === 'complete' ? confirmCompleteOrder() : confirmDeliverOrder()"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import HeaderComponent from '../components/kitchen/HeaderComponent.vue';
import SidebarComponent from '../components/kitchen/SidebarComponent.vue';
import OrderCardComponent from '../components/kitchen/OrderCardComponent.vue';
import ConfirmModalComponent from '../components/kitchen/ConfirmModalComponent.vue';

// Sample orders data
const orders = ref([
  {
    id: 1,
    tableNumber: 5,
    orderTime: new Date(Date.now() - 2 * 60000),
    status: 'new',
    items: [
      { id: 1, name: 'Phở Bò Đặc Biệt', quantity: 2, notes: 'Không hành' },
      { id: 2, name: 'Chả Giò', quantity: 1, notes: '' },
      { id: 3, name: 'Cà Phê Sữa Đá', quantity: 2, notes: 'Ít đường' }
    ]
  },
  {
    id: 2,
    tableNumber: 8,
    orderTime: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    status: 'in-progress',
    items: [
      { id: 4, name: 'Bún Chả', quantity: 1, notes: '' },
      { id: 5, name: 'Gỏi Cuốn', quantity: 2, notes: 'Không tôm' },
      { id: 6, name: 'Trà Đá', quantity: 3, notes: '' }
    ]
  },
  {
    id: 3,
    tableNumber: 3,
    orderTime: new Date(Date.now() - 25 * 60000), // 25 minutes ago
    status: 'ready',
    items: [
      { id: 7, name: 'Cơm Tấm Sườn', quantity: 1, notes: 'Thêm trứng' },
      { id: 8, name: 'Canh Chua', quantity: 1, notes: '' }
    ]
  },
  {
    id: 4,
    tableNumber: 12,
    orderTime: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    status: 'new',
    items: [
      { id: 9, name: 'Bánh Xèo', quantity: 1, notes: '' },
      { id: 10, name: 'Lẩu Thái', quantity: 1, notes: 'Cay vừa' },
      { id: 11, name: 'Nước Chanh', quantity: 2, notes: '' }
    ]
  }
]);

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
const newOrdersCount = computed(() => 
  orders.value.filter(order => order.status === 'new').length
);

const inProgressOrdersCount = computed(() => 
  orders.value.filter(order => order.status === 'in-progress').length
);

const readyOrdersCount = computed(() => 
  orders.value.filter(order => order.status === 'ready').length
);

const hasNotifications = computed(() => newOrdersCount.value > 0);

// Filtered orders based on active filter
const filteredOrders = computed(() => {
  if (activeFilter.value === 'all') return orders.value;
  return orders.value.filter(order => order.status === activeFilter.value);
});

// Order status management
const startOrder = (orderId) => {
  const order = orders.value.find(o => o.id === orderId);
  if (order) {
    order.status = 'in-progress';
  }
};

const completeOrder = (orderId) => {
  const order = orders.value.find(o => o.id === orderId);
  if (order) {
    order.status = 'ready';
  }
};

const deliverOrder = (orderId) => {
  orders.value = orders.value.filter(o => o.id !== orderId);
};

// Toggle menu item availability
const toggleItemAvailability = ({ categoryId, itemId }) => {
  const category = menuCategories.value.find(c => c.id === categoryId);
  if (category) {
    const item = category.items.find(i => i.id === itemId);
    if (item) {
      item.available = !item.available;
    }
  }
};

// Add a new order periodically for demo purposes
onMounted(() => {
  setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance of new order
      const newOrder = {
        id: Date.now(),
        tableNumber: Math.floor(Math.random() * 20) + 1,
        orderTime: new Date(),
        status: 'new',
        items: [
          { 
            id: Date.now() + 1, 
            name: 'Phở Bò', 
            quantity: Math.floor(Math.random() * 3) + 1, 
            notes: Math.random() > 0.5 ? 'Không hành' : '' 
          },
          { 
            id: Date.now() + 2, 
            name: 'Cà Phê Sữa Đá', 
            quantity: 1, 
            notes: '' 
          }
        ]
      };
      orders.value.push(newOrder);
    }
  }, 30000); // Every 30 seconds
});

// Modal state
const showConfirmModal = ref(false);
const confirmModalTitle = ref('');
const confirmMessage = ref('');
const confirmAction = ref('');
const selectedOrder = ref(null);

// Modal functions
const openStartModal = (order) => {
  selectedOrder.value = order;
  confirmModalTitle.value = 'Start Preparing Order';
  confirmMessage.value = 'Are you sure you want to start preparing this order?';
  confirmAction.value = 'start';
  showConfirmModal.value = true;
};

const openCompleteModal = (order) => {
  selectedOrder.value = order;
  confirmModalTitle.value = 'Mark Order as Ready';
  confirmMessage.value = 'Confirm that all items in this order are prepared and ready to be served?';
  confirmAction.value = 'complete';
  showConfirmModal.value = true;
};

const openDeliverModal = (order) => {
  selectedOrder.value = order;
  confirmModalTitle.value = 'Confirm Delivery';
  confirmMessage.value = 'Confirm that this order has been delivered to the table?';
  confirmAction.value = 'deliver';
  showConfirmModal.value = true;
};

const closeModal = () => {
  showConfirmModal.value = false;
  selectedOrder.value = null;
};

const confirmStartOrder = () => {
  if (selectedOrder.value) {
    startOrder(selectedOrder.value.id);
    closeModal();
  }
};

const confirmCompleteOrder = () => {
  if (selectedOrder.value) {
    completeOrder(selectedOrder.value.id);
    closeModal();
  }
};

const confirmDeliverOrder = () => {
  if (selectedOrder.value) {
    deliverOrder(selectedOrder.value.id);
    closeModal();
  }
};
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
  gap: 0.5rem;
}

.filter-btn {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: #018ABE;
  color: #018ABE;
}

.filter-btn.active {
  background-color: #018ABE;
  color: white;
  border-color: #018ABE;
}

/* Orders grid */
.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
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