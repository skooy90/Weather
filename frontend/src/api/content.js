import client from './client';
import { cache } from '../utils/cache';

const CACHE_TTL = 5 * 60 * 1000; // 5분

export const contentAPI = {
  // 전체 콘텐츠 조회
  getContents: async () => {
    try {
      const cacheKey = 'contents';
      const cachedData = cache.get(cacheKey);
      if (cachedData) return cachedData;

      const response = await client.get('/contents');
      cache.set(cacheKey, response.data, CACHE_TTL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '콘텐츠 목록 조회 중 오류가 발생했습니다.' };
    }
  },

  // 카테고리별 콘텐츠 조회
  getContentsByCategory: async (category) => {
    try {
      const cacheKey = `contents-category-${category}`;
      const cachedData = cache.get(cacheKey);
      if (cachedData) return cachedData;

      const response = await client.get(`/contents/category/${category}`);
      cache.set(cacheKey, response.data, CACHE_TTL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '카테고리별 콘텐츠 조회 중 오류가 발생했습니다.' };
    }
  },

  // 서브카테고리별 콘텐츠 조회
  getContentsBySubcategory: async (category, subcategory) => {
    try {
      const cacheKey = `contents-subcategory-${category}-${subcategory}`;
      const cachedData = cache.get(cacheKey);
      if (cachedData) return cachedData;

      const response = await client.get(`/contents/category/${category}/subcategory/${subcategory}`);
      cache.set(cacheKey, response.data, CACHE_TTL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '서브카테고리별 콘텐츠 조회 중 오류가 발생했습니다.' };
    }
  },

  // 좋아요 처리
  likeContent: async (contentId) => {
    try {
      const response = await client.post(`/contents/${contentId}/like`);
      // 좋아요 후 캐시 무효화
      cache.clear('contents');
      cache.clear(`contents-category-${contentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '좋아요 처리 중 오류가 발생했습니다.' };
    }
  },

  // 콘텐츠 검색
  searchContents: async (query) => {
    try {
      const cacheKey = `contents-search-${query}`;
      const cachedData = cache.get(cacheKey);
      if (cachedData) return cachedData;

      const response = await client.get(`/contents/search?q=${encodeURIComponent(query)}`);
      cache.set(cacheKey, response.data, CACHE_TTL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '콘텐츠 검색 중 오류가 발생했습니다.' };
    }
  }
}; 