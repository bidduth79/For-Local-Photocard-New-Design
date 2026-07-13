const fs = require('fs');
let file = 'src/App.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/\{isProcessingVideo && \([\s\S]*?\)\}/g, '');

fs.writeFileSync(file, code);
