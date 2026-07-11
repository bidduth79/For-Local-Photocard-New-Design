const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

content = content.replace(
/        video\.src = videoSrc;/g,
`        video.src = videoSrc;
        video.load();`
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
