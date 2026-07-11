const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

// Restore pixelRatio to 2 for high quality text/graphics in video
content = content.replace(/pixelRatio: isVideoExport \? 1 : 2, \/\/ 1 for video to keep performance/g, 'pixelRatio: 2, // High resolution for sharp text');

// Revert the pattern matrix logic to simple translate with larger fill area
const badPatternLogic = `            const pat = ctx.createPattern(p.canvas, 'repeat');
            if (pat) {
              const pMatrix = new DOMMatrix();
              pMatrix.translateSelf(moveAmt, moveAmt);
              pat.setTransform(pMatrix);
              
              ctx.fillStyle = pat;
              ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 3, canvas.height * 3);
            }`;

const goodPatternLogic = `            ctx.translate(moveAmt, moveAmt);
            const pat = ctx.createPattern(p.canvas, 'repeat');
            if (pat) {
              ctx.fillStyle = pat;
              // Fill a much larger area to ensure no gaps when translated
              ctx.fillRect(-canvas.width * 2, -canvas.height * 2, canvas.width * 5, canvas.height * 5);
            }`;

content = content.replace(badPatternLogic, goodPatternLogic);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
