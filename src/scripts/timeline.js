function removeControlButtons() {
    document.querySelectorAll('.control-btn').forEach(btn => btn.remove());
 }
 
 function initializeTimeline() {
    const character = document.getElementById('character');
    const characterContainer = document.querySelector('.character-container');
    const timelineContainer = document.querySelector('.timeline-container');
    const eventsContainer = document.querySelector('.timeline-events');
        
    console.log('Timeline script loaded');
 
    if (!timelineContainer || !eventsContainer) {
        console.error('Required elements not found');
        return;
    }
 
    // 初始化 lightbox 功能
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
 
    // 為所有非 YouTube 的圖片添加點擊事件
    document.querySelectorAll('.zoomable-image').forEach(img => {
        img.addEventListener('click', function() {
            lightboxImage.src = this.src;
            lightbox.classList.add('active');
        });
    });
 
    // 關閉按鈕
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
 
    // 點擊背景關閉
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
 
    // ESC 鍵關閉
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
    
    // 清除舊按鈕
    document.querySelectorAll('.control-btn').forEach(btn => btn.remove());
 
    let position = 0;
    const moveStep = 2;
    let isMoving = false;
    let direction = 1; // 1 = 右, -1 = 左
    let animationFrame;
 
    // 向左按鈕
    const moveLeftBtn = document.createElement('button');
    moveLeftBtn.className = 'move-left-btn control-btn';
    moveLeftBtn.innerHTML = '<span class="arrow">←</span>';
 
    // 停止按鈕
    const stopBtn = document.createElement('button');
    stopBtn.className = 'stop-btn control-btn';
    stopBtn.innerHTML = '<span class="arrow">■</span>';
 
    // 向右按鈕
    const moveRightBtn = document.createElement('button');
    moveRightBtn.className = 'move-right-btn control-btn';
    moveRightBtn.innerHTML = '<span class="arrow">→</span>';
 
    function animate() {
        if (isMoving) {
            position += moveStep * direction;
            timelineContainer.style.transform = `translateX(-${position}px)`;
            eventsContainer.style.transform = `translateX(-${position}px)`;
            characterContainer.style.left = `${50 + position}px`;
            animationFrame = requestAnimationFrame(animate);
        }
    }
 
    function startMoving(newDirection) {
        direction = newDirection;
        character.style.transform = direction === 1 ? 'scaleX(-1)' : 'scaleX(1)';
        if (!isMoving) {
            isMoving = true;
            animate();
        }
    }
    
    function stopMoving() {
        isMoving = false;
        cancelAnimationFrame(animationFrame);
    }
 
    // 事件監聽
    moveLeftBtn.addEventListener('click', () => startMoving(-1));
    moveRightBtn.addEventListener('click', () => startMoving(1));
    stopBtn.addEventListener('click', stopMoving);
 
    // 移動控制按鈕的樣式
    const style = document.createElement('style');
    style.textContent = `
        .move-left-btn, .move-right-btn {
            position: fixed;
            bottom: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(139, 0, 0, 0.8);
            border: 2px solid #ff0000;
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 24px;
            transition: all 0.3s ease;
            z-index: 1000;
        }
 
        .move-left-btn {
            left: 20px;
        }
 
        .move-right-btn {
            right: 20px;
        }
 
        .stop-btn {
            position: fixed;
            left: 50%;
            bottom: 20px;
            transform: translateX(-50%);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(139, 0, 0, 0.8);
            border: 2px solid #ff0000;
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 24px;
            transition: all 0.3s ease;
            z-index: 1000;
        }
 
        .move-left-btn:hover, .move-right-btn:hover {
            background: rgba(255, 0, 0, 0.8);
            transform: scale(1.1);
        }
 
        .stop-btn:hover {
            background: rgba(255, 0, 0, 0.8);
            transform: translateX(-50%) scale(1.1);
        }
    `;
 
    document.head.appendChild(style);
 
    // 直接添加到body
    document.body.appendChild(moveLeftBtn);
    document.body.appendChild(stopBtn);
    document.body.appendChild(moveRightBtn);
 
    function createEvent(eventData) {
        if (!eventData) {
            console.error('Event data is undefined');
            return null;
        }
    
        const eventItem = document.createElement('div');
        eventItem.className = `event-item ${eventData.placement || ''}`;
        eventItem.style.left = `${eventData.left || 0}px`;
    
        const content = document.createElement('div');
        content.className = `event-content ${eventData.placement || ''}`;
    
        const mediaHtml = eventData.type === 'youtube' && eventData.youtubeId
            ? `<a href="https://youtube.com/watch?v=${eventData.youtubeId}" target="_blank">
                <img src="https://img.youtube.com/vi/${eventData.youtubeId}/maxresdefault.jpg" alt="${eventData.title || ''}">
              </a>`
            : `<img src="${eventData.imageUrl}" alt="${eventData.title || ''}" class="zoomable-image">`;
    
        content.innerHTML = `
            <div class="event-media">${mediaHtml}</div>
            <div class="event-description">
                <h3>${eventData.title || 'Untitled'}</h3>
                <p>${eventData.description || ''}</p>
            </div>
        `;
    
        eventItem.appendChild(content);
        return eventItem;
    }
 
    try {
        if (typeof events !== 'undefined' && Array.isArray(events)) {
            events.forEach((event, index) => {
                console.log(`Creating event ${index + 1}:`, event);
                const eventElement = createEvent(event);
                if (eventElement) {
                    eventsContainer.appendChild(eventElement);
                }
            });
        } else {
            console.error('Events array is not properly defined');
        }
    } catch (error) {
        console.error('Error initializing timeline:', error);
    }
 }
 
 // 頁面加載和變化時初始化
 document.addEventListener('DOMContentLoaded', initializeTimeline);
 
 const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === 'main-content') {
            const isTimelinePage = document.querySelector('.timeline-section');
            if (!isTimelinePage) {
                removeControlButtons();
            } else {
                initializeTimeline();
            }
        }
    });
 });
 
 observer.observe(document.body, { childList: true, subtree: true });