const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

const target = `            } else {
              ctx.drawImage(
                video, 
                -drawWidth / 2 + offsetX, 
                -drawHeight / 2 + offsetY, `;

const replacement = `            } else {
              ctx.drawImage(
                originalEl, 
                -drawWidth / 2 + offsetX, 
                -drawHeight / 2 + offsetY, `;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/hooks/useImageDownload.ts', content);
  console.log("Success");
} else {
  console.log("Target not found");
}
