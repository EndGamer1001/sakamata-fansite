document.addEventListener('DOMContentLoaded', () => {
    console.log('Navigation script loaded');
    const mainContent = document.getElementById('main-content');
    
    const pages = {
        profile: './src/pages/profile.html',
        countdown: './src/pages/countdown.html',
        songs: './src/pages/songs.html',
        timeline: './src/pages/timeline.html'
    };

    async function loadPage(pageName) {
        console.log(`Loading page: ${pageName}`);
        try {
            const response = await fetch(pages[pageName]);
            console.log(`Page ${pageName} fetch response:`, response);
            
            const htmlText = await response.text();
            console.log(`Page ${pageName} content length:`, htmlText.length);
            
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // 淡出當前內容
            await gsap.to(mainContent, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut"
            });
    
            // 更新內容
            mainContent.innerHTML = htmlText;

            // 觸發頁面加載完成事件
            document.dispatchEvent(new Event('pageLoaded'));
    
            // 清理計時器
            if (window._countdownInterval) {
                clearInterval(window._countdownInterval);
                window._countdownInterval = null;
            }
    
            // 新內容的進入動畫
            gsap.fromTo(mainContent, 
                { opacity: 0 },
                { 
                    opacity: 1, 
                    duration: 0.5,
                    ease: "power2.inOut"
                }
            );
    
            // 子元素的動畫
            gsap.from(mainContent.children, {
                y: 30,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "power2.out",
                delay: 0.2 // 等主容器顯示後再開始
            });
    
            // 載入特定頁面的腳本
            if (pageName === 'songs') {
                console.log('Loading songs.js');
                const script = document.createElement('script');
                script.src = 'src/scripts/songs.js';
                script.onload = () => {
                    console.log('songs.js loaded successfully');
                    if (window.initializeSongs) {
                        window.initializeSongs();
                    }
                };
                document.body.appendChild(script);
            }

            if (pageName === 'timeline') {
                const existingScript = document.querySelector('script[src="src/scripts/timeline.js"]');
                if (!existingScript) {
                    const script = document.createElement('script');
                    script.src = 'src/scripts/timeline.js';
                    document.body.appendChild(script);
                }
            }

            else if (pageName === 'countdown') {
                const targetDate = new Date('2025-01-26T20:00:00+09:00');
                const streamEndDate = new Date('2025-01-26T21:30:00+09:00');
                
                function updateCountdown() {
                    const now = new Date();
                    const diff = targetDate - now;
                    const streamEndDiff = streamEndDate - now;
            
                    const countdownElement = document.getElementById('countdown');
                    
                    if (diff > 0) {
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
                        document.querySelector('.days').textContent = String(days).padStart(2, '0');
                        document.querySelector('.hours').textContent = String(hours).padStart(2, '0');
                        document.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
                        document.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
                    }
                    else if (streamEndDiff > 0) {
                        countdownElement.innerHTML = `
                            <div class="time-block streaming">
                                <span>配信中！</span>
                            </div>`;
                    }
                    else {
                        countdownElement.innerHTML = `
                            <div class="time-block graduated">
                                <span>カウントダウン終了</span>
                            </div>`;
                    }
                }
            
                window._countdownInterval = setInterval(updateCountdown, 1000);
                updateCountdown();
            }

        } catch (error) {
            console.error(`Error loading ${pageName}:`, error);
        }
    }

    document.querySelectorAll('.nav-item').forEach(button => {
        button.addEventListener('click', (e) => {
            console.log('Navigation clicked:', e.target.dataset.page);
            const pageName = e.target.dataset.page;
            loadPage(pageName);
        });
    });

    // 預設載入個人資料頁
    loadPage('profile');
});


