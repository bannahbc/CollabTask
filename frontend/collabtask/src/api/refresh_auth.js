import api from './axios';

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token found');

  const response = await api.post('/auth/refresh/', { refresh: refreshToken });
  const { access } = response.data;

  localStorage.setItem('accessToken', access);
  api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
  return access;
};
