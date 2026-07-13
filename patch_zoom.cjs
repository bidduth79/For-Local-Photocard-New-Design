const fs = require('fs');

let file1 = 'src/components/cards/Photocard.tsx';
let code1 = fs.readFileSync(file1, 'utf8');
code1 = code1.split("`calc(50% + ${currentOffsetX}px) calc(50% + ${currentOffsetY}px)`").join("`${50 + currentOffsetX}% ${50 + currentOffsetY}%`");
fs.writeFileSync(file1, code1);

let file2 = 'server.ts';
let code2 = fs.readFileSync(file2, 'utf8');
code2 = code2.split("overlay=x=(W-w)/2+${offsetX}:y=(H-h)/2+${offsetY}:shortest=1").join("overlay=x='(W-w)*(${50 + offsetX}/100)':y='(H-h)*(${50 + offsetY}/100)':shortest=1");
fs.writeFileSync(file2, code2);
