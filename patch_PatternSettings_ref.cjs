const fs = require('fs');
let file = fs.readFileSync('src/components/controls/news/PatternSettings.tsx', 'utf8');

file = file.replace(
  `onClick={() => document.getElementById('pattern-upload')?.click()}`,
  `onClick={(e) => { const fileInput = e.currentTarget.parentElement?.querySelector('input[type="file"]'); if(fileInput) { (fileInput as HTMLElement).click(); } }}`
);

fs.writeFileSync('src/components/controls/news/PatternSettings.tsx', file);
