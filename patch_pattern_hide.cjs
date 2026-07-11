const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

const target = `          // Draw animated patterns
          animatedPatterns.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.opacity;`;

const replacement = `          // Draw animated patterns (hidden for first 1s, then fade in over 0.5s to avoid thumbnail lines)
          const patternAlphaMultiplier = video.currentTime < 1.0 ? 0 : Math.min(1, (video.currentTime - 1.0) / 0.5);
          if (patternAlphaMultiplier > 0) {
            animatedPatterns.forEach(p => {
              ctx.save();
              ctx.globalAlpha = p.opacity * patternAlphaMultiplier;`;

content = content.replace(target, replacement);

const targetEnd = `            ctx.restore();
          });`;

const replacementEnd = `            ctx.restore();
            });
          }`;

content = content.replace(targetEnd, replacementEnd);
fs.writeFileSync('src/hooks/useImageDownload.ts', content);
