import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) throw new Error('VITE_API_URL 환경변수가 설정되어 있지 않습니다.');

export const contentAPI = {
  // 전체 콘텐츠 조회
  getContents: async () => {
    try {
      const response = await axios.get(`${API_URL}/contents`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contents:', error);
      throw error;
    }
  },

  // 카테고리별 콘텐츠 조회
  getContentsByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_URL}/contents/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contents for category ${category}:`, error);
      throw error;
    }
  },

  // 서브카테고리별 콘텐츠 조회
  getContentsBySubcategory: async (category, subcategory) => {
    try {
      const response = await axios.get(`${API_URL}/contents/category/${category}/subcategory/${subcategory}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contents for subcategory ${subcategory}:`, error);
      throw error;
    }
  },

  // 좋아요 처리
  likeContent: async (contentId) => {
    try {
      const response = await axios.post(`${API_URL}/contents/${contentId}/like`);
      return response.data;
    } catch (error) {
      console.error(`Error liking content ${contentId}:`, error);
      throw error;
    }
  },

  // 콘텐츠 검색
  searchContents: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/contents/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching contents:', error);
      throw error;
    }
  }
}; 