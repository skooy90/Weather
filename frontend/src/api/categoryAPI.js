import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

export const categoryAPI = {
  // 모든 카테고리 조회
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('카테고리 조회 실패:', error);
      throw new Error(error.response?.data?.message || '카테고리를 불러오는데 실패했습니다.');
    }
  },

  // 카테고리 생성 (관리자용)
  createCategory: async (categoryData) => {
    try {
      const response = await axios.post(`${API_URL}/categories`, categoryData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('카테고리 생성 실패:', error);
      throw new Error(error.response?.data?.message || '카테고리 생성에 실패했습니다.');
    }
  },

  // 카테고리 수정 (관리자용)
  updateCategory: async (id, categoryData) => {
    try {
      const response = await axios.put(`${API_URL}/categories/${id}`, categoryData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('카테고리 수정 실패:', error);
      throw new Error(error.response?.data?.message || '카테고리 수정에 실패했습니다.');
    }
  },

  // 카테고리 삭제 (관리자용)
  deleteCategory: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('카테고리 삭제 실패:', error);
      throw new Error(error.response?.data?.message || '카테고리 삭제에 실패했습니다.');
    }
  }
}; 