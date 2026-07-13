const fs = require('fs');
let code = fs.readFileSync('src/hooks/useImageDownload.ts', 'utf8');

code = code.replace(
  /showToast\.success\(language === 'bn' \? 'ভিডিও তৈরি হচ্ছে, দয়া করে অপেক্ষা করুন\.\.\.' : 'Generating video, please wait\.\.\.'\);/,
  "// Removed toast as per user request"
);

fs.writeFileSync('src/hooks/useImageDownload.ts', code);
