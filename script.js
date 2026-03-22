/* ========================================
   script.js – Portfolio Interactive JS
   ======================================== */

// =====================
// PARTICLES BACKGROUND
// =====================
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'particle';
    dot.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-duration: ${6 + Math.random() * 10}s;
      animation-delay: ${Math.random() * 8}s;
      width: ${1.5 + Math.random() * 2.5}px;
      height: ${1.5 + Math.random() * 2.5}px;
      background: ${Math.random() > 0.5 ? '#00d4ff' : '#a855f7'};
    `;
    container.appendChild(dot);
  }
})();

// =====================
// TYPING ANIMATION
// =====================
(function typingEffect() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'AI/ML Enthusiast',
    'Full Stack Developer',
    'Cloud Certified',
    'CyberSecurity Explorer',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        typingSpeed = 2000; // pause at end
      } else {
        typingSpeed = 80;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 300;
      } else {
        typingSpeed = 45;
      }
    }
    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 800);
})();

// =====================
// STICKY NAVBAR
// =====================
(function stickyNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
})();

// =====================
// HAMBURGER MENU
// =====================
(function hamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
})();

// =====================
// ACTIVE NAV ON SCROLL
// =====================
(function activeNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

// =====================
// SCROLL REVEAL
// =====================
(function scrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for children in the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

// =====================
// CIRCULAR PROFICIENCY RINGS
// =====================
(function animateCircles() {
  const circumference = 2 * Math.PI * 32; // r=32 → ≈201.06
  const fills = document.querySelectorAll('.circle-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const pct = parseFloat(el.getAttribute('data-pct')) / 100;
        setTimeout(() => {
          el.style.strokeDasharray = `${pct * circumference} ${circumference}`;
        }, 180);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
})();

// =====================
// BACK TO TOP
// =====================
(function backToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// =====================
// SMOOTH SCROLL
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =====================
// CONTACT FORM
// =====================
(function contactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
})();

// =====================
// PROFILE IMAGE FALLBACK
// =====================
(function heroImageFallback() {
  const img = document.getElementById('hero-img');
  if (!img) return;
  img.addEventListener('error', function () {
    this.parentElement.innerHTML = `
      <div class="avatar-placeholder">
        <i class="fas fa-user"></i>
      </div>`;
  });
})();

// =====================
// HAMBURGER ICON ANIMATION
// =====================
(function hamburgerIcon() {
  const style = document.createElement('style');
  style.textContent = `
    .hamburger.active span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .hamburger.active span:nth-child(2) {
      opacity: 0; transform: scaleX(0);
    }
    .hamburger.active span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  `;
  document.head.appendChild(style);
})();

console.log('%c👋 Hey there! Portfolio built with ❤️ by Modepalli Sai Kala', 
  'color: #00d4ff; font-size: 14px; font-weight: bold; padding: 4px;');
