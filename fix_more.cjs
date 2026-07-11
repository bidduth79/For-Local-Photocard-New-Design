const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/AdvancedColorSettings.tsx', 'utf-8');
file = file.replace(/interface AdvancedColorSettingsProps[\s\S]*?\}\n/, '');
fs.writeFileSync('src/components/controls/news/AdvancedColorSettings.tsx', file);

let file2 = fs.readFileSync('src/components/controls/news/ContentEditor.tsx', 'utf-8');
file2 = file2.replace(/showDetailedNewsBox, setShowDetailedNewsBox, setShowColorControl,/, 'showDetailedNewsBox, setShowDetailedNewsBox, showColorControl, setShowColorControl,');
file2 = file2.replace(/setShowDetailedNewsBox: state\.setShowDetailedNewsBox,/g, ''); // Remove duplicates if any
file2 = file2.replace(/showDetailedNewsBox: state\.showDetailedNewsBox,/g, 'showDetailedNewsBox: state.showDetailedNewsBox, setShowDetailedNewsBox: state.setShowDetailedNewsBox,');
fs.writeFileSync('src/components/controls/news/ContentEditor.tsx', file2);

console.log('fixed');
