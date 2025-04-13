import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProductDetail = ({ 
    images = { main: '', thumbnails: [] },
    options = { colors: [], sizes: [] },
    onBuy,
    onAddCart,
    onWishlist
}) => {
    const [mainImage, setMainImage] = useState(images.main);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const handleQuantityChange = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className="product-detail">
            <div className="product-images">
                <div className="main-image">
                    <img src={mainImage} alt="메인 이미지" />
                </div>
                <div className="thumbnail-list">
                    {images.thumbnails.map((thumb, index) => (
                        <img
                            key={index}
                            src={thumb}
                            alt={`썸네일 ${index + 1}`}
                            onClick={() => setMainImage(thumb)}
                        />
                    ))}
                </div>
            </div>

            <div className="product-options">
                <div className="option-group">
                    <label>색상</label>
                    <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    >
                        <option value="">색상 선택</option>
                        {options.colors.map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="option-group">
                    <label>사이즈</label>
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                    >
                        <option value="">사이즈 선택</option>
                        {options.sizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(-1)}>-</button>
                    <input
                        type="number"
                        value={quantity}
                        min="1"
                        readOnly
                    />
                    <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>

                <div className="action-buttons">
                    <button className="buy-now" onClick={onBuy}>
                        바로구매
                    </button>
                    <button className="add-cart" onClick={onAddCart}>
                        장바구니
                    </button>
                    <button className="wishlist" onClick={onWishlist} aria-label="찜하기">
                        <i className="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductDetail.propTypes = {
    images: PropTypes.shape({
        main: PropTypes.string,
        thumbnails: PropTypes.arrayOf(PropTypes.string)
    }),
    options: PropTypes.shape({
        colors: PropTypes.arrayOf(PropTypes.string),
        sizes: PropTypes.arrayOf(PropTypes.string)
    }),
    onBuy: PropTypes.func,
    onAddCart: PropTypes.func,
    onWishlist: PropTypes.func
};

export default ProductDetail; 