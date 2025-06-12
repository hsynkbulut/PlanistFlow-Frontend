import api, { USER_ENDPOINTS } from './api';

const userService = {
  getCurrentUser: async () => {
    try {
      const response = await api.get(USER_ENDPOINTS.ME);
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  updateCurrentUser: async (userData) => {
    try {
      const response = await api.put(USER_ENDPOINTS.ME, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

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