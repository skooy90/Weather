import axios from 'axios';
import { Comment } from '../types';
import { API_URL, API_ENDPOINTS } from '../config/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const commentAPI = {
  getComments: async (contentId: string): Promise<Comment[]> => {
    const endpoint = API_ENDPOINTS.COMMENT.GET_BY_CONTENT.replace(':contentId', contentId);
    const response = await axios.get(`${API_URL}${endpoint}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  getComment: async (id: string): Promise<Comment> => {
    const endpoint = API_ENDPOINTS.COMMENT.UPDATE.replace(':id', id);
    const response = await axios.get(`${API_URL}${endpoint}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  createComment: async (comment: Partial<Comment>): Promise<Comment> => {
    const response = await axios.post(`${API_URL}${API_ENDPOINTS.COMMENT.CREATE}`, comment, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  updateComment: async (id: string, comment: Partial<Comment>): Promise<Comment> => {
    const endpoint = API_ENDPOINTS.COMMENT.UPDATE.replace(':id', id);
    const response = await axios.put(`${API_URL}${endpoint}`, comment, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  deleteComment: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.COMMENT.DELETE.replace(':id', id);
    await axios.delete(`${API_URL}${endpoint}`, {
      headers: getAuthHeader(),
    });
  },

  likeComment: async (id: string): Promise<Comment> => {
    const response = await axios.post(`${API_URL}${API_ENDPOINTS.COMMENT.GET_ALL}/${id}/like`, {}, {
      headers: getAuthHeader(),
    });
    return response.data;
  },
}; 