import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../utils/api';
import GreenPaxineStrongDetail from '../components/product-details/GreenPaxineStrongDetail';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 상품 ID에 따라 적절한 상세 설명 컴포넌트를 반환하는 함수
  const renderProductDetail = () => {
    // 여기에 상품 ID나 카테고리에 따른 조건을 추가하여 적절한 컴포넌트를 반환
    if (product.name === "그린박신 스트롱") {
      return <GreenPaxineStrongDetail />;
    }
    // 다른 상품들의 상세 정보 컴포넌트도 여기에 추가
    return null;
  };

  if (loading) return <div className="container mt-5">로딩 중...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;
  if (!product) return <div className="container mt-5">상품을 찾을 수 없습니다.</div>;

  return (
    <div className="container mt-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/products">상품 목록</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* 상품 기본 정보 섹션 */}
      <div className="row mb-5">
        <div className="col-md-6">
          <img
            src="/images/greenbacksin.jpg"
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6">
          <div className="card h-100 border-0">
            <div className="card-body">
              <h2 className="card-title h3 mb-4">구매 정보</h2>
              <div className="mb-3">
                <div className="badge bg-primary mb-2">{product.category}</div>
                <h3 className="h4">{product.name}</h3>
                <p className="text-muted">{product.description}</p>
              </div>
              <div className="mb-4">
                <h4 className="h3 mb-3">{product.price.toLocaleString()}원</h4>
                <div className="d-flex align-items-center">
                  <span className="me-3">재고: {product.stock}개</span>
                  <span className={`badge ${product.status === '판매중' ? 'bg-success' : 'bg-danger'}`}>
                    {product.status}
                  </span>
                </div>
              </div>
              <button 
                className="btn btn-primary btn-lg w-100"
                disabled={product.stock === 0 || product.status !== '판매중'}
              >
                장바구니에 담기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 상세 설명 섹션 */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {renderProductDetail()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 