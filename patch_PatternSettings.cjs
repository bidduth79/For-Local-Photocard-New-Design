const fs = require('fs');
let content = fs.readFileSync('src/components/controls/news/PatternSettings.tsx', 'utf8');

content = content.replace(
  '      const base64String = reader.result as string;\n      setBackgroundPatterns([...backgroundPatterns, base64String]);\n      \n      try {\n        const patternName = `Pattern_${Date.now()}`;\n        const result = await savePattern(patternName, base64String, file.name);\n        if (result && result.url) {\n          setBackgroundPatterns([...backgroundPatterns.filter(p => p !== base64String), result.url]);\n        }',
  '      const base64String = reader.result as string;\n      setBackgroundPatterns([...useAppStore.getState().backgroundPatterns, base64String]);\n      \n      try {\n        const patternName = `Pattern_${Date.now()}`;\n        const result = await savePattern(patternName, base64String, file.name);\n        if (result && result.url) {\n          setBackgroundPatterns([...useAppStore.getState().backgroundPatterns.filter(p => p !== base64String), result.url]);\n        }'
);

fs.writeFileSync('src/components/controls/news/PatternSettings.tsx', content);
