const fs = require('fs');
let file = 'src/components/cards/Photocard.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /const globalIsVideo = image && \(image\.startsWith\('data:video\/'\) \|\| image\.match\(\/\\\.\(mp4\|webm\|mov\|ogg\)\(\\\?\.\*\)\?\$\/i\)\);\s*const globalIsVideoDesign = globalIsVideo;/,
  `const isVideoDesign = design === 20;
    const globalIsVideo = image && (image.startsWith('data:video/') || image.match(/\\.(mp4|webm|mov|ogg)(\\?.*)?$/i));
    const globalIsVideoDesign = globalIsVideo || isVideoDesign;`
);

fs.writeFileSync(file, code);
