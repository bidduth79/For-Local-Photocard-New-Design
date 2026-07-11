const fs = require('fs');
let file = fs.readFileSync('src/components/controls/news/DesignSettings.tsx', 'utf-8');

// I will just replace the whole selector and destructuring.
const start = file.indexOf('const DesignSettings: React.FC = () => {');
const end = file.indexOf('const brandFontInputRef = useRef<HTMLInputElement>(null);');

const replacer = `const DesignSettings: React.FC = () => {
  const {
    selectedDesign,
    setSelectedDesign,
    themeColor,
    setThemeColor: originalSetThemeColor,
    setGradientStart: originalSetGradientStart,
    setGradientEnd: originalSetGradientEnd,
    setCardGradientStart: originalSetCardGradientStart,
    setCardGradientEnd: originalSetCardGradientEnd,
    language,
    darkMode,
    isDesignSettingsExpanded: isExpanded,
    setIsDesignSettingsExpanded: setIsExpanded,
    imageOffsetY,
    setImageOffsetY,
    customFontUrl,
    setCustomFontUrl,
    customFontName,
    setCustomFontName,
    brandFontUrl,
    setBrandFontUrl,
    brandFontName,
    setBrandFontName,
    overlayOpacity,
    setOverlayOpacity,
    applyGradientToAll,
    setApplyGradientToAll,
    image,
    gradientStart, gradientEnd, cardGradientStart, cardGradientEnd
  } = useAppStore(useShallow(state => ({
    selectedDesign: state.selectedDesign,
    setSelectedDesign: state.setSelectedDesign,
    themeColor: state.themeColor,
    setThemeColor: state.setThemeColor,
    setGradientStart: state.setGradientStart,
    setGradientEnd: state.setGradientEnd,
    setCardGradientStart: state.setCardGradientStart,
    setCardGradientEnd: state.setCardGradientEnd,
    language: state.language,
    darkMode: state.darkMode,
    isDesignSettingsExpanded: state.isDesignSettingsExpanded,
    setIsDesignSettingsExpanded: state.setIsDesignSettingsExpanded,
    imageOffsetY: state.imageOffsetY,
    setImageOffsetY: state.setImageOffsetY,
    customFontUrl: state.customFontUrl,
    setCustomFontUrl: state.setCustomFontUrl,
    customFontName: state.customFontName,
    setCustomFontName: state.setCustomFontName,
    brandFontUrl: state.brandFontUrl,
    setBrandFontUrl: state.setBrandFontUrl,
    brandFontName: state.brandFontName,
    setBrandFontName: state.setBrandFontName,
    overlayOpacity: state.overlayOpacity,
    setOverlayOpacity: state.setOverlayOpacity,
    applyGradientToAll: state.applyGradientToAll,
    setApplyGradientToAll: state.setApplyGradientToAll,
    image: state.image,
    gradientStart: state.gradientStart,
    gradientEnd: state.gradientEnd,
    cardGradientStart: state.cardGradientStart,
    cardGradientEnd: state.cardGradientEnd
  })));

  const setThemeColor = (c: string) => { originalSetThemeColor(c); useAppStore.getState().setAutoColorMode(false); };
  const setGradientStart = (c: string) => { originalSetGradientStart(c); useAppStore.getState().setAutoColorMode(false); };
  const setGradientEnd = (c: string) => { originalSetGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };
  const setCardGradientStart = (c: string) => { originalSetCardGradientStart(c); useAppStore.getState().setAutoColorMode(false); };
  const setCardGradientEnd = (c: string) => { originalSetCardGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };

  `;

file = file.substring(0, start) + replacer + file.substring(end);
fs.writeFileSync('src/components/controls/news/DesignSettings.tsx', file);
console.log('fixed design settings');
