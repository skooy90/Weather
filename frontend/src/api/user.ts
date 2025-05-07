import axios from 'axios';
import { User } from '../types';
import { API_URL, API_ENDPOINTS } from '../config/api';

export const userAPI = {
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.USER.GET_ALL}`);
    return response.data;
  },

  getUser: async (id: string): Promise<User> => {
    const endpoint = API_ENDPOINTS.USER.GET_BY_ID.replace(':id', id);
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  },

  createUser: async (userData: Partial<User>): Promise<User> => {
    const response = await axios.post(`${API_URL}${API_ENDPOINTS.USER.GET_ALL}`, userData);
    return response.data;
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const endpoint = API_ENDPOINTS.USER.UPDATE.replace(':id', id);
    const response = await axios.put(`${API_URL}${endpoint}`, userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.USER.DELETE.replace(':id', id);
    await axios.delete(`${API_URL}${endpoint}`);
  }
}; 