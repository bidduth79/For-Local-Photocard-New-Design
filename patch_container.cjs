const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

content = content.replace(
/        clone\.classList\.add\('export-video'\);/g,
"        container.classList.add('export-video');\n        clone.classList.add('export-video');"
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
