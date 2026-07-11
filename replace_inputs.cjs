const fs = require('fs');

let file = fs.readFileSync('src/components/controls/news/ContentEditor.tsx', 'utf-8');

// Insert import
const importStatement = `import { DebouncedInput, DebouncedTextarea } from '../../ui/DebouncedInput';\n`;
if (!file.includes('DebouncedInput')) {
  file = file.replace(/import \{ useShallow \} from 'zustand\/react\/shallow';\n/g, `import { useShallow } from 'zustand/react/shallow';\n${importStatement}`);
}

// 1. URL input
file = file.replace(
  /<input\s+type="url"\s+value=\{url\}\s+onChange=\{\(e\) => setUrl\(e\.target\.value\)\}/g,
  `<DebouncedInput\n              type="url"\n              value={url}\n              onChange={setUrl}`
);

// 2. Title textarea
file = file.replace(
  /<textarea\s+value=\{title\}\s+onChange=\{\(e\) => setTitle\(e\.target\.value\)\}/g,
  `<DebouncedTextarea\n                value={title}\n                onChange={setTitle}`
);

// 3. Visual Title textarea
file = file.replace(
  /<textarea\s+value=\{visualTitle\}\s+onChange=\{\(e\) => setVisualTitle\(e\.target\.value\)\}/g,
  `<DebouncedTextarea\n                value={visualTitle}\n                onChange={setVisualTitle}`
);

// 4. Description textarea
file = file.replace(
  /<textarea\s+value=\{description \|\| ''\}\s+onChange=\{\(e\) => setDescription\?\.([^\}]+)\}\}/g,
  `<DebouncedTextarea\n                  value={description || ''}\n                  onChange={(val) => setDescription?.(val)}`
);

// 5. Hashtag input
file = file.replace(
  /<input\s+type="text"\s+value=\{hashtag \|\| ''\}\s+onChange=\{\(e\) => setHashtag\?\.\(([^\)]+)\)\}/g,
  `<DebouncedInput\n                  type="text"\n                  value={hashtag || ''}\n                  onChange={(val) => setHashtag?.(val)}`
);

// 6. Illustration Prompt
file = file.replace(
  /<textarea\s+value=\{illustrationPrompt \|\| ''\}\s+onChange=\{\(e\) => setIllustrationPrompt\?\.\(([^\)]+)\)\}/g,
  `<DebouncedTextarea\n                        value={illustrationPrompt || ''}\n                        onChange={(val) => setIllustrationPrompt?.(val)}`
);


fs.writeFileSync('src/components/controls/news/ContentEditor.tsx', file);
console.log('Replaced text inputs in ContentEditor');
