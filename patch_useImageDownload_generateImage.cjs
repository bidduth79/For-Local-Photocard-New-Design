const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

// In generateImage, remove .video-logo-layer without clearing parent backgrounds
content = content.replace(
  '        const videoLayers = clone.querySelectorAll(\'.video-layer\');',
  '        const logoVideoLayers = clone.querySelectorAll(\'.video-logo-layer\');\n        logoVideoLayers.forEach(el => el.remove());\n\n        const videoLayers = clone.querySelectorAll(\'.video-layer\');'
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
