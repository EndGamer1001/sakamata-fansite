function initCountdown() {
    console.log('Initializing countdown');
    const targetDate = new Date('2025-01-26T20:00:00+09:00');
    
    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) {
            console.log('Countdown element not found, stopping timer');
            return;
        }

        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            countdownElement.innerHTML = `
                <div class="time-block graduated">
                    <span>カウントダウン終了</span>
                </div>`;
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const daysElement = document.querySelector('.days');
        const hoursElement = document.querySelector('.hours');
        const minutesElement = document.querySelector('.minutes');
        const secondsElement = document.querySelector('.seconds');

        if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
        if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
        if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');
    }

    const intervalId = setInterval(updateCountdown, 1000);
    updateCountdown();

    // 當頁面切換時清理計時器
    return () => {
        clearInterval(intervalId);
    };
}

// 立即初始化
initCountdown();