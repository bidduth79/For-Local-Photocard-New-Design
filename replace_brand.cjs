const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/BrandSettings.tsx', 'utf-8');

// Insert import
const importStatement = `import { DebouncedInput } from '../../ui/DebouncedInput';\n`;
if (!file.includes('DebouncedInput')) {
  file = file.replace(/import \{ useShallow \} from 'zustand\/react\/shallow';\n/g, `import { useShallow } from 'zustand/react/shallow';\n${importStatement}`);
}

// 1. brandName
file = file.replace(
  /<input\s+type="text"\s+value=\{brandName\}\s+onChange=\{\(e\) => setBrandName\(e\.target\.value\)\}/g,
  `<DebouncedInput\n              type="text"\n              value={brandName}\n              onChange={setBrandName}`
);

// 2. customWebsite
file = file.replace(
  /<input\s+type="text"\s+value=\{customWebsite\}\s+onChange=\{\(e\) => setCustomWebsite\(e\.target\.value\)\}/g,
  `<DebouncedInput\n              type="text"\n              value={customWebsite}\n              onChange={setCustomWebsite}`
);

fs.writeFileSync('src/components/controls/news/BrandSettings.tsx', file);
console.log('Replaced text inputs in BrandSettings');
