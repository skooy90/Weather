import React from 'react';

function GreenPaxineStrongDetail() {
  return (
    <div className="product-detail-content">
      {/* 메인 설명 */}
      <div className="product-description mb-5">
        <h4 className="text-primary mb-4">더욱 강력한 그린박신 스트롱 앰플!🌿</h4>
        <div className="key-features mb-4">
          <p className="h5 mb-3">주요 특징</p>
          <ul className="list-unstyled">
            <li className="mb-2">✔️ 재생+보습 2배 Up↑</li>
            <li className="mb-2">✔️ 점성+온도 2배 Down↓</li>
          </ul>
        </div>

        {/* 상세 이미지 1 */}
        <div className="detail-image mb-4">
          <img
            src="/images/green_1.jpg"
            alt="그린박신 스트롱 상세 이미지 1"
            className="img-fluid rounded"
          />
        </div>

        <div className="main-benefits mb-4">
          <p className="mb-3">그린박신 스트롱은</p>
          <ul className="list-unstyled">
            <li className="mb-2">• 쿨링 특허 성분이 추가되어</li>
            <li className="mb-2">• 더욱 빠른 진정, 트러블 복구</li>
            <li className="mb-2">• 즉각적인 피부 열을 해소 가능!</li>
          </ul>
        </div>

        {/* 상세 이미지 2 */}
        <div className="detail-image mb-4">
          <img
            src="/images/green_2.jpg"
            alt="그린박신 스트롱 상세 이미지 2"
            className="img-fluid rounded"
          />
        </div>
      </div>

      {/* 제품 비교 */}
      <div className="product-comparison mb-5">
        <h4 className="text-success mb-4">🟢 그린박신/그린박신 스트롱 차이점 🟢</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="card h-100 bg-light">
              <div className="card-body">
                <h5 className="card-title">☑️ 그린박신</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">• 데일리 사용 또는 일주일 2-3회 특수케어 가능</li>
                  <li className="mb-2">• (머미팩, 마사지젤 등)</li>
                  <li className="mb-2">• 중간 점도</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 bg-light">
              <div className="card-body">
                <h5 className="card-title">☑️ 그린박신 스트롱</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">• 앰플단계에서 데일리 사용</li>
                  <li className="mb-2">• 낮은 점도 {'>'} 빠르게 흡수되어 앰플 용도 적합</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 사용 순서 */}
      <div className="usage-order">
        <h4 className="text-success mb-4">🟢 사용순서</h4>
        <div className="d-flex align-items-center">
          <span className="h5">토너</span>
          <span className="mx-3">{'>'}</span>
          <span className="h5">그린박신스트롱 (앰플단계)</span>
          <span className="mx-3">{'>'}</span>
          <span className="h5">크림</span>
        </div>
      </div>
    </div>
  );
}

export default GreenPaxineStrongDetail; 