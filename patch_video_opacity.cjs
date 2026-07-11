const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

content = content.replace(/video\.style\.opacity = '0';/g, "video.style.opacity = '0.01';");
content = content.replace(/video\.style\.width = '1px';/g, "video.style.width = '10px';");
content = content.replace(/video\.style\.height = '1px';/g, "video.style.height = '10px';");
// also try setting muted to false explicitly before playing again, or just let it be.

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
