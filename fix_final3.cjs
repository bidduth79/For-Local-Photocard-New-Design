const fs = require('fs');

function fixContentEditor() {
  let file = fs.readFileSync('src/components/controls/news/ContentEditor.tsx', 'utf-8');
  // Remove duplicate showDetailedNewsBox
  file = file.replace(/showDetailedNewsBox, setShowDetailedNewsBox,/g, '');
  file = file.replace(/showDetailedNewsBox: state\.showDetailedNewsBox, setShowDetailedNewsBox: state\.setShowDetailedNewsBox,/g, '');
  // Add it back cleanly
  file = file.replace(/setAutoColorMode: state.setAutoColorMode,/g, 'setAutoColorMode: state.setAutoColorMode, showDetailedNewsBox: state.showDetailedNewsBox, setShowDetailedNewsBox: state.setShowDetailedNewsBox,');
  file = file.replace(/setAutoColorMode,/g, 'setAutoColorMode, showDetailedNewsBox, setShowDetailedNewsBox,');
  fs.writeFileSync('src/components/controls/news/ContentEditor.tsx', file);
}

function fixDesignSettings() {
  let file = fs.readFileSync('src/components/controls/news/DesignSettings.tsx', 'utf-8');
  
  // The problem in DesignSettings is `originalSetThemeColor` is still there.
  file = file.replace(/setThemeColor: originalSetThemeColor,/g, 'setThemeColor,');
  file = file.replace(/setGradientStart: originalSetGradientStart,/g, 'setGradientStart,');
  file = file.replace(/setGradientEnd: originalSetGradientEnd,/g, 'setGradientEnd,');
  file = file.replace(/setCardGradientStart: originalSetCardGradientStart,/g, 'setCardGradientStart,');
  file = file.replace(/setCardGradientEnd: originalSetCardGradientEnd,/g, 'setCardGradientEnd,');

  file = file.replace(/originalSetThemeColor,/g, 'setThemeColor,');
  file = file.replace(/originalSetGradientStart,/g, 'setGradientStart,');
  file = file.replace(/originalSetGradientEnd,/g, 'setGradientEnd,');
  file = file.replace(/originalSetCardGradientStart,/g, 'setCardGradientStart,');
  file = file.replace(/originalSetCardGradientEnd,/g, 'setCardGradientEnd,');

  file = file.replace(/const handleSetThemeColor = \(c: string\) => \{ setThemeColor\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');
  file = file.replace(/const handleSetGradientStart = \(c: string\) => \{ setGradientStart\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');
  file = file.replace(/const handleSetGradientEnd = \(c: string\) => \{ setGradientEnd\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');
  file = file.replace(/const handleSetCardGradientStart = \(c: string\) => \{ setCardGradientStart\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');
  file = file.replace(/const handleSetCardGradientEnd = \(c: string\) => \{ setCardGradientEnd\(c\); useAppStore\.getState\(\)\.setAutoColorMode\(false\); \};\n/g, '');

  // Find where useAppStore ends
  const endSelector = file.indexOf('})));');
  if (endSelector !== -1) {
    const override = `
    const handleSetThemeColor = (c: string) => { setThemeColor(c); useAppStore.getState().setAutoColorMode(false); };
    const handleSetGradientStart = (c: string) => { setGradientStart(c); useAppStore.getState().setAutoColorMode(false); };
    const handleSetGradientEnd = (c: string) => { setGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };
    const handleSetCardGradientStart = (c: string) => { setCardGradientStart(c); useAppStore.getState().setAutoColorMode(false); };
    const handleSetCardGradientEnd = (c: string) => { setCardGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };
    `;
    file = file.substring(0, endSelector + 5) + override + file.substring(endSelector + 5);
  }

  // Restore handleSetThemeColor to standard setThemeColor (we just rename the override back to setThemeColor but we can't because it conflicts with destructuring)
  // Instead of destructuring `setThemeColor`, let's destructure it as `zustandSetThemeColor`.
  
  // Wait, I can just rename it during destructuring correctly:
  // `setThemeColor: zustandSetThemeColor` -> `const setThemeColor = (c: string) => { zustandSetThemeColor(c); ... }`
  
  file = file.replace(/setThemeColor,/g, 'setThemeColor: zustandSetThemeColor,');
  file = file.replace(/setGradientStart,/g, 'setGradientStart: zustandSetGradientStart,');
  file = file.replace(/setGradientEnd,/g, 'setGradientEnd: zustandSetGradientEnd,');
  file = file.replace(/setCardGradientStart,/g, 'setCardGradientStart: zustandSetCardGradientStart,');
  file = file.replace(/setCardGradientEnd,/g, 'setCardGradientEnd: zustandSetCardGradientEnd,');
  
  // Undo inside the shallow block
  file = file.replace(/setThemeColor: state\.setThemeColor: zustandSetThemeColor/g, 'setThemeColor: state.setThemeColor');
  file = file.replace(/setGradientStart: state\.setGradientStart: zustandSetGradientStart/g, 'setGradientStart: state.setGradientStart');
  file = file.replace(/setGradientEnd: state\.setGradientEnd: zustandSetGradientEnd/g, 'setGradientEnd: state.setGradientEnd');
  file = file.replace(/setCardGradientStart: state\.setCardGradientStart: zustandSetCardGradientStart/g, 'setCardGradientStart: state.setCardGradientStart');
  file = file.replace(/setCardGradientEnd: state\.setCardGradientEnd: zustandSetCardGradientEnd/g, 'setCardGradientEnd: state.setCardGradientEnd');

  // Also remove it from the destructured args if I messed it up
  file = file.replace(/setThemeColor: zustandSetThemeColor: zustandSetThemeColor/g, 'setThemeColor: zustandSetThemeColor');
  file = file.replace(/setGradientStart: zustandSetGradientStart: zustandSetGradientStart/g, 'setGradientStart: zustandSetGradientStart');
  file = file.replace(/setGradientEnd: zustandSetGradientEnd: zustandSetGradientEnd/g, 'setGradientEnd: zustandSetGradientEnd');
  file = file.replace(/setCardGradientStart: zustandSetCardGradientStart: zustandSetCardGradientStart/g, 'setCardGradientStart: zustandSetCardGradientStart');
  file = file.replace(/setCardGradientEnd: zustandSetCardGradientEnd: zustandSetCardGradientEnd/g, 'setCardGradientEnd: zustandSetCardGradientEnd');

  file = file.replace(/handleSetThemeColor/g, 'setThemeColor');
  file = file.replace(/handleSetGradientStart/g, 'setGradientStart');
  file = file.replace(/handleSetGradientEnd/g, 'setGradientEnd');
  file = file.replace(/handleSetCardGradientStart/g, 'setCardGradientStart');
  file = file.replace(/handleSetCardGradientEnd/g, 'setCardGradientEnd');
  
  // The override functions were calling setThemeColor (recursive!). They should call zustandSetThemeColor
  file = file.replace(/setThemeColor\(c\); useAppStore/g, 'zustandSetThemeColor(c); useAppStore');
  file = file.replace(/setGradientStart\(c\); useAppStore/g, 'zustandSetGradientStart(c); useAppStore');
  file = file.replace(/setGradientEnd\(c\); useAppStore/g, 'zustandSetGradientEnd(c); useAppStore');
  file = file.replace(/setCardGradientStart\(c\); useAppStore/g, 'zustandSetCardGradientStart(c); useAppStore');
  file = file.replace(/setCardGradientEnd\(c\); useAppStore/g, 'zustandSetCardGradientEnd(c); useAppStore');

  fs.writeFileSync('src/components/controls/news/DesignSettings.tsx', file);
}

fixContentEditor();
fixDesignSettings();
console.log('clean');
