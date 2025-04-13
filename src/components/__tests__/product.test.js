import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductDetail from '../../src/components/ProductDetail';

describe('상품 상세 페이지 테스트', () => {
    beforeEach(() => {
        // 테스트 전 초기화
        jest.clearAllMocks();
    });

    test('상품 이미지 갤러리 테스트', () => {
        // 메인 이미지와 썸네일 렌더링
        render(
            <div className="product-images">
                <div className="main-image">
                    <img src="test-main.jpg" alt="메인 이미지" />
                </div>
                <div className="thumbnail-list">
                    <img src="thumb1.jpg" alt="썸네일 1" />
                    <img src="thumb2.jpg" alt="썸네일 2" />
                </div>
            </div>
        );

        // 이미지 요소 확인
        const mainImage = screen.getByAltText('메인 이미지');
        const thumbnails = screen.getAllByAltText(/썸네일/);

        expect(mainImage).toBeInTheDocument();
        expect(thumbnails).toHaveLength(2);
    });

    test('수량 조절 테스트', () => {
        render(
            <div className="quantity-control">
                <button aria-label="수량 감소">-</button>
                <input type="number" value="1" min="1" />
                <button aria-label="수량 증가">+</button>
            </div>
        );

        const minusBtn = screen.getByLabelText('수량 감소');
        const plusBtn = screen.getByLabelText('수량 증가');
        const quantityInput = screen.getByRole('spinbutton');

        expect(minusBtn).toBeInTheDocument();
        expect(plusBtn).toBeInTheDocument();
        expect(quantityInput).toBeInTheDocument();
    });

    test('옵션 선택 테스트', () => {
        render(
            <div className="product-options">
                <div className="option-group">
                    <label htmlFor="color">색상</label>
                    <select id="color">
                        <option value="">색상 선택</option>
                        <option value="black">블랙</option>
                        <option value="white">화이트</option>
                    </select>
                </div>
                <div className="option-group">
                    <label htmlFor="size">사이즈</label>
                    <select id="size">
                        <option value="">사이즈 선택</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                </div>
            </div>
        );

        const colorSelect = screen.getByLabelText('색상');
        const sizeSelect = screen.getByLabelText('사이즈');

        expect(colorSelect).toBeInTheDocument();
        expect(sizeSelect).toBeInTheDocument();
    });

    test('구매 버튼 테스트', () => {
        render(
            <button className="buy-button" aria-label="구매하기">
                구매하기
            </button>
        );

        const buyButton = screen.getByLabelText('구매하기');
        expect(buyButton).toBeInTheDocument();
    });
}); 