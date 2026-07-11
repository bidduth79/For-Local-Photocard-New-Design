const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf8');
content = content.replace(
  '100% { background-position: -200px -200px; }',
  '100% { background-position: calc(-1 * var(--pattern-size, 200px)) calc(-1 * var(--pattern-size, 200px)); }'
);
fs.writeFileSync('src/index.css', content);
