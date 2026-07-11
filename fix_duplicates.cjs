const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

content = content.replace(
  'const logoVideoEl = ref.current.querySelector(\'.video-logo-layer\') as HTMLVideoElement;\n        const logoVideoEl = ref.current.querySelector(\'.video-logo-layer\') as HTMLVideoElement;',
  'const logoVideoEl = ref.current.querySelector(\'.video-logo-layer\') as HTMLVideoElement;'
);

content = content.replace(
  'let logoVideoRect = { left: 0, top: 0, width: targetWidth, height: targetHeight };\n        let logoVideoStyles = { objectFit: \'contain\', objectPosition: \'center\', transform: \'none\' };\n        let logoVideoRect = { left: 0, top: 0, width: targetWidth, height: targetHeight };\n        let logoVideoStyles = { objectFit: \'contain\', objectPosition: \'center\', transform: \'none\' };',
  'let logoVideoRect = { left: 0, top: 0, width: targetWidth, height: targetHeight };\n        let logoVideoStyles = { objectFit: \'contain\', objectPosition: \'center\', transform: \'none\' };'
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
