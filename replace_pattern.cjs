const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/PatternSettings.tsx', 'utf-8');

// Insert import
const importStatement = `import { DebouncedInput } from '../../ui/DebouncedInput';\n`;
if (!file.includes('DebouncedInput')) {
  file = file.replace(/import \{ useShallow \} from 'zustand\/react\/shallow';\n/g, `import { useShallow } from 'zustand/react/shallow';\n${importStatement}`);
}

file = file.replace(
  /<input\n\s+type="text"\n\s+value=\{patternColor\}\n\s+onChange=\{\(e\) => setPatternColor\(e\.target\.value\)\}/g,
  `<DebouncedInput\n                    type="text"\n                    value={patternColor}\n                    onChange={setPatternColor}`
);

file = file.replace(
  /<input\n\s+type="text"\n\s+value=\{geometricShapeColor\}\n\s+onChange=\{\(e\) => setGeometricShapeColor\(e\.target\.value\)\}/g,
  `<DebouncedInput\n                        type="text"\n                        value={geometricShapeColor}\n                        onChange={setGeometricShapeColor}`
);

fs.writeFileSync('src/components/controls/news/PatternSettings.tsx', file);
console.log('Replaced text inputs in PatternSettings');
