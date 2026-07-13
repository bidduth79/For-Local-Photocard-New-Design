const fs = require('fs');
let code = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

code = code.replace(
  /canvas\.width = targetWidth \* 2 \+ patW;/,
  'canvas.width = targetWidth * 3 + patW;'
);
code = code.replace(
  /canvas\.height = targetHeight \* 2 \+ patH;/,
  'canvas.height = targetHeight * 3 + patH;'
);

fs.writeFileSync('src/hooks/useImageDownload.ts', code);
