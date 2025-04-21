import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart } from '../utils/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const shippingFee = 3000;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartItems(data.items || []);
        calculateTotal(data.items || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalAmount(total);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await updateCartItem(productId, newQuantity);
      const updatedItems = cartItems.map(item => 
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      const updatedItems = cartItems.filter(item => item.productId !== productId);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="container my-5">로딩 중...</div>;
  if (error) return <div className="container my-5 text-danger">{error}</div>;

  return (
    <div className="container my-5">
      <h1 className="mb-4">장바구니</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>장바구니가 비어있습니다.</p>
          <Link to="/products" className="btn btn-primary">
            상품 보러가기
          </Link>
        </div>
      ) : (
        <>
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
                {cartItems.map((item) => (
                  <tr key={item.productId}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="me-3"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <div>{item.name}</div>
                      </div>
                    </td>
                    <td>{item.price.toLocaleString()}원</td>
                    <td>
                      <div className="input-group" style={{ width: '120px' }}>
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                        />
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{(item.price * item.quantity).toLocaleString()}원</td>
                    <td>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
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
                    <span>{totalAmount.toLocaleString()}원</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>배송비</span>
                    <span>{shippingFee.toLocaleString()}원</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <strong>총 금액</strong>
                    <strong>{(totalAmount + shippingFee).toLocaleString()}원</strong>
                  </div>
                  <button className="btn btn-primary w-100">결제하기</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart; 