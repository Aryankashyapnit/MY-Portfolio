/* =========================================================
   CHARACTER IMAGE UTILITIES
   Transparent Alpha Cutout Processing & Image Cache
   ========================================================= */

const imageCache = new Map();

/**
 * Removes white background from 3D render image and produces clean transparent PNG dataURL
 */
export function getTransparentCharacterImage(src) {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src));
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Flood fill from borders to only remove outside white/light background
      // and keep inner white shirts/collars intact
      const visited = new Uint8Array(w * h);
      const queue = [];

      // Sample corner color
      const cornerR = (data[0] + data[(w - 1) * 4] + data[((h - 1) * w) * 4] + data[(w * h - 1) * 4]) / 4;
      const cornerG = (data[1] + data[(w - 1) * 4 + 1] + data[((h - 1) * w) * 4 + 1] + data[(w * h - 1) * 4 + 1]) / 4;
      const cornerB = (data[2] + data[(w - 1) * 4 + 2] + data[((h - 1) * w) * 4 + 2] + data[(w * h - 1) * 4 + 2]) / 4;

      function isBgPixel(idx) {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const lum = (r * 0.299 + g * 0.587 + b * 0.114);
        const diffR = Math.abs(r - cornerR);
        const diffG = Math.abs(g - cornerG);
        const diffB = Math.abs(b - cornerB);
        const colorDiff = diffR + diffG + diffB;

        // If high brightness or very close to corner background
        return (lum > 200) || (colorDiff < 70 && lum > 170);
      }

      // Seed borders
      for (let x = 0; x < w; x++) {
        const topIdx = (0 * w + x) * 4;
        const btmIdx = ((h - 1) * w + x) * 4;
        if (isBgPixel(topIdx)) { visited[x] = 1; queue.push(x); }
        if (isBgPixel(btmIdx)) { visited[(h - 1) * w + x] = 1; queue.push((h - 1) * w + x); }
      }
      for (let y = 0; y < h; y++) {
        const leftIdx = (y * w + 0) * 4;
        const rightIdx = (y * w + (w - 1)) * 4;
        if (isBgPixel(leftIdx) && !visited[y * w]) { visited[y * w] = 1; queue.push(y * w); }
        if (isBgPixel(rightIdx) && !visited[y * w + (w - 1)]) { visited[y * w + (w - 1)] = 1; queue.push(y * w + (w - 1)); }
      }

      // BFS flood fill
      let head = 0;
      while (head < queue.length) {
        const pos = queue[head++];
        const px = pos % w;
        const py = Math.floor(pos / w);

        const neighbors = [
          py > 0 ? pos - w : -1,
          py < h - 1 ? pos + w : -1,
          px > 0 ? pos - 1 : -1,
          px < w - 1 ? pos + 1 : -1
        ];

        for (let i = 0; i < 4; i++) {
          const nPos = neighbors[i];
          if (nPos >= 0 && !visited[nPos]) {
            const nIdx = nPos * 4;
            if (isBgPixel(nIdx)) {
              visited[nPos] = 1;
              queue.push(nPos);
            }
          }
        }
      }

      // Apply transparency and smooth anti-aliased edge
      for (let pos = 0; pos < w * h; pos++) {
        const idx = pos * 4;
        if (visited[pos]) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const lum = (r * 0.299 + g * 0.587 + b * 0.114);
          if (lum > 215) {
            data[idx + 3] = 0;
          } else {
            // Feather edge
            data[idx + 3] = Math.max(0, Math.min(255, (220 - lum) * 8));
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const transparentDataUrl = canvas.toDataURL('image/png');
      imageCache.set(src, transparentDataUrl);
      resolve(transparentDataUrl);
    };

    img.onerror = () => {
      resolve(src);
    };

    img.src = src;
  });
}
