const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /const offsetX = config\.mainVideoStyles\?\.offsetX \|\| 0;/,
  `let offsetX = config.mainVideoStyles?.offsetX || 0;
        if (flipH === -1) {
          offsetX = -offsetX;
        }`
);

fs.writeFileSync('server.ts', code);
