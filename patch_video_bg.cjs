const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

content = content.replace(
  '// Fix: targetSize is already in local CSS pixels (e.g. 1080x1350 space). Since canvas is 1080x1350, it matches perfectly 1:1.\n              const scaledSize = targetSize;',
  '// Scale targetSize by targetWidth / 1080 so it matches 720p correctly if chosen\n              const scaledSize = targetSize * (targetWidth / 1080);'
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
