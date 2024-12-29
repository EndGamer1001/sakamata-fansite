function createGlobalBubbles() {
    const bubbleContainer = document.querySelector('.global-bubble-container');
    if (!bubbleContainer) {
        console.log('Bubble container not found');
        return;
    }
    
    // 保持一定數量的泡泡
    if (bubbleContainer.children.length < 20) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 40 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        
        // 設置泡泡消失時的監聽器
        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
        
        bubbleContainer.appendChild(bubble);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 每隔短時間生成新泡泡
    setInterval(createGlobalBubbles, 300);
});

// 在頁面切換時也保持泡泡效果
document.addEventListener('pageLoaded', createGlobalBubbles);