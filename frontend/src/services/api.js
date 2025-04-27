import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://weather-backend-knii.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
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

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 서버가 응답을 반환했지만 상태 코드가 2xx가 아닌 경우
      console.error('API 응답 에러:', error.response.status, error.response.data);
      
      // 401 Unauthorized 에러 처리
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      // 508 에러 처리
      if (error.response.status === 508) {
        console.error('서버 리소스 제한에 도달했습니다. 잠시 후 다시 시도해주세요.');
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      console.error('API 요청 에러:', error.request);
    } else {
      // 요청을 보내기 전에 발생한 에러
      console.error('API 에러:', error.message);
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
  logout: () => api.post('/auth/logout'),
  
  // 회원가입
  register: (userData) => api.post('/auth/register', userData),
};

export default api; 