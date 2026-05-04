/* ===================================================
   TRIBUART — Script
   Handles: Animations, i18n toggle, form, scroll
   =================================================== */

(function () {
  'use strict';

  // ---- i18n Translations ----
  const translations = {
    es: {
      'tag': 'Próximamente',
      'title-1': 'Sitio en',
      'title-2': 'Construcción',
      'desc': 'Estamos creando una nueva experiencia digital para celebrar la belleza natural de la tagua. Nuestro taller virtual abrirá pronto.',
      'email-label': 'Tu correo electrónico',
      'cta': 'Notificarme',
      'success': '¡Gracias! Te notificaremos cuando estemos listos.',
      'footer-sustainability': 'Sostenibilidad',
      'footer-process': 'Proceso',
      'footer-contact': 'Contacto',
    },
    en: {
      'tag': 'Coming Soon',
      'title-1': 'Site Under',
      'title-2': 'Construction',
      'desc': 'We are crafting a new digital experience to celebrate the natural beauty of tagua. Our virtual workshop will open soon.',
      'email-label': 'Your email address',
      'cta': 'Notify Me',
      'success': 'Thank you! We\'ll notify you when we\'re ready.',
      'footer-sustainability': 'Sustainability',
      'footer-process': 'Process',
      'footer-contact': 'Contact',
    }
  };

  let currentLang = 'es';

  // ---- DOM Ready ----
  document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initLangToggle();
    initForm();
    initScrollHeader();
  });

  // ---- Entry Animations (Intersection Observer) ----
  function initAnimations() {
    const animatedEls = document.querySelectorAll('[data-animate]');

    // Trigger immediately for elements above the fold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    animatedEls.forEach((el) => observer.observe(el));
  }

  // ---- Language Toggle ----
  function initLangToggle() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      applyTranslations(currentLang);
      updateLangButton(currentLang);
    });
  }

  function applyTranslations(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;
  }

  function updateLangButton(lang) {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;

    const labels = btn.querySelectorAll('.lang-label');
    labels.forEach((label) => {
      const text = label.textContent.trim();
      if (text === lang.toUpperCase()) {
        label.classList.remove('lang-inactive');
      } else {
        label.classList.add('lang-inactive');
      }
    });
  }

  // ---- Signup Form ----
  function initForm() {
    const form = document.getElementById('notify-form');
    const successEl = document.getElementById('signup-success');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('email-input');
      const email = emailInput.value.trim();

      if (!isValidEmail(email)) {
        emailInput.style.borderColor = 'var(--error)';
        emailInput.addEventListener('input', () => {
          emailInput.style.borderColor = '';
        }, { once: true });
        return;
      }

      // Open mail client
      const subject = currentLang === 'es' ? 'Notificarme - Tribuart' : 'Notify Me - Tribuart';
      const body = currentLang === 'es' 
        ? `Hola,\n\nPor favor notifíquenme cuando el sitio de Tribuart esté listo.\n\nMi correo: ${email}`
        : `Hello,\n\nPlease notify me when the Tribuart site is ready.\n\nMy email: ${email}`;
      
      const mailtoUrl = `mailto:info@tribuart.ec?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      // Show success message locally
      const btn = document.getElementById('notify-btn');
      btn.disabled = true;
      btn.style.opacity = '.6';
      
      setTimeout(() => {
        form.classList.add('hidden');
        successEl.classList.remove('hidden');
      }, 800);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ---- Scroll Header Shadow ----
  function initScrollHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    });
  }
})();
