// zuopin.js
document.addEventListener('DOMContentLoaded', function() {
    // ... 其他初始化操作 ...
  
    // 封装初始化操作函数
    function initialize() {
      animateHero();
      setupNavAnimation();
      setupScrollAnimation();
      setupModal();
      setupCarousel();
      setupButtonEffect();
      setupResponsiveNav();
      setupHoverEffect();
      setupProgressBar();
    }
  
    // 在文档就绪时执行初始化操作
    onDocumentReady(initialize);
  });
  
  // ... 其他函数 ...
  