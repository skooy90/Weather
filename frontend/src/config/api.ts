export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    CHECK_USER_ID: '/auth/check-user-id'
  },
  CONTENT: {
    GET_ALL: '/contents',
    GET_BY_ID: '/contents/:id',
    GET_BY_CATEGORY: '/contents/category/:category',
    GET_BY_SUBCATEGORY: '/contents/subcategory/:subcategory',
    CREATE: '/contents',
    UPDATE: '/contents/:id',
    DELETE: '/contents/:id',
    ADD_COMMENT: '/contents/:id/comments',
  },
  COMMENT: {
    GET_ALL: '/comments',
    GET_BY_CONTENT: '/comments/content/:contentId',
    CREATE: '/comments',
    UPDATE: '/comments/:id',
    DELETE: '/comments/:id'
  },
  USER: {
    GET_ALL: '/users',
    GET_BY_ID: '/users/:id',
    UPDATE: '/users/:id',
    DELETE: '/users/:id'
  }
}; 