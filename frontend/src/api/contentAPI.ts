import axios from 'axios';
import { Content, Comment } from '../types';
import { API_URL, API_ENDPOINTS } from '../config/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const contentAPI = {
  getContents: async (): Promise<Content[]> => {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.CONTENT.GET_ALL}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  getContent: async (id: string): Promise<Content> => {
    const endpoint = API_ENDPOINTS.CONTENT.GET_BY_ID.replace(':id', id);
    const response = await axios.get(`${API_URL}${endpoint}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  createContent: async (content: Omit<Content, 'id'>): Promise<Content> => {
    const response = await axios.post(`${API_URL}${API_ENDPOINTS.CONTENT.CREATE}`, content, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  updateContent: async (id: string, content: Partial<Content>): Promise<Content> => {
    const endpoint = API_ENDPOINTS.CONTENT.UPDATE.replace(':id', id);
    const response = await axios.put(`${API_URL}${endpoint}`, content, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  deleteContent: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS.CONTENT.DELETE.replace(':id', id);
    await axios.delete(`${API_URL}${endpoint}`, {
      headers: getAuthHeader(),
    });
  },

  addComment: async (contentId: string, comment: Omit<Comment, 'id'>): Promise<Content> => {
    const endpoint = API_ENDPOINTS.CONTENT.ADD_COMMENT.replace(':id', contentId);
    const response = await axios.post(`${API_URL}${endpoint}`, comment, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  deleteComment: async (contentId: string, commentId: string): Promise<Content> => {
    const endpoint = API_ENDPOINTS.COMMENT.DELETE.replace(':id', commentId);
    const response = await axios.delete(`${API_URL}${endpoint}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  }
}; 