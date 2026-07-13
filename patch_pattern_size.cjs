const fs = require('fs');
let code = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

code = code.replace(
  /const patSize = state\.patternScale \? state\.patternScale \* 2 : 200;/,
  `let patSize = state.patternScale ? state.patternScale * 2 : 200;
              if (videoResolution === '720p') {
                patSize = Math.round(patSize * (720 / 1080));
              }`
);

fs.writeFileSync('src/hooks/useImageDownload.ts', code);
