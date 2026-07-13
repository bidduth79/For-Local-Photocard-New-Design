const fs = require('fs');

let file1 = 'src/hooks/useImageDownload.ts';
let code1 = fs.readFileSync(file1, 'utf8');

code1 = code1.replace(`let hasAnimatedPattern = false;
          let patternSize = 200;`, `let hasAnimatedPattern = false;
          let patternSize = 200;
          let patternH = 200;`);

code1 = code1.replace(`                    hasAnimatedPattern = true;
                    patternSize = patW;
                    (config as any).patternH = patH;`, `                    hasAnimatedPattern = true;
                    patternSize = patW;
                    patternH = patH;`);

code1 = code1.replace(`            hasAnimatedPattern,
            patternSize,
            hasAnimatedBorder: state.selectedDesign === 20,`, `            hasAnimatedPattern,
            patternSize,
            patternH,
            hasAnimatedBorder: state.selectedDesign === 20,`);

fs.writeFileSync(file1, code1);
