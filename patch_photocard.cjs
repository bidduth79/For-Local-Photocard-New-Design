const fs = require('fs');
let content = fs.readFileSync('src/components/cards/Photocard.tsx', 'utf8');

content = content.replace(/const globalIsVideoDesign = globalIsVideo && design === 20;/g, 'const globalIsVideoDesign = globalIsVideo;');
content = content.replace(/const isVideoDesign = isVideo && design === 20;/g, 'const isVideoDesign = isVideo;');

fs.writeFileSync('src/components/cards/Photocard.tsx', content);
