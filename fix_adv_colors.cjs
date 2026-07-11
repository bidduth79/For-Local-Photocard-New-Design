const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/AdvancedColorSettings.tsx', 'utf-8');

if (!file.includes('useAppStore')) {
  file = `import { useAppStore } from '../../../store/appStore';\nimport { useShallow } from 'zustand/react/shallow';\n` + file;
}

fs.writeFileSync('src/components/controls/news/AdvancedColorSettings.tsx', file);
console.log('fixed advanced colors');
