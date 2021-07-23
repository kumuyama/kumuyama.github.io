'use strict';

{

  if (window.matchMedia( "(min-width: 700px)" ).matches) {
    /* ビューポートの幅が 700 ピクセル以上の場合のコードをここに */
    
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const ul = document.querySelector('ul');
    const slides = ul.children;
    const dots = [];
    let currentIndex = 0;
  
  
    function updateButtons() {
      prev.classList.remove('hidden');
      next.classList.remove('hidden');
  
      if (currentIndex === 0) {
        prev.classList.add('hidden');
      }
      if (currentIndex === slides.length - 1) {
        next.classList.add('hidden');
      }
    }
  
    function moveSlides() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
    }
  
    function setupDots() {
      for (let i = 0; i < slides.length; i++) {
        const button = document.createElement('button');
        button.addEventListener('click', () => {
          currentIndex = i;
          updateDots();
          updateButtons();
          moveSlides();
        });
        dots.push(button);
        document.querySelector('nav').appendChild(button);
      }
  
      dots[0].classList.add('current');
    }
  
    function updateDots() {
      dots.forEach(dot => {
        dot.classList.remove('current');
      });
      dots[currentIndex].classList.add('current');
    }
  
    updateButtons();
    setupDots();
  
    next.addEventListener('click', () => {
      currentIndex++;
      updateButtons();
      updateDots();
      moveSlides();
    });
  
    prev.addEventListener('click', () => {
      currentIndex--;
      updateButtons();
      updateDots();
      moveSlides();
    });
  
    window.addEventListener('resize', () => {
      moveSlides();
    });

  } else {
    /* ビューポートの幅は 700 ピクセル未満の場合のコードをここに */
    const targets = document.querySelectorAll('img');

    function callback(entries, obs) {
      console.log(entries);
  
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add('appear');
        obs.unobserve(entry.target);
      });
    }
  
    const options = {
      threshold: 0.2,
    }
  
    const observer = new IntersectionObserver(callback, options);
  
    targets.forEach(target => {
      observer.observe(target);
    });

  }

}