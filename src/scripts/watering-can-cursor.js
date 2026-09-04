/* =========================================================
   INTERACTIVE ROUND LENS CURSOR CONTROLLER
   - Crystal-Clear Round Mirror / Lens for all sections
   - Words & elements show cleanly through with optical glass clarity
   - Smooth lerp physics, hover expansion on buttons/links
   - Tactile click pulse + flower blooming interaction in Meadow
   ========================================================= */

export function initWateringCanCursor() {
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  // Setup flower growth roots transitions
  const flowerRoots = document.querySelectorAll('.flower-growth-root');
  flowerRoots.forEach(root => {
    root.style.transformBox = 'fill-box';
    root.style.transformOrigin = '50% 100%';
    root.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });

  // Tap interaction for mobile/touch devices
  const meadow = document.getElementById('growMeadow');
  if (meadow) {
    meadow.addEventListener('pointerdown', (e) => {
      waterFlowerClusters(e.clientX, e.clientY);
    });
  }

  // Create round cursor container
  let cursorEl = document.getElementById('wateringCanCursor');
  if (!cursorEl) {
    cursorEl = document.createElement('div');
    cursorEl.id = 'wateringCanCursor';
    cursorEl.className = 'custom-dual-cursor mode-mirror';
    cursorEl.setAttribute('aria-hidden', 'true');
    cursorEl.innerHTML = `
      <!-- Crystal-Clear Round Mirror / Lens Cursor -->
      <div class="cursor-mirror-circle">
        <div class="mirror-lens-body">
          <div class="mirror-glare"></div>
          <div class="mirror-dot"></div>
        </div>
      </div>
      <canvas id="waterDropletsCanvas" class="water-droplets-canvas"></canvas>
    `;
    document.body.appendChild(cursorEl);
  }

  if (isTouchDevice) {
    cursorEl.style.display = 'none';
    return;
  }

  const mirrorEl = cursorEl.querySelector('.cursor-mirror-circle');
  const lensBodyEl = cursorEl.querySelector('.mirror-lens-body');
  const canvas = cursorEl.querySelector('#waterDropletsCanvas');
  const ctx = canvas.getContext('2d');
  const meadowEl = document.getElementById('growMeadow');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Physics States
  let targetX = -200;
  let targetY = -200;
  let mirrorX = -200;
  let mirrorY = -200;
  let isVisible = false;
  let hasMoved = false;

  // Particle System for Water Droplets
  const droplets = [];

  class Droplet {
    constructor(x, y, vx, vy, size, color, alpha) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.size = size;
      this.color = color;
      this.alpha = alpha;
      this.maxLife = 35 + Math.random() * 20;
      this.life = 0;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.22;
      this.vx *= 0.98;
      this.life++;
      this.alpha = Math.max(0, 1 - (this.life / this.maxLife));
    }

    draw(c) {
      c.save();
      c.globalAlpha = this.alpha;
      c.fillStyle = this.color;
      c.beginPath();
      c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
  }

  function handlePointer(clientX, clientY) {
    targetX = clientX;
    targetY = clientY;

    if (!hasMoved) {
      hasMoved = true;
      mirrorX = targetX;
      mirrorY = targetY;
    }

    if (!isVisible) {
      isVisible = true;
      cursorEl.classList.add('visible');
    }
  }

  // Pointer Event Handlers
  document.addEventListener('mousemove', (e) => {
    handlePointer(e.clientX, e.clientY);
  }, { passive: true });

  document.addEventListener('pointermove', (e) => {
    handlePointer(e.clientX, e.clientY);
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', () => {
    isVisible = false;
    cursorEl.classList.remove('visible');
  });

  document.documentElement.addEventListener('mouseenter', () => {
    if (hasMoved) {
      isVisible = true;
      cursorEl.classList.add('visible');
    }
  });

  // Tap pulse on click + water droplet bloom in meadow
  window.addEventListener('pointerdown', (e) => {
    if (e.button === 0) {
      if (lensBodyEl) {
        lensBodyEl.classList.remove('mirror-tap-pulse');
        void lensBodyEl.offsetWidth;
        lensBodyEl.classList.add('mirror-tap-pulse');
      }

      // If clicking in or near the flower meadow, trigger flower watering/bloom
      if (meadowEl) {
        const meadowRect = meadowEl.getBoundingClientRect();
        if (e.clientY >= meadowRect.top - 60 && e.clientY <= meadowRect.bottom) {
          waterFlowerClusters(e.clientX, e.clientY);

          // Spawn sparkling water droplets
          const isNight = document.documentElement.getAttribute('data-theme') === 'night';
          const dropColor = isNight ? '#67e8f9' : '#38bdf8';
          for (let i = 0; i < 14; i++) {
            const angle = (Math.random() * Math.PI * 2);
            const speed = 1.5 + Math.random() * 4.5;
            droplets.push(new Droplet(
              e.clientX,
              e.clientY,
              Math.cos(angle) * speed,
              Math.sin(angle) * speed - 1.5,
              1.8 + Math.random() * 2.8,
              dropColor,
              0.85
            ));
          }
        }
      }
    }
  });

  // Interactive Elements Hover Reaction
  const interactiveSelector = 'a, button, input, textarea, .interactive-card, .project-card-link, [role="button"]';
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursorEl.classList.add('hovering');
    }
  }, { passive: true });

  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursorEl.classList.remove('hovering');
    }
  }, { passive: true });

  // Bounded Plant Growth & Water Reaction
  function waterFlowerClusters(x, y) {
    const roots = document.querySelectorAll('.flower-growth-root');
    roots.forEach(root => {
      const rect = root.getBoundingClientRect();
      const clusterCenterX = rect.left + rect.width / 2;
      const dist = Math.abs(x - clusterCenterX);

      if (dist < 190 && (y > rect.top - 180 || y > window.innerHeight - 380)) {
        let currentGrowth = parseFloat(root.dataset.growth || '1.0');
        const newGrowth = Math.min(1.24, currentGrowth + 0.05);
        root.dataset.growth = newGrowth.toFixed(2);
        root.style.transform = `scaleY(${newGrowth}) scaleX(${1 + (newGrowth - 1) * 0.25})`;

        const petals = root.querySelectorAll('circle, ellipse, path');
        petals.forEach((p, idx) => {
          if (idx % 2 === 0) {
            p.style.transition = 'filter 0.3s ease';
            p.style.filter = 'brightness(1.18) drop-shadow(0 0 6px rgba(251, 191, 36, 0.5))';
            setTimeout(() => {
              p.style.filter = '';
            }, 800);
          }
        });
      }
    });
  }

  // Animation Loop
  function render() {
    if (isVisible && mirrorEl) {
      // Smooth lens lerp
      mirrorX += (targetX - mirrorX) * 0.42;
      mirrorY += (targetY - mirrorY) * 0.42;
      mirrorEl.style.transform = `translate3d(${mirrorX}px, ${mirrorY}px, 0)`;
    }

    // Render droplets
    if (ctx && droplets.length > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        d.update();
        d.draw(ctx);
        if (d.alpha <= 0.01 || d.life >= d.maxLife) {
          droplets.splice(i, 1);
        }
      }
    } else if (ctx && droplets.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
