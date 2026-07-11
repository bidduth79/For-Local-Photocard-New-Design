const fs = require('fs');
let content = fs.readFileSync('src/components/controls/news/PatternSettings.tsx', 'utf8');

content = content.replace(
  'const { savedPatterns, savePattern } = usePatterns();',
  'const { savedPatterns, savePattern, fetchPatterns } = usePatterns();'
);

content = content.replace(
  '          setBackgroundPatterns([...useAppStore.getState().backgroundPatterns.filter(p => p !== base64String), result.url]);\n        }',
  '          setBackgroundPatterns([...useAppStore.getState().backgroundPatterns.filter(p => p !== base64String), result.url]);\n          fetchPatterns();\n        }'
);

fs.writeFileSync('src/components/controls/news/PatternSettings.tsx', content);
