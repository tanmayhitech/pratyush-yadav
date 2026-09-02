/**
 * PRATYUSH YADAV — THE CINEMATIC MONOGRAPH
 * Script: Theme Switcher (Crimson Default / Noir / Purple) with Auto-Mapped Portraits,
 * 3D Parallax Tilt, Ambient Cursor Spotlight, Magnetic Hover, Modal Dispatch, Lightbox & Revelations
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 0. Bold & Crisp "GODFATHER" 1-Sec Entry Animation
  // --------------------------------------------------------------------------
  const prologueScreen = document.getElementById('prologueScreen');

  function dismissPrologue() {
    if (prologueScreen && !prologueScreen.classList.contains('is-dismissed')) {
      prologueScreen.classList.add('is-dismissed');
      setTimeout(() => {
        prologueScreen.style.display = 'none';
      }, 500);
    }
  }

  prologueScreen?.addEventListener('click', dismissPrologue);

  // Auto-dismiss after 1 second
  const prologueTimer = setTimeout(dismissPrologue, 1000);

  document.addEventListener('keydown', (e) => {
    clearTimeout(prologueTimer);
    dismissPrologue();
  }, { once: true });

  // --------------------------------------------------------------------------
  // 1. Photos Data & Theme Mapping
  // --------------------------------------------------------------------------
  const PHOTOS = [
    { src: 'assets/bauwabhaiy.jpeg', title: 'PRATYUSH YADAV', act: 'ACT I — CLOSE-UP' },
    { src: 'assets/pratyush-suit-study.jpeg', title: 'THE STUDY // LUCKNOW', act: 'ACT II — THE STUDY' },
    { src: 'assets/pratyush-suit-seated.jpeg', title: 'COMPOSURE', act: 'ACT III — COMPOSURE' }
  ];

  const mainPortraitImg = document.getElementById('mainPortraitImg');
  const switchBtns = document.querySelectorAll('.pt-switch-btn');

  let currentPhoto = { ...PHOTOS[1] }; // Default: Image 2 (Crimson Study)

  function selectPhoto(index) {
    if (index < 0 || index >= PHOTOS.length) return;
    const target = PHOTOS[index];

    switchBtns.forEach((btn, idx) => {
      if (idx === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (mainPortraitImg && mainPortraitImg.getAttribute('src') !== target.src) {
      mainPortraitImg.style.opacity = '0';
      setTimeout(() => {
        mainPortraitImg.src = target.src;
        mainPortraitImg.style.opacity = '1';
        currentPhoto = { ...target };
      }, 150);
    } else {
      currentPhoto = { ...target };
    }
  }

  // Switch between 3 portraits in hero via buttons
  switchBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectPhoto(idx);
    });
  });

  // --------------------------------------------------------------------------
  // 2. Theme Switcher (Noir -> Image 1, Crimson -> Image 2, Purple -> Image 3)
  // --------------------------------------------------------------------------
  const htmlRoot = document.documentElement;
  const btnNoir = document.getElementById('btnNoir');
  const btnCrimson = document.getElementById('btnCrimson');
  const btnPurple = document.getElementById('btnPurple');

  const THEME_STORAGE_KEY = 'pratyush_yadav_theme';

  function setTheme(theme) {
    // Reset active button classes
    btnNoir?.classList.remove('active');
    btnCrimson?.classList.remove('active');
    btnPurple?.classList.remove('active');

    if (theme === 'noir') {
      htmlRoot.setAttribute('data-theme', 'noir');
      btnNoir?.classList.add('active');
      localStorage.setItem(THEME_STORAGE_KEY, 'noir');
      // On Noir: Use Image 1 as main hero portrait
      selectPhoto(0);
    } else if (theme === 'purple') {
      htmlRoot.setAttribute('data-theme', 'purple');
      btnPurple?.classList.add('active');
      localStorage.setItem(THEME_STORAGE_KEY, 'purple');
      // On Purple: Use Image 3 as main hero portrait
      selectPhoto(2);
    } else {
      htmlRoot.setAttribute('data-theme', 'crimson');
      btnCrimson?.classList.add('active');
      localStorage.setItem(THEME_STORAGE_KEY, 'crimson');
      // On Crimson (Default): Use Image 2 as main hero portrait
      selectPhoto(1);
    }
  }

  // Always open on Crimson (Godfather Red with Image 2) on load
  setTheme('crimson');
  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch (e) {}

  btnNoir?.addEventListener('click', () => setTheme('noir'));
  btnCrimson?.addEventListener('click', () => setTheme('crimson'));
  btnPurple?.addEventListener('click', () => setTheme('purple'));

  // --------------------------------------------------------------------------
  // 3. Scroll Reading Progress Indicator
  // --------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      if (scrollProgressBar) scrollProgressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 4. Chiaroscuro Ambient Cursor Spotlight (Desktop)
  // --------------------------------------------------------------------------
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let targetX = mouseX;
  let targetY = mouseY;
  let isTicking = false;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    if (!isTicking) {
      requestAnimationFrame(() => {
        mouseX += (targetX - mouseX) * 0.18;
        mouseY += (targetY - mouseY) * 0.18;
        document.documentElement.style.setProperty('--mouse-x', `${targetX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${targetY}px`);
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 4. 3D Micro-Parallax Tilt & Mobile Touch Interaction on Portrait
  // --------------------------------------------------------------------------
  const portraitArtwork = document.getElementById('portraitArtwork');

  if (portraitArtwork) {
    // Desktop Fine Pointer Parallax
    if (window.matchMedia('(pointer: fine)').matches) {
      let tiltFrame;

      portraitArtwork.addEventListener('mousemove', (e) => {
        cancelAnimationFrame(tiltFrame);
        tiltFrame = requestAnimationFrame(() => {
          const rect = portraitArtwork.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -7;
          const rotateY = ((x - centerX) / centerX) * 7;
          
          portraitArtwork.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        });
      });

      portraitArtwork.addEventListener('mouseleave', () => {
        cancelAnimationFrame(tiltFrame);
        portraitArtwork.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    }

    // Mobile Phone Touch & Tap Color Activation
    portraitArtwork.addEventListener('touchstart', () => {
      portraitArtwork.classList.toggle('is-color-active');
    }, { passive: true });

    // Mobile Device Orientation Gyroscope Tilt (Phones & Tablets)
    if (window.DeviceOrientationEvent && window.matchMedia('(max-width: 1024px)').matches) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null) {
          const tiltX = Math.max(-10, Math.min(10, e.beta - 40)) * 0.35;
          const tiltY = Math.max(-10, Math.min(10, e.gamma)) * 0.35;
          portraitArtwork.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
        }
      }, { passive: true });
    }
  }

  // --------------------------------------------------------------------------
  // 5. Subtle Magnetic Pull on Action Buttons (Desktop)
  // --------------------------------------------------------------------------
  if (window.matchMedia('(pointer: fine)').matches) {
    const magneticBtns = document.querySelectorAll('.action-btn-primary, .insta-highlight-btn');
    
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Contact Dispatch Modal
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
  // 7. Fullscreen Lightbox
  // --------------------------------------------------------------------------
  const portraitLightbox = document.getElementById('portraitLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lbTitle = document.getElementById('lbTitle');
  const lbAct = document.getElementById('lbAct');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const seatedPortraitCard = document.getElementById('seatedPortraitCard');
  const intermissionStudy = document.getElementById('intermissionStudy');

  function openLightbox(src, title, act) {
    if (lightboxImg) lightboxImg.src = src || currentPhoto.src;
    if (lbTitle) lbTitle.textContent = title || currentPhoto.title;
    if (lbAct) lbAct.textContent = act || currentPhoto.act;

    portraitLightbox?.classList.add('is-active');
    portraitLightbox?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    portraitLightbox?.classList.remove('is-active');
    portraitLightbox?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Click Hero Portrait
  if (portraitArtwork) {
    portraitArtwork.addEventListener('click', (e) => {
      if (!e.target.closest('.pt-switch-btn')) {
        openLightbox(currentPhoto.src, currentPhoto.title, currentPhoto.act);
      }
    });
  }

  // Click Seated Portrait Card
  seatedPortraitCard?.addEventListener('click', () => {
    openLightbox('assets/pratyush-suit-seated.jpeg', 'PRATYUSH YADAV', 'ACT III — COMPOSURE');
  });

  // Click Visual Study Intermission
  intermissionStudy?.addEventListener('click', () => {
    openLightbox('assets/pratyush-suit-study.jpeg', 'THE STUDY // LUCKNOW', 'ACT II — THE STUDY');
  });

  lightboxCloseBtn?.addEventListener('click', closeLightbox);
  lightboxBackdrop?.addEventListener('click', closeLightbox);

  // --------------------------------------------------------------------------
  // 8. Global Keyboard Handlers
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
  // 9. Minimalist Scroll Reveal Observer
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
