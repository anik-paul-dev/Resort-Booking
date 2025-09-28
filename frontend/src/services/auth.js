import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const auth = axios.create({
  baseURL: `${API_URL}/auth`,
});

export const authAPI = {
  login: async (email, password) => {
    const response = await auth.post('/login', { email, password });
    return response.data;
  },
  register: async (name, email, password) => {
    const response = await auth.post('/register', { name, email, password });
    return response.data;
  },
  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    const response = await auth.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  verifyEmail: async (id) => {
    const response = await auth.get(`/verify-email/${id}`);
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await auth.post('/forgot-password', { email });
    return response.data;
  },
  resetPassword: async (token, password) => {
    const response = await auth.post('/reset-password', { token, password });
    return response.data;
  },
  updateProfile: async (profileData) => {
    const token = localStorage.getItem('token');
    const response = await auth.put('/profile', profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  changePassword: async (passwordData) => {
    const token = localStorage.getItem('token');
    const response = await auth.put('/change-password', passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  logout: async () => {
    const token = localStorage.getItem('token');
    const response = await auth.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default authAPI;