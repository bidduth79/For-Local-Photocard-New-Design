const fs = require('fs');
const file = 'src/hooks/useImageDownload.ts';
let code = fs.readFileSync(file, 'utf8');

const target = `                const pat = ctx.createPattern(img, 'repeat');
                if (pat) {
                  ctx.fillStyle = pat;
                  ctx.fillRect(0, 0, canvas.width, canvas.height);`;

const replacement = `                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = patSize;
                tempCanvas.height = patSize;
                const tempCtx = tempCanvas.getContext('2d');
                if (tempCtx) {
                  tempCtx.drawImage(img, 0, 0, patSize, patSize);
                  const pat = ctx.createPattern(tempCanvas, 'repeat');
                  if (pat) {
                    ctx.fillStyle = pat;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);`;

code = code.replace(target, replacement);

const target2 = `                    hasAnimatedPattern = true;
                    patternSize = patSize;
                  }
                }`;

const replacement2 = `                    hasAnimatedPattern = true;
                    patternSize = patSize;
                  }
                }
                }`;

code = code.replace(target2, replacement2);

fs.writeFileSync(file, code);
