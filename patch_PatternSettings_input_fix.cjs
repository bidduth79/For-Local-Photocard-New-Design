const fs = require('fs');
let content = fs.readFileSync('src/components/controls/news/PatternSettings.tsx', 'utf8');

content = content.replace(
  'const handlePatternUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {\n    const file = e.target.files?.[0];\n    if (!file) return;\n\n    setUploadingPattern(true);',
  'const handlePatternUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {\n    const target = e.target;\n    const file = target.files?.[0];\n    if (!file) return;\n\n    setUploadingPattern(true);'
);

content = content.replace(
  '        setUploadingPattern(false);\n        e.target.value = \'\';\n      }\n    };\n    reader.onerror = () => {',
  '        setUploadingPattern(false);\n        target.value = \'\';\n      }\n    };\n    reader.onerror = () => {'
);

content = content.replace(
  '      setUploadingPattern(false);\n      e.target.value = \'\';\n      showToast.error',
  '      setUploadingPattern(false);\n      target.value = \'\';\n      showToast.error'
);

fs.writeFileSync('src/components/controls/news/PatternSettings.tsx', content);
