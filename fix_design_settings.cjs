const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/DesignSettings.tsx', 'utf-8');

file = file.replace(/state\.setThemeColor: originalSetThemeColor/g, 'state.setThemeColor');
file = file.replace(/state\.setGradientStart: originalSetGradientStart/g, 'state.setGradientStart');
file = file.replace(/state\.setGradientEnd: originalSetGradientEnd/g, 'state.setGradientEnd');
file = file.replace(/state\.setCardGradientStart: originalSetCardGradientStart/g, 'state.setCardGradientStart');
file = file.replace(/state\.setCardGradientEnd: originalSetCardGradientEnd/g, 'state.setCardGradientEnd');

file = file.replace(/setThemeColor: originalSetThemeColor,/g, 'originalSetThemeColor: setThemeColor,');
file = file.replace(/setGradientStart: originalSetGradientStart,/g, 'originalSetGradientStart: setGradientStart,');
file = file.replace(/setGradientEnd: originalSetGradientEnd,/g, 'originalSetGradientEnd: setGradientEnd,');
file = file.replace(/setCardGradientStart: originalSetCardGradientStart,/g, 'originalSetCardGradientStart: setCardGradientStart,');
file = file.replace(/setCardGradientEnd: originalSetCardGradientEnd,/g, 'originalSetCardGradientEnd: setCardGradientEnd,');

fs.writeFileSync('src/components/controls/news/DesignSettings.tsx', file);
console.log('fixed');
