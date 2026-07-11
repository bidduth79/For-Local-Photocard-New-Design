const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

// Inside generateImage, we can add a class to the clone
content = content.replace(
/      container\.appendChild\(clone\);/g,
`      container.appendChild(clone);
      if (layerMode === 'foreground') {
        clone.classList.add('export-foreground');
        // also hide images in foreground layer so they don't block the video
        if (isVideoExport) {
            clone.classList.add('export-video');
        }
      }`
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
