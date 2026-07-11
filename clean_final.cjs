const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/DesignSettings.tsx', 'utf-8');
const lines = file.split('\n');

const cleaned = [];
let skip = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const { gradientStart, gradientEnd, cardGradientStart, cardGradientEnd } = useAppStore(useShallow(s => ({')) {
    skip = true;
  }
  
  if (!skip) {
    cleaned.push(lines[i]);
  }
  
  if (skip && lines[i].includes('setCardGradientEnd = (c: string) => { originalSetCardGradientEnd(c); useAppStore.getState().setAutoColorMode(false); };')) {
    skip = false;
  }
}

fs.writeFileSync('src/components/controls/news/DesignSettings.tsx', cleaned.join('\n'));
console.log('cleaned ds again');

// Fix ContentEditor
let ce = fs.readFileSync('src/components/controls/news/ContentEditor.tsx', 'utf-8');
const ceLines = ce.split('\n');
const cleanedCe = [];
for (let line of ceLines) {
  // Only keep first instance of these
  if (line.includes('showDetailedNewsBox,') || line.includes('setShowDetailedNewsBox,')) {
    // wait this is too brittle. Let's just remove the exact lines.
  }
}
// Actually, let's just do a string replace on ContentEditor for the exact duplicates
ce = ce.replace(/showDetailedNewsBox,\n    setShowDetailedNewsBox\n/g, '');
ce = ce.replace(/showDetailedNewsBox: state\.showDetailedNewsBox,\n    setShowDetailedNewsBox: state\.setShowDetailedNewsBox\n/g, '');
fs.writeFileSync('src/components/controls/news/ContentEditor.tsx', ce);
