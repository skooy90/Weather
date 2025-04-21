import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* 메인 배너 */}
      <div className="banner bg-primary text-white py-5">
        <div className="container">
          <h1 className="display-4">KYSong Store에 오신 것을 환영합니다!</h1>
          <p className="lead">최신 트렌드를 만나보세요</p>
          <Link to="/products" className="btn btn-light btn-lg">
            상품 보기
          </Link>
        </div>
      </div>

      {/* 인기 상품 섹션 */}
      <div className="container my-5">
        <h2 className="mb-4">인기 상품</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src="https://via.placeholder.com/300" className="card-img-top" alt="상품 이미지" />
              <div className="card-body">
                <h5 className="card-title">상품 1</h5>
                <p className="card-text">상품 설명입니다.</p>
                <p className="card-text"><strong>10,000원</strong></p>
                <button className="btn btn-primary">장바구니에 담기</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src="https://via.placeholder.com/300" className="card-img-top" alt="상품 이미지" />
              <div className="card-body">
                <h5 className="card-title">상품 2</h5>
                <p className="card-text">상품 설명입니다.</p>
                <p className="card-text"><strong>20,000원</strong></p>
                <button className="btn btn-primary">장바구니에 담기</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src="https://via.placeholder.com/300" className="card-img-top" alt="상품 이미지" />
              <div className="card-body">
                <h5 className="card-title">상품 3</h5>
                <p className="card-text">상품 설명입니다.</p>
                <p className="card-text"><strong>30,000원</strong></p>
                <button className="btn btn-primary">장바구니에 담기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 