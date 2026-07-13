const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /crop=w=\$\{tw \* 2\}:h=\$\{th \* 2\}:x='mod/,
  "crop=w=${tw * 3}:h=${th * 3}:x='mod"
);

fs.writeFileSync('server.ts', code);
