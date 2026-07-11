const fs = require('fs');
let content = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

// Find the video creation and attach it to DOM
content = content.replace(
/        const video = document\.createElement\('video'\);/g,
`        const video = document.createElement('video');
        video.style.position = 'fixed';
        video.style.opacity = '0';
        video.style.pointerEvents = 'none';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '1px';
        video.style.height = '1px';
        document.body.appendChild(video);`
);

// Find the cleanup logic to remove video from DOM
content = content.replace(
/        mediaRecorder\.onstop = \(\) => \{/g,
`        mediaRecorder.onstop = () => {
          if (video.parentNode) video.parentNode.removeChild(video);`
);

fs.writeFileSync('src/hooks/useImageDownload.ts', content);
