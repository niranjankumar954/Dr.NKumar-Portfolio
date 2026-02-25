/* ═══════════════════════════════════════
   MAIN.JS — Interactions & Animations
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────
     1. SCROLL REVEAL
     Adds .show to .reveal / .reveal-left
     elements as they enter the viewport.
     Stagger delay is applied to siblings.
  ───────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('show');

      // Animate skill bar width once card is visible
      const bar = entry.target.querySelector('.sk-bar');
      if (bar) {
        const pct = entry.target.getAttribute('data-pct');
        setTimeout(() => {
          bar.style.width = pct + '%';
        }, 200);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .reveal-left').forEach((el) => {
    // Apply staggered delay to items that share the same parent container
    const parent = el.parentElement;
    const siblings = parent.querySelectorAll('.reveal, .reveal-left');
    if (siblings.length > 1) {
      const idx = Array.from(siblings).indexOf(el);
      el.style.transitionDelay = (idx * 0.1) + 's';
    }
    revealObserver.observe(el);
  });


  /* ─────────────────────────────────────
     2. ACTIVE NAV LINK ON SCROLL
     Highlights the nav link corresponding
     to the section currently in view.
  ───────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 80;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === '#' + section.id;
          link.classList.toggle('active', isActive);
        });
      }
    });
  }, { passive: true });


  /* ─────────────────────────────────────
     3. SMOOTH SCROLL
     Intercepts anchor clicks and scrolls
     smoothly to the target section.
  ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
