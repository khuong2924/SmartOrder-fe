import axios from 'axios';
import { API_CONFIG } from './apiConfig';


const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080/kitchen'
  : API_CONFIG.KITCHEN_API_URL;

console.log('Order Service API URL:', API_URL);

class OrderService {
  // Fetch all orders
  async getOrders() {
    try {
      const response = await axios.get(`${API_URL}/orders`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  // Fetch pending orders
  async getPendingOrders() {
    try {
      const response = await axios.get(`${API_URL}/orders/pending`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pending orders:', error);
      throw error;
    }
  }

  // Fetch confirmed orders
  async getConfirmedOrders() {
    try {
      const response = await axios.get(`${API_URL}/orders/confirmed`);
      return response.data;
    } catch (error) {
      console.error('Error fetching confirmed orders:', error);
      throw error;
    }
  }

  // Fetch in-progress orders
  async getInProgressOrders() {
    try {
      const response = await axios.get(`${API_URL}/orders/in-progress`);
      return response.data;
    } catch (error) {
      console.error('Error fetching in-progress orders:', error);
      throw error;
    }
  }

  // New method for ready orders
  async getReadyOrders() {
    try {
      const response = await axios.get(`${API_URL}/orders/ready`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ready orders:', error);
      throw error;
    }
  }

  // Start order (move from CONFIRMED to IN_PROGRESS)
  async startOrder(orderId) {
    try {
      const response = await axios.post(`${API_URL}/orders/${orderId}/start`);
      return response.data;
    } catch (error) {
      console.error('Error starting order:', error);
      throw error;
    }
  }

  // Mark order as ready
  async markOrderReady(orderId) {
    try {
      const response = await axios.post(`${API_URL}/orders/${orderId}/ready`);
      return response.data;
    } catch (error) {
      console.error('Error marking order as ready:', error);
      throw error;
    }
  }

  // Mark order item as completed
  async completeOrderItem(orderItemId) {
    try {
      const response = await axios.put(`${API_URL}/orders/items/status`, {
        orderItemId: orderItemId,
        status: "COMPLETED"
      });
      return response.data;
    } catch (error) {
      console.error('Error completing order item:', error);
      throw error;
    }
  }

  // Confirm order
  async confirmOrder(orderId) {
    try {
      const response = await axios.post(`${API_URL}/orders/${orderId}/confirm`);
      return response.data;
    } catch (error) {
      console.error('Error confirming order:', error);
      throw error;
    }
  }

  // Reject order
  async rejectOrder(orderId, reason) {
    try {
      const response = await axios.post(`${API_URL}/orders/${orderId}/reject`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error rejecting order:', error);
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(orderId, status) {
    try {
      // Giả lập API call vì endpoint chưa tồn tại
      console.log(`Would update order ${orderId} to status ${status}`);
      // Trả về thành công để UI có thể cập nhật
      return { success: true };
    } catch (error) {
      console.error(`Error updating order status to ${status}:`, error);
      throw error;
    }
  }

  // Update order item status
  async updateOrderItemStatus(orderItemId, status) {
    try {
      // Giả lập API call vì endpoint chưa tồn tại
      console.log(`Would update order item ${orderItemId} to status ${status}`);
      // Trả về thành công để UI có thể cập nhật
      return { success: true };
    } catch (error) {
      console.error(`Error updating order item status to ${status}:`, error);
      throw error;
    }
  }
}

export default new OrderService();