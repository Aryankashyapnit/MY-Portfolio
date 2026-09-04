/* =========================================================
   GARDENER 3D SUIT CHARACTER CONTROLLER
   - Walks strictly from Left to Right across the meadow
   - Waters flower clusters 1 to 5 with sparkling water & blooming petals
   - Walks off beyond the right edge and disappears completely
   ========================================================= */

import { getTransparentCharacterImage } from './character-utils.js';

export function initGardenerCharacter() {
  const container = document.getElementById('gardenerCharacterNode');
  const imgWalk = document.getElementById('gardenerImgWalk');
  const imgWater = document.getElementById('gardenerImgWater');
  const bubbleEl = document.getElementById('gardenerBubble3D');
  const footer = document.getElementById('contact');
  const meadow = document.getElementById('growMeadow');

  if (!container || !imgWalk || !imgWater || !footer) return;

  // Load transparent cutout versions of 3D images
  getTransparentCharacterImage('/assets/aryan-gardener-walk.jpg').then((src) => {
    imgWalk.src = src;
  });

  getTransparentCharacterImage('/assets/aryan-gardener-water.jpg').then((src) => {
    imgWater.src = src;
  });

  const waypoints = [
    { ratio: 0.08, cluster: 1, message: '🌱 Planting ideas...', duration: 2200 },
    { ratio: 0.28, cluster: 2, message: '💧 Polishing code...', duration: 2200 },
    { ratio: 0.50, cluster: 3, message: '✨ Cultivating design...', duration: 2400 },
    { ratio: 0.72, cluster: 4, message: '🚀 Building products...', duration: 2200 },
    { ratio: 0.90, cluster: 5, message: '🌻 Blooming bright!', duration: 2600 }
  ];

  let currentX = -140;
  let targetX = -140;
  let isWalking = false;
  let isWatering = false;
  let isBusy = false;
  let hasStartedJourney = false;
  let walkAnimationId = null;

  function setGardenerPosition(x) {
    container.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  // Initial State: Facing Right on Left edge
  setGardenerPosition(currentX);
  container.classList.add('face-right');

  function showMessage(text, duration = 2200) {
    if (!bubbleEl) return;
    bubbleEl.textContent = text;
    bubbleEl.classList.add('show-bubble');
    if (duration > 0) {
      setTimeout(() => {
        bubbleEl.classList.remove('show-bubble');
      }, duration);
    }
  }

  function hideMessage() {
    if (bubbleEl) bubbleEl.classList.remove('show-bubble');
  }

  function bloomFlowerCluster(clusterNum) {
    const root = document.querySelector(`.flower-growth-root[data-cluster="${clusterNum}"]`);
    if (root) {
      let currentGrowth = parseFloat(root.dataset.growth || '1.0');
      const newGrowth = Math.min(1.3, currentGrowth + 0.08);
      root.dataset.growth = newGrowth.toFixed(2);
      root.style.transform = `scaleY(${newGrowth}) scaleX(${1 + (newGrowth - 1) * 0.25})`;

      const flowerGroup = root.querySelector('.flower-group');
      if (flowerGroup) {
        flowerGroup.classList.remove('plant-watered');
        void flowerGroup.offsetWidth;
        flowerGroup.classList.add('plant-watered');
        setTimeout(() => {
          flowerGroup.classList.remove('plant-watered');
        }, 1800);
      }

      const sparkles = root.querySelector('.flower-water-sparkles');
      if (sparkles) {
        sparkles.classList.remove('active');
        void sparkles.offsetWidth;
        sparkles.classList.add('active');
        setTimeout(() => {
          sparkles.classList.remove('active');
        }, 1600);
      }
    }
  }

  function walkTo(target, speed = 2.4) {
    return new Promise((resolve) => {
      targetX = target;
      isWalking = true;
      container.classList.add('is-walking');
      container.classList.remove('is-watering', 'is-celebrating');

      if (walkAnimationId) cancelAnimationFrame(walkAnimationId);

      function step() {
        const dx = targetX - currentX;
        const dist = Math.abs(dx);

        if (dist <= speed) {
          currentX = targetX;
          setGardenerPosition(currentX);
          isWalking = false;
          container.classList.remove('is-walking');
          resolve();
          return;
        }

        const moveStep = Math.sign(dx) * Math.min(dist, speed);
        currentX += moveStep;
        setGardenerPosition(currentX);

        walkAnimationId = requestAnimationFrame(step);
      }

      walkAnimationId = requestAnimationFrame(step);
    });
  }

  async function waterAtSpot(clusterNum, message, duration = 2200) {
    isWatering = true;
    container.classList.add('is-watering');
    container.classList.remove('is-walking', 'is-celebrating');

    if (message) {
      showMessage(message, duration);
    }

    bloomFlowerCluster(clusterNum);

    await new Promise(r => setTimeout(r, duration));

    container.classList.remove('is-watering');
    isWatering = false;
    hideMessage();
    await new Promise(r => setTimeout(r, 200));
  }

  async function runGardeningJourney() {
    if (isBusy) return;
    isBusy = true;

    const footerWidth = footer.clientWidth || window.innerWidth;

    showMessage('🌱 Time to nurture the garden!', 2000);
    await new Promise(r => setTimeout(r, 600));

    // 1. Walk Left to Right through all flower clusters 1 to 5
    for (let i = 0; i < waypoints.length; i++) {
      const wp = waypoints[i];
      const targetPx = Math.max(15, Math.min(footerWidth - 140, wp.ratio * footerWidth - 45));
      await walkTo(targetPx, 2.4);
      await waterAtSpot(wp.cluster, wp.message, wp.duration);
    }

    // 2. Final celebration message at the end
    container.classList.add('is-celebrating');
    showMessage('🌟 Let’s grow something amazing together!', 2600);
    await new Promise(r => setTimeout(r, 2600));
    container.classList.remove('is-celebrating');

    // 3. Walk completely off beyond the right edge of the screen
    const exitPx = footerWidth + 180;
    await walkTo(exitPx, 2.8);

    // 4. Smoothly disappear (fade out and hide)
    container.style.transition = 'opacity 0.6s ease';
    container.style.opacity = '0';
    setTimeout(() => {
      container.style.display = 'none';
    }, 650);

    isBusy = false;
  }

  // Scroll Observer to trigger when user reaches footer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasStartedJourney) {
        hasStartedJourney = true;
        setTimeout(() => {
          runGardeningJourney();
        }, 400);
      }
    });
  }, {
    root: null,
    threshold: 0.2
  });

  observer.observe(footer);
}
