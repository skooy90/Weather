import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">KYSong Store</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">홈</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">상품</Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link to="/cart" className="btn btn-outline-primary me-2">
              장바구니
            </Link>
            <button className="btn btn-primary">로그인</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 