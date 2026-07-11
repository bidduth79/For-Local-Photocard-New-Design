const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/BrandSettings.tsx', 'utf-8');

if (!file.includes('DebouncedInput')) {
  file = file.replace(/import \{ useAppContext \} from '\.\.\/\.\.\/\.\.\/context\/AppContext';\n/g, `import { useAppContext } from '../../../context/AppContext';\nimport { DebouncedInput } from '../../ui/DebouncedInput';\n`);
}

fs.writeFileSync('src/components/controls/news/BrandSettings.tsx', file);
console.log('Fixed BrandSettings import');
