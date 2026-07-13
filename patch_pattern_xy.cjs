const fs = require('fs');

let file1 = 'src/hooks/useImageDownload.ts';
let code1 = fs.readFileSync(file1, 'utf8');
code1 = code1.replace('patternSize = patW;', 'patternSize = patW;\n                    (config as any).patternH = patH;');
fs.writeFileSync(file1, code1);

let file2 = 'server.ts';
let code2 = fs.readFileSync(file2, 'utf8');
code2 = code2.replace(`const P = config.patternSize || 200;
        filters.push(\`[\${lastBase}][\${patternIdx}:v]overlay=x='-mod(t*\${P}/20,\${P})':y='-mod(t*\${P}/20,\${P})'[withpat]\`);`,
`const PX = config.patternSize || 200;
        const PY = config.patternH || config.patternSize || 200;
        filters.push(\`[\${lastBase}][\${patternIdx}:v]overlay=x='-mod(t*\${PX}/20,\${PX})':y='-mod(t*\${PY}/20,\${PY})'[withpat]\`);`);
fs.writeFileSync(file2, code2);
