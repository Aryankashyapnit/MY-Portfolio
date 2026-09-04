/* =========================================================
   HERO 3D SUIT CHARACTER (Sitting on Cloud & Thinking)
   - Floats gently on soft cloud in the bottom right hero dunes
   - Ambient idea sparkles (💡 ✨ 💭)
   - Cycles insightful builder thoughts & responds to user clicks
   ========================================================= */

import { getTransparentCharacterImage } from './character-utils.js';

export function initHeroCharacter() {
  const container = document.getElementById('heroCharacterContainer');
  const thinkWalker = document.getElementById('heroThinkWalker');
  const bubbleEl = document.getElementById('heroCharacterBubble');

  if (!container || !thinkWalker) return;

  // Load transparent cutout of 3D sitting & thinking character
  getTransparentCharacterImage('/assets/aryan-hero-think.jpg').then((src) => {
    if (src && thinkWalker) {
      thinkWalker.style.backgroundImage = `url("${src}")`;
      thinkWalker.style.mixBlendMode = 'normal';
    }
  });

  const thinkingQuotes = [
    '💡 Building products that make complex things simpler.',
    '💭 Good software starts with asking the right questions.',
    '✍️ Crafting elegant architectures & fluid user experiences...',
    '✨ Simplicity is the ultimate sophistication.',
    '🚀 Turning ambitious ideas into production reality...'
  ];

  let quoteIndex = 0;
  let bubbleTimeout = null;

  function showBubble(text, duration = 4000) {
    if (!bubbleEl) return;
    if (bubbleTimeout) clearTimeout(bubbleTimeout);
    bubbleEl.textContent = text;
    bubbleEl.classList.add('show-bubble');

    if (duration > 0) {
      bubbleTimeout = setTimeout(() => {
        bubbleEl.classList.remove('show-bubble');
      }, duration);
    }
  }

  // Initial thought bubble appearance
  setTimeout(() => {
    showBubble(thinkingQuotes[0], 4500);
  }, 1200);

  // Periodic thought rotation every 9 seconds
  setInterval(() => {
    quoteIndex = (quoteIndex + 1) % thinkingQuotes.length;
    showBubble(thinkingQuotes[quoteIndex], 4500);
  }, 9000);

  // Click interaction
  container.addEventListener('click', (e) => {
    e.stopPropagation();
    const punchlines = [
      '⚡ Hey! Welcome to my digital portfolio.',
      '🎯 Have a project in mind? Let’s connect below!',
      '💡 Every pixel and interaction is crafted with care.',
      '🛠️ Scroll down to explore my projects & playground!'
    ];
    const randomPick = punchlines[Math.floor(Math.random() * punchlines.length)];
    showBubble(randomPick, 3500);
  });
}
