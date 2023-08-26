document.addEventListener('DOMContentLoaded', function() {
    animateHero();
    setupNavAnimation();
    setupScrollAnimation();
    setupModal();
    setupCarousel();
  });
  
  function animateHero() {
    const heroImage = document.querySelector('.hero-image');
    heroImage.style.transform = 'scale(1.1)';
    heroImage.style.transition = 'transform 1s ease-in-out';
  }
  
  function setupNavAnimation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link, index) => {
      link.style.transitionDelay = `${index * 0.1}s`;
      link.addEventListener('mouseover', () => {
        link.style.transform = 'rotate(15deg)';
      });
      link.addEventListener('mouseout', () => {
        link.style.transform = 'rotate(0deg)';
      });
    });
  }
  
  function setupScrollAnimation() {
    const sections = document.querySelectorAll('.main-content section');
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = `opacity 1s ease, transform 1s ease ${index * 0.2}s`;
    });
  
    window.addEventListener('scroll', () => {
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.8) {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        }
      });
    });
  }
  
  function setupModal() {
    const modalBtn = document.querySelector('.modal-btn');
    const modal = document.querySelector('.modal');
    const closeModalBtn = document.querySelector('.close-modal');
  
    modalBtn.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', event => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  function setupCarousel() {
    const carouselImages = document.querySelectorAll('.carousel-image');
    let currentIndex = 0;
  
    function showImage(index) {
      carouselImages.forEach((image, i) => {
        if (i === index) {
          image.style.display = 'block';
        } else {
          image.style.display = 'none';
        }
      });
    }
  
    function nextImage() {
      currentIndex = (currentIndex + 1) % carouselImages.length;
      showImage(currentIndex);
    }
  
    function prevImage() {
      currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
      showImage(currentIndex);
    }
  
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
  
    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);
  
    showImage(currentIndex);
  }
  