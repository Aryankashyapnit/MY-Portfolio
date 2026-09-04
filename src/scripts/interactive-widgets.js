/* =========================================================
   INTERACTIVE PLAYGROUND WIDGETS & MINI TOOLS
   ========================================================= */

export function initPlaygroundWidgets() {
  // 1. Zameen Calculator Widget
  const kathaInput = document.getElementById('zameenKathaInput');
  const dhurInput = document.getElementById('zameenDhurInput');
  const resultSqft = document.getElementById('zameenResultSqft');

  function calculateLand() {
    if (!kathaInput || !dhurInput || !resultSqft) return;
    const katha = parseFloat(kathaInput.value) || 0;
    const dhur = parseFloat(dhurInput.value) || 0;
    // Standard Bihar land measurement: 1 Katha = 1361.25 sq ft, 1 Dhur = 68.0625 sq ft (20 Dhur = 1 Katha)
    const totalSqft = (katha * 1361.25) + (dhur * 68.0625);
    resultSqft.textContent = `${totalSqft.toLocaleString('en-IN', { maximumFractionDigits: 1 })} Sq. Ft`;
  }

  if (kathaInput && dhurInput) {
    kathaInput.addEventListener('input', calculateLand);
    dhurInput.addEventListener('input', calculateLand);
    calculateLand();
  }

  // 2. Meme Soundboard Synthesizer Triggers
  let soundCtx = null;
  const soundChips = document.querySelectorAll('.sound-chip-btn');

  soundChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const soundType = chip.getAttribute('data-sound');
      playMemeSound(soundType);
    });
  });

  function playMemeSound(type) {
    try {
      if (!soundCtx) {
        soundCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (soundCtx.state === 'suspended') soundCtx.resume();

      const osc = soundCtx.createOscillator();
      const gain = soundCtx.createGain();
      osc.connect(gain);
      gain.connect(soundCtx.destination);

      const now = soundCtx.currentTime;

      if (type === 'vine-boom') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'bruh') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.4);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'airhorn') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(466.16, now); // Bb4
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'level-up') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.setValueAtTime(392, now + 0.1);
        osc.frequency.setValueAtTime(523.25, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {}
  }
}
