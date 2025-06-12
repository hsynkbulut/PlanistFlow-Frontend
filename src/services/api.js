import axios from 'axios';

// API URL'lerini sabitleri
export const API_BASE_URL = 'http://localhost:8080/api/v1';
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
};

export const USER_ENDPOINTS = {
  ME: `${API_BASE_URL}/users/me`,
};

export const TASK_ENDPOINTS = {
  ALL: `${API_BASE_URL}/tasks`,
  BY_ID: (id) => `${API_BASE_URL}/tasks/${id}`,
};

// Kimlik doğrulamalı istekler için axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek gönderilmeden önce token'ı ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api; 