const fs = require('fs');
let content = fs.readFileSync('src/components/cards/designs/Design20.tsx', 'utf8');

// Import useAppStore
content = content.replace(
  'import { GeometricOverlay } from "./GeometricOverlays";',
  'import { GeometricOverlay } from "./GeometricOverlays";\nimport { useAppStore } from "../../../../store/appStore";'
);

// Read from store
content = content.replace(
  '  const bgContrastColor = getContrastColor(themeColor);',
  '  const bgContrastColor = getContrastColor(themeColor);\n  const { videoLogo, videoLogoScale, videoLogoX, videoLogoY } = useAppStore();'
);

// Add the videoLogo renderer inside the main container.
// Right after the Fullscreen Background Image/Video
const logoJSX = `
      {/* Video Logo Overlay */}
      {videoLogo && (
        <div 
          className="absolute z-50 pointer-events-none flex items-center justify-center"
          style={{
            left: '50%',
            top: videoLogoY !== 0 ? \`\${videoLogoY}px\` : (videoFit === 'contain' ? '386px' : '150px'),
            transform: \`translate(calc(-50% + \${videoLogoX}px), -50%) scale(\${videoLogoScale / 100})\`,
          }}
        >
          {videoLogo.startsWith('data:video/') ? (
            <video src={videoLogo} autoPlay loop muted playsInline className="max-w-full max-h-full object-contain" />
          ) : (
            <img src={videoLogo} alt="Video Logo" className="max-w-full max-h-full object-contain" />
          )}
        </div>
      )}
`;

content = content.replace(
  '{/* Fullscreen Background Image/Video with Zoom/Pan Support */}',
  logoJSX + '\n      {/* Fullscreen Background Image/Video with Zoom/Pan Support */}'
);

fs.writeFileSync('src/components/cards/designs/Design20.tsx', content);
