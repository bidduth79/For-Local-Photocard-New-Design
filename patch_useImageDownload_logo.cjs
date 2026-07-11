const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

// Find logoVideoEl in DOM
content = content.replace(
  'const mainVideoEl = ref.current.querySelector(\'.main-video-layer\') as HTMLVideoElement;',
  'const mainVideoEl = ref.current.querySelector(\'.main-video-layer\') as HTMLVideoElement;\n        const logoVideoEl = ref.current.querySelector(\'.video-logo-layer\') as HTMLVideoElement;'
);

content = content.replace(
  'let mainVideoStyles = { objectFit: \'cover\', objectPosition: \'center\', transform: \'none\' };',
  'let mainVideoStyles = { objectFit: \'cover\', objectPosition: \'center\', transform: \'none\' };\n        let logoVideoRect = { left: 0, top: 0, width: targetWidth, height: targetHeight };\n        let logoVideoStyles = { objectFit: \'contain\', objectPosition: \'center\', transform: \'none\' };'
);

content = content.replace(
  'if (mainVideoEl) {',
  `if (logoVideoEl) {
          const elRect = logoVideoEl.parentElement!.getBoundingClientRect();
          logoVideoRect = {
            left: (elRect.left - containerRect.left) * scaleX,
            top: (elRect.top - containerRect.top) * scaleY,
            width: elRect.width * scaleX,
            height: elRect.height * scaleY
          };
          const computedStyle = window.getComputedStyle(logoVideoEl);
          logoVideoStyles = {
            objectFit: computedStyle.objectFit || 'contain',
            objectPosition: computedStyle.objectPosition || '50% 50%',
            transform: computedStyle.transform || 'none'
          };
        }
        
        if (mainVideoEl) {`
);

// Create logo video element for recording
content = content.replace(
  'const animatedPatterns: any[] = [];',
  `const animatedPatterns: any[] = [];
        
        let logoVideoRecordEl: HTMLVideoElement | null = null;
        if (logoVideoEl && logoVideoEl.tagName.toLowerCase() === 'video') {
          logoVideoRecordEl = document.createElement('video');
          logoVideoRecordEl.style.position = 'fixed';
          logoVideoRecordEl.style.opacity = '0.01';
          logoVideoRecordEl.style.pointerEvents = 'none';
          document.body.appendChild(logoVideoRecordEl);
          logoVideoRecordEl.src = logoVideoEl.src;
          logoVideoRecordEl.muted = true;
          logoVideoRecordEl.playsInline = true;
          logoVideoRecordEl.loop = true;
          logoVideoRecordEl.load();
          logoVideoRecordEl.play().catch(e => console.warn("Failed to play logo video:", e));
        }`
);

// Clean up logo video
content = content.replace(
  'if (video.parentNode) video.parentNode.removeChild(video);',
  'if (video.parentNode) video.parentNode.removeChild(video);\n          if (logoVideoRecordEl && logoVideoRecordEl.parentNode) logoVideoRecordEl.parentNode.removeChild(logoVideoRecordEl);'
);

// Draw logo video
content = content.replace(
  'if (mainVideoEl) drawVideoLayer(mainVideoRect, mainVideoStyles, mainVideoEl, false);',
  `if (mainVideoEl) drawVideoLayer(mainVideoRect, mainVideoStyles, mainVideoEl, false);
          if (logoVideoRecordEl) drawVideoLayer(logoVideoRect, logoVideoStyles, logoVideoRecordEl, false);`
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
