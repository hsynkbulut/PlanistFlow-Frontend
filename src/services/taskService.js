import api, { TASK_ENDPOINTS } from './api';

const taskService = {
  getAllTasks: async () => {
    try {
      const response = await api.get(TASK_ENDPOINTS.ALL);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  getTaskById: async (id) => {
    try {
      const response = await api.get(TASK_ENDPOINTS.BY_ID(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching task with id ${id}:`, error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await api.post(TASK_ENDPOINTS.ALL, taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(TASK_ENDPOINTS.BY_ID(id), taskData);
      return response.data;
    } catch (error) {
      console.error(`Error updating task with id ${id}:`, error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(TASK_ENDPOINTS.BY_ID(id));
      return true;
    } catch (error) {
      console.error(`Error deleting task with id ${id}:`, error);
      throw error;
    }
  }
};

export default taskService; 