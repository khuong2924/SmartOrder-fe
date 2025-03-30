<template>
  <div>
  

    <!-- Main content -->
    <div class="">
      <TableList @select-table="selectTable" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import TableList from '../components/table/TableList.vue';


const router = useRouter();

// Define menu items for the header
const menuItems = [
  { href: "/", text: "Trang chủ" },
  { href: "/tables", text: "Quản lý bàn" }
];

// Handle table selection
const selectTable = (table) => {
  // Save selected table to localStorage
  localStorage.setItem('selectedTable', JSON.stringify(table));
  localStorage.setItem('currentTableNumber', table.number);
  
  // Redirect to Home page
  router.push('/');
};

// Handle logout
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('selectedTable');
  localStorage.removeItem('currentTableNumber');
  router.push('/login');
};
</script>