// src/api/auth.js
import api from './axios';

export const loginUser = async (username, password) => {
  const response = await api.post('/auth/login/', { username, password });
  const { access, refresh } = response.data;
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
  api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
};
