/* =========================================================
   MAIN APPLICATION BOOTSTRAP
   ========================================================= */

import './styles/variables.css';
import './styles/base.css';
import './styles/header-nav.css';
import './styles/hero.css';
import './styles/editorial-intro.css';
import './styles/featured-projects.css';
import './styles/workflow.css';
import './styles/playground.css';
import './styles/about-me.css';
import './styles/philosophy-scene.css';
import './styles/cta-footer.css';
import './styles/watering-can-cursor.css';
import './styles/gardener-character.css';
import './styles/hero-character.css';
import './styles/project-overlay.css';
import './styles/animations.css';
import './styles/responsive.css';

import { initTheme } from './scripts/theme-toggle.js';
import { initAudioPlayer } from './scripts/audio-player.js';
import { initScrollStory } from './scripts/scroll-story.js';
import { initPlaygroundWidgets } from './scripts/interactive-widgets.js';
import { initProjectOverlay } from './scripts/project-overlay.js';
import { initProjectWheel } from './scripts/project-wheel.js';
import { initHeroWordRotator } from './scripts/word-rotator.js';
import { initStarfield } from './scripts/starfield.js';
import { initWateringCanCursor } from './scripts/watering-can-cursor.js';
import { initGardenerCharacter } from './scripts/gardener-character.js';
import { initHeroCharacter } from './scripts/hero-character.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initStarfield();
  initWateringCanCursor();
  initHeroCharacter();
  initGardenerCharacter();
  initAudioPlayer();
  initScrollStory();
  initPlaygroundWidgets();
  initProjectWheel();
  initProjectOverlay();
  initHeroWordRotator();

  // Mobile Menu Drawer Handler
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // Back to top button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
