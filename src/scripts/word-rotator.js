/* =========================================================
   HERO WORD ROTATOR (Solves -> Builds -> Codes -> Ships)
   ========================================================= */

export function initHeroWordRotator() {
  const el = document.getElementById('heroRotatingWord');
  if (!el) return;

  const words = ['Solves', 'Builds', 'Codes', 'Ships'];
  let currentIndex = 0;

  setInterval(() => {
    // Fade out and slide up slightly
    el.classList.add('word-switching-out');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % words.length;
      el.textContent = words[currentIndex];
      
      // Position below for incoming slide
      el.classList.remove('word-switching-out');
      el.classList.add('word-switching-in');

      // Force reflow
      void el.offsetWidth;

      // Animate into place
      el.classList.remove('word-switching-in');
    }, 220);
  }, 1600);
}
