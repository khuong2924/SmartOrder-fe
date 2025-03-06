<template>
  <div>
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-indigo-900/95 to-purple-900/95 shadow-lg">
      <nav class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <a href="#" class="flex items-center space-x-3 group">
            <i class="fas fa-utensils text-2xl text-white"></i>
            <span class="text-2xl font-svn-avo-bold tracking-wider text-white">
              Nhà hàng Ngon
            </span>
          </a>

          <!-- Right Section -->
          <div class="flex items-center space-x-6">
            <button @click="logout" class="flex items-center space-x-2 p-2 rounded-full transition-all duration-300 group bg-white/10 hover:bg-white/20">
              <div class="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <i class="fas fa-sign-out-alt text-white"></i>
              </div>
              <span class="text-white/90 group-hover:text-white">Đăng xuất</span>
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main content -->
    <div class="pt-24">
      <TableList @select-table="selectTable" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import TableList from '../components/TableList.vue';

const router = useRouter();

// Xử lý khi người dùng chọn bàn
const selectTable = (table) => {
  // Lưu thông tin bàn đã chọn vào localStorage
  localStorage.setItem('selectedTable', JSON.stringify(table));
  
  // Chuyển hướng về trang Home
  router.push('/');
};

// Xử lý đăng xuất
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('selectedTable');
  router.push('/login');
};
</script>