/* =========================================================
   SCROLL STORY & INTERSECTION OBSERVER CHOREOGRAPHY
   ========================================================= */

export function initScrollStory() {
  // 1. Reveal Elements on Scroll
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  // 2. Active Nav Link Tracking
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // 3. Paper Airplane Scroll Movement (Hero to Intro)
    const airplane = document.getElementById('heroAirplane');
    if (airplane) {
      const scrollY = window.scrollY;
      const maxScroll = 500;
      const progress = Math.min(scrollY / maxScroll, 1);
      
      // Interpolate along smooth curve
      const x = progress * 140;
      const y = progress * 180;
      const rot = 25 + progress * 35;
      airplane.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
    }
  }, { passive: true });
}
