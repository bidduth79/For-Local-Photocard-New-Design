const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace("color=c=black@0:size=${w}x${h}:d=9999[vbox]", "color=c=black@0:size=${w}x${h}:d=9999,format=yuva420p[vbox]");

fs.writeFileSync('server.ts', code);
console.log('Fixed server.ts');
