// thema
const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;
const themeIcon = document.querySelector('#theme-icon');
const themeText = document.querySelector('#theme-text');
const lightbox = document.getElementById('lightbox');

function updateToggle() {
  if (body.classList.contains('dark')) {
    themeIcon.textContent = '🌙';  // maan voor dark mode
    themeText.textContent = 'Dark';
  } else {
    themeIcon.textContent = '☀️';  // zon voor light mode
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

const savedTheme = localStorage.getItem('theme') || 'dark';  // default dark
applyTheme(savedTheme);

toggleBtn.addEventListener('click', () => {
  const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});

// lightbox
const galleries = document.querySelectorAll('.gallery > div');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');

window.addEventListener('load', () => {
  lightbox.style.display = 'none';
});

let currentGallery = null;
let currentImages = [];
let currentIndex = 0;

galleries.forEach(gallery => {
  const images = Array.from(gallery.querySelectorAll('img'));

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentGallery = gallery;
      currentImages = images;
      currentIndex = index;

      lightbox.style.display = 'flex';
      lightboxImg.src = currentImages[currentIndex].src;
      lightboxImg.alt = currentImages[currentIndex].alt;

      const parentDiv = img.parentElement;
      const p = parentDiv.querySelector('p');
      caption.textContent = p ? p.textContent : '';

      lightbox.focus();
    });
  });
});

function closeLightbox() {
  lightbox.style.display = 'none';
  currentGallery = null;
  currentImages = [];
  currentIndex = 0;
}

document.querySelector('.close').addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

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

function changeSlide(direction) {
  currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
  const img = currentImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;

  const parentDiv = img.parentElement;
  const p = parentDiv.querySelector('p');
  caption.textContent = p ? p.textContent : '';
}

// -- Toevoeging voor "verbergen" van console en devtools moeilijker maken --

(function() {
  const noop = () => {};
  console.log = noop;
  console.warn = noop;
  console.error = noop;
  console.info = noop;
})();

window.addEventListener('contextmenu', e => e.preventDefault());

window.addEventListener('keydown', function(e) {
  if (e.key === 'F12') {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') {
    e.preventDefault();
  }
  if (e.ctrlKey && e.key.toLowerCase() === 'u') {
    e.preventDefault();
  }
});

document.addEventListener('keyup', function(e) {
  if (e.key === 'PrintScreen') {
    // Verberg de pagina of toon een melding
    document.body.style.visibility = 'hidden';
    
    // Herstel na 1 seconde weer zichtbaar (kan je aanpassen)
    setTimeout(() => {
      document.body.style.visibility = 'visible';
    }, 1000);
  }
});
