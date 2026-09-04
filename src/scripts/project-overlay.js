/* =========================================================
   PROJECT DETAIL OVERLAY & EDITORIAL MODAL
   ========================================================= */

import { projectsData } from './projects-data.js';

export function initProjectOverlay() {
  const overlay = document.getElementById('projectDetailOverlay');
  const overlayContent = document.getElementById('projectOverlayBody');
  const closeBtn = document.getElementById('closeOverlayBtn');
  let previousScrollY = 0;

  if (!overlay || !overlayContent) return;

  // Listen to all project cards / triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-project-id]');
    if (trigger) {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project-id');
      openProject(projectId);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProject);
  }

  // Backdrop click to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeProject();
    }
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeProject();
    }
  });

  function openProject(id) {
    const data = projectsData[id];
    if (!data) return;

    previousScrollY = window.scrollY;

    // Render HTML inside modal
    overlayContent.innerHTML = `
      <div class="overlay-hero-block">
        <div class="overlay-meta-row">
          <span class="overlay-num-tag">${data.number} / ${data.category.toUpperCase()}</span>
          <span class="overlay-year-tag">${data.year} · ${data.status}</span>
        </div>

        <h1 class="overlay-project-title">${data.title}</h1>
        <p class="overlay-tagline">${data.tagline}</p>

        <div class="overlay-role-badge">
          <strong>ROLE:</strong> ${data.role}
        </div>
      </div>

      ${data.heroImage ? `
        <div class="overlay-media-container">
          <div class="overlay-browser-frame">
            <div class="overlay-frame-bar">
              <span class="overlay-dot dot-red"></span>
              <span class="overlay-dot dot-yellow"></span>
              <span class="overlay-dot dot-green"></span>
              <span class="overlay-url-label">${data.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.app</span>
            </div>
            <img src="${data.heroImage}" alt="${data.title} Screenshot" class="overlay-hero-img" loading="lazy">
          </div>
        </div>
      ` : ''}

      <div class="overlay-details-grid">
        <!-- What & Why Columns -->
        <div class="overlay-narrative-section">
          <div class="overlay-narrative-block">
            <h2 class="overlay-section-heading">What is it?</h2>
            <p class="overlay-body-text">${data.whatIsIt}</p>
          </div>

          <div class="overlay-narrative-block">
            <h2 class="overlay-section-heading">Why I built it</h2>
            <p class="overlay-body-text">${data.whyBuilt}</p>
          </div>

          <div class="overlay-narrative-block">
            <h2 class="overlay-section-heading">How it works & Core Capabilities</h2>
            <ul class="overlay-features-list">
              ${data.howItWorks.map(item => `
                <li class="overlay-feature-item">
                  <span class="feature-bullet" aria-hidden="true">✦</span>
                  <span>${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Sidebar Meta -->
        <div class="overlay-sidebar">
          <div class="overlay-side-card">
            <h3 class="side-card-title">Technology</h3>
            <div class="overlay-tech-tags">
              ${data.techStack.map(t => `<span class="overlay-tech-tag">${t}</span>`).join('')}
            </div>
          </div>

          <div class="overlay-side-card">
            <h3 class="side-card-title">Authentic Scope</h3>
            <p class="side-card-text">${data.metrics}</p>
          </div>

          <div class="overlay-side-actions">
            ${data.liveUrl ? `
              <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="overlay-btn-live">
                <span>Visit Live Platform</span>
                <span aria-hidden="true">↗</span>
              </a>
            ` : ''}
            
            ${data.githubUrl ? `
              <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="overlay-btn-github">
                <span>View Source on GitHub</span>
                <span aria-hidden="true">↗</span>
              </a>
            ` : ''}
          </div>
        </div>
      </div>

      ${data.secondaryImage ? `
        <div class="overlay-secondary-media">
          <h3 class="overlay-section-heading" style="margin-bottom: 1.5rem;">Additional Interface Views</h3>
          <div class="overlay-secondary-frame">
            <img src="${data.secondaryImage}" alt="${data.title} Additional Screen" class="overlay-hero-img" loading="lazy">
          </div>
        </div>
      ` : ''}

      <div class="overlay-bottom-bar">
        <button class="overlay-btn-close-bottom" id="bottomCloseBtn">
          <span>← Back to Portfolio</span>
        </button>
      </div>
    `;

    // Hook bottom close button
    const bottomClose = document.getElementById('bottomCloseBtn');
    if (bottomClose) {
      bottomClose.addEventListener('click', closeProject);
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    overlay.scrollTop = 0;
  }

  function closeProject() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    window.scrollTo({ top: previousScrollY, behavior: 'instant' });
  }
}
