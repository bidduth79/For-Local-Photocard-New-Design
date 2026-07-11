const fs = require('fs');

let ds = fs.readFileSync('src/components/controls/news/DesignSettings.tsx', 'utf-8');
ds = ds.replace(/image: state\.image,\n  \}\)\)\);/g, 'image: state.image,\n    gradientStart: state.gradientStart,\n    gradientEnd: state.gradientEnd,\n    cardGradientStart: state.cardGradientStart,\n    cardGradientEnd: state.cardGradientEnd\n  })));');
ds = ds.replace(/image,\n  \} = useAppStore/g, 'image,\n    gradientStart, gradientEnd, cardGradientStart, cardGradientEnd\n  } = useAppStore');
fs.writeFileSync('src/components/controls/news/DesignSettings.tsx', ds);

let ce = fs.readFileSync('src/components/controls/news/ContentEditor.tsx', 'utf-8');
// Fix An object literal cannot have multiple properties with the same name.
// line 51
const lines = ce.split('\n');
// Let's just find "showDetailedNewsBox: state.showDetailedNewsBox, setShowDetailedNewsBox: state.setShowDetailedNewsBox," and remove it completely from useShallow if it's there twice
let newCe = ce.replace(/showDetailedNewsBox: state\.showDetailedNewsBox, setShowDetailedNewsBox: state\.setShowDetailedNewsBox,/g, '');
newCe = newCe.replace(/setAutoColorMode: state\.setAutoColorMode\n/g, 'setAutoColorMode: state.setAutoColorMode, showDetailedNewsBox: state.showDetailedNewsBox, setShowDetailedNewsBox: state.setShowDetailedNewsBox\n');
fs.writeFileSync('src/components/controls/news/ContentEditor.tsx', newCe);
console.log('fixed');
