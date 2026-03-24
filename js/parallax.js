/* ============================================================
   Parallax Scroll + Scroll Indicator
   ============================================================ */

function initParallax() {
  const heroSection = document.getElementById('hero');
  const bg  = document.querySelector('.parallax-bg');
  const mid = document.querySelector('.parallax-mid');
  const indicator = document.querySelector('.scroll-indicator');

  if (!heroSection || !bg || !mid) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Parallax speed multipliers
  const SPEED_BG  = 0.2;
  const SPEED_MID = 0.5;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const heroH = heroSection.offsetHeight;

    if (scrollY <= heroH && !prefersReducedMotion) {
      bg.style.transform  = `translateY(${scrollY * SPEED_BG}px)`;
      mid.style.transform = `translateY(${scrollY * SPEED_MID}px)`;
    }

    // Fade out indicator as user scrolls
    if (indicator) {
      const opacity = Math.max(0, 1 - scrollY / (heroH * 0.3));
      indicator.style.opacity = opacity;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Scroll indicator click — snap to game
  if (indicator) {
    indicator.addEventListener('click', () => {
      document.getElementById('game').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Initial call
  updateParallax();
}
