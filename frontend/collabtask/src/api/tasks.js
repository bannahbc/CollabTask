// src/api/tasks.js
import api from './axios';

export const createTask = async (taskData) => {
  const response = await api.post('/tasks/create/', taskData);
  return response.data;
};
