const fs = require('fs');

// Fix AdvancedColorSettings
let adv = fs.readFileSync('src/components/controls/news/AdvancedColorSettings.tsx', 'utf-8');
const advLines = adv.split('\n');
const newAdvLines = advLines.filter(line => !line.includes('AdvancedColorSettingsProps'));
fs.writeFileSync('src/components/controls/news/AdvancedColorSettings.tsx', newAdvLines.join('\n'));

// Fix ContentEditor
let ce = fs.readFileSync('src/components/controls/news/ContentEditor.tsx', 'utf-8');
ce = ce.replace(/showDetailedNewsBox, setShowDetailedNewsBox,/g, 'showDetailedNewsBox, setShowDetailedNewsBox: state.setShowDetailedNewsBox,'); // cleanup
ce = ce.replace(/showColorControl, setShowColorControl,/g, 'showDetailedNewsBox, setShowDetailedNewsBox, showColorControl, setShowColorControl,');
// Actually, it's easier to just append them to the end of the destructuring
ce = ce.replace(/setAutoColorMode: state.setAutoColorMode\n/g, 'setAutoColorMode: state.setAutoColorMode,\n    showDetailedNewsBox: state.showDetailedNewsBox,\n    setShowDetailedNewsBox: state.setShowDetailedNewsBox\n');
ce = ce.replace(/setAutoColorMode\n/g, 'setAutoColorMode,\n    showDetailedNewsBox,\n    setShowDetailedNewsBox\n');
fs.writeFileSync('src/components/controls/news/ContentEditor.tsx', ce);

// Fix DesignSettings
let ds = fs.readFileSync('src/components/controls/news/DesignSettings.tsx', 'utf-8');
// To fix DesignSettings, let's just find the original source from git? No git.
// I will just download the original from the file tree if possible. Or I can just write a script that CLEANS up the file.
ds = ds.replace(/setThemeColor: originalSetThemeColor,/g, 'setThemeColor,');
ds = ds.replace(/setGradientStart: originalSetGradientStart,/g, 'setGradientStart,');
ds = ds.replace(/setGradientEnd: originalSetGradientEnd,/g, 'setGradientEnd,');
ds = ds.replace(/setCardGradientStart: originalSetCardGradientStart,/g, 'setCardGradientStart,');
ds = ds.replace(/setCardGradientEnd: originalSetCardGradientEnd,/g, 'setCardGradientEnd,');

ds = ds.replace(/const setThemeColor = \(c: string\) => \{ originalSetThemeColor\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');
ds = ds.replace(/const setGradientStart = \(c: string\) => \{ originalSetGradientStart\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');
ds = ds.replace(/const setGradientEnd = \(c: string\) => \{ originalSetGradientEnd\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');
ds = ds.replace(/const setCardGradientStart = \(c: string\) => \{ originalSetCardGradientStart\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');
ds = ds.replace(/const setCardGradientEnd = \(c: string\) => \{ originalSetCardGradientEnd\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');

ds = ds.replace(/originalSetThemeColor,/g, 'setThemeColor,');
ds = ds.replace(/originalSetGradientStart,/g, 'setGradientStart,');
ds = ds.replace(/originalSetGradientEnd,/g, 'setGradientEnd,');
ds = ds.replace(/originalSetCardGradientStart,/g, 'setCardGradientStart,');
ds = ds.replace(/originalSetCardGradientEnd,/g, 'setCardGradientEnd,');

fs.writeFileSync('src/components/controls/news/DesignSettings.tsx', ds);

console.log('cleaned');
