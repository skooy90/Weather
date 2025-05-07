import axios from 'axios';
import env from '../config/env';

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) throw new Error('VITE_API_URL 환경변수가 설정되어 있지 않습니다.');

const client = axios.create({
  baseURL: `${API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

// 요청 인터셉터
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(new Error(error.response.data.message || '서버 오류가 발생했습니다.'));
    }
    return Promise.reject(new Error('네트워크 오류가 발생했습니다.'));
  }
);

export default client; 