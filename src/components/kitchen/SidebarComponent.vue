<template>
  <div class="sidebar-container">
    <aside class="sidebar">
      <nav>
        <button class="nav-item" :class="{ active: activeTab === 'orders' }" @click="setActiveTab('orders')">
          <ClipboardList />
          <span>Đơn hàng</span>
        </button>
        <button class="nav-item" :class="{ active: activeTab === 'menu' }" @click="setActiveTab('menu')">
          <BookOpen />
          <span>Menu</span>
        </button>
        <button class="nav-item" :class="{ active: activeTab === 'history' }" @click="setActiveTab('history')">
          <History />
          <span>Lịch sử</span>
        </button>
        <button class="nav-item" :class="{ active: activeTab === 'settings' }" @click="setActiveTab('settings')">
          <Settings />
          <span>Cài đặt</span>
        </button>
      </nav>
    </aside>

    <aside class="menu-status" v-show="activeTab === 'menu'">
      <div class="section-header">
        <h2>Menu Status</h2>
        <div class="header-actions">
          <button class="refresh-btn" title="Refresh menu status">
            <RefreshCw class="refresh-icon" />
          </button>
          <button class="close-btn" title="Close menu panel" @click="closeMenuPanel">
            <X class="close-icon" />
          </button>
        </div>
      </div>
      
      <div class="menu-categories">
        <div v-for="category in menuCategories" :key="category.id" class="menu-category">
          <h3>{{ category.name }}</h3>
          <div class="menu-items">
            <div v-for="item in category.items" :key="item.id" class="menu-item">
              <span class="item-name">{{ item.name }}</span>
              <label class="toggle">
                <input 
                  type="checkbox" 
                  :checked="item.available" 
                  @change="toggleItemAvailability(category.id, item.id)"
                />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ClipboardList, BookOpen, History, Settings, RefreshCw, X } from 'lucide-vue-next';

const props = defineProps({
  menuCategories: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['toggle-item-availability', 'change-tab']);

const activeTab = ref('orders');

const setActiveTab = (tab) => {
  activeTab.value = tab;
  emit('change-tab', tab);
};

const closeMenuPanel = () => {
  activeTab.value = 'orders';
  emit('change-tab', 'orders');
};

const toggleItemAvailability = (categoryId, itemId) => {
  emit('toggle-item-availability', { categoryId, itemId });
};
</script>

<style scoped>
.sidebar-container {
  display: contents;
}

/* Sidebar styles */
.sidebar {
  background-color: white;
  padding: 1.5rem 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  width: 100%;
  color: #64748b;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 0.5rem;
}

.nav-item span {
  font-size: 0.75rem;
}

.nav-item:hover {
  color: #018ABE;
}

.nav-item.active {
  color: #018ABE;
  position: relative;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60%;
  background-color: #018ABE;
  border-radius: 0 4px 4px 0;
}

/* Menu status sidebar */
.menu-status {
  background-color: white;
  padding: 1.5rem;
  border-left: 1px solid #e2e8f0;
  overflow-y: auto;
  position: absolute;
  right: 0;
  top: 70px;
  bottom: 0;
  width: 300px;
  z-index: 5;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f1f5f9;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.refresh-btn, .close-btn {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.refresh-btn:hover, .close-btn:hover {
  background-color: #f1f5f9;
  color: #018ABE;
}

.close-btn:hover {
  color: #EF476F;
}

.refresh-icon, .close-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.menu-category {
  margin-bottom: 1.5rem;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
}

.menu-category h3 {
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #334155;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background-color: #f1f5f9;
}

.menu-item:last-child {
  border-bottom: none;
}

.item-name {
  font-size: 0.9rem;
}

/* Toggle switch */
.toggle {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e2e8f0;
  transition: .4s;
  border-radius: 20px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #018ABE;
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .menu-status {
    width: 250px;
  }
}

@media (max-width: 768px) {
  .menu-status {
    width: 100%;
  }
}
</style>