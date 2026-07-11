const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

const target1 = `        // Fallback to stop recording after video duration + 2s (or 10s if unknown)
        let durationMs = (video.duration && video.duration !== Infinity) ? (video.duration * 1000) : 10000;
        // Don't record more than 30 seconds
        // No duration cap as per user request
        // if (durationMs > 30000) durationMs = 30000;
        
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
          }
        }, durationMs + 500);`;

const target2 = `        // Stop recording after video ends (with a 10 min fallback)
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            video.pause();
            mediaRecorder.stop();
          }
        }, video.duration * 1000 || 600000);`;

content = content.replace(target1, '// Relying on video.ended in drawFrame loop');
content = content.replace(target2, `        // Failsafe 10 min timeout
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            video.pause();
            mediaRecorder.stop();
          }
        }, 600000);`);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
