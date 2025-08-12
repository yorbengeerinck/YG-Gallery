// DOM elements bovenaan
const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;
const themeIcon = document.querySelector('#theme-icon');
const themeText = document.querySelector('#theme-text');

const galleries = document.querySelectorAll('.gallery > div');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function updateToggle() {
  if (body.classList.contains('dark')) {
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Dark';
  } else {
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Light';
  }
}

function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    body.classList.remove('light');
    lightbox.classList.remove('light');
  } else {
    body.classList.add('light');
    body.classList.remove('dark');
    lightbox.classList.add('light');
  }
  updateToggle();
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

toggleBtn.addEventListener('click', () => {
  const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});

// --- Lightbox functionaliteit ---
let currentGallery = null;
let currentImages = [];
let currentIndex = 0;
let lastActiveImg = null;

// Zorg dat de lightbox standaard dicht is
lightbox.style.display = 'none';

galleries.forEach(gallery => {
  const images = Array.from(gallery.querySelectorAll('img'));

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentGallery = gallery;
      currentImages = images;
      currentIndex = index;
      lastActiveImg = img;

      openLightbox();
    });
  });
});

function openLightbox() {
  updateLightbox();
  lightbox.style.display = 'flex';
  lightbox.focus();
}

function updateLightbox() {
  const img = currentImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  const parentDiv = img.parentElement;
  const p = parentDiv.querySelector('p');
  caption.textContent = p ? p.textContent : '';
  // Zet tabindex op de knoppen zodat ze met tab bereikbaar zijn
  prevBtn.tabIndex = 0;
  nextBtn.tabIndex = 0;
}

function closeLightbox() {
  lightbox.style.display = 'none';
  currentGallery = null;
  currentImages = [];
  currentIndex = 0;
  if (lastActiveImg) lastActiveImg.focus();
}

function changeSlide(direction) {
  if (!currentImages.length) return;
  currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
  updateLightbox();
}

// Sluitknop
closeBtn.addEventListener('click', closeLightbox);

// Sluiten bij klik op achtergrond
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard functionaliteit
lightbox.addEventListener('keydown', e => {
  if (!currentImages.length) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight') {
    changeSlide(1);
  } else if (e.key === 'ArrowLeft') {
    changeSlide(-1);
  }
});

// Prev/Next knoppen
prevBtn.addEventListener('click', e => {
  e.stopPropagation();
  changeSlide(-1);
});
nextBtn.addEventListener('click', e => {
  e.stopPropagation();
  changeSlide(1);
});

// Ook met enter/space te bedienen
prevBtn.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    changeSlide(-1);
  }
});
nextBtn.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    changeSlide(1);
  }
});