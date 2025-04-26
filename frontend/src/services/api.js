import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 컨텐츠 관련 API
export const contentApi = {
  // 모든 컨텐츠 조회
  getAllContents: () => api.get('/contents'),
  
  // 카테고리 목록 조회
  getCategories: () => api.get('/categories'),
  
  // 카테고리별 컨텐츠 조회
  getContentsByCategory: (category) => api.get(`/contents/category/${category}`),
  
  // 서브카테고리별 컨텐츠 조회
  getContentsBySubcategory: (category, subcategory) => 
    api.get(`/contents/category/${category}/subcategory/${subcategory}`),
  
  // 특정 컨텐츠 조회
  getContentById: (id) => api.get(`/contents/${id}`),
  
  // 자동 콘텐츠 생성
  generateContents: () => api.post('/contents/generate'),
  
  // 트렌딩 컨텐츠 조회
  getTrendingContents: () => api.get('/contents/trending'),
  
  // 추천 컨텐츠 조회
  getFeaturedContents: () => api.get('/contents/featured'),
  
  // 컨텐츠 생성
  createContent: (data) => api.post('/contents', data),
  
  // 컨텐츠 수정
  updateContent: (id, data) => api.put(`/contents/${id}`, data),
  
  // 컨텐츠 삭제
  deleteContent: (id) => api.delete(`/contents/${id}`),
  
  // 댓글 추가
  addComment: (contentId, comment) => api.post(`/contents/${contentId}/comments`, comment),
  
  // 댓글 수정
  updateComment: (contentId, commentId, data) => api.put(`/contents/${contentId}/comments/${commentId}`, data),
  
  // 댓글 삭제
  deleteComment: (contentId, commentId) => api.delete(`/contents/${contentId}/comments/${commentId}`),
};

// 인증 관련 API
export const authApi = {
  // 로그인
  login: (credentials) => api.post('/auth/login', credentials),
  
  // 로그아웃
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  
  // 회원가입
  register: (userData) => api.post('/auth/register', userData),
};

export default api; 