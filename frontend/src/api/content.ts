import axios from 'axios';
import { Content, Comment } from '../types';
import { API_URL, API_ENDPOINTS } from '../config/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const contentAPI = {
  getContents: async (): Promise<Content[]> => {
    try {
      const response = await axios.get(`${API_URL}${API_ENDPOINTS.CONTENT.GET_ALL}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '콘텐츠 목록을 불러오는 중 오류가 발생했습니다.' };
    }
  },

  getContent: async (id: string): Promise<Content> => {
    try {
      const endpoint = API_ENDPOINTS.CONTENT.GET_BY_ID.replace(':id', id);
      const response = await axios.get(`${API_URL}${endpoint}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '콘텐츠를 불러오는 중 오류가 발생했습니다.' };
    }
  },

  getContentsByCategory: async (category: string): Promise<Content[]> => {
    try {
      const response = await axios.get(`${API_URL}${API_ENDPOINTS.CONTENT.GET_BY_CATEGORY.replace(':category', category)}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '카테고리별 콘텐츠 조회 중 오류가 발생했습니다.' };
    }
  },

  createContent: async (contentData: Omit<Content, 'id'>): Promise<Content> => {
    try {
      const response = await axios.post(`${API_URL}${API_ENDPOINTS.CONTENT.CREATE}`, contentData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '콘텐츠 생성 중 오류가 발생했습니다.' };
    }
  },

  updateContent: async (id: string, contentData: Partial<Content>): Promise<Content> => {
    try {
      const endpoint = API_ENDPOINTS.CONTENT.UPDATE.replace(':id', id);
      const response = await axios.put(`${API_URL}${endpoint}`, contentData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '콘텐츠 수정 중 오류가 발생했습니다.' };
    }
  },

  deleteContent: async (id: string): Promise<void> => {
    try {
      const endpoint = API_ENDPOINTS.CONTENT.DELETE.replace(':id', id);
      const response = await axios.delete(`${API_URL}${endpoint}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '콘텐츠 삭제 중 오류가 발생했습니다.' };
    }
  },

  addComment: async (id: string, comment: Omit<Comment, 'id'>): Promise<Content> => {
    try {
      const endpoint = API_ENDPOINTS.CONTENT.ADD_COMMENT.replace(':id', id);
      const response = await axios.post(`${API_URL}${endpoint}`, comment, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '댓글 추가 중 오류가 발생했습니다.' };
    }
  }
}; 