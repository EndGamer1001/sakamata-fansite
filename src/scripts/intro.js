document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    console.log('Animation script loaded');  // 調試用

    const introText = document.querySelector('.intro-text');
    console.log('Intro text element:', introText);  // 調試用

    // 先將文字清空
    introText.textContent = '';
    
    const tl = gsap.timeline({
        onComplete: () => {
            console.log('Animation complete');  // 調試用
            document.querySelector('.main-content').classList.remove('hidden');
        }
    });

    // 修改動畫序列
    tl.set('.intro-text', {
        opacity: 0,
        scale: 1
    })
    .to('.intro-text', {
        opacity: 1,
        duration: 0.5
    })
    .to('.intro-text', {
        text: {
            value: "ば",
            delimiter: ""
        },
        duration: 0.4
    })
    .to('.intro-text', {
        text: {
            value: "ばっく",
            delimiter: ""
        },
        duration: 0.4
    })
    .to('.intro-text', {
        text: {
            value: "ばっくばっく",
            delimiter: ""
        },
        duration: 0.4
    })
    .to('.intro-text', {
        text: {
            value: "ばっくばっくばく",
            delimiter: ""
        },
        duration: 0.4
    })
    .to('.intro-text', {
        text: {
            value: "ばっくばっくばく～ん",
            delimiter: ""
        },
        duration: 0.4
    })
    .to('.intro-text', {
        scale: 1.2,
        duration: 0.4
    })
    .to('.intro-text', {
        scale: 1,
        duration: 0.5,
        delay: 0.5
    })
    .to('.intro-container', {
        opacity: 0,
        duration: 1,
        delay: 1,
        onComplete: () => {
            document.querySelector('.intro-container').style.display = 'none';
        }
    });
});

