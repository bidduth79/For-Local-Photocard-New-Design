const fs = require('fs');
let code = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

code = code.replace(
  /patW = parseFloat\(widthMatch\[1\]\);\s*patH = parseFloat\(heightMatch\[1\]\);/,
  `patW = parseFloat(widthMatch[1]);
                   patH = parseFloat(heightMatch[1]);
                   if (videoResolution === '720p') {
                     patW = Math.round(patW * (720 / 1080));
                     patH = Math.round(patH * (720 / 1080));
                   }`
);

fs.writeFileSync('src/hooks/useImageDownload.ts', code);
