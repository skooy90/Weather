export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://weather-backend-knii.onrender.com/api';

export const API_ENDPOINTS = {
  weather: `${API_BASE_URL}/weather`,
  auth: `${API_BASE_URL}/auth`,
  users: `${API_BASE_URL}/users`
}; 