import api, { USER_ENDPOINTS } from './api';

// Kullanıcı servisi
const userService = {
  // Mevcut kullanıcının bilgilerini getir
  getCurrentUser: async () => {
    try {
      const response = await api.get(USER_ENDPOINTS.ME);
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  // Kullanıcı bilgilerini güncelle
  updateCurrentUser: async (userData) => {
    try {
      const response = await api.put(USER_ENDPOINTS.ME, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Kullanıcı hesabını sil
  deleteCurrentUser: async () => {
    try {
      await api.delete(USER_ENDPOINTS.ME);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};

export default userService; 