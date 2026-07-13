const fs = require('fs');
let code = fs.readFileSync('src/components/cards/Photocard.tsx', 'utf8');

code = code.replace(
  /absolute inset-\[-50%\]/g,
  'absolute inset-[-100%]'
);

fs.writeFileSync('src/components/cards/Photocard.tsx', code);
