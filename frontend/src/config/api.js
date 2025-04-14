const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  products: {
    getAll: `${API_BASE_URL}/products`,
    getOne: (id) => `${API_BASE_URL}/products/${id}`,
    create: `${API_BASE_URL}/products`,
    update: (id) => `${API_BASE_URL}/products/${id}`,
    delete: (id) => `${API_BASE_URL}/products/${id}`,
  },
  cart: {
    getCart: `${API_BASE_URL}/cart`,
    addItem: `${API_BASE_URL}/cart/items`,
    updateItem: (id) => `${API_BASE_URL}/cart/items/${id}`,
    removeItem: (id) => `${API_BASE_URL}/cart/items/${id}`,
  },
  users: {
    login: `${API_BASE_URL}/users/login`,
    register: `${API_BASE_URL}/users/register`,
    profile: `${API_BASE_URL}/users/profile`,
  },
}; 