const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/BrandSettings.tsx', 'utf-8');

if (!file.includes("import { DebouncedInput }")) {
  file = file.replace(/import \{ useAppContext \} from '\.\.\/\.\.\/\.\.\/context\/AppContext';/g, `import { useAppContext } from '../../../context/AppContext';\nimport { DebouncedInput } from '../../ui/DebouncedInput';`);
}

fs.writeFileSync('src/components/controls/news/BrandSettings.tsx', file);
console.log('Fixed BrandSettings import');
