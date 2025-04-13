document.addEventListener('DOMContentLoaded', function() {
    // 썸네일 클릭 시 메인 이미지 변경
    const thumbnails = document.querySelectorAll('.thumbnail-list img');
    const mainImage = document.querySelector('.main-image img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.src;
        });
    });

    // 수량 조절
    const quantityInput = document.querySelector('.quantity-control input');
    const minusBtn = document.querySelector('.quantity-control button:first-child');
    const plusBtn = document.querySelector('.quantity-control button:last-child');

    minusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });

    // 탭 전환
    const tabs = document.querySelectorAll('.description-tabs button');
    const contents = document.querySelectorAll('.description-content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // 모든 탭의 active 클래스 제거
            tabs.forEach(t => t.classList.remove('active'));
            // 클릭한 탭에 active 클래스 추가
            this.classList.add('active');
            
            // TODO: 해당하는 내용 표시
        });
    });

    // 찜하기 버튼 토글
    const wishlistBtn = document.querySelector('.wishlist');
    wishlistBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        if (this.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#ff4e50';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '#333';
        }
    });

    // 장바구니 추가
    const addCartBtn = document.querySelector('.add-cart');
    addCartBtn.addEventListener('click', function() {
        // TODO: 장바구니 추가 로직 구현
        alert('장바구니에 상품이 추가되었습니다.');
    });

    // 바로구매
    const buyNowBtn = document.querySelector('.buy-now');
    buyNowBtn.addEventListener('click', function() {
        // TODO: 구매 페이지로 이동
        alert('구매 페이지로 이동합니다.');
    });
}); 