const fs = require('fs');
let content = fs.readFileSync('src/components/cards/Photocard.tsx', 'utf8');

const target = `{isVideoDesign && videoSrc ? (
            <>
              <video
                id="main-photocard-video"
                data-fade-edges={videoFadeEdges && videoFit === "contain"}
                className="absolute inset-0 w-full h-full pointer-events-none z-10 video-layer main-video-layer"
                src={videoSrc}
                autoPlay
                loop
                playsInline
                style={{
                  objectFit: (isVideoDesign && videoFit === 'contain') ? 'contain' : (isFullscreenDesign ? 'cover' : 'contain'),
                  objectPosition: \`calc(50% + \${currentOffsetX}px) calc(50% + \${currentOffsetY}px)\`,
                  transform: \`scaleX(\${currentFlipH ? -1 : 1}) scale(\${currentScale / 100})\`,
                  filter: currentFilter !== 'none' ? currentFilter : undefined,
                  ...(videoFadeEdges && videoFit === 'contain' ? {
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                  } : {})
                }}
              />
              {currentVignette > 0 && (
                <div 
                  className="absolute inset-0 w-full h-full pointer-events-none" 
                  style={{
                    background: \`radial-gradient(circle, transparent 40%, rgba(0,0,0,\${currentVignette / 100}) 120%)\`
                  }} 
                />
              )}`;

const replacement = `{isVideoDesign && videoSrc ? (
            <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
              <video
                id="main-photocard-video"
                data-fade-edges={videoFadeEdges && videoFit === "contain"}
                className="video-layer main-video-layer"
                src={videoSrc}
                autoPlay
                loop
                playsInline
                style={{
                  width: videoFit === 'contain' ? undefined : '100%',
                  height: videoFit === 'contain' ? undefined : '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: (isVideoDesign && videoFit === 'contain') ? 'contain' : (isFullscreenDesign ? 'cover' : 'contain'),
                  objectPosition: videoFit === 'contain' ? '50% 50%' : \`calc(50% + \${currentOffsetX}px) calc(50% + \${currentOffsetY}px)\`,
                  transform: videoFit === 'contain' 
                    ? \`translate(\${currentOffsetX}px, \${currentOffsetY}px) scaleX(\${currentFlipH ? -1 : 1}) scale(\${currentScale / 100})\`
                    : \`scaleX(\${currentFlipH ? -1 : 1}) scale(\${currentScale / 100})\`,
                  filter: currentFilter !== 'none' ? currentFilter : undefined,
                  ...(videoFadeEdges && videoFit === 'contain' ? {
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                  } : {})
                }}
              />
              {currentVignette > 0 && (
                <div 
                  className="absolute inset-0 w-full h-full pointer-events-none z-20" 
                  style={{
                    background: \`radial-gradient(circle, transparent 40%, rgba(0,0,0,\${currentVignette / 100}) 120%)\`
                  }} 
                />
              )}`;

// Also we need to close the div instead of the fragment at the end
const targetEnd = `              </div>
            </>
          ) : isValidImage ? (`;
const replacementEnd = `              </div>
            </div>
          ) : isValidImage ? (`;

if (content.includes(target) && content.includes(targetEnd)) {
  content = content.replace(target, replacement).replace(targetEnd, replacementEnd);
  fs.writeFileSync('src/components/cards/Photocard.tsx', content);
  console.log("Success");
} else {
  console.log("Failed to find target");
  if (!content.includes(target)) console.log("Target 1 not found");
  if (!content.includes(targetEnd)) console.log("Target 2 not found");
}
