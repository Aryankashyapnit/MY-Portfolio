/* =========================================================
   HERO AUDIO PLAYER ENGINE
   "My builder journey, decoded"
   - HTML5 Audio integration with local royalty-free soundtrack
   - Accurate duration & progress tracking
   - Interactive scrub / seek support
   - Rotating vinyl reels only when playing
   - Seamless loop & robust error handling
   ========================================================= */

export function initAudioPlayer() {
  const playerWidget = document.getElementById('heroAudioWidget');
  const playBtn = document.getElementById('audioPlayBtn');
  const progressFill = document.getElementById('audioProgressFill');
  const currentTimeEl = document.getElementById('audioCurrentTime');
  const totalDurationEl = document.getElementById('audioTotalDuration');
  const progressBar = document.getElementById('audioProgressBar');

  if (!playerWidget || !playBtn) return;

  // Initialize native HTML5 Audio element
  const audio = new Audio();
  audio.src = '/assets/audio/builder-journey.wav';
  audio.preload = 'metadata';
  audio.loop = true;

  let isSeeking = false;

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  // Update total duration when metadata loads
  function handleMetadata() {
    if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
      if (totalDurationEl) {
        totalDurationEl.textContent = formatTime(audio.duration);
      }
    }
  }

  audio.addEventListener('loadedmetadata', handleMetadata);
  audio.addEventListener('durationchange', handleMetadata);

  // Real-time progress update
  audio.addEventListener('timeupdate', () => {
    if (isSeeking || !audio.duration) return;
    
    const pct = (audio.currentTime / audio.duration) * 100;
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressBar) progressBar.setAttribute('aria-valuenow', Math.round(pct));
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  // Play & Pause state synchronization
  audio.addEventListener('play', () => {
    playerWidget.classList.add('playing');
    playBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
    playBtn.setAttribute('aria-label', 'Pause audio track');
  });

  audio.addEventListener('pause', () => {
    playerWidget.classList.remove('playing');
    playBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
    playBtn.setAttribute('aria-label', 'Play audio track');
  });

  audio.addEventListener('ended', () => {
    // Seamless loop restart
    audio.currentTime = 0;
    audio.play().catch(() => {});
  });

  audio.addEventListener('error', (err) => {
    console.warn('Audio asset error:', err);
    playerWidget.classList.remove('playing');
    playBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
  });

  // Play / Pause Button Click Handler
  playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused) {
      audio.play().catch((err) => {
        console.warn('Audio playback restricted by browser policy:', err);
      });
    } else {
      audio.pause();
    }
  });

  // Seek / Scrub Interaction
  function seekToPosition(clientX) {
    if (!progressBar || !audio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    audio.currentTime = pct * audio.duration;
    if (progressFill) progressFill.style.width = `${pct * 100}%`;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
  }

  if (progressBar) {
    progressBar.addEventListener('pointerdown', (e) => {
      isSeeking = true;
      seekToPosition(e.clientX);

      const onPointerMove = (moveEvent) => {
        if (isSeeking) {
          seekToPosition(moveEvent.clientX);
        }
      };

      const onPointerUp = () => {
        isSeeking = false;
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerup', onPointerUp, { passive: true });
    });
  }
}
