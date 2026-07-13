const fs = require('fs');
const file = 'src/hooks/useImageDownload.ts';
let code = fs.readFileSync(file, 'utf8');

const target = `                const img = new Image();
                img.src = svgDataUrl;
                await new Promise(resolve => {
                  img.onload = resolve;
                  img.onerror = resolve;
                });`;

const replacement = `                const img = new Image();
                await new Promise(resolve => {
                  img.onload = resolve;
                  img.onerror = resolve;
                  img.src = svgDataUrl;
                });`;

code = code.replace(target, replacement);
fs.writeFileSync(file, code);
