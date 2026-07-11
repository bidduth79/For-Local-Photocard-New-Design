const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

content = content.replace(
  'const drawVideoLayer = (rect: any, styles: any, originalEl: any, isBg: boolean) => {',
  'const drawVideoLayer = (rect: any, styles: any, originalEl: any, sourceVideo: any, isBg: boolean) => {'
);

content = content.replace(
  'tempCtx.drawImage(originalEl, 0, 0, drawWidth, drawHeight);',
  'tempCtx.drawImage(sourceVideo, 0, 0, drawWidth, drawHeight);'
);

content = content.replace(
  `            } else {
              ctx.drawImage(
                originalEl, 
                -drawWidth / 2 + offsetX, 
                -drawHeight / 2 + offsetY, `,
  `            } else {
              ctx.drawImage(
                sourceVideo, 
                -drawWidth / 2 + offsetX, 
                -drawHeight / 2 + offsetY, `
);

content = content.replace(
  'if (bgVideoEl) drawVideoLayer(bgVideoRect, bgVideoStyles, bgVideoEl, true);',
  'if (bgVideoEl) drawVideoLayer(bgVideoRect, bgVideoStyles, bgVideoEl, video, true);'
);

content = content.replace(
  'if (mainVideoEl) drawVideoLayer(mainVideoRect, mainVideoStyles, mainVideoEl, false);',
  'if (mainVideoEl) drawVideoLayer(mainVideoRect, mainVideoStyles, mainVideoEl, video, false);'
);

content = content.replace(
  'if (logoVideoRecordEl) drawVideoLayer(logoVideoRect, logoVideoStyles, logoVideoRecordEl, false);',
  'if (logoVideoRecordEl) drawVideoLayer(logoVideoRect, logoVideoStyles, logoVideoRecordEl, logoVideoRecordEl, false);'
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
console.log("Fixed sourceVideo argument");
