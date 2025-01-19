import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: null
  }),

  actions: {
    login(token) {
      this.isAuthenticated = true
      this.token = token
      localStorage.setItem('token', token)
      router.push('/')
    },

    logout() {
      this.isAuthenticated = false
      this.token = null
      localStorage.removeItem('token')
      router.push('/login')
    },

    checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.isAuthenticated = true
        this.token = token
      } else {
        this.isAuthenticated = false
        router.push('/login')
      }
    }
  }
}) 