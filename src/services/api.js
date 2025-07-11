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
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (example - for global error handling or token refresh)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error codes, e.g., 401 for unauthorized
    if (error.response && error.response.status === 401) {
      // If 401, it means token is invalid or expired.
      // You might want to automatically logout the user here.
      // This would require access to the AuthContext, which is tricky in a pure Axios interceptor.
      // A common pattern is to dispatch an event or use a global state manager.
      // For now, the toast will inform the user.
    }
    return Promise.reject(error);
  }
);

export default api;