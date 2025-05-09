import env from './env';

export const API_URL = env.VITE_API_URL;
if (!API_URL) throw new Error('VITE_API_URL 환경변수가 설정되어 있지 않습니다.');

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    CHECK_USER_ID: '/auth/check-user-id'
  },
  CONTENT: {
    GET_ALL: '/content',
    GET_BY_ID: '/content/:id',
    GET_BY_CATEGORY: '/content/category/:category',
    GET_BY_SUBCATEGORY: '/content/subcategory/:subcategory',
    CREATE: '/content',
    UPDATE: '/content/:id',
    DELETE: '/content/:id',
    ADD_COMMENT: '/content/:id/comment',
  },
  COMMENT: {
    GET_ALL: '/comment',
    GET_BY_CONTENT: '/comment/content/:contentId',
    CREATE: '/comment',
    UPDATE: '/comment/:id',
    DELETE: '/comment/:id'
  },
  USER: {
    GET_ALL: '/user',
    GET_BY_ID: '/user/:id',
    UPDATE: '/user/:id',
    DELETE: '/user/:id'
  },
  CATEGORY: {
    GET_ALL: '/category',
    GET_BY_ID: '/category/:id',
    CREATE: '/category',
    UPDATE: '/category/:id',
    DELETE: '/category/:id'
  },
  UPLOAD: {
    FILE: '/upload',
    PROFILE: '/upload/profile',
    CONTENT: '/upload/content',
    THUMBNAIL: '/upload/thumbnail'
  }
}; 