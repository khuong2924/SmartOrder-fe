import axios from 'axios';
import { API_CONFIG } from './apiConfig';


const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080/identity/auth'
  : API_CONFIG.AUTH_API_URL;

console.log('Auth API URL:', API_URL);

class AuthService {
  async login(username, password) {
    try {
      console.log('Sending login request to:', `${API_URL}/signin`);
      console.log('With payload:', { username, password });
      
      const response = await axios.post(`${API_URL}/signin`, {
        username,
        password
      });
      

      console.log('Login response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.id);

        this.setAuthHeader();
        
        const selectedTable = localStorage.getItem('selectedTable');
        if (selectedTable && this.isWaiter()) {
          try {
            const cartResponse = await axios.post(`${API_CONFIG.DOMAIN2_API_URL}/carts`, {
              tableId: JSON.parse(selectedTable).id,
              userId: response.data.id
            });
            
            if (cartResponse.data && cartResponse.data.id) {
              localStorage.setItem('currentCartId', cartResponse.data.id);
            }
          } catch (cartError) {
            console.error('Error creating cart after login:', cartError);
          }
        }
      }
      return response.data;
    } catch (error) {
      console.error('Login error details:', error.response?.data || error.message);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('selectedTable');
    localStorage.removeItem('currentTableNumber');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.roles && user.roles.includes(role);
  }

  isWaiter() {
    return this.hasRole('ROLE_WAITER');
  }

  isManager() {
    return this.hasRole('ROLE_MANAGER');
  }

  isKitchen() {
    return this.hasRole('ROLE_KITCHEN_STAFF');
  }

  setAuthHeader() {
    const token = this.getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
}

export default new AuthService();