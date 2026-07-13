const fs = require('fs');
const file = 'src/hooks/useImageDownload.ts';
let code = fs.readFileSync(file, 'utf8');

const target = `      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = () => {
            console.warn('Image failed to load', img.src);
            resolve(null);
          };
        });
      }));`;

const replacement = `      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          const timeout = setTimeout(() => {
             console.warn('Image load timeout', img.src);
             resolve(null);
          }, 3000);
          img.onload = () => { clearTimeout(timeout); resolve(null); };
          img.onerror = () => {
            clearTimeout(timeout);
            console.warn('Image failed to load', img.src);
            resolve(null);
          };
        });
      }));`;

code = code.replace(target, replacement);
fs.writeFileSync(file, code);
