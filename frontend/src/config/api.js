const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  products: `${API_BASE_URL}/products`,
  productDetails: `${API_BASE_URL}/product-details`,
  cart: `${API_BASE_URL}/cart`,
  users: `${API_BASE_URL}/users`,
  auth: `${API_BASE_URL}/auth`
}; 