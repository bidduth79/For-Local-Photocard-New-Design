const fs = require('fs');

let file1 = 'src/hooks/useImageDownload.ts';
let code1 = fs.readFileSync(file1, 'utf8');

code1 = code1.replace(`              const canvas = document.createElement('canvas');
              canvas.width = targetWidth + patW;
              canvas.height = targetHeight + patH;`, `              const canvas = document.createElement('canvas');
              canvas.width = targetWidth * 2 + patW;
              canvas.height = targetHeight * 2 + patH;`);

code1 = code1.replace(`            hasAnimatedPattern,
            patternSize,
            patternH,
            hasAnimatedBorder: state.selectedDesign === 20,`, `            hasAnimatedPattern,
            patternSize,
            patternH,
            patternRotation: state.patternRotation,
            patternOpacity: state.patternOpacity,
            hasAnimatedBorder: state.selectedDesign === 20,`);

fs.writeFileSync(file1, code1);

let file2 = 'server.ts';
let code2 = fs.readFileSync(file2, 'utf8');

code2 = code2.replace(`      if (patternIdx !== -1) {
        const PX = config.patternSize || 200;
        const PY = config.patternH || config.patternSize || 200;
        filters.push(\`[\${lastBase}][\${patternIdx}:v]overlay=x='-mod(t*\${PX}/20,\${PX})':y='-mod(t*\${PY}/20,\${PY})'[withpat]\`);
        lastBase = 'withpat';
      }`, `      if (patternIdx !== -1) {
        const PX = config.patternSize || 200;
        const PY = config.patternH || config.patternSize || 200;
        const rot = config.patternRotation || 0;
        const opacity = config.patternOpacity !== undefined ? config.patternOpacity / 100 : 0.1;
        const tw = Math.round(config.targetWidth / 2) * 2;
        const th = Math.round(config.targetHeight / 2) * 2;
        filters.push(\`[\${patternIdx}:v]crop=w=\${tw * 2}:h=\${th * 2}:x='mod(t*\${PX}/20,\${PX})':y='mod(t*\${PY}/20,\${PY})'[patcrop]\`);
        filters.push(\`[patcrop]rotate=\${rot}*PI/180:ow=\${tw}:oh=\${th}:c=none,format=yuva420p,colorchannelmixer=aa=\${opacity}[patrot]\`);
        filters.push(\`[\${lastBase}][patrot]overlay=0:0[withpat]\`);
        lastBase = 'withpat';
      }`);

fs.writeFileSync(file2, code2);
