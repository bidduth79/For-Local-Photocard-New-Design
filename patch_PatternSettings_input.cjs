const fs = require('fs');
let content = fs.readFileSync('src/components/controls/news/PatternSettings.tsx', 'utf8');

content = content.replace(
  '      } finally {\n        setUploadingPattern(false);\n      }\n    };\n    reader.onerror = () => {',
  '      } finally {\n        setUploadingPattern(false);\n        e.target.value = \'\';\n      }\n    };\n    reader.onerror = () => {'
);

content = content.replace(
  '      console.error("Pattern upload failed");\n      setUploadingPattern(false);\n      showToast.error(language === \'bn\' ? "প্যাটার্ন আপলোড ব্যর্থ হয়েছে।" : "Pattern upload failed.");\n    };\n    reader.readAsDataURL(file);\n  };',
  '      console.error("Pattern upload failed");\n      setUploadingPattern(false);\n      e.target.value = \'\';\n      showToast.error(language === \'bn\' ? "প্যাটার্ন আপলোড ব্যর্থ হয়েছে।" : "Pattern upload failed.");\n    };\n    reader.readAsDataURL(file);\n  };'
);

fs.writeFileSync('src/components/controls/news/PatternSettings.tsx', content);
