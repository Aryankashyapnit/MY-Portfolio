/* =========================================================
   SOPHISTICATED MIDNIGHT SKY & SUBTLE DISTANT FALLING STAR
   Ultra-refined, minimal, atmospheric night sky with
   delicate twinkling stars & graceful distant shooting star.
   ========================================================= */

export function initStarfield() {
  const canvas = document.getElementById('nightSkyCanvas');
  const heroSection = document.getElementById('hero');
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let isRunning = false;
  let width = 0;
  let height = 0;
  let lastTime = 0;

  let stars = [];
  let mouse = { x: -1000, y: -1000, active: false };

  // Subtle shooting star state
  let shootingStar = {
    active: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    controlX: 0,
    controlY: 0,
    duration: 2100, // Calm, graceful ~2.1s duration
    startTime: 0,
    peakAlpha: 0.62, // Restrained, dim distant brightness
    trailLength: 90, // Delicate, short tail
    nextSpawnTime: Date.now() + 5000 + Math.random() * 6000 // First appearance in 5-11s
  };

  function resize() {
    const rect = heroSection.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    initStars();
  }

  function initStars() {
    stars = [];
    const isMobile = width < 768;
    
    // Balanced, sparse natural distribution (avoid overcrowding)
    const count = Math.floor((width * height) / (isMobile ? 5500 : 4200));
    const starCount = Math.max(isMobile ? 50 : 100, Math.min(count, isMobile ? 110 : 210));

    for (let i = 0; i < starCount; i++) {
      // 85% micro pinprick stars, 15% slightly crisp distant stars
      const isTiny = Math.random() < 0.85;
      const radius = isTiny ? (0.35 + Math.random() * 0.4) : (0.8 + Math.random() * 0.4);
      const isIceBlue = Math.random() < 0.28;
      
      // Only ~25% of stars have very slow organic twinkle
      const doesTwinkle = Math.random() < 0.25;
      const twinkleSpeed = (Math.PI * 2) / (3500 + Math.random() * 4000); // 3.5s to 7.5s cycle

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: radius,
        baseAlpha: isTiny ? (0.18 + Math.random() * 0.38) : (0.42 + Math.random() * 0.32),
        alpha: 0.3,
        twinkles: doesTwinkle,
        twinkleSpeed: twinkleSpeed,
        twinklePhase: Math.random() * Math.PI * 2,
        isIceBlue: isIceBlue
      });
    }
  }

  function spawnShootingStar(now) {
    const isMobile = width < 768;
    // Start in upper right quadrant of the hero
    const startX = width * (isMobile ? (0.6 + Math.random() * 0.3) : (0.55 + Math.random() * 0.38));
    const startY = height * (0.05 + Math.random() * 0.22);
    
    // Travel diagonally downward toward the lower-left
    const distance = isMobile ? Math.min(width * 0.36, 170) : Math.min(width * 0.32, 340);
    const angleDeg = 130 + (Math.random() - 0.5) * 16; // ~122° to 138°
    const angleRad = (angleDeg * Math.PI) / 180;
    
    const endX = startX + Math.cos(angleRad) * distance;
    const endY = startY + Math.sin(angleRad) * distance;

    // Organic slight hand-drawn curve
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const normalAngle = angleRad + Math.PI / 2;
    const curveAmount = (Math.random() - 0.5) * (isMobile ? 10 : 20);

    shootingStar.startX = startX;
    shootingStar.startY = startY;
    shootingStar.endX = endX;
    shootingStar.endY = endY;
    shootingStar.controlX = midX + Math.cos(normalAngle) * curveAmount;
    shootingStar.controlY = midY + Math.sin(normalAngle) * curveAmount;
    
    shootingStar.duration = 1800 + Math.random() * 600; // 1.8s to 2.4s calm fall
    shootingStar.startTime = now;
    shootingStar.trailLength = isMobile ? 65 : (75 + Math.random() * 35);
    shootingStar.peakAlpha = 0.55 + Math.random() * 0.15; // Delicate, never flashy
    shootingStar.active = true;
  }

  // Quadratic Bezier point calculation
  function getBezierPoint(p0, p1, p2, t) {
    const inv = 1 - t;
    return inv * inv * p0 + 2 * inv * t * p1 + t * t * p2;
  }

  function render(now) {
    if (!isRunning) return;

    if (!lastTime) lastTime = now;
    const delta = now - lastTime;
    lastTime = now;

    ctx.clearRect(0, 0, width, height);

    // ---------------------------------------------------------
    // LAYER 1: Subtle Tiny Stars & Slow Twinkling
    // ---------------------------------------------------------
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];

      // Mouse proximity interaction (smooth, very subtle brightening)
      let mouseBoost = 0;
      if (mouse.active) {
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          mouseBoost = (1 - dist / 90) * 0.28;
        }
      }

      if (s.twinkles) {
        s.twinklePhase += s.twinkleSpeed * (delta / 16.66);
        const twinkle = (Math.sin(s.twinklePhase) + 1) * 0.5; // 0 to 1
        // Smooth breathing opacity: 0.25 -> 0.55 -> 0.25
        s.alpha = Math.min(0.9, (s.baseAlpha * 0.6) + (s.baseAlpha * 0.65 * twinkle) + mouseBoost);
      } else {
        s.alpha = Math.min(0.9, s.baseAlpha + mouseBoost);
      }

      const color = s.isIceBlue 
        ? `rgba(210, 235, 255, ${s.alpha})` 
        : `rgba(255, 255, 255, ${s.alpha})`;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();

      // Delicate micro-halo for slightly larger stars (radius > 0.8px)
      if (s.radius > 0.8) {
        ctx.fillStyle = s.isIceBlue 
          ? `rgba(180, 220, 255, ${s.alpha * 0.16})` 
          : `rgba(255, 255, 255, ${s.alpha * 0.16})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ---------------------------------------------------------
    // LAYER 2: Subtle Distant Falling Star
    // ---------------------------------------------------------
    if (!shootingStar.active && now >= shootingStar.nextSpawnTime) {
      spawnShootingStar(now);
    }

    if (shootingStar.active) {
      const elapsed = now - shootingStar.startTime;
      const progress = Math.min(1, elapsed / shootingStar.duration);

      if (progress >= 1) {
        shootingStar.active = false;
        // Randomized quiet interval: 9 to 18 seconds
        const isMobile = width < 768;
        const delay = (isMobile ? 12000 : 9000) + Math.random() * (isMobile ? 10000 : 9000);
        shootingStar.nextSpawnTime = now + delay;
      } else {
        // Smooth lifecycle opacity curve:
        // 0% -> 18%: Fade in gracefully
        // 18% -> 72%: Steady distant flight
        // 72% -> 100%: Fade out softly to 0
        let currentAlpha = shootingStar.peakAlpha;
        if (progress < 0.18) {
          currentAlpha = (progress / 0.18) * shootingStar.peakAlpha;
        } else if (progress > 0.72) {
          currentAlpha = ((1 - progress) / 0.28) * shootingStar.peakAlpha;
        }

        if (currentAlpha > 0.01) {
          const headX = getBezierPoint(shootingStar.startX, shootingStar.controlX, shootingStar.endX, progress);
          const headY = getBezierPoint(shootingStar.startY, shootingStar.controlY, shootingStar.endY, progress);

          // Calculate tail points along curve
          const trailSteps = 16;
          const trailProgressSpan = 0.18; // Portion of the curve occupied by tail

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(headX, headY);

          for (let step = 1; step <= trailSteps; step++) {
            const stepRatio = step / trailSteps;
            const tTail = Math.max(0, progress - (stepRatio * trailProgressSpan));
            const tailX = getBezierPoint(shootingStar.startX, shootingStar.controlX, shootingStar.endX, tTail);
            const tailY = getBezierPoint(shootingStar.startY, shootingStar.controlY, shootingStar.endY, tTail);
            ctx.lineTo(tailX, tailY);
          }

          // Delicate gradient along trail: head is bright blue-white, tail tapers to transparent
          const tailEndX = getBezierPoint(
            shootingStar.startX, 
            shootingStar.controlX, 
            shootingStar.endX, 
            Math.max(0, progress - trailProgressSpan)
          );
          const tailEndY = getBezierPoint(
            shootingStar.startY, 
            shootingStar.controlY, 
            shootingStar.endY, 
            Math.max(0, progress - trailProgressSpan)
          );

          const grad = ctx.createLinearGradient(headX, headY, tailEndX, tailEndY);
          grad.addColorStop(0, `rgba(235, 245, 255, ${currentAlpha})`);
          grad.addColorStop(0.35, `rgba(190, 225, 255, ${currentAlpha * 0.6})`);
          grad.addColorStop(1, `rgba(160, 210, 255, 0)`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.1; // Ultra-thin, delicate line
          ctx.lineCap = 'round';
          ctx.stroke();

          // Star Head: Tiny point of light
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(headX, headY, 0.85, 0, Math.PI * 2);
          ctx.fill();

          // Very soft, restrained micro-glow around star head
          ctx.fillStyle = `rgba(195, 230, 255, ${currentAlpha * 0.2})`;
          ctx.beginPath();
          ctx.arc(headX, headY, 2.4, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    lastTime = 0;
    shootingStar.active = false;
    shootingStar.nextSpawnTime = performance.now() + 4000 + Math.random() * 5000;
    resize();
    animationFrameId = requestAnimationFrame(render);
  }

  function stop() {
    isRunning = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    shootingStar.active = false;
    if (ctx && width && height) {
      ctx.clearRect(0, 0, width, height);
    }
  }

  function checkTheme() {
    const isNight = document.documentElement.getAttribute('data-theme') === 'night';
    if (isNight) {
      start();
    } else {
      stop();
    }
  }

  // Subtle mouse interactivity
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  }, { passive: true });

  heroSection.addEventListener('mouseleave', () => {
    mouse.active = false;
  }, { passive: true });

  // Window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (isRunning) resize();
    }, 150);
  }, { passive: true });

  // Observe theme change
  const themeObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        checkTheme();
      }
    }
  });

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  // Initial check
  checkTheme();
}
