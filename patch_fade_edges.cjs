const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

const target = `            ctx.drawImage(
              video, 
              -drawWidth / 2 + offsetX, 
              -drawHeight / 2 + offsetY, 
              drawWidth, 
              drawHeight
            );`;

const replacement = `            const needsFade = originalEl?.getAttribute('data-fade-edges') === 'true';

            if (needsFade) {
              const tempCanvas = document.createElement('canvas');
              tempCanvas.width = drawWidth;
              tempCanvas.height = drawHeight;
              const tempCtx = tempCanvas.getContext('2d');
              if (tempCtx) {
                tempCtx.drawImage(video, 0, 0, drawWidth, drawHeight);
                tempCtx.globalCompositeOperation = 'destination-in';
                const gradient = tempCtx.createLinearGradient(0, 0, 0, drawHeight);
                gradient.addColorStop(0, 'transparent');
                gradient.addColorStop(0.15, 'black');
                gradient.addColorStop(0.85, 'black');
                gradient.addColorStop(1, 'transparent');
                tempCtx.fillStyle = gradient;
                tempCtx.fillRect(0, 0, drawWidth, drawHeight);
                ctx.drawImage(
                  tempCanvas,
                  -drawWidth / 2 + offsetX,
                  -drawHeight / 2 + offsetY,
                  drawWidth,
                  drawHeight
                );
              }
            } else {
              ctx.drawImage(
                video, 
                -drawWidth / 2 + offsetX, 
                -drawHeight / 2 + offsetY, 
                drawWidth, 
                drawHeight
              );
            }`;

content = content.replace(target, replacement);
fs.writeFileSync('src/hooks/useImageDownload.ts', content);
