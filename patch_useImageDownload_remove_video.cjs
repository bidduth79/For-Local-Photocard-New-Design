const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

content = content.replace(
  'const logoVideoLayers = clone.querySelectorAll(\'.video-logo-layer\');\n        logoVideoLayers.forEach(el => el.remove());',
  'const logoVideoLayers = clone.querySelectorAll(\'video.video-logo-layer\');\n        logoVideoLayers.forEach(el => el.remove());'
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
