<template>
  <div>
  

    <!-- Main content -->
    <div class="">
      <TableList 
        @select-table="selectTable"
        @occupied-table-action="handleOccupiedTable"
      />

      <!-- Modal for occupied table options -->
      <div v-if="showOccupiedOptions" class="modal">
        <div class="modal-content">
          <h3>Table {{ selectedOccupiedTable?.number }} Options</h3>
          <button @click="continueOrdering">Continue Ordering</button>
          <button @click="openBillForm">Create Bill</button>
          <button @click="closeOccupiedOptions">Cancel</button>
        </div>
      </div>

      <!-- Modal for bill creation -->
      <div v-if="showBillForm" class="modal">
        <div class="modal-content">
          <h3>Create Bill for Table {{ selectedOccupiedTable?.number }}</h3>
          <input v-model="billNote" placeholder="Note" />
          <select v-model="paymentMethod">
            <option value="CASH">Cash</option>
            <option value="CARD">Card</option>
          </select>
          <button @click="createBill">Submit</button>
          <button @click="closeBillForm">Cancel</button>
        </div>
      </div>

      <!-- Modal for bill details -->
      <div v-if="showBillDetails" class="modal">
        <div class="modal-content">
          <h3>Bill Details</h3>
          <div>Bill ID: {{ billDetails.billId }}</div>
          <div>Table Number: {{ billDetails.tableNumber }}</div>
          <div>Included Orders: <pre>{{ billDetails.includedOrders }}</pre></div>
          <div>Total Amount: {{ billDetails.totalAmount }}</div>
          <div>Payment Method: {{ billDetails.paymentMethod }}</div>
          <div>Payment Status: {{ billDetails.paymentStatus }}</div>
          <div>Created At: {{ billDetails.createdAt }}</div>
          <div>Note: {{ billDetails.note }}</div>
          <button @click="closeBillDetails">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TableList from '../components/table/TableList.vue';
import axios from 'axios';

const router = useRouter();

const showOccupiedOptions = ref(false);
const selectedOccupiedTable = ref(null);
const showBillForm = ref(false);
const billNote = ref('');
const paymentMethod = ref('CASH');
const showBillDetails = ref(false);
const billDetails = ref({});

const handleOccupiedTable = (table) => {
  selectedOccupiedTable.value = table;
  showOccupiedOptions.value = true;
};

const closeOccupiedOptions = () => {
  showOccupiedOptions.value = false;
  selectedOccupiedTable.value = null;
};

const continueOrdering = () => {
  // Save selected table and go to menu/home
  localStorage.setItem('selectedTable', JSON.stringify(selectedOccupiedTable.value));
  localStorage.setItem('currentTableNumber', selectedOccupiedTable.value.number);
  router.push('/');
  closeOccupiedOptions();
};

const openBillForm = () => {
  showBillForm.value = true;
  showOccupiedOptions.value = false;
};

const closeBillForm = () => {
  showBillForm.value = false;
};

const createBill = async () => {
  try {
    const waiterId = localStorage.getItem('userId');
    const payload = {
      tableNumber: selectedOccupiedTable.value.number,
      waiterId,
      note: billNote.value,
      paymentMethod: paymentMethod.value,
    };
    const response = await axios.post('http://localhost:8080/domain2/api/bills', payload);
    billDetails.value = {
      billId: response.data.id,
      tableNumber: response.data.table.tableNumber,
      includedOrders: response.data.includedOrders,
      totalAmount: response.data.totalAmount,
      paymentMethod: response.data.paymentMethod,
      paymentStatus: response.data.paymentStatus,
      createdAt: response.data.createdAt,
      note: response.data.note,
    };
    showBillForm.value = false;
    showBillDetails.value = true;
  } catch (error) {
    alert('Failed to create bill');
  }
};

const closeBillDetails = () => {
  showBillDetails.value = false;
};

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