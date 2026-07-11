const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

// 1. Fix pixelRatio
content = content.replace(/pixelRatio: 2, \/\/ Higher resolution/g, 'pixelRatio: isVideoExport ? 1 : 2, // 1 for video to keep performance');

// 2. Fix videoBitsPerSecond
content = content.replace(/videoBitsPerSecond: 5000000/g, 'videoBitsPerSecond: 15000000');

// 3. Fix pattern animation
const oldPatternLogic = `            ctx.translate(moveAmt, moveAmt);
            
            const pat = ctx.createPattern(p.canvas, 'repeat');
            if (pat) {
              ctx.fillStyle = pat;
              ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 3, canvas.height * 3);
            }`;

const newPatternLogic = `            const pat = ctx.createPattern(p.canvas, 'repeat');
            if (pat) {
              const pMatrix = new DOMMatrix();
              pMatrix.translateSelf(moveAmt, moveAmt);
              pat.setTransform(pMatrix);
              
              ctx.fillStyle = pat;
              ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 3, canvas.height * 3);
            }`;

content = content.replace(oldPatternLogic, newPatternLogic);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
