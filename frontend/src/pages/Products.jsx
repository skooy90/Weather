import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../utils/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('상품 데이터를 가져오는 중...');
        const data = selectedCategory 
          ? await getProductsByCategory(selectedCategory)
          : await getProducts();
        
        console.log('API 응답:', data);
        
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('데이터가 배열이 아닙니다:', data);
          setError('상품 데이터 형식이 올바르지 않습니다.');
        }
        setLoading(false);
      } catch (err) {
        console.error('상품을 불러오는 중 오류 발생:', err);
        setError('상품을 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // 카테고리 필터링 함수
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  if (loading) return <div className="container my-5">로딩 중...</div>;
  if (error) return <div className="container my-5 text-danger">{error}</div>;

  return (
    <div className="container my-5">
      <h1 className="mb-4">상품 목록</h1>
      
      {/* 카테고리 선택 */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select 
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">전체 카테고리</option>
            <option value="크림">크림</option>
            <option value="로션">로션</option>
            <option value="폴리싱">폴리싱</option>
            <option value="기타">기타</option>
          </select>
        </div>
      </div>

      {/* 선택된 카테고리 표시 */}
      {selectedCategory && (
        <div className="mb-3">
          <h5>
            선택된 카테고리: {selectedCategory}
            <button 
              className="btn btn-sm btn-outline-secondary ms-2"
              onClick={() => setSelectedCategory('')}
            >
              초기화
            </button>
          </h5>
        </div>
      )}

      {/* 상품 목록 */}
      <div className="row">
        {filteredProducts.length === 0 ? (
          <div className="col-12 text-center">
            <p>표시할 상품이 없습니다.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <Link 
                to={`/products/${product._id}`} 
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 hover-shadow">
                  <img
                    src={product.name === "그린박신 스트롱" ? "/images/greenbacksin.jpg" : product.imageUrl}
                    className="card-img-top"
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=이미지+없음';
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      <small className="text-muted">카테고리: {product.category}</small>
                    </p>
                    <p className="card-text">
                      <strong>{product.price.toLocaleString()}원</strong>
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button 
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          // 장바구니 기능 구현 예정
                        }}
                      >
                        장바구니에 담기
                      </button>
                      <span className="badge bg-secondary">재고: {product.stock}개</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products; 