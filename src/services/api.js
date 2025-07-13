import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for global error handling or token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error is due to an expired or invalid token (401 Unauthorized)
    // and if it's not a login attempt itself
    if (error.response && error.response.status === 401 && !error.config.url.includes('/auth/login')) {
      // Potentially dispatch a logout action here if you had Redux/Zustand
      // For now, rely on AuthContext and manual logout from UI
      // Or if you want immediate logout:
      // localStorage.removeItem('user');
      // localStorage.removeItem('token');
      // window.location.href = '/login'; // Force redirect to login
      // toast.error('Session expired. Please log in again.');
    }
    return Promise.reject(error);
  }
);

export default api;