const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /force_original_aspect_ratio=\$\{isContain \? 'decrease' : 'increase'\}\$\{hflipFilter\}\[vscaled\]/g,
  "force_original_aspect_ratio=${isContain ? 'decrease' : 'increase'}${hflipFilter}[vscaled]"
);

fs.writeFileSync('server.ts', code);
