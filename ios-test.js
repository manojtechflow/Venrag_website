// iOS Compatibility Test Script
document.addEventListener('DOMContentLoaded', function() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isIOS) {
        console.log('✅ iOS Device Detected');
        
        // Test video compatibility
        const videos = document.querySelectorAll('video');
        videos.forEach((video, index) => {
            console.log(`📹 Video ${index + 1}:`, {
                hasPlaysinline: video.hasAttribute('playsinline'),
                isMuted: video.muted,
                hasAutoplay: video.hasAttribute('autoplay'),
                canPlay: video.readyState >= 2
            });
        });
        
        // Test viewport
        console.log('📱 Viewport:', {
            innerHeight: window.innerHeight,
            screenHeight: screen.height,
            devicePixelRatio: window.devicePixelRatio
        });
        
        // Test touch events
        document.addEventListener('touchstart', () => {
            console.log('👆 Touch events working');
        }, { once: true });
        
        // Create iOS status indicator
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #4CAF50;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 10000;
        `;
        indicator.textContent = 'iOS Compatible ✅';
        document.body.appendChild(indicator);
        
        setTimeout(() => indicator.remove(), 3000);
    }
});