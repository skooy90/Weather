import env from '../config/env';

class Cache {
  constructor() {
    this.cache = new Map();
    this.ttl = parseInt(env.VITE_CACHE_TTL, 10) * 1000; // 밀리초로 변환
  }

  set(key, value, ttl = this.ttl) {
    const item = {
      value,
      expiry: Date.now() + ttl
    };
    this.cache.set(key, item);
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  // 캐시된 API 응답 처리
  async fetchWithCache(url, options = {}) {
    const cacheKey = `${url}-${JSON.stringify(options)}`;
    const cachedData = this.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        this.set(cacheKey, data);
      }

      return data;
    } catch (error) {
      console.error('API 요청 실패:', error);
      throw error;
    }
  }
}

export const cache = new Cache(); 