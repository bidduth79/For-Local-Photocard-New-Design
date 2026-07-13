const fs = require('fs');
const file = 'src/hooks/useImageDownload.ts';
let code = fs.readFileSync(file, 'utf8');

const target = `              const svgDataUrl = match[1];
              const patSize = state.patternScale ? state.patternScale * 2 : 200;
              const canvas = document.createElement('canvas');
              canvas.width = targetWidth + patSize;
              canvas.height = targetHeight + patSize;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                const img = new Image();
                await new Promise(resolve => {
                  img.onload = resolve;
                  img.onerror = resolve;
                  img.src = svgDataUrl;
                });
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = patSize;
                tempCanvas.height = patSize;
                const tempCtx = tempCanvas.getContext('2d');
                if (tempCtx) {
                  tempCtx.drawImage(img, 0, 0, patSize, patSize);`;

const replacement = `              const svgDataUrl = match[1];
              const patSize = state.patternScale ? state.patternScale * 2 : 200;
              let patW = patSize;
              let patH = patSize;
              try {
                const decodedSvg = decodeURIComponent(svgDataUrl.split(',')[1]);
                const widthMatch = decodedSvg.match(/width="([0-9.]+)"/);
                const heightMatch = decodedSvg.match(/height="([0-9.]+)"/);
                if (widthMatch && heightMatch) {
                   patW = parseFloat(widthMatch[1]);
                   patH = parseFloat(heightMatch[1]);
                }
              } catch (e) {}

              const canvas = document.createElement('canvas');
              canvas.width = targetWidth + patW;
              canvas.height = targetHeight + patH;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                const img = new Image();
                await new Promise(resolve => {
                  img.onload = resolve;
                  img.onerror = resolve;
                  img.src = svgDataUrl;
                });
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = patW;
                tempCanvas.height = patH;
                const tempCtx = tempCanvas.getContext('2d');
                if (tempCtx) {
                  tempCtx.drawImage(img, 0, 0, patW, patH);`;

code = code.replace(target, replacement);

const target2 = `                    hasAnimatedPattern = true;
                    patternSize = patSize;`;
const replacement2 = `                    hasAnimatedPattern = true;
                    patternSize = patW;`;

code = code.replace(target2, replacement2);

fs.writeFileSync(file, code);
