const fs = require('fs');

let file2 = 'server.ts';
let code2 = fs.readFileSync(file2, 'utf8');

code2 = code2.replace(
  /overlay=x='\(W-w\)\*\(\$\{50 \+ offsetX\}\/100\)':y='\(H-h\)\*\(\$\{50 \+ offsetY\}\/100\)':shortest=1/g,
  "overlay=x='W*(0.5 - ${scaleFactor}/2 + ${scaleFactor}*(${50 + offsetX}/100)) - w*(${50 + offsetX}/100)':y='H*(0.5 - ${scaleFactor}/2 + ${scaleFactor}*(${50 + offsetY}/100)) - h*(${50 + offsetY}/100)':shortest=1"
);

fs.writeFileSync(file2, code2);
