import axios from 'axios'

const API_URL = 'http://localhost/identity/auth'

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        username,
        password
      })
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('token', response.data.token)
      }
      return response.data
    } catch (error) {
      throw error
    }
  }

  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('selectedTable')
    localStorage.removeItem('currentTableNumber')
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isAuthenticated() {
    return !!this.getToken()
  }

  hasRole(role) {
    const user = this.getCurrentUser()
    return user && user.roles && user.roles.includes(role)
  }

  isWaiter() {
    return this.hasRole('ROLE_WAITER')
  }

  isManager() {
    return this.hasRole('ROLE_MANAGER')
  }


  // Helper method to set auth header
  setAuthHeader() {
    const token = this.getToken()
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }
}

export default new AuthService()