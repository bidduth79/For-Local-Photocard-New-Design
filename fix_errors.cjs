const fs = require('fs');

function replaceFile(path, replacer) {
  let file = fs.readFileSync(path, 'utf-8');
  file = replacer(file);
  fs.writeFileSync(path, file);
}

replaceFile('src/components/controls/news/PatternSettings.tsx', file => {
  return file.replace('const PatternSettings: React.FC = () =>', 'export const PatternSettings: React.FC = () =>').replace('export import', 'import');
});

replaceFile('src/components/controls/news/ImageSettings.tsx', file => {
  return file.replace('const ImageSettings: React.FC = () =>', 'export const ImageSettings: React.FC = () =>');
});

replaceFile('src/components/controls/news/ContentEditor.tsx', file => {
  file = file.replace(/showDetailedNewsBox: state.showDetailedNewsBox,/, 'showDetailedNewsBox: state.showDetailedNewsBox, setShowDetailedNewsBox: state.setShowDetailedNewsBox,');
  file = file.replace(/showDetailedNewsBox, setShowColorControl,/, 'showDetailedNewsBox, setShowDetailedNewsBox, setShowColorControl,');
  return file;
});

replaceFile('src/components/controls/news/DesignSettings.tsx', file => {
  // Fix the "Cannot assign to 'setThemeColor' because it is a constant" error.
  // In destructuring, `setThemeColor` is const. We should change the destructuring to let, or not rename it inside.
  // Let's replace the whole block we injected.
  file = file.replace(/const originalSetThemeColor[\s\S]*?setAutoColorMode\(false\); \};\n/g, '');
  file = file.replace(/setThemeColor,/g, 'setThemeColor: originalSetThemeColor,');
  file = file.replace(/setGradientStart,/g, 'setGradientStart: originalSetGradientStart,');
  file = file.replace(/setGradientEnd,/g, 'setGradientEnd: originalSetGradientEnd,');
  file = file.replace(/setCardGradientStart,/g, 'setCardGradientStart: originalSetCardGradientStart,');
  file = file.replace(/setCardGradientEnd,/g, 'setCardGradientEnd: originalSetCardGradientEnd,');
  
  const replacer = `
  const setThemeColor = (c: string) => { originalSetThemeColor(c); useAppStore.getState().setAutoColorMode(false); };
  const setGradientStart = (c: string) => { originalSetGradientStart(c); useAppStore.getState().setAutoColorMode(false); };
  const setGradientEnd = (c: string) => { originalSetGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };
  const setCardGradientStart = (c: string) => { originalSetCardGradientStart(c); useAppStore.getState().setAutoColorMode(false); };
  const setCardGradientEnd = (c: string) => { originalSetCardGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };
  const { gradientStart, gradientEnd, cardGradientStart, cardGradientEnd } = useAppStore(useShallow(s => ({
    gradientStart: s.gradientStart,
    gradientEnd: s.gradientEnd,
    cardGradientStart: s.cardGradientStart,
    cardGradientEnd: s.cardGradientEnd
  })));
`;
  file = file.replace(/const DesignSettings: React.FC = \(\) => \{\n  const \{/g, `const DesignSettings: React.FC = () => {\n  const {` );
  
  // Actually, wait, `useAppStore` destructuring is right below `const DesignSettings`.
  file = file.replace(/  const \{ \n/g, `  const { \n`);
  
  // Inject the new setters after the destructuring
  file = file.replace(/  \} = useAppStore\(useShallow\(state => \(\{\n[\s\S]*?\}\)\)\);/g, match => {
    return match + '\n' + replacer;
  });
  return file;
});

// For AdvancedColorSettings, we need to fix "Type '{}' is missing ...".
// This happens because SidebarControls passes NO props, but AdvancedColorSettings still expects them or something?
// Let's check if the interface is still there.
replaceFile('src/components/controls/news/AdvancedColorSettings.tsx', file => {
  return file.replace(/interface AdvancedColorSettingsProps \{[\s\S]*?\}/, '').replace(/export default function AdvancedColorSettings\(\{[\s\S]*?\}\) \{/, 'export default function AdvancedColorSettings() {\n  const { customDateColor, setCustomDateColor, customDateBgColor, setCustomDateBgColor, customDetailsTextColor, setCustomDetailsTextColor, customVisitTextColor, setCustomVisitTextColor, customLogoTextColor, setCustomLogoTextColor, customLogoBgColor, setCustomLogoBgColor, customQrColor, setCustomQrColor, customSocialIconColor, setCustomSocialIconColor, language, darkMode, isAdvancedColorsExpanded: isExpanded, setIsAdvancedColorsExpanded: setIsExpanded } = useAppStore(useShallow(state => ({ customDateColor: state.customDateColor, setCustomDateColor: state.setCustomDateColor, customDateBgColor: state.customDateBgColor, setCustomDateBgColor: state.setCustomDateBgColor, customDetailsTextColor: state.customDetailsTextColor, setCustomDetailsTextColor: state.setCustomDetailsTextColor, customVisitTextColor: state.customVisitTextColor, setCustomVisitTextColor: state.setCustomVisitTextColor, customLogoTextColor: state.customLogoTextColor, setCustomLogoTextColor: state.customLogoTextColor, customLogoBgColor: state.customLogoBgColor, setCustomLogoBgColor: state.customLogoBgColor, customQrColor: state.customQrColor, setCustomQrColor: state.customQrColor, customSocialIconColor: state.customSocialIconColor, setCustomSocialIconColor: state.customSocialIconColor, language: state.language, darkMode: state.darkMode, isAdvancedColorsExpanded: state.isAdvancedColorsExpanded, setIsAdvancedColorsExpanded: state.setIsAdvancedColorsExpanded })));\n');
});

replaceFile('src/components/modals/MobileDesignSettingsModal.tsx', file => {
  file = file.replace(/<DesignSettings[\s\S]*?\/>/g, '<DesignSettings />');
  file = file.replace(/<PatternSettings[\s\S]*?\/>/g, '<PatternSettings />');
  file = file.replace(/<AdvancedColorSettings[\s\S]*?\/>/g, '<AdvancedColorSettings />');
  return file;
});

console.log('fixed');
