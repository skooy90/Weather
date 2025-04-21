import React from 'react';

function Footer() {
  return (
    <footer className="bg-light mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>고객센터</h5>
            <p>전화: 1234-5678</p>
            <p>이메일: support@kysong.store</p>
          </div>
          <div className="col-md-6">
            <h5>회사 정보</h5>
            <p>주소: 서울시 강남구</p>
            <p>사업자등록번호: 123-45-67890</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 