const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/DesignSettings.tsx', 'utf-8');

// The issue is that I didn't actually rename the variables correctly or the linter is confused.
// Let's just NOT rename them.
// Let's use different names for the override functions!
file = file.replace(/setThemeColor: originalSetThemeColor,/g, 'setThemeColor,');
file = file.replace(/setGradientStart: originalSetGradientStart,/g, 'setGradientStart,');
file = file.replace(/setGradientEnd: originalSetGradientEnd,/g, 'setGradientEnd,');
file = file.replace(/setCardGradientStart: originalSetCardGradientStart,/g, 'setCardGradientStart,');
file = file.replace(/setCardGradientEnd: originalSetCardGradientEnd,/g, 'setCardGradientEnd,');

file = file.replace(/const setThemeColor = \(c: string\) => \{ originalSetThemeColor\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');
file = file.replace(/const setGradientStart = \(c: string\) => \{ originalSetGradientStart\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');
file = file.replace(/const setGradientEnd = \(c: string\) => \{ originalSetGradientEnd\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');
file = file.replace(/const setCardGradientStart = \(c: string\) => \{ originalSetCardGradientStart\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');
file = file.replace(/const setCardGradientEnd = \(c: string\) => \{ originalSetCardGradientEnd\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');

const overrideFunctions = `
  const handleSetThemeColor = (c: string) => { setThemeColor(c); useAppStore.getState().setAutoColorMode(false); };
  const handleSetGradientStart = (c: string) => { setGradientStart(c); useAppStore.getState().setAutoColorMode(false); };
  const handleSetGradientEnd = (c: string) => { setGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };
  const handleSetCardGradientStart = (c: string) => { setCardGradientStart(c); useAppStore.getState().setAutoColorMode(false); };
  const handleSetCardGradientEnd = (c: string) => { setCardGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };
`;

const endIdx = file.indexOf('const brandFontInputRef = useRef<HTMLInputElement>(null);');
if (endIdx !== -1) {
  file = file.substring(0, endIdx) + overrideFunctions + '\n' + file.substring(endIdx);
}

// Now replace usages of setThemeColor inside the component body
file = file.replace(/setThemeColor\(/g, 'handleSetThemeColor(');
file = file.replace(/setGradientStart\(/g, 'handleSetGradientStart(');
file = file.replace(/setGradientEnd\(/g, 'handleSetGradientEnd(');
file = file.replace(/setCardGradientStart\(/g, 'handleSetCardGradientStart(');
file = file.replace(/setCardGradientEnd\(/g, 'handleSetCardGradientEnd(');

// But wait, the override functions themselves call setThemeColor! We need to fix that.
file = file.replace(/handleSetThemeColor\(c\);/g, 'setThemeColor(c);');
file = file.replace(/handleSetGradientStart\(c\);/g, 'setGradientStart(c);');
file = file.replace(/handleSetGradientEnd\(c\);/g, 'setGradientEnd(c);');
file = file.replace(/handleSetCardGradientStart\(c\);/g, 'setCardGradientStart(c);');
file = file.replace(/handleSetCardGradientEnd\(c\);/g, 'setCardGradientEnd(c);');

fs.writeFileSync('src/components/controls/news/DesignSettings.tsx', file);
console.log('DesignSettings handled.');

// AdvancedColorSettings
let adv = fs.readFileSync('src/components/controls/news/AdvancedColorSettings.tsx', 'utf-8');
// Error: Type 'string' is not assignable to type '(val: string) => void'.
// That means I mapped setCustomDateColor: state.customDateColor! Let's check my script fix_adv.cjs:
adv = adv.replace(/setCustomDateColor: state.customDateColor,/g, 'setCustomDateColor: state.setCustomDateColor,');
adv = adv.replace(/setCustomDateBgColor: state.customDateBgColor,/g, 'setCustomDateBgColor: state.setCustomDateBgColor,');
adv = adv.replace(/setCustomDetailsTextColor: state.customDetailsTextColor,/g, 'setCustomDetailsTextColor: state.setCustomDetailsTextColor,');
adv = adv.replace(/setCustomVisitTextColor: state.customVisitTextColor,/g, 'setCustomVisitTextColor: state.setCustomVisitTextColor,');
adv = adv.replace(/setCustomLogoTextColor: state.customLogoTextColor,/g, 'setCustomLogoTextColor: state.setCustomLogoTextColor,');
adv = adv.replace(/setCustomLogoBgColor: state.customLogoBgColor,/g, 'setCustomLogoBgColor: state.setCustomLogoBgColor,');
adv = adv.replace(/setCustomQrColor: state.customQrColor,/g, 'setCustomQrColor: state.setCustomQrColor,');
adv = adv.replace(/setCustomSocialIconColor: state.customSocialIconColor,/g, 'setCustomSocialIconColor: state.setCustomSocialIconColor,');
fs.writeFileSync('src/components/controls/news/AdvancedColorSettings.tsx', adv);

// ContentEditor
let ce = fs.readFileSync('src/components/controls/news/ContentEditor.tsx', 'utf-8');
// Cannot redeclare block-scoped variable 'showDetailedNewsBox'.
ce = ce.replace(/showDetailedNewsBox, setShowDetailedNewsBox: state\.setShowDetailedNewsBox,/g, '');
ce = ce.replace(/showDetailedNewsBox, setShowDetailedNewsBox,/g, '');
ce = ce.replace(/showDetailedNewsBox: state\.showDetailedNewsBox, setShowDetailedNewsBox: state\.setShowDetailedNewsBox,/g, '');
// Let's just add them clean at the end
ce = ce.replace(/setAutoColorMode: state.setAutoColorMode,/g, 'setAutoColorMode: state.setAutoColorMode, showDetailedNewsBox: state.showDetailedNewsBox, setShowDetailedNewsBox: state.setShowDetailedNewsBox,');
ce = ce.replace(/setAutoColorMode,/g, 'setAutoColorMode, showDetailedNewsBox, setShowDetailedNewsBox,');

fs.writeFileSync('src/components/controls/news/ContentEditor.tsx', ce);
console.log('done all');
