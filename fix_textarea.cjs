const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/ContentEditor.tsx', 'utf-8');

file = file.replace(
  /<textarea\n\s+value=\{description \|\| ''\}\n\s+onChange=\{\(e\) => setDescription\?\.\(e\.target\.value\)\}/g,
  `<DebouncedTextarea\n                  value={description || ''}\n                  onChange={(val) => setDescription?.(val)}`
);

fs.writeFileSync('src/components/controls/news/ContentEditor.tsx', file);
console.log('Fixed textarea');
