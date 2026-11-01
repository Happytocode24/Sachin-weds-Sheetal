/* ═══════════════════════════════════════════
   WEDDING INVITATION - SCRIPT.JS
   Sachin & Sheetal · 12 December 2026
═══════════════════════════════════════════ */

// ── Envelope / Seal open ────────────────────
const sealBtn        = document.getElementById('seal-btn');
const envelopeOverlay = document.getElementById('envelope-overlay');
const mainInvitation = document.getElementById('main-invitation');
const musicPlayer    = document.getElementById('music-player');
const petalsContainer = document.getElementById('petals-container');

const PETAL_COLORS = ['#c9a96e','#e8c4b8','#c17565','#f5deb3','#daa520','#f4c2c2'];

function spawnPetals() {
  for (let i = 0; i < 35; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.classList.add('petal');
      const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
      const left  = Math.random() * 100;
      const size  = 8 + Math.random() * 12;
      const dur   = 2.5 + Math.random() * 3;
      const delay = Math.random() * 1.5;
      petal.style.cssText = `
        left:${left}%;top:-20px;
        width:${size}px;height:${size * 1.5}px;
        background:${color};opacity:0.85;
        animation-duration:${dur}s;
        animation-delay:${delay}s;
      `;
      petalsContainer.appendChild(petal);
      setTimeout(() => petal.remove(), (dur + delay) * 1000 + 500);
    }, i * 60);
  }
}

function openInvitation() {
  spawnPetals();
  setTimeout(() => {
    envelopeOverlay.classList.add('opening');
    setTimeout(() => {
      envelopeOverlay.classList.add('hidden');
      mainInvitation.classList.remove('hidden');
      document.body.style.overflow = '';
      requestAnimationFrame(() => {
        setTimeout(() => {
          mainInvitation.classList.add('visible');
          document.querySelector('.hero').classList.add('loaded');
          musicPlayer.classList.remove('hidden');
          initScrollReveal();
        }, 50);
      });
    }, 800);
  }, 400);
}

if (sealBtn) {
  sealBtn.addEventListener('click', openInvitation);
  sealBtn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openInvitation(); });
}

document.body.style.overflow = 'hidden';

// ── NAV ────────────────────────────────────
const nav        = document.getElementById('main-nav');
const navMenuBtn = document.getElementById('nav-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

navMenuBtn?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  document.body.style.overflow = mobileMenu.classList.contains('hidden') ? '' : 'hidden';
});

mobileMenu?.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  });
});

// ── COUNTDOWN ──────────────────────────────
const WEDDING_DATE = new Date('2026-12-12T08:14:00+05:30');

function pad(n) { return String(n).padStart(2, '0'); }

function flipNum(el, newVal) {
  const cur = el.textContent;
  if (cur !== newVal) {
    el.classList.add('flip');
    setTimeout(() => {
      el.textContent = newVal;
      el.classList.remove('flip');
    }, 300);
  }
}

function updateCountdown() {
  const now  = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent  = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent  = '00';
    document.getElementById('cd-secs').textContent  = '00';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  flipNum(document.getElementById('cd-days'),  pad(days));
  flipNum(document.getElementById('cd-hours'), pad(hours));
  flipNum(document.getElementById('cd-mins'),  pad(mins));
  flipNum(document.getElementById('cd-secs'),  pad(secs));
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ── GALLERY LIGHTBOX ───────────────────────
const galleryImages = [
  { src: 'images/couple1.png',  alt: 'Couple at palace archway at sunset' },
  { src: 'images/couple2.png',  alt: 'Couple on boat at Lake Pichola' },
  { src: 'images/couple3.png',  alt: 'Couple in palace courtyard' },
  { src: 'images/hero_bg.png',  alt: 'Udaipur palace at golden hour' },
];

let currentLightboxIndex = 0;

const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxBackdrop = document.getElementById('lightbox-backdrop');

function openLightbox(idx) {
  currentLightboxIndex = idx;
  lightboxImg.src = galleryImages[idx].src;
  lightboxImg.alt = galleryImages[idx].alt;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}

function showPrev() {
  currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentLightboxIndex].src;
  lightboxImg.alt = galleryImages[currentLightboxIndex].alt;
}

function showNext() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentLightboxIndex].src;
  lightboxImg.alt = galleryImages[currentLightboxIndex].alt;
}

document.querySelectorAll('.gallery-item').forEach(item => {
  const idx = parseInt(item.dataset.index);
  item.addEventListener('click', () => openLightbox(idx));
  item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(idx); });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxBackdrop?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', showPrev);
lightboxNext?.addEventListener('click', showNext);

document.addEventListener('keydown', e => {
  if (lightbox && !lightbox.classList.contains('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  }
});

// ── RSVP FORM ──────────────────────────────
const rsvpForm    = document.getElementById('rsvp-form');
const rsvpSuccess = document.getElementById('rsvp-success');
const rsvpSubmit  = document.getElementById('rsvp-submit');
const rsvpSubmitTxt = document.getElementById('rsvp-submit-text');
const guestbookList = document.getElementById('guestbook-list');

rsvpForm?.addEventListener('submit', e => {
  e.preventDefault();

  const name    = document.getElementById('guest-name').value.trim();
  const message = document.getElementById('guest-message').value.trim();

  if (!name) {
    document.getElementById('guest-name').style.borderColor = '#c17565';
    document.getElementById('guest-name').focus();
    return;
  }

  // Simulate submission
  rsvpSubmit.disabled = true;
  rsvpSubmitTxt.textContent = 'Sending…';

  setTimeout(() => {
    // Add to guestbook if message provided
    if (message) {
      const item = document.createElement('div');
      item.classList.add('guestbook-item');
      const initial = name.charAt(0).toUpperCase();
      item.innerHTML = `
        <div class="guestbook-avatar">${initial}</div>
        <div class="guestbook-body">
          <strong>${escHtml(name)}</strong>
          <p>${escHtml(message)}</p>
        </div>
      `;
      guestbookList?.prepend(item);
      item.style.animation = 'fadeUpIn 0.5s cubic-bezier(0.16,1,0.3,1) both';
    }

    rsvpForm.classList.add('hidden');
    rsvpSuccess.classList.remove('hidden');

    // Scroll to success
    rsvpSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
});

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── MUSIC PLAYER ───────────────────────────
// Audio setup — called AFTER the envelope opens so the button exists in DOM
const bgAudio = new Audio('Milan.mp3');
bgAudio.loop = true;
bgAudio.volume = 0;

let isPlaying = false;
let fadeInterval = null;

function fadeAudio(targetVol, duration, onDone) {
  clearInterval(fadeInterval);
  const steps    = 30;
  const interval = duration / steps;
  const delta    = (targetVol - bgAudio.volume) / steps;
  fadeInterval = setInterval(() => {
    bgAudio.volume = Math.min(1, Math.max(0, bgAudio.volume + delta));
    if ((delta > 0 && bgAudio.volume >= targetVol) ||
        (delta < 0 && bgAudio.volume <= targetVol)) {
      bgAudio.volume = targetVol;
      clearInterval(fadeInterval);
      if (onDone) onDone();
    }
  }, interval);
}

function toggleMusic() {
  const musicIcon = document.getElementById('music-icon');
  const musicBars = document.getElementById('music-bars');

  if (!isPlaying) {
    bgAudio.play()
      .then(() => {
        fadeAudio(0.75, 1500);
        musicIcon.classList.add('hidden');
        musicBars.classList.remove('hidden');
        isPlaying = true;
      })
      .catch(err => console.warn('Audio play failed:', err));
  } else {
    fadeAudio(0, 800, () => {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    });
    const musicIcon2 = document.getElementById('music-icon');
    const musicBars2 = document.getElementById('music-bars');
    musicIcon2.classList.remove('hidden');
    musicBars2.classList.add('hidden');
    isPlaying = false;
  }
}

function initMusicPlayer() {
  const btn = document.getElementById('music-btn');
  if (btn) {
    btn.addEventListener('click', toggleMusic);
  }
}

// ── SCROLL REVEAL ──────────────────────────
function initScrollReveal() {
  // Add reveal class to sections
  document.querySelectorAll('.event-card, .gallery-item, .guestbook-item, .countdown-cell').forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 60 * (entry.target.dataset.revealDelay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .animate-fade-up').forEach((el, i) => {
    el.dataset.revealDelay = i;
    observer.observe(el);
  });

  // Also observe section eyebrows/titles
  document.querySelectorAll('.section-eyebrow, .section-title').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// ── SMOOTH SCROLL ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── PARALLAX HERO ──────────────────────────
const heroBg = document.querySelector('.hero-bg-img');
window.addEventListener('scroll', () => {
  if (heroBg) {
    const scrollY = window.scrollY;
    heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
}, { passive: true });

// ── ACTIVE NAV HIGHLIGHT ───────────────────
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      active?.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

console.log('%c💍 Sachin & Sheetal · Wedding Invitation', 'font-size:16px;color:#c9a96e;font-family:serif;');
console.log('%c11 December 2026 · Udaipur, Rajasthan', 'font-size:12px;color:#8a7060;');
