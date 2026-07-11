const fs = require('fs');
let content = fs.readFileSync('src/hooks/useAppState.ts', 'utf8');

content = content.replace(
  '    fullBrandLogo, setFullBrandLogo,\n    fullBrandLogoHeight, setFullBrandLogoHeight, design18LogoHeight, setDesign18LogoHeight,',
  '    fullBrandLogo, setFullBrandLogo,\n    fullBrandLogoHeight, setFullBrandLogoHeight, design18LogoHeight, setDesign18LogoHeight,\n    videoLogo, setVideoLogo, videoLogoScale, setVideoLogoScale, videoLogoX, setVideoLogoX, videoLogoY, setVideoLogoY,'
);

content = content.replace(
  '  const fullBrandLogo = useAppStore(state => state.fullBrandLogo);',
  '  const fullBrandLogo = useAppStore(state => state.fullBrandLogo);\n  const videoLogo = useAppStore(state => state.videoLogo);\n  const videoLogoScale = useAppStore(state => state.videoLogoScale);\n  const videoLogoX = useAppStore(state => state.videoLogoX);\n  const videoLogoY = useAppStore(state => state.videoLogoY);'
);

content = content.replace(
  '  const setFullBrandLogoHeight = useAppStore(state => state.setFullBrandLogoHeight);',
  '  const setFullBrandLogoHeight = useAppStore(state => state.setFullBrandLogoHeight);\n  const setVideoLogo = useAppStore(state => state.setVideoLogo);\n  const setVideoLogoScale = useAppStore(state => state.setVideoLogoScale);\n  const setVideoLogoX = useAppStore(state => state.setVideoLogoX);\n  const setVideoLogoY = useAppStore(state => state.setVideoLogoY);'
);

fs.writeFileSync('src/hooks/useAppState.ts', content);
