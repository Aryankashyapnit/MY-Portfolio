/* =========================================================
   INTERACTIVE ORBITAL PROJECT WHEEL
   Aryan Portfolio - Selected Work Presentation Engine (Colorful Edition)
   ========================================================= */

import { projectsData } from './projects-data.js';

const projectThemeMap = {
  'bihareduconnect': { color: '#2563eb', lightBg: '#eff6ff', darkBg: '#1e3a8a', name: 'blue' },
  'decide': { color: '#8b5cf6', lightBg: '#f5f3ff', darkBg: '#3b0764', name: 'purple' },
  'polytechnickarle': { color: '#0284c7', lightBg: '#f0f9ff', darkBg: '#082f49', name: 'sky' },
  'beucampus': { color: '#10b981', lightBg: '#ecfdf5', darkBg: '#064e3b', name: 'emerald' },
  'raksha-ai': { color: '#f43f5e', lightBg: '#fff1f2', darkBg: '#881337', name: 'rose' },
  'collegeachiver': { color: '#6366f1', lightBg: '#eef2ff', darkBg: '#312e81', name: 'indigo' },
  'zameen-calculator': { color: '#d97706', lightBg: '#fffbeb', darkBg: '#78350f', name: 'amber' },
  'memesoundboard': { color: '#ea580c', lightBg: '#fff7ed', darkBg: '#7c2d12', name: 'orange' },
  'git-connect': { color: '#0d9488', lightBg: '#f0fdfa', darkBg: '#134e4a', name: 'teal' },
  'smartkitchen': { color: '#65a30d', lightBg: '#f7fee7', darkBg: '#365314', name: 'lime' },
  'labease': { color: '#c026d3', lightBg: '#fdf4ff', darkBg: '#701a75', name: 'fuchsia' }
};

export function initProjectWheel() {
  const section = document.querySelector('.selected-work-wheel-section');
  if (!section) return;

  const projects = Object.values(projectsData);
  const totalProjects = projects.length;
  if (totalProjects === 0) return;

  // DOM Elements
  const wheelStage = document.getElementById('projectWheelStage');
  const wheelDisk = document.getElementById('projectWheelDisk');
  const centerPointer = document.getElementById('wheelCenterPointer');
  const centerCounter = document.getElementById('wheelCenterCounter');
  const headerCounter = document.getElementById('wheelHeaderCounter');
  const autoOrbitToggle = document.getElementById('autoOrbitToggle');
  const prevBtn = document.getElementById('wheelPrevBtn');
  const nextBtn = document.getElementById('wheelNextBtn');
  const quickNavDots = document.getElementById('wheelQuickNavDots');
  const spotlightContainer = document.getElementById('wheelSpotlightCard');

  if (!wheelStage || !wheelDisk || !spotlightContainer) return;

  // State
  let activeIndex = 0;
  const angleStep = 360 / totalProjects;

  // Active node is positioned at 90deg (3 o'clock, facing the right-hand spotlight)
  const FOCUS_ANGLE = 90;

  let currentAngle = FOCUS_ANGLE;
  let targetAngle = FOCUS_ANGLE;
  let isDragging = false;
  let startPointerAngle = 0;
  let startWheelAngle = 0;
  let dragVelocity = 0;
  let lastDragAngle = 0;
  let lastDragTime = 0;
  let isAutoOrbitActive = true;
  let autoOrbitInterval = null;
  let resumeAutoOrbitTimeout = null;
  let isInteracting = false;
  let nodeElements = [];
  let spokeElements = [];

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    isAutoOrbitActive = false;
  }

  // 1. Build Project Nodes and Connecting Spokes around the Orbit
  function buildWheelNodes() {
    wheelDisk.innerHTML = '';
    quickNavDots.innerHTML = '';
    nodeElements = [];
    spokeElements = [];

    // Container for spokes
    const spokesContainer = document.createElement('div');
    spokesContainer.className = 'wheel-spokes-container';
    spokesContainer.setAttribute('aria-hidden', 'true');
    wheelDisk.appendChild(spokesContainer);

    projects.forEach((proj, idx) => {
      const theme = projectThemeMap[proj.id] || { color: '#2563eb', lightBg: '#eff6ff', darkBg: '#1e3a8a' };

      // Create radial connecting spoke
      const spoke = document.createElement('div');
      spoke.className = `orbital-spoke ${idx === activeIndex ? 'active' : ''}`;
      spoke.style.setProperty('--proj-color', theme.color);
      spokesContainer.appendChild(spoke);
      spokeElements.push(spoke);

      // Create orbital node button
      const node = document.createElement('button');
      node.className = `orbital-node ${idx === activeIndex ? 'active' : ''}`;
      node.setAttribute('data-index', idx);
      node.setAttribute('data-project-id', proj.id);
      node.setAttribute('aria-label', `Project ${proj.number}: ${proj.title}`);
      node.setAttribute('aria-selected', idx === activeIndex ? 'true' : 'false');
      node.style.setProperty('--proj-color', theme.color);
      node.style.setProperty('--proj-light-bg', theme.lightBg);
      node.style.setProperty('--proj-dark-bg', theme.darkBg);

      // Node Inner Markup
      node.innerHTML = `
        <div class="node-aura" aria-hidden="true"></div>
        <div class="node-capsule">
          <span class="node-num">${proj.number}</span>
          <span class="node-label">${proj.title}</span>
          <span class="node-dot" aria-hidden="true"></span>
        </div>
      `;

      // Click to select
      node.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveProject(idx, true);
      });

      wheelDisk.appendChild(node);
      nodeElements.push(node);

      // Create quick navigation dot
      const dot = document.createElement('button');
      dot.className = `quick-nav-dot ${idx === activeIndex ? 'active' : ''}`;
      dot.setAttribute('data-index', idx);
      dot.setAttribute('aria-label', `Jump to project ${proj.number} - ${proj.title}`);
      dot.setAttribute('title', `${proj.number}. ${proj.title}`);
      dot.style.setProperty('--proj-color', theme.color);

      dot.addEventListener('click', () => {
        setActiveProject(idx, true);
      });

      quickNavDots.appendChild(dot);
    });
  }

  // 2. Update Spotlight Content
  function updateSpotlight(index, animate = true) {
    const proj = projects[index];
    if (!proj) return;
    const theme = projectThemeMap[proj.id] || { color: '#2563eb', lightBg: '#eff6ff', darkBg: '#1e3a8a' };

    // Set active color token on section for coordinated highlights
    section.style.setProperty('--active-proj-color', theme.color);
    section.style.setProperty('--active-proj-light-bg', theme.lightBg);

    // Update Header & Center Counters
    if (headerCounter) {
      headerCounter.textContent = `${proj.number} / ${String(totalProjects).padStart(2, '0')}`;
    }
    if (centerCounter) {
      centerCounter.textContent = `${proj.number} / ${String(totalProjects).padStart(2, '0')}`;
    }

    // Update Center compass pointer color
    if (centerPointer) {
      centerPointer.style.setProperty('--pointer-color', theme.color);
    }

    // Update Quick Nav Dots
    const allDots = quickNavDots.querySelectorAll('.quick-nav-dot');
    allDots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
      d.setAttribute('aria-current', i === index ? 'true' : 'false');
    });

    // Update Node & Spoke active classes
    nodeElements.forEach((n, i) => {
      const isActive = i === index;
      n.classList.toggle('active', isActive);
      n.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    spokeElements.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });

    if (animate && !prefersReducedMotion) {
      spotlightContainer.classList.add('transitioning');
      setTimeout(() => {
        renderSpotlightContent(proj, theme);
        spotlightContainer.classList.remove('transitioning');
      }, 180);
    } else {
      renderSpotlightContent(proj, theme);
    }
  }

  function renderSpotlightContent(proj, theme) {
    const techStackHtml = Array.isArray(proj.techStack)
      ? proj.techStack.map(t => `<span class="spotlight-tech-pill">${t}</span>`).join('')
      : '';

    let previewHtml = '';
    if (proj.heroImage) {
      previewHtml = `
        <div class="spotlight-browser-frame">
          <div class="spotlight-browser-bar">
            <span class="spotlight-dot dot-red"></span>
            <span class="spotlight-dot dot-yellow"></span>
            <span class="spotlight-dot dot-green"></span>
            <span class="spotlight-url-text">${proj.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.app</span>
          </div>
          <div class="spotlight-img-wrap">
            <img src="${proj.heroImage}" alt="${proj.title} Preview" class="spotlight-main-img" loading="lazy" />
          </div>
        </div>
      `;
    } else {
      previewHtml = `
        <div class="spotlight-browser-frame blueprint-mode">
          <div class="spotlight-browser-bar">
            <span class="spotlight-dot dot-red"></span>
            <span class="spotlight-dot dot-yellow"></span>
            <span class="spotlight-dot dot-green"></span>
            <span class="spotlight-url-text">${proj.id}.engine</span>
          </div>
          <div class="spotlight-blueprint-canvas">
            <div class="blueprint-grid-accent"></div>
            <div class="blueprint-code-spec">
              <span class="spec-tag" style="color: ${theme.color}">// SYSTEM ARCHITECTURE SPECIFICATION</span>
              <h4 class="spec-title">${proj.title}</h4>
              <p class="spec-category">CATEGORY: ${proj.category.toUpperCase()}</p>
              <div class="spec-metrics-badge">
                <span class="spec-pulse" style="background: ${theme.color}"></span>
                <span>${proj.metrics || 'Verified Engineering Architecture'}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    spotlightContainer.innerHTML = `
      <div class="spotlight-inner-content">
        <div class="spotlight-meta-header">
          <div class="spotlight-category-tag" style="color: ${theme.color}">${proj.category}</div>
          <div class="spotlight-status-tag">
            <span class="status-indicator" style="background: ${theme.color}"></span>
            <span>${proj.status || 'Active'}</span>
          </div>
        </div>

        <h3 class="spotlight-title">${proj.title}</h3>
        <p class="spotlight-tagline">${proj.tagline || proj.summary || ''}</p>

        <div class="spotlight-preview-stage">
          ${previewHtml}
        </div>

        <div class="spotlight-stack-group">
          <span class="stack-label">TECH STACK</span>
          <div class="spotlight-tech-pills">
            ${techStackHtml}
          </div>
        </div>

        <div class="spotlight-actions-row">
          <button class="spotlight-cta-btn" data-project-id="${proj.id}" style="background: ${theme.color}; border-color: ${theme.color};" title="Explore full case study for ${proj.title}">
            <span>Explore Case Study</span>
            <svg class="cta-arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3.333 8h9.334M8.667 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          ${proj.liveUrl ? `
            <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="spotlight-ghost-link" title="Visit live application">
              <span>Live Demo</span>
              <span aria-hidden="true">↗</span>
            </a>
          ` : ''}

          ${proj.githubUrl ? `
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="spotlight-ghost-link" title="View source code on GitHub">
              <span>GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }

  // 3. Set Active Project & Compute Target Angle
  function setActiveProject(index, userInitiated = false) {
    activeIndex = ((index % totalProjects) + totalProjects) % totalProjects;

    // Active project is aligned at FOCUS_ANGLE (90deg = 3 o'clock)
    const baseTarget = FOCUS_ANGLE - (activeIndex * angleStep);

    // Shortest path rotation
    let diff = (baseTarget - targetAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    targetAngle += diff;

    // Center compass needle points to FOCUS_ANGLE
    if (centerPointer) {
      centerPointer.style.transform = `rotate(${FOCUS_ANGLE}deg)`;
    }

    updateSpotlight(activeIndex, true);

    if (userInitiated) {
      pauseAutoOrbitTemporarily();
    }
  }

  // 4. Physics Loop with 100% Upright Node Transform and Aligned Spokes
  function renderPhysicsLoop() {
    if (!prefersReducedMotion) {
      if (isDragging) {
        currentAngle = targetAngle;
      } else {
        const delta = targetAngle - currentAngle;
        if (Math.abs(delta) > 0.05) {
          currentAngle += delta * 0.12;
        } else {
          currentAngle = targetAngle;
        }
      }
    } else {
      currentAngle = targetAngle;
    }

    // Position each node and spoke along the circle
    for (let i = 0; i < totalProjects; i++) {
      const phi = (i * angleStep) + currentAngle;
      const node = nodeElements[i];
      const spoke = spokeElements[i];

      if (node) {
        node.style.transform = `translate(-50%, -50%) rotate(${phi}deg) translateY(calc(-1 * var(--orbit-radius))) rotate(${-phi}deg)`;
      }

      if (spoke) {
        spoke.style.transform = `rotate(${phi - 90}deg)`;
      }
    }

    requestAnimationFrame(renderPhysicsLoop);
  }

  // Helper: Get angle from center of wheel stage
  function getAngleFromCenter(clientX, clientY) {
    const rect = wheelStage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }

  // 5. Drag / Swipe Event Handlers
  function onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest('.spotlight-cta-btn') || e.target.closest('.spotlight-ghost-link')) return;

    isDragging = true;
    isInteracting = true;
    pauseAutoOrbitTemporarily();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    startPointerAngle = getAngleFromCenter(clientX, clientY);
    startWheelAngle = currentAngle;
    lastDragAngle = startPointerAngle;
    lastDragTime = performance.now();
    dragVelocity = 0;

    wheelStage.classList.add('is-dragging');

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  function onPointerMove(e) {
    if (!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const currentPointerAngle = getAngleFromCenter(clientX, clientY);
    let deltaAngle = currentPointerAngle - startPointerAngle;

    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;

    targetAngle = startWheelAngle + deltaAngle;

    const now = performance.now();
    const dt = (now - lastDragTime) / 1000;
    if (dt > 0.001) {
      let stepDelta = currentPointerAngle - lastDragAngle;
      if (stepDelta > 180) stepDelta -= 360;
      if (stepDelta < -180) stepDelta += 360;
      dragVelocity = (stepDelta / dt);
      lastDragAngle = currentPointerAngle;
      lastDragTime = now;
    }

    if (e.cancelable) {
      e.preventDefault();
    }
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    isInteracting = false;
    wheelStage.classList.remove('is-dragging');

    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);

    const maxVelocity = 400;
    const clampedVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, dragVelocity));
    const inertiaAngle = clampedVelocity * 0.15;
    const predictedAngle = targetAngle + inertiaAngle;

    // Nearest index calculation:
    let nearestIndex = Math.round((FOCUS_ANGLE - predictedAngle) / angleStep);
    nearestIndex = ((nearestIndex % totalProjects) + totalProjects) % totalProjects;

    setActiveProject(nearestIndex, true);
  }

  // 6. Mouse Wheel Scroll on Dial
  let wheelScrollTimeout = null;
  function onMouseWheel(e) {
    const isOverWheel = e.target.closest('#projectWheelStage');
    if (!isOverWheel) return;

    e.preventDefault();
    pauseAutoOrbitTemporarily();

    if (wheelScrollTimeout) return;

    if (e.deltaY > 20 || e.deltaX > 20) {
      setActiveProject(activeIndex + 1, true);
    } else if (e.deltaY < -20 || e.deltaX < -20) {
      setActiveProject(activeIndex - 1, true);
    }

    wheelScrollTimeout = setTimeout(() => {
      wheelScrollTimeout = null;
    }, 280);
  }

  // 7. Keyboard Navigation
  function onKeyDown(e) {
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveProject(activeIndex + 1, true);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveProject(activeIndex - 1, true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveProject(0, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveProject(totalProjects - 1, true);
    } else if (e.key === 'Enter') {
      const activeCta = spotlightContainer.querySelector('.spotlight-cta-btn');
      if (activeCta && document.activeElement && section.contains(document.activeElement)) {
        activeCta.click();
      }
    }
  }

  // 8. Auto Orbit Engine
  function startAutoOrbit() {
    stopAutoOrbit();
    if (!isAutoOrbitActive || prefersReducedMotion) return;

    autoOrbitInterval = setInterval(() => {
      if (!isInteracting && !isDragging) {
        setActiveProject(activeIndex + 1, false);
      }
    }, 4500);
  }

  function stopAutoOrbit() {
    if (autoOrbitInterval) {
      clearInterval(autoOrbitInterval);
      autoOrbitInterval = null;
    }
  }

  function pauseAutoOrbitTemporarily() {
    stopAutoOrbit();
    if (resumeAutoOrbitTimeout) clearTimeout(resumeAutoOrbitTimeout);

    if (isAutoOrbitActive && !prefersReducedMotion) {
      resumeAutoOrbitTimeout = setTimeout(() => {
        startAutoOrbit();
      }, 6000);
    }
  }

  // 9. Auto Orbit Toggle Button
  if (autoOrbitToggle) {
    autoOrbitToggle.addEventListener('click', () => {
      isAutoOrbitActive = !isAutoOrbitActive;
      autoOrbitToggle.setAttribute('aria-pressed', isAutoOrbitActive ? 'true' : 'false');
      autoOrbitToggle.classList.toggle('active', isAutoOrbitActive);

      const statusText = autoOrbitToggle.querySelector('.toggle-status-text');
      if (statusText) {
        statusText.textContent = isAutoOrbitActive ? 'ON' : 'OFF';
      }

      if (isAutoOrbitActive) {
        startAutoOrbit();
      } else {
        stopAutoOrbit();
      }
    });
  }

  // 10. Prev / Next Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      setActiveProject(activeIndex - 1, true);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      setActiveProject(activeIndex + 1, true);
    });
  }

  // 11. Mouse Enter / Leave
  wheelStage.addEventListener('mouseenter', () => {
    isInteracting = true;
    stopAutoOrbit();
  });

  wheelStage.addEventListener('mouseleave', () => {
    isInteracting = false;
    pauseAutoOrbitTemporarily();
  });

  // Attach Listeners
  wheelStage.addEventListener('pointerdown', onPointerDown);
  wheelStage.addEventListener('wheel', onMouseWheel, { passive: false });
  window.addEventListener('keydown', onKeyDown);

  // Initialize
  buildWheelNodes();
  setActiveProject(0, false);
  renderPhysicsLoop();
  startAutoOrbit();
}
