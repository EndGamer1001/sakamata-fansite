document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    
    // 輪播圖片配置
    const images = [
        { src: 'src/assets/carousel-images/image1.jpg', alt: 'Carousel Image 1' },
        { src: 'src/assets/carousel-images/image2.jpg', alt: 'Carousel Image 2' },
        { src: 'src/assets/carousel-images/image3.jpg', alt: 'Carousel Image 3' },
        { src: 'src/assets/carousel-images/image4.jpg', alt: 'Carousel Image 4' },
        { src: 'src/assets/carousel-images/image5.jpg', alt: 'Carousel Image 5' }
    ];

    // 創建和添加輪播項目
    function createCarousel() {
        // 清空現有內容
        carouselTrack.innerHTML = '';
        
        // 複製圖片陣列以實現無縫循環
        const allImages = [...images, ...images];
        
        allImages.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.loading = 'lazy'; // 延遲加載優化
            
            slide.appendChild(img);
            carouselTrack.appendChild(slide);
        });
    }

    // 處理圖片載入錯誤
    function handleImageError(event) {
        const img = event.target;
        img.src = 'src/assets/images/placeholder.jpg'; // 設置預設圖片
        console.error(`Failed to load image: ${img.src}`);
    }

    // 重置輪播動畫
    function resetAnimation() {
        carouselTrack.style.animation = 'none';
        carouselTrack.offsetHeight; // 觸發重排
        carouselTrack.style.animation = null;
    }

    // 初始化輪播
    if (carouselTrack) {
        createCarousel();
        
        // 添加錯誤處理
        carouselTrack.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', handleImageError);
        });

        // 滑鼠互動
        carouselTrack.addEventListener('mouseenter', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });

        carouselTrack.addEventListener('mouseleave', () => {
            carouselTrack.style.animationPlayState = 'running';
        });

        // 當輪播到末端時重置
        carouselTrack.addEventListener('animationend', resetAnimation);
    }
});