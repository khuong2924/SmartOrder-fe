import axios from 'axios';
import { API_CONFIG } from './apiConfig';

const API_URL = API_CONFIG.DOMAIN2_API_URL;

class CartService {
  /**
   * Create a new cart
   * @param {number} tableId - The ID of the table
   * @param {string} userId - The ID of the user
   * @returns {Promise<Object>} - The created cart
   */
  async createCart(tableId, userId) {
    try {
      console.log(`Creating cart for table ${tableId} and user ${userId}`);
      
      const payload = { tableId, userId };
      console.log('Create cart payload:', payload);
      
      const response = await axios.post(`${API_URL}/carts`, payload);
      
      console.log('Cart created successfully:', response.data);
      
      if (response.data && response.data.id) {
        localStorage.setItem('currentCartId', response.data.id);
        console.log('Saved cart ID to localStorage:', response.data.id);
      } else {
        console.warn('Cart created but no ID returned:', response.data);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error creating cart:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      throw error;
    }
  }

  /**
   * Get cart by ID
   * @param {string} cartId - The ID of the cart
   * @returns {Promise<Object>} - The cart data
   */
  async getCart(cartId) {
    try {
      console.log(`Fetching cart with ID: ${cartId}`);
      const response = await axios.get(`${API_URL}/carts/${cartId}`);
      console.log('Cart data received:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching cart with ID ${cartId}:`, error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      throw error;
    }
  }

  /**
   * Add item to cart
   * @param {string} cartId - The ID of the cart
   * @param {Object} item - The item to add
   * @returns {Promise<Object>} - The added cart item
   */
  async addItemToCart(cartId, item) {
    try {
      // Log the request payload for debugging
      console.log('Adding item to cart with payload:', {
        menuItemId: item.id,
        quantity: item.quantity,
        specialNotes: item.note || ''
      });
      
      // Try with a different format - the API might expect a different structure
      const payload = {
        menuItemId: item.id,
        quantity: item.quantity,
        specialNotes: item.note || ''
      };
      
      console.log(`Sending request to ${API_URL}/carts/${cartId}/items with payload:`, payload);
      
      const response = await axios.post(`${API_URL}/carts/${cartId}/items`, payload);
      
      console.log('Cart item added successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Log more details about the error
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      throw error;
    }
  }

  /**
   * Update cart item quantity
   * @param {string} cartId - The ID of the cart
   * @param {string} itemId - The ID of the cart item
   * @param {number} quantity - The new quantity
   * @returns {Promise<Object>} - The updated cart item
   */
  async updateCartItemQuantity(cartId, itemId, quantity) {
    try {
      const response = await axios.put(`${API_URL}/carts/${cartId}/items/${itemId}`, {
        quantity
      });
      
      return response.data;
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      throw error;
    }
  }

  /**
   * Remove item from cart
   * @param {string} cartId - The ID of the cart
   * @param {string} itemId - The ID of the cart item
   * @returns {Promise<void>}
   */
  async removeCartItem(cartId, itemId) {
    try {
      await axios.delete(`${API_URL}/carts/${cartId}/items/${itemId}`);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  }

  /**
   * Checkout cart
   * @param {string} cartId - The ID of the cart
   * @param {number} tableId - The ID of the table
   * @param {string} waiterId - The ID of the waiter
   * @returns {Promise<Object>} - The created order
   */
  async checkout(cartId, tableId, waiterId) {
    try {
      const response = await axios.post(`${API_URL}/carts/${cartId}/checkout`, {
        tableId,
        waiterId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error checking out cart:', error);
      throw error;
    }
  }

  /**
   * Transform API cart items to match the app's format
   * @param {Array} apiCartItems - The cart items from the API
   * @returns {Array} - Transformed cart items
   */
  transformCartItems(apiCartItems) {
    return apiCartItems.map(item => ({
      id: item.menuItem.id,
      cartItemId: item.id,
      name: item.menuItem.name,
      price: item.menuItem.price,
      image: item.menuItem.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjWFxirpXQpbMIJJKsVkJdosxGdy3oyQHYEA&s',
      quantity: item.quantity,
      note: item.specialNotes || ''
    }));
  }
}

export default new CartService();