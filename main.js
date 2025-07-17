const images = document.querySelectorAll('.carousel-image');
let currentIndex = 0;

setInterval(() => {
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
}, 3000); // змінює зображення кожні 3 секунди
