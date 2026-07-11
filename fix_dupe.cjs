const fs = require('fs');
let content = fs.readFileSync('src/components/cards/Photocard.tsx', 'utf8');

// Find the double declaration and remove it
content = content.replace(
  `const globalIsVideo = image && (image.startsWith('data:video/') || image.match(/\\.(mp4|webm|mov|ogg)(\\?.*)?$/i));
    const globalIsVideoDesign = globalIsVideo && design === 20;
    const globalIsVideo = image && (image.startsWith('data:video/') || image.match(/\\.(mp4|webm|mov|ogg)(\\?.*)?$/i));
    const globalIsVideoDesign = globalIsVideo && design === 20;`,
  `const globalIsVideo = image && (image.startsWith('data:video/') || image.match(/\\.(mp4|webm|mov|ogg)(\\?.*)?$/i));
    const globalIsVideoDesign = globalIsVideo && design === 20;`
);

fs.writeFileSync('src/components/cards/Photocard.tsx', content);
