import axios from 'axios';
import { AUTH_ENDPOINTS } from './api';

// Kimlik doğrulama servisi
const authService = {
  // Kullanıcı girişi
  login: async (username, password) => {
    try {
      const response = await axios.post(AUTH_ENDPOINTS.LOGIN, { username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Kullanıcı kaydı
  register: async (userData) => {
    try {
      const response = await axios.post(AUTH_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  // Kullanıcı çıkışı
  logout: () => {
    localStorage.removeItem('token');
  },

  // Token kontrolü
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },

  // Token'ı getir
  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default authService; 