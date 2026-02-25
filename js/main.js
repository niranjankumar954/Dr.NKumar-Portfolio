/* ═══════════════════════════════════════════
   MAIN.JS  —  All Interactions & Animations
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. NAV — Transparent ↔ Solid on scroll
        Also highlights active section link
  ───────────────────────────────────────── */
  const nav      = document.querySelector('nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateNav() {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('scrolled', scrolled);
    nav.classList.toggle('at-top',  !scrolled);

    // Active link highlight
    const y = window.scrollY + 100;
    sections.forEach(sec => {
      if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id);
        });
      }
    });
  }

  nav.classList.add('at-top');
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* ─────────────────────────────────────────
     2. SCROLL REVEAL
        Watches [data-reveal] elements and
        adds .revealed when they enter view.
        Sibling delay is applied automatically.
  ───────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      el.classList.add('revealed');

      // Animate skill bars inside revealed cards
      const bar = el.querySelector('.sk-bar');
      if (bar) {
        const pct = el.getAttribute('data-pct') || '0';
        setTimeout(() => { bar.style.width = pct + '%'; }, 250);
      }

      // Stop observing after first reveal
      revealObs.unobserve(el);
    });
  }, {
    threshold:  0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe all reveal elements & apply stagger delays
  document.querySelectorAll('[data-reveal]').forEach(el => {
    // Find siblings inside the same direct parent grid/list
    const parent   = el.parentElement;
    const siblings = Array.from(parent.querySelectorAll(':scope > [data-reveal]'));

    if (siblings.length > 1) {
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = (idx * 0.12) + 's';
    }

    revealObs.observe(el);
  });


  /* ─────────────────────────────────────────
     3. SMOOTH SCROLL  —  Anchor links
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });


  /* ─────────────────────────────────────────
     4. PARALLAX — subtle hero name movement
  ───────────────────────────────────────── */
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroName.style.transform = `translateY(${y * 0.25}px)`;
      heroName.style.opacity   = Math.max(0, 1 - y / 500);
    }, { passive: true });
  }

});
