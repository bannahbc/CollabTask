



// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:8000/api/',
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access');
//   alert(token);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;
import axios from 'axios';
import { refreshAccessToken } from './refresh_auth';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  // alert(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refreshToken')
    ) {
      originalRequest._retry = true;
      try {
        const newAccess = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
        // Optionally redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
