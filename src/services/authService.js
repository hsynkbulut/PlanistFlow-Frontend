import axios from 'axios';
import { AUTH_ENDPOINTS } from './api';

const authService = {
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

  register: async (userData) => {
    try {
      const response = await axios.post(AUTH_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default authService; 