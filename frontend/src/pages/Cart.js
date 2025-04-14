import React from 'react';

function Cart() {
  return (
    <div className="container my-5">
      <h1 className="mb-4">장바구니</h1>
      
      {/* 장바구니 아이템 목록 */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>상품</th>
              <th>가격</th>
              <th>수량</th>
              <th>총액</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="상품 이미지"
                    className="me-3"
                  />
                  <div>상품 1</div>
                </div>
              </td>
              <td>10,000원</td>
              <td>
                <div className="input-group" style={{ width: '120px' }}>
                  <button className="btn btn-outline-secondary">-</button>
                  <input
                    type="number"
                    className="form-control text-center"
                    value="1"
                    min="1"
                  />
                  <button className="btn btn-outline-secondary">+</button>
                </div>
              </td>
              <td>10,000원</td>
              <td>
                <button className="btn btn-danger">삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 총 금액 및 결제 버튼 */}
      <div className="row justify-content-end">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">주문 정보</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>상품 금액</span>
                <span>10,000원</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>배송비</span>
                <span>3,000원</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>총 금액</strong>
                <strong>13,000원</strong>
              </div>
              <button className="btn btn-primary w-100">결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart; 