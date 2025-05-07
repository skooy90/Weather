import client from './client';
import { cache } from '../utils/cache';

const CACHE_TTL = 5 * 60 * 1000; // 5분

// 임시 관리자 계정 정보
const adminAccount = {
  id: 'admin',
  password: 'qwe@123',
  role: 'admin',
  name: '관리자'
};

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await client.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '로그인 중 오류가 발생했습니다.' };
    }
  },

  logout: async () => {
    try {
      const response = await client.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '로그아웃 중 오류가 발생했습니다.' };
    }
  },

  signup: async (userData) => {
    try {
      const response = await client.post('/auth/signup', userData);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      if (error.response?.data) {
        throw new Error(error.response.data.message);
      }
      throw new Error('회원가입 중 오류가 발생했습니다.');
    }
  },

  checkUserId: async (userId) => {
    try {
      const response = await client.get(`/auth/check-userid/${userId}`);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      if (error.response?.data) {
        throw new Error(error.response.data.message);
      }
      throw new Error('아이디 중복 확인 중 오류가 발생했습니다.');
    }
  },

  getCurrentUser: async () => {
    try {
      const cacheKey = 'current-user';
      const cachedData = cache.get(cacheKey);
      if (cachedData) return cachedData;

      const response = await client.get('/auth/me');
      cache.set(cacheKey, response.data, CACHE_TTL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '사용자 정보 조회 중 오류가 발생했습니다.' };
    }
  }
};

// 로그인 API
export const login = async (credentials) => {
  try {
    const response = await client.post('/auth/login', credentials);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    const { token, user } = response.data.data || {};
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: '로그인 중 오류가 발생했습니다.' };
  }
};

// 회원가입 API
export const register = async (userData) => {
  try {
    const response = await client.post('/auth/signup', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '회원가입 중 오류가 발생했습니다.' };
  }
};

// 로그아웃 API
export const logout = async () => {
  try {
    await client.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('로그아웃 에러:', error);
  }
};

// 토큰 검증 API
export const verifyToken = async () => {
  try {
    const response = await client.get('/auth/verify');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '토큰 검증 중 오류가 발생했습니다.' };
  }
}; 