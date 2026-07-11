const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

content = content.replace(
  'const elRect = logoVideoEl.parentElement!.getBoundingClientRect();',
  'const elRect = logoVideoEl.getBoundingClientRect();'
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
