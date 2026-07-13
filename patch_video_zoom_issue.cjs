const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Ensure that for "cover" we use min/max properly with zoom multiplier
code = code.replace(
  /const minRatio = Math\.min\(tw \/ w, th \/ h\);/g,
  "const maxRatio = Math.max(tw / w, th / h);"
);

fs.writeFileSync('server.ts', code);
