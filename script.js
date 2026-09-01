/**
 * PRATYUSH YADAV — THE CINEMATIC MONOGRAPH
 * Script: Theme Switcher (Noir / Crimson), Modal Dispatch, Lightbox, & Revelations
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Switcher: Noir Mode & Crimson Blood Mode
  // --------------------------------------------------------------------------
  const htmlRoot = document.documentElement;
  const btnNoir = document.getElementById('btnNoir');
  const btnCrimson = document.getElementById('btnCrimson');

  const THEME_STORAGE_KEY = 'pratyush_yadav_theme';

  function setTheme(theme) {
    if (theme === 'crimson') {
      htmlRoot.setAttribute('data-theme', 'crimson');
      btnCrimson?.classList.add('active');
      btnNoir?.classList.remove('active');
      localStorage.setItem(THEME_STORAGE_KEY, 'crimson');
    } else {
      htmlRoot.setAttribute('data-theme', 'noir');
      btnNoir?.classList.add('active');
      btnCrimson?.classList.remove('active');
      localStorage.setItem(THEME_STORAGE_KEY, 'noir');
    }
  }

  // Load saved theme or default to noir
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'noir';
  setTheme(savedTheme);

  btnNoir?.addEventListener('click', () => setTheme('noir'));
  btnCrimson?.addEventListener('click', () => setTheme('crimson'));

  // --------------------------------------------------------------------------
  // 2. Contact Dispatch Modal
  // --------------------------------------------------------------------------
  const contactModal = document.getElementById('contactModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const heroDispatchBtn = document.getElementById('heroDispatchBtn');
  const openDispatchBtn = document.getElementById('openDispatchBtn');

  const contactForm = document.getElementById('contactForm');
  const modalSuccess = document.getElementById('modalSuccess');
  const successDismissBtn = document.getElementById('successDismissBtn');
  const newMsgBtn = document.getElementById('newMsgBtn');

  const nameInput = document.getElementById('formName');
  const emailInput = document.getElementById('formEmail');
  const messageInput = document.getElementById('formMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function openContactModal() {
    contactModal?.classList.add('is-active');
    contactModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      nameInput?.focus();
    }, 150);
  }

  function closeContactModal() {
    contactModal?.classList.remove('is-active');
    contactModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function resetFormState() {
    contactForm?.reset();
    if (nameError) {
      nameError.textContent = '';
      nameError.classList.remove('is-visible');
    }
    if (emailError) {
      emailError.textContent = '';
      emailError.classList.remove('is-visible');
    }
    if (messageError) {
      messageError.textContent = '';
      messageError.classList.remove('is-visible');
    }

    if (contactForm) contactForm.style.display = 'flex';
    if (modalSuccess) modalSuccess.style.display = 'none';
  }

  heroDispatchBtn?.addEventListener('click', openContactModal);
  openDispatchBtn?.addEventListener('click', openContactModal);
  modalCloseBtn?.addEventListener('click', closeContactModal);
  modalBackdrop?.addEventListener('click', closeContactModal);

  successDismissBtn?.addEventListener('click', () => {
    closeContactModal();
    setTimeout(resetFormState, 300);
  });

  newMsgBtn?.addEventListener('click', () => {
    resetFormState();
    nameInput?.focus();
  });

  // Form Validation & Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Identity or name is required.';
        nameError.classList.add('is-visible');
        isValid = false;
      } else {
        nameError.textContent = '';
        nameError.classList.remove('is-visible');
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Email transmission address required.';
        emailError.classList.add('is-visible');
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Valid email syntax required.';
        emailError.classList.add('is-visible');
        isValid = false;
      } else {
        emailError.textContent = '';
        emailError.classList.remove('is-visible');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Message content cannot be empty.';
        messageError.classList.add('is-visible');
        isValid = false;
      } else {
        messageError.textContent = '';
        messageError.classList.remove('is-visible');
      }

      if (!isValid) return;

      // Simulate Transmission
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn-text">Transmitting...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.style.display = 'none';
        modalSuccess.style.display = 'block';
      }, 450);
    });
  }

  // --------------------------------------------------------------------------
  // 3. Fullscreen Chiaroscuro Lightbox
  // --------------------------------------------------------------------------
  const portraitArtwork = document.getElementById('portraitArtwork');
  const portraitLightbox = document.getElementById('portraitLightbox');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  function openLightbox() {
    portraitLightbox?.classList.add('is-active');
    portraitLightbox?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    portraitLightbox?.classList.remove('is-active');
    portraitLightbox?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (portraitArtwork) {
    portraitArtwork.addEventListener('click', openLightbox);
    portraitArtwork.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox();
      }
    });
  }

  lightboxCloseBtn?.addEventListener('click', closeLightbox);
  lightboxBackdrop?.addEventListener('click', closeLightbox);

  // --------------------------------------------------------------------------
  // 4. Global Keyboard Handlers
  // --------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (portraitLightbox && portraitLightbox.classList.contains('is-active')) {
        closeLightbox();
      } else if (contactModal && contactModal.classList.contains('is-active')) {
        closeContactModal();
      }
    }
  });

  // --------------------------------------------------------------------------
  // 5. Minimalist Scroll Reveal Observer
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
});
