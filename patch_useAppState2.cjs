const fs = require('fs');
let content = fs.readFileSync('src/hooks/useAppState.ts', 'utf8');

content = content.replace(
  '  const setFullBrandLogoHeight = useAppStore(s => s.setFullBrandLogoHeight);',
  '  const setFullBrandLogoHeight = useAppStore(s => s.setFullBrandLogoHeight);\n  const videoLogo = useAppStore(s => s.videoLogo);\n  const setVideoLogo = useAppStore(s => s.setVideoLogo);\n  const videoLogoScale = useAppStore(s => s.videoLogoScale);\n  const setVideoLogoScale = useAppStore(s => s.setVideoLogoScale);\n  const videoLogoX = useAppStore(s => s.videoLogoX);\n  const setVideoLogoX = useAppStore(s => s.setVideoLogoX);\n  const videoLogoY = useAppStore(s => s.videoLogoY);\n  const setVideoLogoY = useAppStore(s => s.setVideoLogoY);'
);

fs.writeFileSync('src/hooks/useAppState.ts', content);
