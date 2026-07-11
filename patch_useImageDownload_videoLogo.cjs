const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

// Find the video elements
content = content.replace(
  'const mainVideoEl = ref.current.querySelector(\'.main-video-layer\') as HTMLVideoElement;',
  'const mainVideoEl = ref.current.querySelector(\'.main-video-layer\') as HTMLVideoElement;\n        const logoVideoEl = ref.current.querySelector(\'.video-logo-layer\') as HTMLVideoElement;'
);

content = content.replace(
  'let mainVideoStyles = { objectFit: \'cover\', objectPosition: \'center\', transform: \'none\' };',
  'let mainVideoStyles = { objectFit: \'cover\', objectPosition: \'center\', transform: \'none\' };\n        let logoVideoRect = { left: 0, top: 0, width: 100, height: 100 };\n        let logoVideoStyles = { objectFit: \'contain\', objectPosition: \'center\', transform: \'none\' };'
);

content = content.replace(
  'if (mainVideoEl) {',
  `if (logoVideoEl) {
          const elRect = logoVideoEl.getBoundingClientRect();
          logoVideoRect = {
            left: (elRect.left - containerRect.left) * scaleX,
            top: (elRect.top - containerRect.top) * scaleY,
            width: elRect.width * scaleX,
            height: elRect.height * scaleY
          };
          const computedStyle = window.getComputedStyle(logoVideoEl);
          logoVideoStyles = {
            objectFit: computedStyle.objectFit || 'contain',
            objectPosition: computedStyle.objectPosition || 'center',
            transform: computedStyle.transform || 'none'
          };
        }
        
        if (mainVideoEl) {`
);

// We need to also append the logo video and play it.
// Wait, in `useImageDownload.ts`, ONLY `video` (the main video) is used for rendering!
// The other `bgVideoEl` is drawn, but wait! The code does:
// `drawVideoLayer(..., video, ...)`? No!
// Let's see what `drawVideoLayer` actually does!
