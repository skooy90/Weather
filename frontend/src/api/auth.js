import apiClient from './client';

// 임시 관리자 계정 정보
const adminAccount = {
  id: 'admin',
  password: 'qwe@123',
  role: 'admin',
  name: '관리자'
};

// 로그인 API
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '로그인 중 오류가 발생했습니다.' };
  }
};

// 로그아웃 API
export const logout = async () => {
  try {
    const response = await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '로그아웃 중 오류가 발생했습니다.' };
  }
};

// 토큰 검증 API
export const verifyToken = async () => {
  try {
    const response = await apiClient.get('/auth/verify');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: '토큰 검증 중 오류가 발생했습니다.' };
  }
}; 