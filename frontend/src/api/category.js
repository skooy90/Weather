import client from './client';
import { cache } from '../utils/cache';

const CACHE_TTL = 5 * 60 * 1000; // 5분

export const categoryAPI = {
  getCategories: async () => {
    try {
      const cacheKey = 'categories';
      const cachedData = cache.get(cacheKey);
      if (cachedData) return cachedData;

      const response = await client.get('/categories');
      cache.set(cacheKey, response.data, CACHE_TTL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '카테고리 목록 조회 중 오류가 발생했습니다.' };
    }
  },

  getCategoryById: async (id) => {
    try {
      const cacheKey = `category-${id}`;
      const cachedData = cache.get(cacheKey);
      if (cachedData) return cachedData;

      const response = await client.get(`/categories/${id}`);
      cache.set(cacheKey, response.data, CACHE_TTL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '카테고리 조회 중 오류가 발생했습니다.' };
    }
  },

  getSubcategories: async (categoryId) => {
    try {
      const cacheKey = `subcategories-${categoryId}`;
      const cachedData = cache.get(cacheKey);
      if (cachedData) return cachedData;

      const response = await client.get(`/categories/${categoryId}/subcategories`);
      cache.set(cacheKey, response, CACHE_TTL);
      return response;
    } catch (error) {
      throw error.response?.data || { message: '서브카테고리 조회 중 오류가 발생했습니다.' };
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await client.post('/categories', categoryData);
      cache.clear('categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '카테고리 생성 중 오류가 발생했습니다.' };
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const response = await client.put(`/categories/${id}`, categoryData);
      cache.clear(`category-${id}`);
      cache.clear('categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '카테고리 수정 중 오류가 발생했습니다.' };
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await client.delete(`/categories/${id}`);
      cache.clear(`category-${id}`);
      cache.clear('categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '카테고리 삭제 중 오류가 발생했습니다.' };
    }
  }
}; 