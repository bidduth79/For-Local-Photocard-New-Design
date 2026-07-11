const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

// Replace video.play().catch(...) with a more robust autoplay handling
const playLogic = `        try {
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

content = content.replace(/video\.play\(\)\.catch\(e => \{\s*console\.error\("Video play error:", e\);\s*\}\);/g, playLogic);

// Add a fallback timeout in case video.ended never fires
const stopLogic = `        mediaRecorder.start();

        // Fallback to stop recording after video duration + 2s (or 10s if unknown)
        let durationMs = (video.duration && video.duration !== Infinity) ? (video.duration * 1000) : 10000;
        // Don't record more than 30 seconds
        if (durationMs > 30000) durationMs = 30000;
        
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
          }
        }, durationMs + 500);`;

content = content.replace(/mediaRecorder\.start\(\);/g, stopLogic);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
