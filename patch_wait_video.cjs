const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

const playLogic = `
        try {
          // Wait for video to be ready before playing
          await new Promise((resolve, reject) => {
            if (video.readyState >= 3) {
              resolve(true);
            } else {
              video.oncanplay = () => resolve(true);
              video.onerror = (e) => reject(e);
              setTimeout(() => resolve(true), 3000); // fallback timeout
            }
          });
          await video.play();
        } catch (e) {
          console.warn("Video play error (unmuted):", e);
          video.muted = true;
          try {
            await video.play();
          } catch (e2) {
            console.error("Video play error (muted):", e2);
          }
        }`;

content = content.replace(/        try \{\s*await video\.play\(\);\s*\} catch \(e\) \{\s*console\.warn\("Video play error \(unmuted\):", e\);\s*video\.muted = true;\s*try \{\s*await video\.play\(\);\s*\} catch \(e2\) \{\s*console\.error\("Video play error \(muted\):", e2\);\s*\}\s*\}/g, playLogic);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
