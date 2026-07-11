const fs = require('fs');
let content = fs.readFileSync('src/store/appStore.ts', 'utf8');

// interface modifications
content = content.replace(
  '  fullBrandLogoHeight: number;',
  '  fullBrandLogoHeight: number;\n  videoLogo: string;\n  videoLogoScale: number;\n  videoLogoX: number;\n  videoLogoY: number;'
);

content = content.replace(
  '  setFullBrandLogoHeight: (val: number) => void;',
  '  setFullBrandLogoHeight: (val: number) => void;\n  setVideoLogo: (val: string) => void;\n  setVideoLogoScale: (val: number) => void;\n  setVideoLogoX: (val: number) => void;\n  setVideoLogoY: (val: number) => void;'
);

// implementation modifications
content = content.replace(
  '  fullBrandLogoHeight: 60,',
  '  fullBrandLogoHeight: 60,\n  videoLogo: "",\n  videoLogoScale: 100,\n  videoLogoX: 0,\n  videoLogoY: 0,'
);

content = content.replace(
  '  setFullBrandLogoHeight: (val) => set({ fullBrandLogoHeight: val }),',
  '  setFullBrandLogoHeight: (val) => set({ fullBrandLogoHeight: val }),\n  setVideoLogo: (val) => set({ videoLogo: val }),\n  setVideoLogoScale: (val) => set({ videoLogoScale: val }),\n  setVideoLogoX: (val) => set({ videoLogoX: val }),\n  setVideoLogoY: (val) => set({ videoLogoY: val }),'
);

fs.writeFileSync('src/store/appStore.ts', content);
