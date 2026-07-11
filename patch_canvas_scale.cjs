const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

content = content.replace(
  'const canvasScale = targetWidth / domWidth;\n              const scaledSize = targetSize * canvasScale;',
  '// Fix: targetSize is already in local CSS pixels (e.g. 1080x1350 space). Since canvas is 1080x1350, it matches perfectly 1:1.\n              const scaledSize = targetSize;'
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
