/* =========================================================
   THEME MANAGER (Day / Sky Mode & Night / Aurora Mode)
   ========================================================= */

export function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('aryan_portfolio_theme');

  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'night');
  } else {
    document.documentElement.setAttribute('data-theme', 'day');
  }

  updateIcon();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'day';
      const newTheme = currentTheme === 'day' ? 'night' : 'day';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('aryan_portfolio_theme', newTheme);
      updateIcon();
    });
  }

  function updateIcon() {
    const isNight = document.documentElement.getAttribute('data-theme') === 'night';
    if (toggleBtn) {
      toggleBtn.innerHTML = isNight
        ? `<svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
        : `<svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }
}
